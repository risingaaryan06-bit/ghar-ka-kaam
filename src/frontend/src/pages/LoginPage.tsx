import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAID_WORK_TYPES, UserRole, WORK_TYPE_META } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle2,
  HardHat,
  Home,
  LogIn,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SKILLS_OPTIONS = [
  "Painting",
  "Carpentry",
  "Plumbing",
  "Electrical",
  "Masonry",
  "General Labor",
];

type Step = "role" | "profile";
type RoleOption = "homeowner" | "laborer" | "maid";

export default function LoginPage() {
  const { isAuthenticated, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();

  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [setupStep, setSetupStep] = useState<Step>("role");
  const [role, setRole] = useState<RoleOption>("homeowner");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [yearsExp, setYearsExp] = useState("");
  const [maidCategory, setMaidCategory] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !actor) return;
    setCheckingProfile(true);
    actor
      .getCallerUserProfile()
      .then((profile) => {
        if (!profile) {
          setShowProfileSetup(true);
        } else {
          navigate({ to: "/dashboard" });
        }
      })
      .catch(() => {
        navigate({ to: "/dashboard" });
      })
      .finally(() => setCheckingProfile(false));
  }, [isAuthenticated, actor, navigate]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleProfileSave = async () => {
    if (!name.trim() || !phone.trim() || !location.trim()) {
      toast.error("Please fill in your name, phone, and location");
      return;
    }
    if (role === "laborer" && selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }
    if (role === "maid" && !maidCategory) {
      toast.error("Please select your service category");
      return;
    }
    if (!actor) return;

    setIsSaving(true);
    try {
      const backendRole =
        role === "homeowner"
          ? UserRole.homeowner
          : role === "maid"
            ? UserRole.maid
            : UserRole.laborer;

      const profile = await actor.createUserProfile(
        name.trim(),
        phone.trim(),
        location.trim(),
        backendRole,
      );

      if (role === "laborer") {
        await actor.saveCallerUserProfile({
          ...profile,
          skills: selectedSkills,
          yearsExperience: yearsExp ? BigInt(Number(yearsExp)) : undefined,
        });
      } else if (role === "maid") {
        await actor.saveCallerUserProfile({
          ...profile,
          maidCategory: maidCategory || undefined,
          skills: [maidCategory],
          yearsExperience: yearsExp ? BigInt(Number(yearsExp)) : undefined,
        });
      }

      toast.success("Profile created! Welcome to Ghar Ka Kaam 🎉");
      setShowProfileSetup(false);
      navigate({ to: "/dashboard" });
    } catch (_err) {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isLoading = isLoggingIn || isInitializing || checkingProfile;

  const roleLabel =
    role === "homeowner"
      ? "Homeowner"
      : role === "maid"
        ? "Maid Service Provider"
        : "Skilled Laborer";

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 bg-foreground/65" />

      {/* Login Card */}
      <Card
        data-ocid="login.dialog"
        className="relative z-10 w-full max-w-md shadow-2xl border-0"
      >
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="h-16 w-16 rounded-2xl construction-gradient flex items-center justify-center mb-4 shadow-lg">
              <HardHat className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-foreground leading-tight">
              Welcome to Ghar Ka Kaam
            </h1>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Connect with skilled workers and home service providers, or find
              work across India.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Secure, password-free login
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Internet Identity uses your device's biometrics or PIN — no
                  passwords, no email needed.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              data-ocid="login.submit_button"
              className="w-full btn-primary py-3 text-base h-auto"
              onClick={login}
              disabled={isLoading}
            >
              <LogIn className="h-5 w-5 mr-2" />
              {isLoading ? "Connecting..." : "Login with Internet Identity"}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {[
              { icon: Zap, text: "Instant login" },
              { icon: Shield, text: "Private & secure" },
              { icon: Smartphone, text: "Works on mobile" },
              { icon: CheckCircle2, text: "No password" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {text}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center border-t border-border pt-4">
            <p className="text-xs text-muted-foreground mb-2">
              New here?{" "}
              <Link
                to="/signup"
                className="text-primary font-semibold hover:underline"
              >
                Learn how sign up works
              </Link>
            </p>
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Profile Setup Modal */}
      <Dialog open={showProfileSetup} onOpenChange={() => {}}>
        <DialogContent
          data-ocid="profile_setup.dialog"
          className="max-w-md max-h-[90vh] overflow-y-auto"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl construction-gradient flex items-center justify-center shadow">
                <HardHat className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle className="font-display font-bold text-lg">
                  {setupStep === "role"
                    ? "Who are you?"
                    : "Complete Your Profile"}
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  {setupStep === "role"
                    ? "Tell us how you'll use Ghar Ka Kaam"
                    : "Just a few details to get started"}
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 mt-2">
              <div className="h-1.5 w-8 rounded-full bg-primary" />
              <div
                className={`h-1.5 w-8 rounded-full transition-colors ${setupStep === "profile" ? "bg-primary" : "bg-muted"}`}
              />
            </div>
          </DialogHeader>

          {setupStep === "role" && (
            <div className="space-y-4 pt-2">
              <p className="text-sm text-muted-foreground">I want to:</p>
              <div className="grid grid-cols-1 gap-3">
                {/* Homeowner */}
                <button
                  data-ocid="profile_setup.homeowner.toggle"
                  type="button"
                  onClick={() => setRole("homeowner")}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth cursor-pointer text-left ${
                    role === "homeowner"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {role === "homeowner" && (
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                  )}
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${role === "homeowner" ? "construction-gradient" : "bg-muted"}`}
                  >
                    <Home
                      className={`h-6 w-6 ${role === "homeowner" ? "text-primary-foreground" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Post Jobs
                    </p>
                    <p className="text-xs text-muted-foreground">
                      I need construction or home services
                    </p>
                  </div>
                </button>

                {/* Laborer */}
                <button
                  data-ocid="profile_setup.laborer.toggle"
                  type="button"
                  onClick={() => setRole("laborer")}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth cursor-pointer text-left ${
                    role === "laborer"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {role === "laborer" && (
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-primary" />
                  )}
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${role === "laborer" ? "construction-gradient" : "bg-muted"}`}
                  >
                    <Wrench
                      className={`h-6 w-6 ${role === "laborer" ? "text-primary-foreground" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Find Work (Laborer)
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mason, carpenter, electrician, plumber…
                    </p>
                  </div>
                </button>

                {/* Maid */}
                <button
                  data-ocid="profile_setup.maid.toggle"
                  type="button"
                  onClick={() => setRole("maid")}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-smooth cursor-pointer text-left ${
                    role === "maid"
                      ? "border-rose-400 bg-rose-50"
                      : "border-border bg-card hover:border-rose-300"
                  }`}
                >
                  {role === "maid" && (
                    <CheckCircle2 className="absolute top-3 right-3 h-4 w-4 text-rose-500" />
                  )}
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${role === "maid" ? "bg-gradient-to-br from-rose-400 to-pink-500" : "bg-muted"}`}
                  >
                    <Sparkles
                      className={`h-6 w-6 ${role === "maid" ? "text-white" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Maid Service Provider
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Cook, cleaner, childcare, laundry…
                    </p>
                  </div>
                </button>
              </div>

              <Button
                data-ocid="profile_setup.role_next.primary_button"
                className="w-full btn-primary h-11"
                onClick={() => setSetupStep("profile")}
              >
                Continue as {roleLabel} →
              </Button>
            </div>
          )}

          {setupStep === "profile" && (
            <div className="space-y-4 pt-2">
              {/* Role badge */}
              <div
                className={`flex items-center gap-2 py-2 px-3 rounded-lg border ${
                  role === "maid"
                    ? "bg-rose-50 border-rose-200"
                    : "bg-primary/10 border-primary/20"
                }`}
              >
                {role === "homeowner" ? (
                  <Home
                    className={`h-4 w-4 ${role === "homeowner" ? "text-primary" : "text-rose-500"}`}
                  />
                ) : role === "maid" ? (
                  <Sparkles className="h-4 w-4 text-rose-500" />
                ) : (
                  <Briefcase className="h-4 w-4 text-primary" />
                )}
                <span
                  className={`text-xs font-medium ${role === "maid" ? "text-rose-600" : "text-primary"}`}
                >
                  Signing up as {roleLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setSetupStep("role")}
                  className="ml-auto text-xs text-muted-foreground hover:text-primary underline"
                >
                  Change
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="ps-name" className="text-sm font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ps-name"
                    data-ocid="profile_setup.name.input"
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="ps-phone" className="text-sm font-medium">
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ps-phone"
                    data-ocid="profile_setup.phone.input"
                    placeholder="e.g. 9876543210"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="ps-location" className="text-sm font-medium">
                    City / Location <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ps-location"
                    data-ocid="profile_setup.location.input"
                    placeholder="e.g. Delhi, Mumbai, Bangalore"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Laborer fields */}
                {role === "laborer" && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Your Skills <span className="text-destructive">*</span>
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {SKILLS_OPTIONS.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            data-ocid={`profile_setup.skill_${skill.toLowerCase().replace(" ", "_")}.checkbox`}
                            className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-smooth text-left ${
                              selectedSkills.includes(skill)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <Checkbox
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={() => toggleSkill(skill)}
                              className="shrink-0 pointer-events-none"
                            />
                            <span className="text-xs font-medium">{skill}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="ps-exp" className="text-sm font-medium">
                        Years of Experience
                      </Label>
                      <Input
                        id="ps-exp"
                        data-ocid="profile_setup.experience.input"
                        placeholder="e.g. 5"
                        type="number"
                        min="0"
                        max="50"
                        value={yearsExp}
                        onChange={(e) => setYearsExp(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Maid fields */}
                {role === "maid" && (
                  <>
                    <div className="space-y-1">
                      <Label
                        htmlFor="ps-maid-cat"
                        className="text-sm font-medium"
                      >
                        Service Category{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={maidCategory}
                        onValueChange={setMaidCategory}
                      >
                        <SelectTrigger
                          id="ps-maid-cat"
                          data-ocid="profile_setup.maid_category.select"
                          className="w-full"
                        >
                          <SelectValue placeholder="Choose your main service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {MAID_WORK_TYPES.map((type) => {
                            const meta = WORK_TYPE_META[type];
                            return (
                              <SelectItem key={type} value={type}>
                                {meta?.icon} {meta?.label ?? type}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="ps-rate" className="text-sm font-medium">
                        Daily / Hourly Rate (₹)
                      </Label>
                      <Input
                        id="ps-rate"
                        data-ocid="profile_setup.rate.input"
                        placeholder="e.g. 500 per day or 100 per hour"
                        value={dailyRate}
                        onChange={(e) => setDailyRate(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Let families know your expected charge
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="ps-exp-maid"
                        className="text-sm font-medium"
                      >
                        Years of Experience
                      </Label>
                      <Input
                        id="ps-exp-maid"
                        data-ocid="profile_setup.experience.input"
                        placeholder="e.g. 3"
                        type="number"
                        min="0"
                        max="50"
                        value={yearsExp}
                        onChange={(e) => setYearsExp(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  data-ocid="profile_setup.back.secondary_button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSetupStep("role")}
                  disabled={isSaving}
                >
                  Back
                </Button>
                <Button
                  data-ocid="profile_setup.submit_button"
                  className={`flex-1 ${role === "maid" ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white" : "btn-primary"}`}
                  onClick={handleProfileSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Create Profile 🚀"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
