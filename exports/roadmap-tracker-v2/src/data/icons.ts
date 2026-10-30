import {
  CalendarHeart,
  Coins,
  Compass,
  FlaskConical,
  Footprints,
  Handshake,
  HeartHandshake,
  Lightbulb,
  ListChecks,
  Megaphone,
  MessageCircleHeart,
  MessagesSquare,
  PackagePlus,
  Rocket,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const monthIcons: Record<number, LucideIcon> = {
  1: Compass,
  2: FlaskConical,
  3: Rocket,
  4: Megaphone,
  5: Handshake,
  6: TrendingUp,
};

export const metricIcons: Record<string, LucideIcon> = {
  discovery_calls: MessagesSquare,
  directions_tested: Lightbulb,
  direction_chosen: Target,
  pilot_participants: Users,
  feedback_documented: MessageCircleHeart,
  testimonials_approved: Star,
  improvements_defined: Wrench,
  income: Coins,
  community: Users,
  inquiries: MessagesSquare,
  paying_clients: UserCheck,
  sales_calls: MessagesSquare,
  collaborations: Handshake,
  new_testimonials: Star,
  new_funnel: PackagePlus,
};

export const reflectionIcons: Record<string, LucideIcon> = {
  win: Trophy,
  gap_learning: Lightbulb,
  next_goal: Target,
  first_step: Footprints,
  support_needed: HeartHandshake,
  next_follow_up: CalendarHeart,
};

export const stepIcons = { milestones: ListChecks, metrics: TrendingUp, evidence: Sparkles, summary: MessageCircleHeart };
