import { create } from "zustand";
import type { MeatKey, SizeKey } from "@/lib/biryani-data";

interface OrderDraftState {
  meat: MeatKey;
  size: SizeKey;
  setDraft: (meat: MeatKey, size: SizeKey) => void;
}

export const useOrderDraft = create<OrderDraftState>((set) => ({
  meat: "chicken",
  size: "family",
  setDraft: (meat, size) => set({ meat, size }),
}));
