import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Box,
  Clock,
  Hammer,
  Layers,
  Package,
  Paintbrush,
  Recycle,
  ShoppingBag,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const UPCOMING_ITEMS = [
  {
    icon: Paintbrush,
    label: "Paints & Coatings",
    desc: "Leftover wall paints, primers, waterproofing solutions at discounted prices.",
    colorClass: "bg-primary/10 text-primary",
    items: "50+ products",
  },
  {
    icon: Layers,
    label: "Cement & Concrete",
    desc: "Surplus cement bags, ready-mix concrete, and construction aggregates.",
    colorClass: "bg-secondary/10 text-secondary",
    items: "30+ products",
  },
  {
    icon: Box,
    label: "Tiles & Flooring",
    desc: "Extra tiles, marble offcuts, vitrified and ceramic flooring materials.",
    colorClass: "bg-primary/10 text-primary",
    items: "80+ products",
  },
  {
    icon: Wrench,
    label: "Tools & Equipment",
    desc: "Used and refurbished tools — drills, saws, levels, and safety gear.",
    colorClass: "bg-secondary/10 text-secondary",
    items: "60+ products",
  },
  {
    icon: Hammer,
    label: "Hardware & Fittings",
    desc: "Screws, bolts, anchors, pipes, faucets, and plumbing fittings.",
    colorClass: "bg-primary/10 text-primary",
    items: "200+ products",
  },
  {
    icon: Package,
    label: "Boards & Panels",
    desc: "Plywood offcuts, gypsum boards, MDF sheets, and insulation panels.",
    colorClass: "bg-secondary/10 text-secondary",
    items: "40+ products",
  },
];

const FEATURES = [
  {
    icon: Recycle,
    title: "Reduce Waste",
    desc: "Turn leftover materials into cash instead of letting them go to waste.",
  },
  {
    icon: Truck,
    title: "Local Pickup",
    desc: "Buy from sellers near you and save on delivery costs.",
  },
  {
    icon: ShoppingBag,
    title: "Verified Listings",
    desc: "Every listing is reviewed to ensure quality and accurate descriptions.",
  },
  {
    icon: Clock,
    title: "Launch Soon",
    desc: "We're putting the finishing touches to launch the marketplace this year.",
  },
];

export default function MarketplacePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("You're on the list! We'll notify you when we launch.");
    setEmail("");
  }

  return (
    <div className="bg-background">
      {/* ── Hero ── */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      >
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="absolute top-10 left-1/4 h-48 w-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 h-40 w-40 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <Badge className="construction-gradient text-primary-foreground border-0 text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                <Sparkles className="h-3 w-3 mr-1.5" />
                Coming Soon
              </Badge>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-card leading-tight mb-5">
              Material Resale
              <span className="block text-primary">Marketplace</span>
            </h1>
            <p className="text-card/75 text-lg max-w-xl mx-auto leading-relaxed">
              A dedicated space to buy and sell leftover construction materials.
              Less waste, more savings — for workers and homeowners alike.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── What's Coming ── */}
      <section className="bg-card border-b border-border py-14">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <Badge
              variant="outline"
              className="border-primary text-primary mb-3"
            >
              What's Coming
            </Badge>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Browse Surplus Materials at Great Prices
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              From leftover paint to unused cement bags — find everything you
              need for your project at a fraction of retail cost.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UPCOMING_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`marketplace.category.item.${i + 1}`}
                >
                  <Card className="h-full card-elevated border-border/50 hover:border-primary/40 group cursor-default">
                    <CardContent className="pt-6 pb-5 flex gap-4">
                      <div
                        className={`flex-shrink-0 h-12 w-12 rounded-xl ${item.colorClass} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-display font-bold text-foreground text-sm">
                            {item.label}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="text-xs px-1.5 py-0"
                          >
                            {item.items}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Platform Features ── */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl font-bold text-foreground">
              Why the Marketplace Matters
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <div className="h-14 w-14 rounded-2xl construction-gradient flex items-center justify-center shadow-md">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Notify CTA ── */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="inline-flex h-16 w-16 rounded-2xl construction-gradient items-center justify-center shadow-lg mb-5">
              <Bell className="h-7 w-7 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Be the First to Know
            </h2>
            <p className="text-muted-foreground mb-7 leading-relaxed">
              The marketplace is launching soon. Enter your email and we'll send
              you an exclusive early-access invite the moment it goes live.
            </p>
            <form onSubmit={handleNotify} className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="notify-email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="notify-email"
                    type="email"
                    data-ocid="marketplace.notify.input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-input h-11"
                  />
                </div>
                <Button
                  type="submit"
                  data-ocid="marketplace.notify.submit_button"
                  className="btn-primary h-11 px-6 whitespace-nowrap"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <>
                      <Bell className="h-4 w-4 mr-1.5" />
                      Notify Me
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam. Only a single launch email. Unsubscribe anytime.
              </p>
            </form>

            {/* Preview mockup card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 bg-card border border-border rounded-2xl p-6 shadow-lg text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Paintbrush className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-foreground text-sm">
                      Asian Paints — Tractor Emulsion 20L
                    </p>
                    <Badge className="construction-gradient text-primary-foreground border-0 text-xs">
                      40% off
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Delhi NCR • Qty: 3 cans available
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-extrabold text-foreground font-display">
                    ₹1,200
                  </p>
                  <p className="text-xs text-muted-foreground line-through">
                    ₹2,000 retail
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10"
                  disabled
                >
                  View Listing
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic text-center">
                Preview — full listings available at launch
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
