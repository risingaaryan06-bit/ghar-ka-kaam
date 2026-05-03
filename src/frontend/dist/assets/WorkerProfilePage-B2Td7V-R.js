import { c as createLucideIcon, m as useParams, n as useInternetIdentity, r as reactExports, o as Principal, j as jsxRuntimeExports, i as PageLoader, l as HardHat, L as Link, B as Button, d as Sparkles, b as Briefcase, S as Separator } from "./index-Bl6m0gAG.js";
import { U as UserRole, J as JobStatus, c as createActor } from "./backend-DBy7dtNU.js";
import { R as RateWorkerModal } from "./RateWorkerModal-BgcYWgC4.js";
import { R as RatingDisplay } from "./StarRating-tS6JAhqF.js";
import { B as Badge } from "./badge-BnwEIvSF.js";
import { C as Card, a as CardContent } from "./card-BOlP-LKW.js";
import { W as WORK_TYPE_META } from "./types-DGUL2UgN.js";
import { u as useActor, a as useQuery } from "./useActor-Bw0dW3YB.js";
import { A as ArrowLeft } from "./arrow-left-CeE17HnD.js";
import { M as MapPin } from "./index-CL8mI724.js";
import { S as Star } from "./star-FaVzG57j.js";
import { C as Clock } from "./clock-Fe6S3N1I.js";
import { M as MessageSquare } from "./message-square-C7b6KNyM.js";
import "./dialog-G5HeEmEv.js";
import "./textarea-CGwFhK7E.js";
import "./useQueries-DlGKg5lf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
function memberSince(timestamp) {
  const d = new Date(Number(timestamp) / 1e6);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}
