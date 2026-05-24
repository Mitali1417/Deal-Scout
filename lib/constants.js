import { Sparkles, Link2, LineChart, Mail, Rabbit, Shield, Bell, TrendingDown } from "lucide-react";

// ─── App identity ────────────────────────────────────────────────────────────
export const APP_NAME = "Deal Scout";
export const APP_TAGLINE = "Never Pay Too Much, Ever Again.";
export const APP_DESCRIPTION =
  "Track products from any storefront. Get instant email alerts the moment prices drop.";

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  ERROR: "/error",
};

// ─── Navigation links (landing page) ─────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
];

// ─── How It Works steps ───────────────────────────────────────────────────────
export const STEPS = [
  {
    step: 1,
    title: "Sign in with Google",
    body: "Your tracked products and price-drop alerts are saved securely to your account.",
    icon: Sparkles,
  },
  {
    step: 2,
    title: "Paste any product link",
    body: "We instantly extract the name, image, and current price from the live page.",
    icon: Link2,
  },
  {
    step: 3,
    title: "Watch the price chart",
    body: "Open price history any time to see exactly how a deal has moved over time.",
    icon: LineChart,
  },
  {
    step: 4,
    title: "Get instant drop alerts",
    body: "When our daily check detects a lower price, you receive an email right away.",
    icon: Mail,
  },
];

// ─── Feature highlights ────────────────────────────────────────────────────────
export const FEATURES = [
  {
    icon: Rabbit,
    title: "Lightning Fast",
    description:
      "Deal Scout reads live pages in seconds so prices always reflect what shoppers see right now.",
  },
  {
    icon: Shield,
    title: "Works on Any Store",
    description:
      "JavaScript-heavy storefronts and single-page apps are handled automatically — no setup needed.",
  },
  {
    icon: Bell,
    title: "Smart Alerts Only",
    description:
      "We only send you an email when the price actually drops, so your inbox stays clean.",
  },
];

// ─── Landing page stats ────────────────────────────────────────────────────────
export const STATS = [
  { value: "Any Store", label: "Amazon, Flipkart & more" },
  { value: "Real-time", label: "Live price extraction" },
  { value: "Instant", label: "Email drop alerts" },
  { value: "Free", label: "No credit card needed" },
];

// ─── Dashboard empty-state ─────────────────────────────────────────────────────
export const EMPTY_STATE = {
  icon: TrendingDown,
  title: "No products tracked yet",
  description:
    "Paste a product link above to start tracking. After the first daily check, price history appears on the chart and we can email you when the price falls.",
};

// ─── Brand colour (used in JS for recharts etc.) ───────────────────────────────
export const BRAND_COLOR = "#FA5D19";
