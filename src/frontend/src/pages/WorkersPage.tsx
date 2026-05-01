import { PageLoader } from "@/components/LoadingSpinner";
import { WorkerCard } from "@/components/WorkerCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UserProfile } from "@/types";
import { UserRole } from "@/types";
import {
  BrickWall,
  Brush,
  Hammer,
  HardHat,
  Search,
  Star,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface CategoryPill {
  key: string;
  label: string;
  icon: LucideIcon;
  skillMatch: string[];
}

const CATEGORY_PILLS: CategoryPill[] = [
  { key: "all", label: "All", icon: HardHat, skillMatch: [] },
  { key: "plumbing", label: "Plumber", icon: Wrench, skillMatch: ["plumbing"] },
  {
    key: "carpentry",
    label: "Carpenter",
    icon: Hammer,
    skillMatch: ["carpentry"],
  },
  {
    key: "electrical",
    label: "Electrician",
    icon: Zap,
    skillMatch: ["electrical"],
  },
  { key: "painting", label: "Painter", icon: Brush, skillMatch: ["painting"] },
  { key: "masonry", label: "Mason", icon: BrickWall, skillMatch: ["masonry"] },
];

const now = BigInt(Date.now()) * BigInt(1_000_000);

function makePrincipal(id: string) {
  return { toText: () => id } as unknown as UserProfile["id"];
}

// ─── HARDCODED WORKERS — always visible, no login required ───────────────────
const HARDCODED_WORKERS: UserProfile[] = [
  // PLUMBERS
  {
    id: makePrincipal("worker-hira-singh"),
    name: "Hira Singh",
    phone: "+91 80917 72338",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(8),
    averageRating: 4.8,
    completedJobsCount: BigInt(95),
    skills: ["plumbing", "plumbing", "plumbing"],
  },
  {
    id: makePrincipal("worker-chintu"),
    name: "Chintu",
    phone: "+91 78762 51663",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(5),
    averageRating: 4.5,
    completedJobsCount: BigInt(67),
    skills: ["plumbing", "plumbing", "plumbing"],
  },
  // CARPENTERS
  {
    id: makePrincipal("worker-lucky"),
    name: "Lucky",
    phone: "+91 82196 96946",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(120),
    skills: ["carpentry", "carpentry", "carpentry"],
  },
  {
    id: makePrincipal("worker-raju-mistri"),
    name: "Raju Mistri",
    phone: "+91 98765 43210",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(10),
    averageRating: 4.7,
    completedJobsCount: BigInt(43),
    skills: ["masonry", "masonry", "masonry"],
  },
  // PAINTERS
  {
    id: makePrincipal("worker-suresh-painter"),
    name: "Suresh Painter",
    phone: "+91 97654 32109",
    location: "Mumbai",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(7),
    averageRating: 4.6,
    completedJobsCount: BigInt(82),
    skills: ["painting", "painting", "painting"],
  },
  {
    id: makePrincipal("worker-mohan-kumar"),
    name: "Mohan Kumar",
    phone: "+91 96543 21098",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(4),
    averageRating: 4.3,
    completedJobsCount: BigInt(38),
    skills: ["painting", "painting", "painting"],
  },
  // ELECTRICIANS
  {
    id: makePrincipal("worker-arvind-electrician"),
    name: "Arvind Electrician",
    phone: "+91 95432 10987",
    location: "Noida",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(9),
    averageRating: 4.7,
    completedJobsCount: BigInt(55),
    skills: ["electrical", "electrical", "electrical"],
  },
];

// Skill label override so badges show readable names
const SKILL_LABEL_MAP: Record<string, string[]> = {
  "worker-hira-singh": ["Pipe Fitting", "Leak Repair", "Installation"],
  "worker-chintu": ["Pipe Fitting", "Drainage", "Repair"],
  "worker-lucky": ["Furniture Making", "Wood Work", "Repair"],
  "worker-raju-mistri": ["Masonry", "Construction", "Repair"],
  "worker-suresh-painter": [
    "Interior Painting",
    "Exterior Painting",
    "Wall Finishing",
  ],
  "worker-mohan-kumar": ["Painting", "Whitewash", "Texture Work"],
  "worker-arvind-electrician": ["Wiring", "Panel Installation", "Repairs"],
};

// Enrich workers with readable skill labels for display
const DISPLAY_WORKERS: UserProfile[] = HARDCODED_WORKERS.map((w) => {
  const id = w.id.toText();
  const labels = SKILL_LABEL_MAP[id];
  return labels ? { ...w, skills: labels } : w;
});

export default function WorkersPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [minRating, setMinRating] = useState(0);

  const workers = DISPLAY_WORKERS;

  const hasActiveFilters =
    search !== "" || categoryFilter !== "all" || minRating > 0;

  const filtered = workers.filter((w) => {
    const matchSearch =
      !search ||
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.location.toLowerCase().includes(search.toLowerCase());

    const activePill = CATEGORY_PILLS.find((p) => p.key === categoryFilter);
    const matchCategory =
      categoryFilter === "all" ||
      !activePill ||
      activePill.skillMatch.some((sm) =>
        (
          HARDCODED_WORKERS.find((hw) => hw.id.toText() === w.id.toText())
            ?.skills ?? []
        ).some((ws) => ws.toLowerCase().includes(sm.toLowerCase())),
      );

    const matchRating =
      minRating === 0 ||
      (w.averageRating !== undefined && w.averageRating >= minRating);

    return matchSearch && matchCategory && matchRating;
  });

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setMinRating(0);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* ── Page header ── */}
      <div
        className="border-b border-primary/12 py-10"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.88 0.07 350) 0%, oklch(0.95 0.03 350) 60%, oklch(0.985 0.008 350) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-7">
            <div className="h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center flex-shrink-0 shadow-pink">
              <HardHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <Badge className="bg-foreground/8 text-foreground border-0 text-xs font-semibold mb-1 px-2.5 py-0.5">
                Construction & Repairs
              </Badge>
              <h1 className="font-display font-extrabold text-2xl text-foreground leading-tight">
                Find Skilled Workers
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filtered.length} skilled worker
                {filtered.length !== 1 ? "s" : ""} available
                {hasActiveFilters && " matching your filters"}
              </p>
            </div>
          </div>

          {/* Search row */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/15 p-4 flex flex-wrap items-center gap-3 shadow-sm">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60 pointer-events-none" />
              <Input
                data-ocid="workers.search_input"
                placeholder="Search by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background border-border focus:border-primary/50 rounded-xl h-10"
              />
            </div>

            {/* Min rating quick filter */}
            <div className="flex items-center gap-2">
              {[0, 4, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  data-ocid={`workers.rating_pill.${r}`}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all duration-200 ${
                    minRating === r
                      ? "bg-primary text-primary-foreground border-primary shadow-pink"
                      : "bg-card border-border text-foreground/65 hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  <Star className="h-3 w-3" />
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button
                data-ocid="workers.clear_filters.button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground gap-1.5 rounded-xl h-10"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Category pills ── */}
      <div className="bg-card border-b border-primary/8 py-3 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_PILLS.map((pill) => {
              const Icon = pill.icon;
              const isActive = categoryFilter === pill.key;
              return (
                <button
                  key={pill.key}
                  type="button"
                  data-ocid={`workers.category.${pill.key}`}
                  onClick={() => setCategoryFilter(pill.key)}
                  className={`flex items-center gap-1.5 shrink-0 text-xs font-semibold px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-pink"
                      : "bg-card border-border text-foreground/65 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div
            data-ocid="workers.empty_state"
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-4xl border-2 border-primary/15">
              👷
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              No Workers Found
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Try adjusting your search or filters to find workers.
            </p>
            {hasActiveFilters && (
              <Button
                data-ocid="workers.empty.clear_button"
                className="btn-outline-pink"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((worker, idx) => (
              <motion.div
                key={worker.id.toText()}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <WorkerCard worker={worker} index={idx + 1} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {filtered.length > 0 && (
          <div className="mt-12 text-center py-8 rounded-2xl bg-card border border-primary/15 shadow-sm">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-base font-bold text-foreground mb-1">
              Can't find the right worker?
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Post a job and let workers come to you
            </p>
            <Button className="btn-primary">Post a Job Free</Button>
          </div>
        )}
      </div>
    </div>
  );
}