const MAID_CATEGORY_META = {
  cook: { label: "Cook", icon: "👩‍🍳", color: "bg-rose-100 text-rose-700" },
  houseCleaner: {
    label: "House Cleaner",
    icon: "🧹",
    color: "bg-purple-100 text-purple-700"
  },
  laundry: {
    label: "Laundry",
    icon: "👕",
    color: "bg-indigo-100 text-indigo-700"
  },
  childcare: {
    label: "Childcare",
    icon: "👶",
    color: "bg-green-100 text-green-700"
  },
  babysitter: {
    label: "Babysitter",
    icon: "🍼",
    color: "bg-teal-100 text-teal-700"
  },
  maidServices: {
    label: "Maid Services",
    icon: "🏠",
    color: "bg-pink-100 text-pink-700"
  }
};
function WorkerProfilePage() {
  const { workerId } = useParams({ from: "/workers/$workerId" });
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const [rateOpen, setRateOpen] = reactExports.useState(false);
  let principalId = null;
  try {
    principalId = Principal.fromText(workerId);
  } catch {
  }
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["worker", workerId],
    queryFn: async () => {
      if (!actor || !principalId) return null;
      return actor.getUserProfile(principalId);
    },
    enabled: !!actor && !isFetching && !!principalId
  });
  const { data: callerProfile } = useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor || !identity) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching && !!identity
  });
  const { data: myJobs = [] } = useQuery({
    queryKey: ["myPostedJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyPostedJobs();
    },
    enabled: !!actor && !isFetching && !!identity && (callerProfile == null ? void 0 : callerProfile.role) === UserRole.homeowner
  });
  if (profileLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading profile..." });
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-8 w-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Profile Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This profile doesn't exist or has been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "worker_profile.back.button", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
        " Back to Workers"
      ] }) })
    ] });
  }
  const isMaid = profile.role === UserRole.maid;
  const skills = profile.skills ?? [];
  const initials = profile.name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  const maidCat = profile.maidCategory ? MAID_CATEGORY_META[profile.maidCategory] ?? {
    label: profile.maidCategory,
    icon: "✨",
    color: "bg-pink-100 text-pink-700"
  } : null;
  const workerCompletedJobs = myJobs.filter(
    (j) => {
      var _a;
      return j.status === JobStatus.completed && principalId && ((_a = j.assignedWorker) == null ? void 0 : _a.toText()) === principalId.toText();
    }
  );
  const reviewJobId = workerCompletedJobs.length > 0 ? workerCompletedJobs[0].id : BigInt(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "worker_profile.back.button",
          variant: "ghost",
          size: "sm",
          className: "text-muted-foreground hover:text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
            " Back to Workers"
          ]
        }
      ) }),
      isMaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          "data-ocid": "worker_profile.maid_badge",
          className: "bg-rose-100 text-rose-700 border-0 text-xs font-semibold",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1" }),
            " Maid Service Provider"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: `card-elevated border-t-4 mb-5 ${isMaid ? "border-t-rose-400" : "border-t-primary"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `flex-shrink-0 h-20 w-20 rounded-full flex items-center justify-center font-display font-bold text-2xl text-primary-foreground shadow-md ${isMaid ? "bg-gradient-to-br from-rose-400 to-pink-500" : "construction-gradient"}`,
                  children: initials
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-tight", children: profile.name }),
                  isMaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-rose-100 text-rose-700 border-0 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 mr-1" }),
                    "Maid Service Provider"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  RatingDisplay,
                  {
                    rating: profile.averageRating,
                    count: 0,
                    size: "md",
                    className: "mt-1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-secondary flex-shrink-0" }),
                    profile.location
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 text-secondary flex-shrink-0" }),
                    "Member since ",
                    memberSince(profile.createdAt)
                  ] })
                ] })
              ] })
            ] }),
            isMaid && maidCat && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-rose-200 bg-rose-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: maidCat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Service Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground leading-tight", children: maidCat.label })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-3 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-3 bg-muted/40 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-display font-bold text-foreground", children: Number(profile.completedJobsCount ?? 0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3" }),
                  "Jobs Done"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-3 bg-muted/40 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-display font-bold text-foreground", children: profile.averageRating !== void 0 ? profile.averageRating.toFixed(1) : "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
                  " Avg Rating"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-3 bg-muted/40 rounded-lg", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-display font-bold text-foreground", children: Number(profile.yearsExperience ?? 0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                  " Yrs Exp"
                ] })
              ] })
            ] }),
            !isMaid && skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Skills & Specializations" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skills.map((s) => {
                const meta = WORK_TYPE_META[s] ?? {
                  label: s,
                  icon: "🛠️",
                  color: "bg-muted text-muted-foreground"
                };
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-sm border-0 ${meta.color}`,
                    children: [
                      meta.icon,
                      " ",
                      meta.label
                    ]
                  },
                  s
                );
              }) })
            ] }),
            isMaid && skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Services Offered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skills.map((s) => {
                const meta = WORK_TYPE_META[s] ?? {
                  label: s,
                  icon: "✨",
                  color: "bg-rose-100 text-rose-700"
                };
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: `text-sm border-0 ${meta.color}`,
                    children: [
                      meta.icon,
                      " ",
                      meta.label
                    ]
                  },
                  s
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mt-5 mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              isMaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "worker_profile.hire.primary_button",
                  className: "w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold",
                  size: "lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 mr-2" }),
                    "Hire This Maid"
                  ]
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "worker_profile.hire.primary_button",
                  className: "btn-primary w-full",
                  size: "lg",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-5 w-5 mr-2" }),
                    "Hire This Worker"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "worker_profile.rate.open_modal_button",
                  variant: "outline",
                  size: "lg",
                  className: "flex-1 sm:flex-none border-primary/40 text-primary hover:bg-primary/5 hover:border-primary/60",
                  onClick: () => setRateOpen(true),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5 mr-2 fill-primary text-primary" }),
                    "Rate"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "flex-1 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "worker_profile.message.button",
                  variant: "outline",
                  size: "lg",
                  className: "w-full border-primary/40 text-primary hover:bg-primary/5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5 mr-2" }),
                    "Message"
                  ]
                }
              ) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-foreground text-sm uppercase tracking-wide", children: [
            "Completed Jobs (",
            workerCompletedJobs.length,
            ")"
          ] })
        ] }),
        workerCompletedJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "worker_profile.jobs.empty_state",
            className: "text-center py-14 bg-card rounded-xl border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No completed jobs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Jobs completed with this",
                " ",
                isMaid ? "service provider" : "worker",
                " will appear here."
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: workerCompletedJobs.map((job, idx) => {
          const meta = WORK_TYPE_META[job.workType] ?? {
            label: job.workType,
            icon: "🛠️",
            color: "bg-muted text-muted-foreground"
          };
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              "data-ocid": `worker_profile.job.item.${idx + 1}`,
              className: "card-elevated",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/jobs/$jobId",
                      params: { jobId: job.id.toString() },
                      className: "font-display font-semibold text-foreground hover:text-primary transition-colors",
                      children: job.title
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-[11px] border-0 ${meta.color}`,
                        children: [
                          meta.icon,
                          " ",
                          meta.label
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
                      job.location
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[11px] bg-primary/15 text-primary border-0 flex-shrink-0",
                    children: "✓ Completed"
                  }
                )
              ] }) })
            },
            job.id.toString()
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RateWorkerModal,
      {
        open: rateOpen,
        onClose: () => setRateOpen(false),
        workerPrincipal: workerId,
        workerName: profile.name,
        jobId: reviewJobId
      }
    )
  ] });
}
export {
  WorkerProfilePage as default
};
