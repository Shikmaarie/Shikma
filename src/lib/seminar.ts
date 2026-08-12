"use client";

import { create } from "zustand";

/**
 * Ties the ticket and city cards on `/usa` to the registration form further
 * down the page: picking a card preselects it in the form.
 *
 * Deliberately not persisted — unlike the cart, a seminar choice shouldn't
 * survive a reload and surprise someone on their next visit.
 */
type SeminarSelection = {
  cityId: string | null;
  ticketId: string | null;
  setCity: (id: string) => void;
  setTicket: (id: string) => void;
};

export const useSeminar = create<SeminarSelection>((set) => ({
  cityId: null,
  ticketId: null,
  setCity: (cityId) => set({ cityId }),
  setTicket: (ticketId) => set({ ticketId }),
}));
