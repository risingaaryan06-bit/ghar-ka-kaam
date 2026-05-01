import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Baby,
  Briefcase,
  CheckCircle2,
  ChefHat,
  HardHat,
  Home,
  Shield,
  Smartphone,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";
import { useEffect } from "react";

const STEPS = [
  {
    step: "1",
    title: "Click Sign Up",
    description:
      "Tap the button below to open Internet Identity — no email or password required.",
  },
  {
    step: "2",
    title: "Verify with your device",
    description:
      "Use Face ID, fingerprint, or a PIN to confirm your identity securely.",
  },
  {
    step: "3",
    title: "Set up your profile",
    description:
      "Tell us your name, location, and what role fits you — homeowner, laborer, or maid service provider.",
  },
  {
    step: "4",
    title: "Start hiring or working",
    description:
      "Post jobs, connect with workers and maids, or browse opportunities — all in one place.",
  },
];

const ROLES = [
  {
    icon: Home,
    title: "Homeowners",
    description: "Find verified workers and maids for any home need.",

    points: [
      "Post construction & repair jobs",
      "Hire cooks, cleaners & more",
      "Compare ratings & reviews",
      "Secure milestone payments",
    ],
  },
  {
    icon: Briefcase,
    title: "Skilled Laborers",
    description: "Masons, carpenters, electricians, plumbers & more.",
    color: "bg-orange-100 text-orange-700",
    points: [
      "Browse jobs near you",
      "Showcase your skills",
      "Build your reputation",
      "Get paid directly",
    ],
  },
  {
    icon: Sparkles,
    title: "Maid Service Providers",
    description: "Cooks, cleaners, childcare, laundry & babysitters.",
    color: "bg-rose-100 text-rose-700",
    points: [
      "Set your own hourly/daily rate",
      "Choose your service category",
      "Connect with families nearby",
      "Earn steady income",
    ],
  },
];

const MAID_SERVICES = [
  { icon: ChefHat, label: "Cook", desc: "Prepare daily meals for families" },
  {
    icon: Sparkles,
    label: "House Cleaner",
    desc: "Deep cleaning & regular upkeep",
  },
  {
    icon: Baby,
    label: "Childcare & Babysitter",
    desc: "Nurturing care for children",
  },
  { icon: Zap, label: "Laundry", desc: "Washing, folding & ironing" },
];

export default function SignupPage() {
  const { isAuthenticated, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);

  const isLoading = isLoggingIn || isInitializing;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-foreground/72" />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 mb-5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">
              Free to join — no hidden charges
            </span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight mb-4">
            Join Ghar Ka Kaam
            <br />
            <span className="text-primary">in 60 seconds</span>
          </h1>
          <p className="text-white/80 text-lg mb-3 leading-relaxed">
            India's fastest-growing platform for homeowners, skilled laborers,
            and home service providers.
          </p>
          <p className="text-white/60 text-sm mb-8">
            Hire workers, find maids, or get hired — all in one place.
          </p>
          <Button
            data-ocid="signup.submit_button"
            className="btn-primary text-base px-8 py-4 h-auto text-lg shadow-2xl"
            onClick={login}
            disabled={isLoading}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            {isLoading ? "Opening Internet Identity..." : "Create Free Account"}
            {!isLoading && <ArrowRight className="h-5 w-5 ml-2" />}
          </Button>
          <p className="text-white/60 text-xs mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-foreground text-center mb-10">
            How it works
          </h2>
          <div className="space-y-4">
            {STEPS.map(({ step, title, description }, i) => (
              <div
                key={step}
                data-ocid={`signup.step.${i + 1}`}
                className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <div className="h-9 w-9 rounded-full construction-gradient flex items-center justify-center shrink-0 shadow">
                  <span className="text-primary-foreground font-bold text-sm">
                    {step}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">
                    {title}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    {description}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-2.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-foreground text-center mb-2">
            Choose your path
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-10">
            Three ways to use Ghar Ka Kaam — you can always update your role
            later.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {ROLES.map(({ icon: Icon, title, description, points }, i) => (
              <Card
                key={title}
                data-ocid={`signup.role_card.${i + 1}`}
                className="border-2 border-border hover:border-primary/50 transition-smooth"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl construction-gradient flex items-center justify-center shadow">
                      <Icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-foreground leading-tight">
                        {title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {description}
                  </p>
                  <ul className="space-y-2">
                    {points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maid Services Spotlight */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 justify-center mb-3">
            <div className="h-9 w-9 rounded-xl construction-gradient flex items-center justify-center shadow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              New: Maid Services
            </h2>
          </div>
          <p className="text-muted-foreground text-center text-sm mb-8">
            We've expanded beyond construction — now hire trusted home service
            providers for everyday needs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {MAID_SERVICES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-smooth"
              >
                <div className="h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-rose-600" />
                </div>
                <p className="font-semibold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/maids">
              <Button
                data-ocid="signup.browse_maids.button"
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/5"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Browse Maid Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Internet Identity explainer */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/30 bg-primary/5">
            <CardContent className="p-7">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl construction-gradient flex items-center justify-center shadow shrink-0">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    What is Internet Identity?
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Internet Identity is a secure, privacy-preserving login
                    system. It uses your device's built-in security (Face ID,
                    fingerprint, PIN) to create an identity that's completely
                    private — no company can track you across sites.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { icon: Shield, label: "No password to remember" },
                      { icon: Smartphone, label: "Works on any device" },
                      { icon: Zap, label: "Instant, secure login" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 text-xs text-foreground bg-card rounded-lg p-2.5 border border-border"
                      >
                        <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 construction-gradient">
        <div className="max-w-xl mx-auto text-center">
          <HardHat className="h-10 w-10 text-primary-foreground mx-auto mb-4" />
          <h2 className="font-display font-extrabold text-2xl text-primary-foreground mb-3">
            Ready to get started?
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-6">
            Join thousands of homeowners, laborers, and home service providers
            already on Ghar Ka Kaam.
          </p>
          <Button
            data-ocid="signup.cta.submit_button"
            className="bg-card text-primary hover:bg-card/90 font-bold px-8 py-3 h-auto text-base shadow-xl"
            onClick={login}
            disabled={isLoading}
          >
            <UserPlus className="h-5 w-5 mr-2" />
            {isLoading ? "Opening..." : "Sign Up Free Now"}
          </Button>
        </div>
      </section>
    </div>
  );
}
