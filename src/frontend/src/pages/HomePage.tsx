import { MapSection } from "@/components/MapSection";
import { WorkerCard } from "@/components/WorkerCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useListMaids,
  useListWorkers,
  usePlatformStats,
} from "@/hooks/useQueries";
import { MAID_WORK_TYPES, WORK_TYPE_META } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  HardHat,
  Search,
  Shield,
  Star,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Data ──────────────────────────────────────────────────────────────────────
const CONSTRUCTION_CATS = [
  { type: "masonry", label: "Masonry", icon: "🧱" },
  { type: "carpentry", label: "Carpentry", icon: "🪚" },
  { type: "plumbing", label: "Plumbing", icon: "🔧" },
  { type: "electrical", label: "Electrical", icon: "⚡" },
  { type: "painting", label: "Painting", icon: "🖌️" },
  { type: "general", label: "General Labor", icon: "🔨" },
] as const;

const MAID_CATS = [
  { type: "cook", label: "Cook", icon: "👩‍🍳" },
  { type: "houseCleaner", label: "House Cleaner", icon: "🧹" },
  { type: "laundry", label: "Laundry", icon: "👕" },
  { type: "childcare", label: "Childcare", icon: "👶" },
  { type: "babysitter", label: "Babysitter", icon: "🍼" },
  { type: "maidServices", label: "Maid Services", icon: "🏠" },
] as const;

const STEPS = [
  {
    step: 1,
    title: "Post Your Job",
    desc: "Describe the work, set your budget and location. Always free to post!",
    icon: ClipboardList,
    emoji: "📋",
  },
  {
    step: 2,
    title: "Browse Profiles",
    desc: "View verified worker and maid profiles, sorted by experience and area.",
    icon: Search,
    emoji: "🔍",
  },
  {
    step: 3,
    title: "Hire Directly",
    desc: "Pick the right person, message them, and pay securely via milestones.",
    icon: CreditCard,
    emoji: "✅",
  },
] as const;

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "PS",
    rating: 5,
    text: "Found an excellent mason in just 2 hours! Great profiles, easy to compare, and transparent pricing.",
    job: "Kitchen Wall Repair",
  },
  {
    name: "Rohit Verma",
    location: "Mumbai",
    avatar: "RV",
    rating: 5,
    text: "Hired a cook from Ghar Ka Kaam — she's been with us for 3 months. The platform made it super simple.",
    job: "Home Cook — Full Time",
  },
  {
    name: "Sunita Gupta",
    location: "Bangalore",
    avatar: "SG",
    rating: 5,
    text: "The cleaner we hired through this app is thorough and reliable. Ratings gave us real confidence.",
    job: "Weekly Cleaning Service",
  },
];

const TRUST = [
  {
    icon: Shield,
    title: "Verified Profiles",
    desc: "Identity-verified workers and maids before they join",
    emoji: "🛡️",
  },
  {
    icon: Star,
    title: "Rated & Reviewed",
    desc: "Read real reviews from homeowners like you",
    emoji: "⭐",
  },
  {
    icon: CreditCard,
    title: "Safe Payments",
    desc: "Secure milestone-based payments via Stripe",
    emoji: "💳",
  },
];

