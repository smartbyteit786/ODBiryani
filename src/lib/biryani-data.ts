export type MeatKey = "chicken" | "beef" | "lamb";
export type SizeKey = "solo" | "family" | "party";

export interface Meat {
  key: MeatKey;
  label: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  prices: Record<SizeKey, number>;
  badge?: string;
}

export interface Size {
  key: SizeKey;
  label: string;
  serves: string;
  detail: string;
  icon: string;
}

export const SIZES: Size[] = [
  {
    key: "solo",
    label: "Solo Bowl",
    serves: "Serves 1",
    detail: "Individual portion, packed with mint chutney & raita",
    icon: "bowl",
  },
  {
    key: "family",
    label: "Family Tray",
    serves: "Serves 4–6",
    detail: "For a family meal or dinner with friends",
    icon: "tray",
  },
  {
    key: "party",
    label: "Party Tray",
    serves: "Serves 10–12",
    detail: "Celebration size for gatherings & events",
    icon: "party",
  },
];

export const MEATS: Meat[] = [
  {
    key: "chicken",
    label: "Chicken Biryani",
    tagline: "A familiar favorite",
    description:
      "Chicken, basmati rice, yogurt, garlic, and warm spices, cooked together with saffron.",
    image: "/images/biryani-plate.jpg",
    accent: "#e9a13b",
    prices: { solo: 13.99, family: 59.99, party: 109.99 },

  },
  {
    key: "beef",
    label: "Beef Biryani",
    tagline: "Rich and tender",
    description:
      "Slow-cooked beef with basmati rice and a rich spice mix. A hearty choice for the table.",
    image: "/images/pot-fresh.jpg",
    accent: "#c4502e",
    prices: { solo: 15.99, family: 69.99, party: 129.99 },
  },
  {
    key: "lamb",
    label: "Lamb Biryani",
    tagline: "For lamb lovers",
    description:
      "Tender lamb with basmati rice, saffron, and whole spices. Slowly cooked for a rich, full flavor.",
    image: "/images/feast-table.jpg",
    accent: "#d98e2b",
    prices: { solo: 17.99, family: 79.99, party: 149.99 },

  },
];

export const PRICE_NOTES = [
  "Every order includes mint chutney, raita & fried onion birista",
  "Saffron color — never artificial food dye",
  "Cooked in 100% olive oil — never ghee or seed oils",
  "24-hour notice appreciated for Party Trays",
];

export const YOUTUBE_VIDEOS = [
  {
    id: "zdosRouodtc",
    title: "The Dum Experience",
    subtitle: "Hyderabadi layering, sealed and steamed the royal way",
  },
  {
    id: "wlsMptfmVqY",
    title: "Cinematic Cooking ASMR",
    subtitle: "Every sizzle, every grain — turn the sound up",
  },
  {
    id: "9IfpPOmGYIo",
    title: "From Pot to Plate",
    subtitle: "Watch a full biryani come together, start to finish",
  },
];

export const STATS = [
  { value: 1, suffix: "", label: "One pot", sub: "Every tray cooked in a single vessel" },
  { value: 100, suffix: "%", label: "Olive oil", sub: "Zero ghee, zero seed oils" },
  { value: 24, suffix: "h", label: "Marinated", sub: "Time for the flavors to settle" },
  { value: 0, suffix: "", label: "Artificial colors", sub: "Color from saffron" },
];
