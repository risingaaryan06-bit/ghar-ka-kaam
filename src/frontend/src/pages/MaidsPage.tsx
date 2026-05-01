import { MaidPhotoUpload } from "@/components/MaidPhotoUpload";
import { RateWorkerModal } from "@/components/RateWorkerModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MAID_WORK_TYPES,
  type UserProfile,
  UserRole,
  WORK_TYPE_META,
} from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Baby,
  Heart,
  Home,
  MapPin,
  Phone,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// Emoji map for each maid category
const CATEGORY_EMOJI: Record<string, string> = {
  maidServices: "🏠",
  cook: "👩‍🍳",
  houseCleaner: "🧹",
  laundry: "👕",
  childcare: "👶",
  babysitter: "🍼",
};

// Lucide icon per category for card badges
function getCategoryIcon(cat: string): LucideIcon {
  if (cat === "babysitter" || cat === "childcare") return Baby;
  if (cat === "houseCleaner" || cat === "cook") return Sparkles;
  if (cat === "maidServices") return Home;
  return Heart;
}

const CATEGORY_FILTERS = [
  { key: "all", label: "All Categories" },
  ...MAID_WORK_TYPES.map((key) => ({
    key,
    label: WORK_TYPE_META[key]?.label ?? key,
  })),
];

const now = BigInt(Date.now()) * BigInt(1_000_000);

function makePrincipal(id: string) {
  return { toText: () => id } as unknown as UserProfile["id"];
}

// ─── HARDCODED MAIDS — always visible, no login required ─────────────────────
const HARDCODED_MAIDS: UserProfile[] = [
  {
    id: makePrincipal("maid-sunita-devi"),
    name: "Sunita Devi",
    phone: "+91 91234 56789",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(5),
    averageRating: 4.7,
    completedJobsCount: BigInt(130),
    skills: ["House Cleaning", "Cooking", "Kitchen Cleaning"],
    maidCategory: "houseCleaner",
  },
  {
    id: makePrincipal("maid-pooja-sharma"),
    name: "Pooja Sharma",
    phone: "+91 92345 67890",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(3),
    averageRating: 4.9,
    completedJobsCount: BigInt(60),
    skills: ["Babysitting", "Child Care", "Homework Help"],
    maidCategory: "babysitter",
  },
  {
    id: makePrincipal("maid-meena-kumari"),
    name: "Meena Kumari",
    phone: "+91 93456 78901",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(180),
    skills: ["Full-time Maid", "House Cleaning", "Cooking", "Laundry"],
    maidCategory: "maidServices",
  },
  {
    id: makePrincipal("maid-rekha-thakur"),
    name: "Rekha Thakur",
    phone: "+91 94567 89012",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(4),
    averageRating: 4.6,
    completedJobsCount: BigInt(85),
    skills: ["Childcare", "House Cleaning", "Infant Care"],
    maidCategory: "childcare",
  },
];

function MaidCard({ maid, index }: { maid: UserProfile; index: number }) {
  const categoryKey = maid.maidCategory ?? "maidServices";
  const meta = WORK_TYPE_META[categoryKey];
  const emoji = CATEGORY_EMOJI[categoryKey] ?? "🏠";
  const CategoryIcon = getCategoryIcon(categoryKey);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [rateOpen, setRateOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        data-ocid={`maids.item.${index}`}
        className="group bg-card border border-border rounded-2xl shadow-sm hover:scale-[1.03] hover:shadow-pink-lg hover:border-primary/40 transition-all duration-300 ease-out overflow-hidden"
      >
        {/* Top accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/20" />
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Avatar with photo upload */}
            <MaidPhotoUpload
              photoUrl={photoUrl}
              onPhotoChange={setPhotoUrl}
              name={maid.name}
              size={52}
            />

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-foreground truncate text-base">
                    {maid.name}
                  </h3>
                  {meta && (
                    <Badge
                      variant="outline"
                      className="text-xs mt-1 bg-primary/10 text-primary border-0 font-semibold px-2 flex items-center gap-1 w-fit"
                    >
                      <CategoryIcon className="h-3 w-3" />
                      {emoji} {meta.label}
                    </Badge>
                  )}
                </div>
                {maid.averageRating != null && (
                  <button
                    type="button"
                    data-ocid={`maids.rate_button.${index}`}
                    onClick={() => setRateOpen(true)}
                    className="flex items-center gap-1 shrink-0 text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                    title="Rate this maid"
                  >
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {maid.averageRating.toFixed(1)}
                  </button>
                )}
              </div>

              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {maid.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    {maid.location}
                  </span>
                )}
                {maid.yearsExperience != null && (
                  <span className="font-medium">
                    {Number(maid.yearsExperience)}+ yrs exp
                  </span>
                )}
                {maid.completedJobsCount != null && (
                  <span className="font-medium">
                    {Number(maid.completedJobsCount)} jobs done
                  </span>
                )}
              </div>

              {/* Phone number — prominently visible */}
              {maid.phone && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 rounded-lg px-2.5 py-1.5 border border-primary/15">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{maid.phone}</span>
                </div>
              )}

              {maid.skills && maid.skills.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {maid.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/15"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-2">
            {maid.phone && (
              <a
                href={`tel:${maid.phone.replace(/\s+/g, "")}`}
                className="flex-1"
                data-ocid={`maids.call_button.${index}`}
              >
                <Button
                  size="sm"
                  className="w-full h-9 text-xs font-bold bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 flex items-center gap-1.5 rounded-xl"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Now
                </Button>
              </a>
            )}
            <button
              type="button"
              data-ocid={`maids.rate_open_button.${index}`}
              onClick={() => setRateOpen(true)}
              className="h-9 text-xs font-semibold rounded-xl border border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 transition-all duration-200 px-3 flex items-center gap-1"
            >
              <Star className="h-3.5 w-3.5" />
              Rate
            </button>
            <Link
              to="/workers/$workerId"
              params={{ workerId: maid.id.toText() }}
            >
              <Button
                data-ocid={`maids.hire_button.${index}`}
                size="sm"
                variant="outline"
                className="h-9 text-xs font-semibold rounded-xl border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 transition-all duration-200 px-3"
              >
                Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Rate modal */}
      <RateWorkerModal
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        workerPrincipal={maid.id.toText()}
        workerName={maid.name}
      />
    </motion.div>
  );
}

