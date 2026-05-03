import { r as reactExports, j as jsxRuntimeExports, S as Separator, L as Link, B as Button, P as Phone } from "./index-Bl6m0gAG.js";
import { C as Card, a as CardContent } from "./card-BOlP-LKW.js";
import { I as Input } from "./input-Cwar-sC0.js";
import { L as Label } from "./label-CBWPSbta.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D9tzeBcV.js";
import { T as Textarea } from "./textarea-CGwFhK7E.js";
import { W as WORK_TYPE_META, C as CONSTRUCTION_WORK_TYPES, M as MAID_WORK_TYPES } from "./types-DGUL2UgN.js";
import { C as ClipboardList } from "./clipboard-list-Cp7S-_cj.js";
import { C as CircleCheck } from "./circle-check-C-fSTZgk.js";
import { A as ArrowLeft } from "./arrow-left-CeE17HnD.js";
import { M as MapPin } from "./index-CL8mI724.js";
import { C as Calendar } from "./calendar-FsnrWoOi.js";
import { A as ArrowRight } from "./arrow-right-INLZETnx.js";
import "./index-CgEjvbCo.js";
const TOTAL_STEPS = 3;
const STEP_META = [
  { label: "Job Type", icon: "📋", num: 1 },
  { label: "Location & Budget", icon: "📍", num: 2 },
  { label: "Details & Contact", icon: "💬", num: 3 }
];
function StepIndicator({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-0 mb-8", children: STEP_META.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${s.num < current ? "bg-foreground border-foreground text-background" : s.num === current ? "bg-primary border-primary text-primary-foreground shadow-lg scale-110" : "bg-background border-border text-muted-foreground"}`,
          children: s.num < current ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : s.num
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `mt-1.5 text-[11px] font-semibold w-20 text-center leading-tight transition-colors ${s.num === current ? "text-primary" : s.num < current ? "text-foreground" : "text-muted-foreground"}`,
          children: s.label
        }
      )
    ] }),
    i < TOTAL_STEPS - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-16 h-0.5 mb-5 mx-1 rounded-full transition-colors duration-300 ${s.num < current ? "bg-foreground" : "bg-border"}`
      }
    )
  ] }, s.num)) });
}
function PostJobPage() {
  var _a;
  const [step, setStep] = reactExports.useState(1);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [s1, setS1] = reactExports.useState({ workType: "general", title: "" });
  const [s2, setS2] = reactExports.useState({
    location: "",
    budget: "",
    timeline: ""
  });
  const [s3, setS3] = reactExports.useState({ description: "", contact: "" });
  const [errors, setErrors] = reactExports.useState({});
  const clearError = (key) => setErrors((prev) => {
    const next = { ...prev };
    delete next[key];
    return next;
  });
  const validateStep1 = () => {
    const e = {};
    if (!s1.workType) e.workType = "Please select a service type.";
    if (!s1.title.trim()) e.title = "Please enter a job title.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e = {};
    if (!s2.location.trim()) e.location = "Please enter your location.";
    const budget = Number(s2.budget);
    if (!s2.budget || Number.isNaN(budget) || budget <= 0)
      e.budget = "Please enter a valid budget.";
    if (!s2.timeline.trim()) e.timeline = "Please specify when you need it.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep3 = () => {
    const e = {};
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
  if (submitted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg construction-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground", children: "Post a Job" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-ocid": "post_job.success_state",
            className: "w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-pink",
            style: {
              background: "linear-gradient(135deg, oklch(0.72 0.18 145) 0%, oklch(0.62 0.20 145) 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-extrabold text-2xl text-foreground", children: "Job Posted Successfully! 🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed", children: [
            "Your job has been posted. Workers will contact you soon at",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: s3.contact }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-elevated border-primary/20 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: selectedMeta == null ? void 0 : selectedMeta.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: s1.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: selectedMeta == null ? void 0 : selectedMeta.label })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "📍 Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: s2.location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "💰 Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground mt-0.5", children: [
                "₹",
                Number(s2.budget).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "📅 Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: s2.timeline })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "📞 Contact" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mt-0.5", children: s3.contact })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "post_job.back_home.primary_button",
              className: "w-full btn-primary",
              children: "Back to Home"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "post_job.post_another.secondary_button",
              variant: "outline",
              className: "flex-1",
              onClick: () => {
                setS1({ workType: "general", title: "" });
                setS2({ location: "", budget: "", timeline: "" });
                setS3({ description: "", contact: "" });
                setErrors({});
                setStep(1);
                setSubmitted(false);
              },
              children: "Post Another Job"
            }
          )
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      step > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "post_job.back.button",
          onClick: handleBack,
          className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-medium -ml-1 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back"
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": "post_job.cancel.button",
          className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm font-medium -ml-1 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg construction-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground leading-tight", children: "Post a Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Step ",
            step,
            " of ",
            TOTAL_STEPS
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "post_job.step1.card", className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center mx-auto mb-3 text-2xl", children: (selectedMeta == null ? void 0 : selectedMeta.icon) ?? "📋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl", children: "What kind of work do you need?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Choose the service type and give your job a title." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "workType", children: "Service Type *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: s1.workType,
              onValueChange: (v) => {
                setS1((p) => ({ ...p, workType: v }));
                clearError("workType");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    "data-ocid": "post_job.worktype.select",
                    id: "workType",
                    className: "bg-background",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select service type" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectItem,
                    {
                      value: "_sep1",
                      disabled: true,
                      className: "text-muted-foreground font-semibold text-xs",
                      children: "— Construction Services —"
                    }
                  ),
                  CONSTRUCTION_WORK_TYPES.map((key) => {
                    const meta = WORK_TYPE_META[key];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                      meta.icon,
                      " ",
                      meta.label
                    ] }, key);
                  }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectItem,
                    {
                      value: "_sep2",
                      disabled: true,
                      className: "text-muted-foreground font-semibold text-xs",
                      children: "— Maid & Home Services —"
                    }
                  ),
                  MAID_WORK_TYPES.map((key) => {
                    const meta = WORK_TYPE_META[key];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                      meta.icon,
                      " ",
                      meta.label
                    ] }, key);
                  })
                ] })
              ]
            }
          ),
          errors.workType && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.worktype.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.workType
            }
          ),
          selectedMeta && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 pt-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedMeta.icon }),
            selectedMeta.category === "maid" ? "Your request will be shown to maids & home service providers." : "Your request will be shown to construction workers & laborers."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Job Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "post_job.title.input",
              id: "title",
              placeholder: (selectedMeta == null ? void 0 : selectedMeta.category) === "maid" ? "e.g. Need a daily cook for 2 people" : "e.g. Experienced Mason for Wall Repair",
              value: s1.title,
              onChange: (e) => {
                setS1((p) => ({ ...p, title: e.target.value }));
                clearError("title");
              },
              className: "bg-background"
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.title.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.title
            }
          )
        ] })
      ] }) }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "post_job.step2.card", className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center mx-auto mb-3 text-2xl", children: "📍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl", children: "Where & how much?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tell workers where the job is and what you can pay." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "location", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "inline h-3.5 w-3.5 mr-1 text-muted-foreground" }),
            "Location / Address *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "post_job.location.input",
              id: "location",
              placeholder: "e.g. Sector 62, Noida, UP",
              value: s2.location,
              onChange: (e) => {
                setS2((p) => ({ ...p, location: e.target.value }));
                clearError("location");
              },
              className: "bg-background"
            }
          ),
          errors.location && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.location.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.location
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "budget", children: "Budget (₹) *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "post_job.budget.input",
              id: "budget",
              type: "number",
              placeholder: "e.g. 8000",
              value: s2.budget,
              onChange: (e) => {
                setS2((p) => ({ ...p, budget: e.target.value }));
                clearError("budget");
              },
              min: "1",
              className: "bg-background"
            }
          ),
          errors.budget && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.budget.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.budget
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "timeline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "inline h-3.5 w-3.5 mr-1 text-muted-foreground" }),
            "When do you need it? *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "post_job.timeline.input",
              id: "timeline",
              placeholder: "e.g. This week, ASAP, 15 May 2025",
              value: s2.timeline,
              onChange: (e) => {
                setS2((p) => ({ ...p, timeline: e.target.value }));
                clearError("timeline");
              },
              className: "bg-background"
            }
          ),
          errors.timeline && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.timeline.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.timeline
            }
          )
        ] }),
        s2.budget && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your Budget" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-primary text-xl leading-tight", children: [
            "₹",
            Number(s2.budget).toLocaleString("en-IN")
          ] })
        ] })
      ] }) }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "post_job.step3.card", className: "card-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center mx-auto mb-3 text-2xl", children: "💬" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-xl", children: "Almost done!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Describe the job and leave your contact so workers can reach you." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Job Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "post_job.description.textarea",
              id: "description",
              placeholder: ((_a = WORK_TYPE_META[s1.workType]) == null ? void 0 : _a.category) === "maid" ? "Describe what you need: timings, number of people, special requirements..." : "Describe the work: scope, quality expectations, materials needed...",
              value: s3.description,
              onChange: (e) => {
                setS3((p) => ({ ...p, description: e.target.value }));
                clearError("description");
              },
              rows: 4,
              className: "bg-background"
            }
          ),
          errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.description.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A clear description helps workers understand your needs." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "contact", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "inline h-3.5 w-3.5 mr-1 text-muted-foreground" }),
            "Your Contact Number *"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "post_job.contact.input",
              id: "contact",
              type: "tel",
              placeholder: "e.g. 98765 43210",
              value: s3.contact,
              onChange: (e) => {
                setS3((p) => ({ ...p, contact: e.target.value }));
                clearError("contact");
              },
              className: "bg-background"
            }
          ),
          errors.contact && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              "data-ocid": "post_job.contact.field_error",
              className: "text-xs text-destructive mt-1",
              children: errors.contact
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Workers will call you directly on this number." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6 pb-10", children: [
        step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "post_job.prev.button",
            type: "button",
            variant: "outline",
            className: "flex-1",
            onClick: handleBack,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
              "Previous"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "post_job.next.primary_button",
            type: "button",
            className: "flex-1 btn-primary font-bold",
            onClick: handleNext,
            children: step < TOTAL_STEPS ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Next",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Post Job ✓" })
          }
        )
      ] })
    ] })
  ] });
}
export {
  PostJobPage as default
};
