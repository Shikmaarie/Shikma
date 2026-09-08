-- The schema as applied to the racheli-landing-pages Supabase project.
-- Kept here so the backend is reviewable and rebuildable from the repo.
-- Applied in four migrations: landing_pages_catalogue, creative_files_bucket,
-- team_allow_list, hide_membership_check_from_api.

create table public.pages (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  campaign      text not null default '',
  status        text not null default 'draft'
                  check (status in ('draft','review','live','paused','archived')),
  url           text not null default '',
  thank_you_url text not null default '',
  tags          text[] not null default '{}',
  notes         text not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  created_by    text not null default '',
  updated_by    text not null default ''
);

create table public.creatives (
  id          uuid primary key default gen_random_uuid(),
  page_id     uuid not null references public.pages(id) on delete cascade,
  kind        text not null default 'ad' check (kind in ('ad','lp','thanks')),
  platform    text not null default '',
  format      text not null default '',
  status      text not null default 'draft'
                check (status in ('draft','review','approved','live','paused')),
  title       text not null default '',
  ad_copy     text not null default '',
  source_url  text not null default '',
  file_path   text,
  file_name   text not null default '',
  file_size   bigint,
  mime_type   text not null default '',
  thumb_path  text,
  original_w  integer,
  original_h  integer,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  added_by    text not null default '',
  updated_by  text not null default ''
);

create index creatives_page_id_idx on public.creatives (page_id);
create index creatives_created_at_idx on public.creatives (created_at);
create index pages_updated_at_idx on public.pages (updated_at desc);

-- Storage: the originals are unreleased campaign work, so the bucket is private
-- and the app reaches every file through a short-lived signed URL.
insert into storage.buckets (id, name, public, file_size_limit)
values ('creatives', 'creatives', false, 52428800);

-- Access. A signed-in session is not enough on its own — the account must also
-- be on the roster, so an open sign-up form can never hand anyone the
-- catalogue. The predicate lives outside `public` because PostgREST exposes
-- only that schema, and this is a policy helper, not an endpoint.
create table public.app_team (
  email    text primary key,
  note     text not null default '',
  added_at timestamptz not null default now()
);

create schema private;
revoke all on schema private from public, anon, authenticated;

create function private.is_team_member()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.app_team
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.pages     enable row level security;
alter table public.creatives enable row level security;
alter table public.app_team  enable row level security;

create policy "team reads its own roster" on public.app_team
  for select to authenticated using (private.is_team_member());

create policy "roster reads pages"   on public.pages for select to authenticated using (private.is_team_member());
create policy "roster writes pages"  on public.pages for insert to authenticated with check (private.is_team_member());
create policy "roster updates pages" on public.pages for update to authenticated using (private.is_team_member()) with check (private.is_team_member());
create policy "roster deletes pages" on public.pages for delete to authenticated using (private.is_team_member());

create policy "roster reads creatives"   on public.creatives for select to authenticated using (private.is_team_member());
create policy "roster writes creatives"  on public.creatives for insert to authenticated with check (private.is_team_member());
create policy "roster updates creatives" on public.creatives for update to authenticated using (private.is_team_member()) with check (private.is_team_member());
create policy "roster deletes creatives" on public.creatives for delete to authenticated using (private.is_team_member());

create policy "roster reads creative files"    on storage.objects for select to authenticated using (bucket_id = 'creatives' and private.is_team_member());
create policy "roster uploads creative files"  on storage.objects for insert to authenticated with check (bucket_id = 'creatives' and private.is_team_member());
create policy "roster replaces creative files" on storage.objects for update to authenticated using (bucket_id = 'creatives' and private.is_team_member()) with check (bucket_id = 'creatives' and private.is_team_member());
create policy "roster removes creative files"  on storage.objects for delete to authenticated using (bucket_id = 'creatives' and private.is_team_member());

-- Two people working at once see each other's changes without reloading.
alter publication supabase_realtime add table public.pages;
alter publication supabase_realtime add table public.creatives;

create function public.touch_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger pages_touch_updated_at     before update on public.pages     for each row execute function public.touch_updated_at();
create trigger creatives_touch_updated_at before update on public.creatives for each row execute function public.touch_updated_at();
