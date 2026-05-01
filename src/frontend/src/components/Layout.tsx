import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Briefcase,
  HardHat,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Phone,
  PlusCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { type ReactNode, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Find Workers", href: "/workers", icon: Users },
  { label: "Find Maids", href: "/maids", icon: Sparkles },
  { label: "Browse Jobs", href: "/jobs", icon: Briefcase },
] as const;

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { location } = useRouterState();
  const isActive =
    location.pathname === href ||
    (href !== "/" && location.pathname.startsWith(href));

  return (
    <Link
      to={href}
      onClick={onClick}
      data-ocid={`nav.${href.replace("/", "") || "home"}.link`}
      className={cn(
        "relative flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-md",
        isActive
          ? "text-primary font-semibold"
          : "text-foreground/65 hover:text-foreground hover:bg-muted/60",
        className,
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, login, clear, isInitializing } =
    useInternetIdentity();
  const [mobileOpen, setMobileOpen] = useState(false);
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-card border-b-2 border-primary/15 shadow-subtle">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.logo.link"
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="h-9 w-9 rounded-xl construction-gradient flex items-center justify-center shadow-pink">
              <HardHat className="h-4.5 w-4.5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-extrabold text-lg text-foreground group-hover:text-primary transition-colors">
                Ghar Ka Kaam
              </span>
              <span className="block text-[10px] text-muted-foreground leading-none -mt-0.5 font-medium tracking-wide">
                घर का काम
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.href} href={item.href}>
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Auth + actions (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/post-job">
                  <Button
                    data-ocid="nav.post_job.primary_button"
                    size="sm"
                    className="btn-primary text-xs gap-1.5 h-8"
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Post Job
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    data-ocid="nav.dashboard.secondary_button"
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs h-8 border-border hover:border-primary/40 hover:bg-primary/5"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  data-ocid="nav.logout.button"
                  size="sm"
                  variant="ghost"
                  onClick={clear}
                  className="text-muted-foreground text-xs h-8 hover:text-foreground"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <Button
                data-ocid="nav.login.primary_button"
                size="sm"
                className="btn-primary gap-1.5 h-9"
                onClick={login}
                disabled={isInitializing}
              >
                <LogIn className="h-3.5 w-3.5" />
                Login / Sign Up
              </Button>
            )}
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                data-ocid="nav.mobile_menu.button"
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-card p-0 border-l-2 border-primary/15"
            >
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center gap-2.5 p-4 border-b-2 border-primary/15">
                  <div className="h-9 w-9 rounded-xl construction-gradient flex items-center justify-center shadow-pink">
                    <HardHat className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-foreground text-base">
                      Ghar Ka Kaam
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      घर का काम
                    </p>
                  </div>
                </div>

                {/* Mobile nav */}
                <nav className="flex flex-col p-3 gap-1 flex-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </NavLink>
                    );
                  })}
                  <Separator className="my-2 bg-primary/10" />
                  {isAuthenticated && (
                    <>
                      <NavLink
                        href="/post-job"
                        onClick={() => setMobileOpen(false)}
                      >
                        <PlusCircle className="h-4 w-4" />
                        Post a Job
                      </NavLink>
                      <NavLink
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        My Dashboard
                      </NavLink>
                    </>
                  )}
                </nav>

                {/* Mobile auth */}
                <div className="p-4 border-t-2 border-primary/10">
                  {isAuthenticated ? (
                    <Button
                      data-ocid="nav.mobile_logout.button"
                      variant="outline"
                      className="w-full border-border hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => {
                        clear();
                        setMobileOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  ) : (
                    <Button
                      data-ocid="nav.mobile_login.primary_button"
                      className="w-full btn-primary"
                      onClick={() => {
                        login();
                        setMobileOpen(false);
                      }}
                      disabled={isInitializing}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login / Sign Up
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="banner-gradient text-secondary-foreground">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl construction-gradient flex items-center justify-center shadow-pink">
                  <HardHat className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-white text-base leading-tight">
                    Ghar Ka Kaam
                  </p>
                  <p className="text-[11px] text-white/50">घर का काम</p>
                </div>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">
                Connecting homeowners with skilled laborers and trusted maids
                across India.
              </p>
              <div className="flex gap-2">
                {["🏗️", "🏠", "⭐"].map((emoji) => (
                  <div
                    key={emoji}
                    className="h-8 w-8 rounded-lg bg-white/8 flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-bold text-primary text-xs mb-4 uppercase tracking-widest">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Browse Jobs", href: "/jobs" },
                  { label: "Find Workers", href: "/workers" },
                  { label: "Find Maids", href: "/maids" },
                  { label: "Post a Job", href: "/post-job" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/55 hover:text-primary transition-colors flex items-center gap-1.5 group"
                    >
                      <span className="h-0.5 w-3 bg-primary/40 rounded group-hover:w-5 transition-all duration-200" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="font-display font-bold text-primary text-xs mb-4 uppercase tracking-widest">
                Contact Us
              </h4>
              <div className="grid sm:grid-cols-1 gap-4">
                {[
                  {
                    label: "Contact Person",
                    name: "Aaryan Kathuga",
                    phone: "8894186675",
                    emoji: "📞",
                  },
                ].map((c) => (
                  <div
                    key={c.phone}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center text-sm">
                      {c.emoji}
                    </div>
                    <div>
                      <p className="text-[11px] text-white/40 uppercase tracking-wide mb-0.5">
                        {c.label}
                      </p>
                      <p className="text-sm text-white font-medium leading-tight">
                        {c.name}
                      </p>
                      <a
                        href={`tel:${c.phone}`}
                        className="text-sm text-primary hover:text-primary/80 font-bold transition-colors flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="h-3 w-3" />
                        +91 {c.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/10" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>
              © {year}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-white/30">
              Serving skilled workers across India 🇮🇳
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
