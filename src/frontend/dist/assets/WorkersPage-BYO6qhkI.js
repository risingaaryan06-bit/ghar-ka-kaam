import { c as createLucideIcon, r as reactExports, l as HardHat, j as jsxRuntimeExports, B as Button, X, U as Users } from "./index-Bl6m0gAG.js";
import { W as WorkerCard } from "./WorkerCard-DyTnuu3t.js";
import { B as Badge } from "./badge-BnwEIvSF.js";
import { I as Input } from "./input-Cwar-sC0.js";
import "./types-DGUL2UgN.js";
import { W as Wrench } from "./wrench-mSk-es6i.js";
import { H as Hammer } from "./hammer-Dxxls0wG.js";
import { Z as Zap } from "./zap-RxZkr_NM.js";
import { U as UserRole } from "./backend-DBy7dtNU.js";
import { S as Search } from "./search-DEULgNsb.js";
import { S as Star } from "./star-FaVzG57j.js";
import { m as motion } from "./proxy-BQt9Bh9G.js";
import "./card-BOlP-LKW.js";
import "./StarRating-tS6JAhqF.js";
import "./index-CL8mI724.js";
import "./clock-Fe6S3N1I.js";
import "./baby-CjYl5-VT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 9v6", key: "199k2o" }],
  ["path", { d: "M16 15v6", key: "8rj2es" }],
  ["path", { d: "M16 3v6", key: "1j6rpj" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M8 15v6", key: "1stoo3" }],
  ["path", { d: "M8 3v6", key: "vlvjmk" }]
];
const BrickWall = createLucideIcon("brick-wall", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m11 10 3 3", key: "fzmg1i" }],
  [
    "path",
    { d: "M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z", key: "p4q2r7" }
  ],
  ["path", { d: "M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031", key: "wy6l02" }]
];
const Brush = createLucideIcon("brush", __iconNode);
const CATEGORY_PILLS = [
  { key: "all", label: "All", icon: HardHat, skillMatch: [] },
  { key: "plumbing", label: "Plumber", icon: Wrench, skillMatch: ["plumbing"] },
  {
    key: "carpentry",
    label: "Carpenter",
    icon: Hammer,
    skillMatch: ["carpentry"]
  },
  {
    key: "electrical",
    label: "Electrician",
    icon: Zap,
    skillMatch: ["electrical"]
  },
  { key: "painting", label: "Painter", icon: Brush, skillMatch: ["painting"] },
  { key: "masonry", label: "Mason", icon: BrickWall, skillMatch: ["masonry"] }
];
const now = BigInt(Date.now()) * BigInt(1e6);
function makePrincipal(id) {
  return { toText: () => id };
}
const HARDCODED_WORKERS = [
  // PLUMBERS
  {
    id: makePrincipal("worker-hira-singh"),
    name: "Hira Singh",
    phone: "+91 80917 72338",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(8),
    averageRating: 4.8,
    completedJobsCount: BigInt(95),
    skills: ["plumbing", "plumbing", "plumbing"]
  },
  {
    id: makePrincipal("worker-chintu"),
    name: "Chintu",
    phone: "+91 78762 51663",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(5),
    averageRating: 4.5,
    completedJobsCount: BigInt(67),
    skills: ["plumbing", "plumbing", "plumbing"]
  },
  // CARPENTERS
  {
    id: makePrincipal("worker-lucky"),
    name: "Lucky",
    phone: "+91 82196 96946",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(120),
    skills: ["carpentry", "carpentry", "carpentry"]
  },
  {
    id: makePrincipal("worker-raju-mistri"),
    name: "Raju Mistri",
    phone: "+91 98765 43210",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(10),
    averageRating: 4.7,
    completedJobsCount: BigInt(43),
    skills: ["masonry", "masonry", "masonry"]
  },
  // PAINTERS
  {
    id: makePrincipal("worker-suresh-painter"),
    name: "Suresh Painter",
    phone: "+91 97654 32109",
    location: "Mumbai",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(7),
    averageRating: 4.6,
    completedJobsCount: BigInt(82),
    skills: ["painting", "painting", "painting"]
  },
  {
    id: makePrincipal("worker-mohan-kumar"),
    name: "Mohan Kumar",
    phone: "+91 96543 21098",
    location: "Delhi",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(4),
    averageRating: 4.3,
    completedJobsCount: BigInt(38),
    skills: ["painting", "painting", "painting"]
  },
  // ELECTRICIANS
  {
    id: makePrincipal("worker-arvind-electrician"),
    name: "Arvind Electrician",
    phone: "+91 95432 10987",
    location: "Noida",
    role: UserRole.laborer,
    createdAt: now,
    yearsExperience: BigInt(9),
    averageRating: 4.7,
    completedJobsCount: BigInt(55),
    skills: ["electrical", "electrical", "electrical"]
  }
];
const SKILL_LABEL_MAP = {
  "worker-hira-singh": ["Pipe Fitting", "Leak Repair", "Installation"],
  "worker-chintu": ["Pipe Fitting", "Drainage", "Repair"],
  "worker-lucky": ["Furniture Making", "Wood Work", "Repair"],
  "worker-raju-mistri": ["Masonry", "Construction", "Repair"],
  "worker-suresh-painter": [
    "Interior Painting",
    "Exterior Painting",
    "Wall Finishing"
  ],
  "worker-mohan-kumar": ["Painting", "Whitewash", "Texture Work"],
  "worker-arvind-electrician": ["Wiring", "Panel Installation", "Repairs"]
};
const DISPLAY_WORKERS = HARDCODED_WORKERS.map((w) => {
  const id = w.id.toText();
  const labels = SKILL_LABEL_MAP[id];
  return labels ? { ...w, skills: labels } : w;
});
function WorkersPage() {
  const [search, setSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState("all");
  const [minRating, setMinRating] = reactExports.useState(0);
  const workers = DISPLAY_WORKERS;
  const hasActiveFilters = search !== "" || categoryFilter !== "all" || minRating > 0;
  const filtered = workers.filter((w) => {
    const matchSearch = !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.location.toLowerCase().includes(search.toLowerCase());
    const activePill = CATEGORY_PILLS.find((p) => p.key === categoryFilter);
    const matchCategory = categoryFilter === "all" || !activePill || activePill.skillMatch.some(
      (sm) => {
        var _a;
        return (((_a = HARDCODED_WORKERS.find((hw) => hw.id.toText() === w.id.toText())) == null ? void 0 : _a.skills) ?? []).some((ws) => ws.toLowerCase().includes(sm.toLowerCase()));
      }
    );
    const matchRating = minRating === 0 || w.averageRating !== void 0 && w.averageRating >= minRating;
    return matchSearch && matchCategory && matchRating;
  });
  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setMinRating(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border-b border-primary/12 py-10",
        style: {
          background: "linear-gradient(160deg, oklch(0.88 0.07 350) 0%, oklch(0.95 0.03 350) 60%, oklch(0.985 0.008 350) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl construction-gradient flex items-center justify-center flex-shrink-0 shadow-pink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-6 w-6 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-foreground/8 text-foreground border-0 text-xs font-semibold mb-1 px-2.5 py-0.5", children: "Construction & Repairs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-2xl text-foreground leading-tight", children: "Find Skilled Workers" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                filtered.length,
                " skilled worker",
                filtered.length !== 1 ? "s" : "",
                " available",
                hasActiveFilters && " matching your filters"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/15 p-4 flex flex-wrap items-center gap-3 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px] max-w-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60 pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "workers.search_input",
                  placeholder: "Search by name or location...",
                  value: search,
                  onChange: (e) => setSearch(e.target.value),
                  className: "pl-9 bg-background border-border focus:border-primary/50 rounded-xl h-10"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: [0, 4, 4.5].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `workers.rating_pill.${r}`,
                onClick: () => setMinRating(r),
                className: `flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border-2 transition-all duration-200 ${minRating === r ? "bg-primary text-primary-foreground border-primary shadow-pink" : "bg-card border-border text-foreground/65 hover:border-primary/30 hover:bg-primary/5"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
                  r === 0 ? "Any" : `${r}+`
                ]
              },
              r
            )) }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "workers.clear_filters.button",
                variant: "ghost",
                size: "sm",
                onClick: clearFilters,
                className: "text-muted-foreground hover:text-foreground gap-1.5 rounded-xl h-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
                  " Clear"
                ]
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-primary/8 py-3 sticky top-0 z-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none", children: CATEGORY_PILLS.map((pill) => {
      const Icon = pill.icon;
      const isActive = categoryFilter === pill.key;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `workers.category.${pill.key}`,
          onClick: () => setCategoryFilter(pill.key),
          className: `flex items-center gap-1.5 shrink-0 text-xs font-semibold px-4 py-2 rounded-full border-2 transition-all duration-200 ${isActive ? "bg-primary text-primary-foreground border-primary shadow-pink" : "bg-card border-border text-foreground/65 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
            pill.label
          ]
        },
        pill.key
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "workers.empty_state",
          className: "flex flex-col items-center justify-center py-28 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-4xl border-2 border-primary/15", children: "👷" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No Workers Found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: "Try adjusting your search or filters to find workers." }),
            hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "workers.empty.clear_button",
                className: "btn-outline-pink",
                onClick: clearFilters,
                children: "Clear All Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((worker, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: idx * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCard, { worker, index: idx + 1 })
        },
        worker.id.toText()
      )) }),
      filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 text-center py-8 rounded-2xl bg-card border border-primary/15 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-primary mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-bold text-foreground mb-1", children: "Can't find the right worker?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Post a job and let workers come to you" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "btn-primary", children: "Post a Job Free" })
      ] })
    ] })
  ] });
}
export {
  WorkersPage as default
};
