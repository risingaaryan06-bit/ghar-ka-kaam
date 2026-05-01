import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  HardHat,
  Heart,
  Home,
  Lightbulb,
  MapPin,
  Rocket,
  Shield,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { value: "10,000+", label: "Jobs Completed", icon: CheckCircle2 },
  { value: "5,000+", label: "Skilled Workers", icon: HardHat },
  { value: "50+", label: "Cities Covered", icon: MapPin },
  { value: "4.8★", label: "Average Rating", icon: Star },
];

const VALUES = [
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "Every worker is verified with background checks. Your home, your safety — our priority.",
  },
  {
    icon: Lightbulb,
    title: "Transparency",
    desc: "Clear pricing, no hidden fees. Browse and compare worker profiles side-by-side with full confidence.",
  },
  {
    icon: Heart,
    title: "Community First",
    desc: "We uplift local laborers by connecting them directly to homeowners — no middlemen.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    desc: "Workers grow their careers; homeowners get quality work. Win-win every time.",
  },
];

const HOMEOWNER_BENEFITS = [
  "Post jobs for free and hire workers directly",
  "Compare worker ratings, reviews & pricing",
  "Milestone-based secure payment system",
  "Real-time messaging with workers",
  "Quality guarantee on every project",
  "Hire from a pool of 5,000+ verified workers",
];

const WORKER_BENEFITS = [
  "Build a verified digital profile & portfolio",
  "Get hired for jobs matching your skills",
  "Get paid securely for every milestone",
  "Grow your business with reviews & ratings",
  "Access a steady stream of local projects",
  "Zero subscription fees to get started",
];

const TEAM = [
  {
    name: "Aaryan Kathuga",
    role: "Contact Person",
    contact: "8894186675",
    emoji: "📞",
    desc: "Your primary point of contact for all queries, support, and assistance.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section
        data-ocid="about.hero.section"
        className="relative min-h-[55vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0 bg-foreground/75" />
        <div className="relative container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="construction-gradient text-primary-foreground border-0 mb-4 text-xs font-semibold uppercase tracking-wider px-3 py-1">
              Our Story
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-card leading-tight mb-4">
              Connecting Homes
              <br />
              <span className="text-primary">with Skilled Hands</span>
            </h1>
            <p className="text-card/80 text-lg leading-relaxed max-w-xl">
              Ghar Ka Kaam was born from a simple idea — every homeowner
              deserves skilled, trustworthy labor, and every worker deserves
              fair pay and steady work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div className="h-12 w-12 rounded-xl construction-gradient flex items-center justify-center shadow-md">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <p className="font-display text-3xl font-extrabold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="border-primary text-primary mb-4"
              >
                How It Started
              </Badge>
              <h2 className="font-display text-3xl font-bold text-foreground mb-5 leading-tight">
                Built by Indians,
                <br />
                for Indian Homes
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Millions of Indian homeowners struggle to find reliable
                  laborers for repairs, renovations, and construction — while
                  millions of skilled workers struggle to find consistent,
                  well-paying work. Ghar Ka Kaam bridges this gap.
                </p>
                <p>
                  Founded in 2024, we set out to digitize India's labor market
                  and create a transparent, fair platform where quality work
                  meets fair pay. From a simple paint job to a full home
                  renovation, we handle it all.
                </p>
                <p>
                  Today, we operate across 50+ cities, connecting over 5,000
                  verified workers with homeowners who need them — all through a
                  simple, mobile-first platform.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80"
                alt="Skilled workers at construction site"
                className="rounded-2xl shadow-xl w-full object-cover h-80"
              />
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full construction-gradient flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      India's #1
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Labor Connect Platform
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge
              variant="outline"
              className="border-primary text-primary mb-3"
            >
              What We Stand For
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full card-elevated border-border/50 hover:border-primary/40 group">
                    <CardContent className="pt-6 space-y-3">
                      <div className="h-12 w-12 rounded-xl construction-gradient flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h3 className="font-display font-bold text-foreground">
                        {val.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {val.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground">
              Built for Everyone on the Job Site
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Homeowners */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-border shadow-md overflow-hidden">
                <div className="construction-gradient px-6 py-5 flex items-center gap-3">
                  <Home className="h-6 w-6 text-primary-foreground" />
                  <h3 className="font-display text-lg font-bold text-primary-foreground">
                    For Homeowners
                  </h3>
                </div>
                <CardContent className="pt-5 space-y-3">
                  {HOMEOWNER_BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Workers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-border shadow-md overflow-hidden">
                <div className="bg-secondary px-6 py-5 flex items-center gap-3">
                  <Wrench className="h-6 w-6 text-secondary-foreground" />
                  <h3 className="font-display text-lg font-bold text-secondary-foreground">
                    For Workers
                  </h3>
                </div>
                <CardContent className="pt-5 space-y-3">
                  {WORKER_BENEFITS.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge
              variant="outline"
              className="border-primary text-primary mb-3"
            >
              The Team
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Meet the People Behind Ghar Ka Kaam
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-1 gap-6 max-w-xs mx-auto">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center card-elevated border-border/50 hover:border-primary/40">
                  <CardContent className="pt-6 pb-5 space-y-3">
                    <div className="mx-auto h-16 w-16 rounded-full construction-gradient flex items-center justify-center text-3xl shadow-md">
                      {member.emoji}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {member.desc}
                    </p>
                    <a
                      href={`tel:${member.contact}`}
                      className="inline-block text-sm font-bold text-secondary hover:text-secondary/80 transition-colors"
                    >
                      +91 {member.contact}
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-card mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-card/80 max-w-md mx-auto mb-8">
              Join thousands of homeowners and workers already using Ghar Ka
              Kaam to get work done right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/post-job">
                <Button
                  data-ocid="about.cta_post_job.primary_button"
                  size="lg"
                  className="btn-primary text-base w-full sm:w-auto"
                >
                  Post a Job Free
                </Button>
              </Link>
              <Link to="/workers">
                <Button
                  data-ocid="about.cta_find_workers.secondary_button"
                  size="lg"
                  variant="outline"
                  className="border-card/50 text-card hover:bg-card/10 w-full sm:w-auto"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Browse Workers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
