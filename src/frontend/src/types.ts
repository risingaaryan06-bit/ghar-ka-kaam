// Re-export all backend types
export type {
  Job,
  JobId,
  Message,
  MessageId,
  Notification,
  NotificationId,
  Payment,
  PaymentId,
  Review,
  ReviewId,
  UserProfile,
  UserId,
  Timestamp,
  ShoppingItem,
  StripeConfiguration,
  StripeSessionStatus,
} from "./backend";

export {
  JobStatus,
  PaymentStatus,
  PaymentType,
  UserRole,
  UserRole__1,
  WorkType,
} from "./backend";

// Form input types
export interface PostJobFormData {
  title: string;
  description: string;
  workType: string;
  location: string;
  budget: string;
  timelineDays: string;
  requiredMaterials: string;
}

export interface ProfileFormData {
  name: string;
  phone: string;
  location: string;
  role: string;
  skills: string;
  yearsExperience: string;
}

export interface SignupFormData {
  name: string;
  phone: string;
  location: string;
  role: "homeowner" | "laborer" | "maid";
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}

// UI-only types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface WorkTypeMeta {
  label: string;
  icon: string;
  color: string;
  category: "construction" | "maid";
}

// Construction work types
export const WORK_TYPE_META: Record<string, WorkTypeMeta> = {
  masonry: {
    label: "Masonry",
    icon: "🧱",
    color: "bg-orange-100 text-orange-800",
    category: "construction",
  },
  carpentry: {
    label: "Carpentry",
    icon: "🪚",
    color: "bg-amber-100 text-amber-800",
    category: "construction",
  },
  painting: {
    label: "Painting",
    icon: "🖌️",
    color: "bg-blue-100 text-blue-800",
    category: "construction",
  },
  electrical: {
    label: "Electrical",
    icon: "⚡",
    color: "bg-yellow-100 text-yellow-800",
    category: "construction",
  },
  plumbing: {
    label: "Plumbing",
    icon: "🔧",
    color: "bg-cyan-100 text-cyan-800",
    category: "construction",
  },
  general: {
    label: "General Labor",
    icon: "🔨",
    color: "bg-stone-100 text-stone-800",
    category: "construction",
  },
  // Maid / home services
  maidServices: {
    label: "Maid Services",
    icon: "🏠",
    color: "bg-pink-100 text-pink-800",
    category: "maid",
  },
  cook: {
    label: "Cook",
    icon: "👩‍🍳",
    color: "bg-rose-100 text-rose-800",
    category: "maid",
  },
  houseCleaner: {
    label: "House Cleaner",
    icon: "🧹",
    color: "bg-purple-100 text-purple-800",
    category: "maid",
  },
  laundry: {
    label: "Laundry",
    icon: "👕",
    color: "bg-indigo-100 text-indigo-800",
    category: "maid",
  },
  childcare: {
    label: "Childcare",
    icon: "👶",
    color: "bg-green-100 text-green-800",
    category: "maid",
  },
  babysitter: {
    label: "Babysitter",
    icon: "🍼",
    color: "bg-teal-100 text-teal-800",
    category: "maid",
  },
  other: {
    label: "Other",
    icon: "🛠️",
    color: "bg-muted text-muted-foreground",
    category: "construction",
  },
};

export const MAID_WORK_TYPES = Object.entries(WORK_TYPE_META)
  .filter(([, meta]) => meta.category === "maid")
  .map(([key]) => key);

export const CONSTRUCTION_WORK_TYPES = Object.entries(WORK_TYPE_META)
  .filter(([, meta]) => meta.category === "construction")
  .map(([key]) => key);

export function formatBudget(amount: bigint): string {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function timeAgo(timestamp: bigint): string {
  const now = Date.now();
  const ts = Number(timestamp) / 1_000_000;
  const diff = now - ts;
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
