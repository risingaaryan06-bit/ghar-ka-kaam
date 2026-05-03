import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CONSTRUCTION_WORK_TYPES,
  MAID_WORK_TYPES,
  WORK_TYPE_META,
} from "@/types";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardList,
  MapPin,
  Phone,
} from "lucide-react";
import { useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Step1 {
  workType: string;
  title: string;
}

interface Step2 {
  location: string;
  budget: string;
  timeline: string;
}

interface Step3 {
  description: string;
  contact: string;
}

const TOTAL_STEPS = 3;

const STEP_META = [
  { label: "Job Type", icon: "📋", num: 1 },
  { label: "Location & Budget", icon: "📍", num: 2 },
  { label: "Details & Contact", icon: "💬", num: 3 },
];

// ─── Step Indicator ─────────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEP_META.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                s.num < current
                  ? "bg-foreground border-foreground text-background"
                  : s.num === current
                    ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110"
                    : "bg-background border-border text-muted-foreground"
              }`}
            >
              {s.num < current ? <CheckCircle2 className="h-4 w-4" /> : s.num}
            </div>
            <span
              className={`mt-1.5 text-[11px] font-semibold w-20 text-center leading-tight transition-colors ${
                s.num === current
                  ? "text-primary"
                  : s.num < current
                    ? "text-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div
              className={`w-16 h-0.5 mb-5 mx-1 rounded-full transition-colors duration-300 ${
                s.num < current ? "bg-foreground" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function PostJobPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [s1, setS1] = useState<Step1>({ workType: "general", title: "" });
  const [s2, setS2] = useState<Step2>({
    location: "",
    budget: "",
    timeline: "",
  });
  const [s3, setS3] = useState<Step3>({ description: "", contact: "" });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (key: string) =>
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  // ── Validation per step ──
  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!s1.workType) e.workType = "Please select a service type.";
    if (!s1.title.trim()) e.title = "Please enter a job title.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!s2.location.trim()) e.location = "Please enter your location.";
    const budget = Number(s2.budget);
    if (!s2.budget || Number.isNaN(budget) || budget <= 0)
      e.budget = "Please enter a valid budget.";
    if (!s2.timeline.trim()) e.timeline = "Please specify when you need it.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!s3.description.trim())
      e.description = "Please describe what you need done.";
    if (!s3.contact.trim()) e.contact = "Please enter your contact number.";
    else if (!/^[6-9]\d{9}$/.test(s3.contact.replace(/\s/g, "")))
      e.contact = "Enter a valid 10-digit Indian mobile number.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setSubmitted(true);
  };

  const handleBack = () => {
    setErrors({});
    setStep((p) => Math.max(1, p - 1));
  };

  const selectedMeta = WORK_TYPE_META[s1.workType];

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg construction-gradient flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-primary-foreground" />
              </div>
              <h1 className="font-display font-bold text-lg text-foreground">
                Post a Job
              </h1>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full text-center space-y-6">
            <div
              data-ocid="post_job.success_state"
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-pink"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.18 145) 0%, oklch(0.62 0.20 145) 100%)",
              }}
            >
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl text-foreground">
                Job Posted Successfully! 🎉
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your job has been posted. Workers will contact you soon at{" "}
                <span className="font-bold text-foreground">{s3.contact}</span>.
              </p>
            </div>

            <Card className="card-elevated border-primary/20 text-left">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedMeta?.icon}</span>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {s1.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selectedMeta?.label}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">📍 Location</span>
                    <p className="font-medium text-foreground mt-0.5">
                      {s2.location}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">💰 Budget</span>
                    <p className="font-medium text-foreground mt-0.5">
                      ₹{Number(s2.budget).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">📅 Timeline</span>
                    <p className="font-medium text-foreground mt-0.5">
                      {s2.timeline}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">📞 Contact</span>
                    <p className="font-medium text-foreground mt-0.5">
                      {s3.contact}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/" className="flex-1">
                <Button
                  data-ocid="post_job.back_home.primary_button"
                  className="w-full btn-primary"
                >
                  Back to Home
                </Button>
              </Link>
              <Button
                data-ocid="post_job.post_another.secondary_button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setS1({ workType: "general", title: "" });
                  setS2({ location: "", budget: "", timeline: "" });
                  setS3({ description: "", contact: "" });
                  setErrors({});
                  setStep(1);
                  setSubmitted(false);
                }}
              >
                Post Another Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Multi-step form ─────────────────────────────────────────────────────────
  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button
                type="button"
                data-ocid="post_job.back.button"
                onClick={handleBack}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-medium -ml-1 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <Link to="/">
                <button
                  type="button"
                  data-ocid="post_job.cancel.button"
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-medium -ml-1 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              </Link>
            )}
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg construction-gradient flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                  Post a Job
                </h1>
                <p className="text-xs text-muted-foreground">
                  Step {step} of {TOTAL_STEPS}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <StepIndicator current={step} />

        {/* ── Step 1: Job Type & Title ── */}
        {step === 1 && (
          <Card data-ocid="post_job.step1.card" className="card-elevated">
            <CardContent className="p-6 space-y-5">
              <div className="text-center pb-2">
                <div className="h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center mx-auto mb-3 text-2xl">
                  {selectedMeta?.icon ?? "📋"}
                </div>
                <h2 className="font-display font-bold text-foreground text-xl">
                  What kind of work do you need?
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Choose the service type and give your job a title.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="workType">Service Type *</Label>
                <Select
                  value={s1.workType}
                  onValueChange={(v) => {
                    setS1((p) => ({ ...p, workType: v }));
                    clearError("workType");
                  }}
                >
                  <SelectTrigger
                    data-ocid="post_job.worktype.select"
                    id="workType"
                    className="bg-background"
                  >
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="_sep1"
                      disabled
                      className="text-muted-foreground font-semibold text-xs"
                    >
                      — Construction Services —
                    </SelectItem>
                    {CONSTRUCTION_WORK_TYPES.map((key) => {
                      const meta = WORK_TYPE_META[key];
                      return (
                        <SelectItem key={key} value={key}>
                          {meta.icon} {meta.label}
                        </SelectItem>
                      );
                    })}
                    <SelectItem
                      value="_sep2"
                      disabled
                      className="text-muted-foreground font-semibold text-xs"
                    >
                      — Maid & Home Services —
                    </SelectItem>
                    {MAID_WORK_TYPES.map((key) => {
                      const meta = WORK_TYPE_META[key];
                      return (
                        <SelectItem key={key} value={key}>
                          {meta.icon} {meta.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.workType && (
                  <p
                    data-ocid="post_job.worktype.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.workType}
                  </p>
                )}
                {selectedMeta && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 pt-0.5">
                    <span>{selectedMeta.icon}</span>
                    {selectedMeta.category === "maid"
                      ? "Your request will be shown to maids & home service providers."
                      : "Your request will be shown to construction workers & laborers."}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  data-ocid="post_job.title.input"
                  id="title"
                  placeholder={
                    selectedMeta?.category === "maid"
                      ? "e.g. Need a daily cook for 2 people"
                      : "e.g. Experienced Mason for Wall Repair"
                  }
                  value={s1.title}
                  onChange={(e) => {
                    setS1((p) => ({ ...p, title: e.target.value }));
                    clearError("title");
                  }}
                  className="bg-background"
                />
                {errors.title && (
                  <p
                    data-ocid="post_job.title.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.title}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Step 2: Location & Budget ── */}
        {step === 2 && (
          <Card data-ocid="post_job.step2.card" className="card-elevated">
            <CardContent className="p-6 space-y-5">
              <div className="text-center pb-2">
                <div className="h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center mx-auto mb-3 text-2xl">
                  📍
                </div>
                <h2 className="font-display font-bold text-foreground text-xl">
                  Where & how much?
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Tell workers where the job is and what you can pay.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="location">
                  <MapPin className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Location / Address *
                </Label>
                <Input
                  data-ocid="post_job.location.input"
                  id="location"
                  placeholder="e.g. Sector 62, Noida, UP"
                  value={s2.location}
                  onChange={(e) => {
                    setS2((p) => ({ ...p, location: e.target.value }));
                    clearError("location");
                  }}
                  className="bg-background"
                />
                {errors.location && (
                  <p
                    data-ocid="post_job.location.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.location}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="budget">Budget (₹) *</Label>
                <Input
                  data-ocid="post_job.budget.input"
                  id="budget"
                  type="number"
                  placeholder="e.g. 8000"
                  value={s2.budget}
                  onChange={(e) => {
                    setS2((p) => ({ ...p, budget: e.target.value }));
                    clearError("budget");
                  }}
                  min="1"
                  className="bg-background"
                />
                {errors.budget && (
                  <p
                    data-ocid="post_job.budget.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.budget}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="timeline">
                  <Calendar className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  When do you need it? *
                </Label>
                <Input
                  data-ocid="post_job.timeline.input"
                  id="timeline"
                  placeholder="e.g. This week, ASAP, 15 May 2025"
                  value={s2.timeline}
                  onChange={(e) => {
                    setS2((p) => ({ ...p, timeline: e.target.value }));
                    clearError("timeline");
                  }}
                  className="bg-background"
                />
                {errors.timeline && (
                  <p
                    data-ocid="post_job.timeline.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.timeline}
                  </p>
                )}
              </div>

              {s2.budget && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
                  <p className="text-xs text-muted-foreground">Your Budget</p>
                  <p className="font-display font-bold text-primary text-xl leading-tight">
                    ₹{Number(s2.budget).toLocaleString("en-IN")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Step 3: Description & Contact ── */}
        {step === 3 && (
          <Card data-ocid="post_job.step3.card" className="card-elevated">
            <CardContent className="p-6 space-y-5">
              <div className="text-center pb-2">
                <div className="h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center mx-auto mb-3 text-2xl">
                  💬
                </div>
                <h2 className="font-display font-bold text-foreground text-xl">
                  Almost done!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Describe the job and leave your contact so workers can reach
                  you.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  data-ocid="post_job.description.textarea"
                  id="description"
                  placeholder={
                    WORK_TYPE_META[s1.workType]?.category === "maid"
                      ? "Describe what you need: timings, number of people, special requirements..."
                      : "Describe the work: scope, quality expectations, materials needed..."
                  }
                  value={s3.description}
                  onChange={(e) => {
                    setS3((p) => ({ ...p, description: e.target.value }));
                    clearError("description");
                  }}
                  rows={4}
                  className="bg-background"
                />
                {errors.description && (
                  <p
                    data-ocid="post_job.description.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  A clear description helps workers understand your needs.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact">
                  <Phone className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Your Contact Number *
                </Label>
                <Input
                  data-ocid="post_job.contact.input"
                  id="contact"
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={s3.contact}
                  onChange={(e) => {
                    setS3((p) => ({ ...p, contact: e.target.value }));
                    clearError("contact");
                  }}
                  className="bg-background"
                />
                {errors.contact && (
                  <p
                    data-ocid="post_job.contact.field_error"
                    className="text-xs text-destructive mt-1"
                  >
                    {errors.contact}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Workers will call you directly on this number.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6 pb-10">
          {step > 1 && (
            <Button
              data-ocid="post_job.prev.button"
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Previous
            </Button>
          )}
          <Button
            data-ocid="post_job.next.primary_button"
            type="button"
            className="flex-1 btn-primary font-bold"
            onClick={handleNext}
          >
            {step < TOTAL_STEPS ? (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </>
            ) : (
              <>Post Job ✓</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