export default function MaidsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return HARDCODED_MAIDS.filter((m) => {
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.location.toLowerCase().includes(search.toLowerCase()) ||
        (m.skills ?? []).some((s) =>
          s.toLowerCase().includes(search.toLowerCase()),
        );
      const matchesCategory =
        activeCategory === "all" || m.maidCategory === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="border-b-2 border-primary/12"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.88 0.07 350) 0%, oklch(0.95 0.04 350) 50%, oklch(0.985 0.01 350) 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-pink flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <Badge className="bg-foreground/8 text-foreground border-0 text-xs font-semibold mb-1 px-2.5 py-0.5">
                Domestic Services
              </Badge>
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-foreground leading-tight">
                Maids &amp; Babysitters
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filtered.length} trusted helper
                {filtered.length !== 1 ? "s" : ""} — verified &amp; reliable
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-4 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
            <Input
              data-ocid="maids.search_input"
              placeholder="Search by name, location, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-primary/20 focus:border-primary/50 rounded-xl h-11 shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="bg-card border-b-2 border-primary/8 py-3 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.key}
                data-ocid={`maids.category.${cat.key}`}
                onClick={() => setActiveCategory(cat.key)}
                type="button"
                className={`flex items-center gap-1.5 shrink-0 text-xs font-semibold px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-primary-foreground border-primary shadow-pink"
                    : "bg-card border-border text-foreground/65 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                }`}
              >
                {cat.key !== "all" && (
                  <span>{CATEGORY_EMOJI[cat.key] ?? ""}</span>
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service tiles */}
      <section className="bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {MAID_WORK_TYPES.map((key, i) => {
              const meta = WORK_TYPE_META[key];
              if (!meta) return null;
              const isActive = activeCategory === key;
              return (
                <motion.button
                  key={key}
                  data-ocid={`maids.service_tile.${key}`}
                  onClick={() => setActiveCategory(key)}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center group ${
                    isActive
                      ? "border-primary bg-primary/8 shadow-pink"
                      : "border-border bg-card hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"
                  }`}
                >
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "bg-primary/20 text-primary" : "bg-muted"
                    }`}
                  >
                    {CATEGORY_EMOJI[key] ?? "🏠"}
                  </div>
                  <span
                    className={`text-xs font-semibold leading-tight ${isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {meta.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Results header */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground font-medium">
              {filtered.length} maid{filtered.length !== 1 ? "s" : ""} available
            </p>
            {(search || activeCategory !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div data-ocid="maids.empty_state" className="text-center py-20">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 text-4xl border-2 border-primary/15">
                🏠
              </div>
              <p className="font-display font-bold text-foreground text-lg">
                No maids found
              </p>
              <p className="text-sm text-muted-foreground mt-2 mb-5">
                Try a different search or category
              </p>
              {(search || activeCategory !== "all") && (
                <Button
                  className="btn-outline-pink"
                  size="sm"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((maid, i) => (
                <MaidCard key={maid.id.toText()} maid={maid} index={i + 1} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="banner-gradient py-12 mt-4">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-xl font-display font-bold text-white mb-2">
              Are you a maid looking for work?
            </h2>
            <p className="text-sm text-white/60 mb-6">
              Register on Ghar Ka Kaam and connect with homeowners near you.
            </p>
            <Link to="/signup">
              <Button
                data-ocid="maids.register_cta.primary_button"
                className="btn-primary shadow-pink"
              >
                Register as Maid
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