// Two work-in-action images
const ACTION_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
    alt: "Construction workers on a job site",
    caption: "Skilled Construction Workers",
    sub: "Masons, carpenters, electricians & more — ready for any project",
    badge: "🏗️ Construction",
  },
  {
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80&auto=format&fit=crop",
    alt: "Caregiver with infant",
    caption: "Trusted Babysitters & Caregivers",
    sub: "Experienced caregivers for your little ones — warm, gentle & reliable",
    badge: "🍼 Childcare",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatBadge({
  value,
  label,
  icon: Icon,
  loading,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  loading: boolean;
}) {
  return (
    <div className="text-center py-2">
      <div className="h-10 w-10 rounded-xl bg-primary/12 flex items-center justify-center mx-auto mb-2 border border-primary/20">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      {loading ? (
        <Skeleton className="h-8 w-20 mx-auto mb-1.5" />
      ) : (
        <p className="text-2xl md:text-3xl font-display font-extrabold text-foreground leading-none">
          {value}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-1 font-medium">{label}</p>
    </div>
  );
}

function CategoryPill({
  icon,
  label,
  index,
  to,
}: {
  icon: string;
  label: string;
  index: number;
  to: "/jobs" | "/maids";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={to}>
        <div className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-pink">
          <div className="h-11 w-11 rounded-xl bg-primary/8 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200 border border-primary/15">
            {icon}
          </div>
          <span className="text-xs font-semibold text-foreground text-center leading-tight">
            {label}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: workers, isLoading: workersLoading } = useListWorkers();
  const { data: maids, isLoading: maidsLoading } = useListMaids();

  const allProfiles = [
    ...(workers ?? []).filter(
      (w) =>
        !MAID_WORK_TYPES.some((m) => (w.skills ?? []).includes(m as string)),
    ),
    ...(maids ?? []),
  ];
  const featured = [...allProfiles]
    .filter((p) => (p.averageRating ?? 0) > 0)
    .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
    .slice(0, 4);

  const isLoadingFeatured = workersLoading || maidsLoading;

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section
        data-ocid="hero.section"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.85 0.08 350) 0%, oklch(0.93 0.05 350) 40%, oklch(0.97 0.02 350) 100%)",
          minHeight: "600px",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.12 350) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-16 h-64 w-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.14 340) 0%, transparent 70%)",
          }}
        />
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 pink-dot-pattern opacity-40" />

        <div className="relative z-10 container mx-auto px-4 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="space-y-6 max-w-xl"
            >
              <Badge className="bg-secondary text-secondary-foreground border-0 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm">
                <HardHat className="h-3.5 w-3.5 mr-1.5" />
                Ghar Ka Kaam — घर का काम
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-5xl font-display font-extrabold text-foreground leading-[1.1] tracking-tight">
                Your Home,{" "}
                <span className="text-gradient-pink">Perfectly Managed.</span>
              </h1>

              <p className="text-base md:text-lg text-foreground/65 leading-relaxed max-w-xl">
                Hire verified construction workers, skilled maids, cooks,
                cleaners and more — all in one place.
              </p>
              <p className="text-sm text-foreground/40 font-medium">
                कुशल कारीगरों और सेवाओं से सीधे जुड़ें — सरल, सुरक्षित और किफायती।
              </p>

              {/* 3 CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link to="/workers">
                  <Button
                    data-ocid="hero.find_workers.primary_button"
                    size="lg"
                    className="btn-primary font-bold shadow-pink h-11 px-6"
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Find Workers
                  </Button>
                </Link>
                <Link to="/maids">
                  <Button
                    data-ocid="hero.find_maids.primary_button"
                    size="lg"
                    className="btn-outline-pink font-bold h-11 px-6"
                  >
                    <span className="mr-2 text-base">🏠</span>
                    Find Maids
                  </Button>
                </Link>
                <Link to="/post-job">
                  <Button
                    data-ocid="hero.post_job.secondary_button"
                    size="lg"
                    className="btn-secondary font-semibold h-11 px-6"
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Post a Job
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                {[
                  "Free to post jobs",
                  "Verified professionals",
                  "Secure payments",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 text-foreground/55 text-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero visual — photo card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-pink-lg border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop"
                  alt="Indian construction workers on a job site"
                  className="w-full h-80 object-cover"
                />
                {/* Overlay card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-elevated">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full construction-gradient flex items-center justify-center text-white font-bold flex-shrink-0">
                      RS
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-foreground text-sm">
                        Rajesh Singh — Plumber
                      </p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="h-3 w-3 fill-primary text-primary"
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          4.9 · 87 jobs
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-primary/12 text-primary border-0 text-xs ml-auto flex-shrink-0">
                      Available
                    </Badge>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-xl p-3 shadow-elevated animate-float">
                <p className="text-xs font-bold">500+ Workers</p>
                <p className="text-[10px] text-secondary-foreground/70">
                  Pan India
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-card"
          style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
        />
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-card border-b-2 border-primary/10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 md:gap-20 max-w-2xl mx-auto">
            <StatBadge
              value={
                stats
                  ? `${Number(stats.totalJobs).toLocaleString("en-IN")}+`
                  : "200+"
              }
              label="Jobs Posted"
              icon={ClipboardList}
              loading={statsLoading}
            />
            <StatBadge
              value={
                stats
                  ? `${Number(stats.totalWorkers).toLocaleString("en-IN")}+`
                  : "500+"
              }
              label="Professionals"
              icon={Users}
              loading={statsLoading}
            />
            <StatBadge
              value={
                stats
                  ? `${Number(stats.totalCompletedJobs).toLocaleString("en-IN")}+`
                  : "150+"
              }
              label="Completed"
              icon={CheckCircle2}
              loading={statsLoading}
            />
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section data-ocid="categories.section" className="pink-section py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold">
              All Services
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2">
              What Do You Need?
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse workers and home service professionals by category
            </p>
          </motion.div>

          {/* Construction */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-xl construction-gradient flex items-center justify-center shadow-sm">
                <HardHat className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-display font-bold text-foreground text-base">
                Construction & Repairs
              </h3>
              <Link to="/workers">
                <span className="text-xs text-primary ml-2 hover:underline cursor-pointer font-semibold">
                  View all →
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {CONSTRUCTION_CATS.map((cat, i) => (
                <CategoryPill
                  key={cat.type}
                  icon={cat.icon}
                  label={cat.label}
                  index={i}
                  to="/jobs"
                />
              ))}
            </div>
          </div>

          {/* Maid Services */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-base">🏠</span>
              </div>
              <h3 className="font-display font-bold text-foreground text-base">
                Maids & Home Services
              </h3>
              <Link to="/maids">
                <span className="text-xs text-primary ml-2 hover:underline cursor-pointer font-semibold">
                  View all →
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {MAID_CATS.map((cat, i) => (
                <CategoryPill
                  key={cat.type}
                  icon={cat.icon}
                  label={cat.label}
                  index={i}
                  to="/maids"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work In Action Images ── */}
      <section data-ocid="work_action.section" className="bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <Badge className="bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold">
              Our Work
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2">
              Our Work In Action
            </h2>
            <p className="text-sm text-muted-foreground">
              Real professionals, real results — across construction & home care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ACTION_IMAGES.map((img, i) => (
              <motion.div
                key={img.caption}
                initial={{ opacity: 0, y: i === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                data-ocid={`work_action.image.${i + 1}`}
                className="group relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-pink hover:shadow-pink-lg transition-all duration-300 hover:border-primary/40 hover:scale-[1.02]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
                {/* Badge top-left */}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {img.badge}
                  </span>
                </div>
                {/* Caption bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display font-bold text-white text-lg leading-tight mb-1">
                    {img.caption}
                  </h3>
                  <p className="text-white/75 text-xs leading-relaxed">
                    {img.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Workers Map ── */}
      <MapSection />

      {/* ── How It Works ── */}
      <section data-ocid="how-it-works.section" className="bg-card py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="bg-secondary/8 text-secondary border-0 mb-3 px-3 py-1 text-xs font-semibold">
              Simple Process
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-sm text-muted-foreground">
              Hire anyone in 3 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center p-7 rounded-2xl border-2 border-primary/12 bg-background hover:border-primary/30 hover:shadow-pink transition-all duration-200"
              >
                <div className="h-14 w-14 rounded-2xl construction-gradient flex items-center justify-center shadow-pink mb-5 text-2xl">
                  {s.emoji}
                </div>
                <div className="absolute top-4 right-4 h-7 w-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                  {s.step}
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-3">
            <Link to="/post-job">
              <Button
                data-ocid="how-it-works.post_job.primary_button"
                className="btn-primary h-11 px-6"
              >
                Post a Job Free
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
            <Link to="/workers">
              <Button
                data-ocid="how-it-works.browse.secondary_button"
                variant="outline"
                className="h-11 px-6 border-border hover:border-primary/40 hover:bg-primary/5"
              >
                Browse Professionals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Professionals ── */}
      <section data-ocid="featured.section" className="pink-section py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3"
          >
            <div>
              <Badge className="bg-primary/10 text-primary border-0 mb-2 px-3 py-1 text-xs font-semibold">
                Top Rated
              </Badge>
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-1">
                Meet Our Professionals
              </h2>
              <p className="text-sm text-muted-foreground">
                Highest-rated workers and maids on the platform
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/workers">
                <Button
                  data-ocid="featured.view_workers.link"
                  variant="outline"
                  size="sm"
                  className="border-border hover:border-primary/40 hover:bg-primary/5"
                >
                  <Wrench className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  Workers
                </Button>
              </Link>
              <Link to="/maids">
                <Button
                  data-ocid="featured.view_maids.link"
                  variant="outline"
                  size="sm"
                  className="border-border hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="mr-1.5 text-sm">🏠</span>
                  Maids
                </Button>
              </Link>
            </div>
          </motion.div>

          {isLoadingFeatured ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card-elevated p-4 space-y-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((profile, i) => (
                <motion.div
                  key={profile.id.toText()}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <WorkerCard worker={profile} index={i + 1} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              data-ocid="featured.empty_state"
              className="text-center py-16 card-elevated rounded-2xl border-2 border-dashed border-primary/20"
            >
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl">
                👷
              </div>
              <h3 className="font-display font-bold text-foreground mb-1">
                No professionals yet
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Be the first to join our platform!
              </p>
              <Link to="/login">
                <Button
                  data-ocid="featured.join.primary_button"
                  className="btn-primary"
                >
                  Join as a Professional
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section data-ocid="testimonials.section" className="bg-card py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold">
              Testimonials
            </Badge>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2">
              What Our Users Say
            </h2>
            <p className="text-sm text-muted-foreground">
              Thousands of happy homeowners across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: i === 1 ? -16 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  data-ocid={`testimonials.item.${i + 1}`}
                  className="card-elevated h-full border-t-4 border-t-primary hover:shadow-pink transition-all duration-200"
                >
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }, (_, s) => (
                        <Star
                          key={`${t.name}-${s}`}
                          className="h-4 w-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/75 leading-relaxed flex-1 italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-3 border-t border-border">
                      <div className="h-10 w-10 rounded-full construction-gradient flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm">
                        {t.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-foreground text-sm truncate">
                          {t.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.location} · {t.job}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="pink-section border-y border-primary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {TRUST.map(({ title, desc, emoji }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="h-14 w-14 rounded-2xl bg-card flex items-center justify-center text-2xl shadow-sm border-2 border-primary/15">
                  {emoji}
                </div>
                <h3 className="font-display font-bold text-foreground text-base">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        data-ocid="cta.section"
        className="relative overflow-hidden py-20"
      >
        {/* Dark ink background */}
        <div className="absolute inset-0 banner-gradient" />
        {/* Pink glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-3/4 opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.80 0.12 350) 0%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1 construction-gradient" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold text-sm uppercase tracking-widest">
                Get Started Today
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white leading-tight">
              Find the Right Help <br className="hidden md:block" />
              for Your Home
            </h2>
            <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
              Whether it's a construction job or daily household help, find
              verified, reviewed professionals near you.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/workers">
                <Button
                  data-ocid="cta.find_workers.primary_button"
                  size="lg"
                  className="btn-primary font-bold h-12 px-7 shadow-pink"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Find Workers
                </Button>
              </Link>
              <Link to="/maids">
                <Button
                  data-ocid="cta.find_maids.primary_button"
                  size="lg"
                  className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold h-12 px-7"
                >
                  <span className="mr-2">🏠</span>
                  Find Maids
                </Button>
              </Link>
              <Link to="/post-job">
                <Button
                  data-ocid="cta.post_job.secondary_button"
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 font-semibold border-0 h-12 px-7 shadow-sm"
                >
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Post a Job
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
