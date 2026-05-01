import { d as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as PageLoader, B as Briefcase, L as Link, b as Button, m as CirclePlus, n as HardHat, g as Sparkles, X } from "./index-D5ASyzS6.js";
import { J as JobCard } from "./JobCard-BG7sNzE4.js";
import { B as Badge } from "./badge-7GCgTXu2.js";
import { I as Input } from "./input-ZAgHlKlK.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-b-AYbpxr.js";
import { g as useListJobs, h as useFilterJobs } from "./useQueries-wsg2UjNw.js";
import { C as CONSTRUCTION_WORK_TYPES, M as MAID_WORK_TYPES, W as WORK_TYPE_META } from "./types-D7fAxLqk.js";
import { S as Search } from "./search-Gjtzbc8w.js";
import "./card-JZLgIumC.js";
import "./index-D8faD2En.js";
import "./calendar-mCFMjJLa.js";
import "./index-DvqHBqJ-.js";
import "./useActor-BVPqwPhj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Lowest Budget", value: "budget_low" },
  { label: "Highest Budget", value: "budget_high" }
];
function sortJobs(jobs, sort) {
  return [...jobs].sort((a, b) => {
    if (sort === "newest") return Number(b.createdAt - a.createdAt);
    if (sort === "budget_low") return Number(a.budget - b.budget);
    return Number(b.budget - a.budget);
  });
}
function JobsPage() {
  var _a;
  const [locationSearch, setLocationSearch] = reactExports.useState("");
  const [workType, setWorkType] = reactExports.useState("all");
  const [maxBudget, setMaxBudget] = reactExports.useState(5e5);
  const [sortKey, setSortKey] = reactExports.useState("newest");
  const [filtersOpen, setFiltersOpen] = reactExports.useState(false);
  const [activeCategory, setActiveCategory] = reactExports.useState("construction");
  const isFiltering = locationSearch.trim().length > 0 || workType !== "all" || maxBudget < 5e5;
  const filterWorkType = workType === "all" ? null : workType;
  const filterLocation = locationSearch.trim() || null;
  const filterBudget = maxBudget < 5e5 ? BigInt(maxBudget) : null;
  const { data: allJobs = [], isLoading: loadingAll } = useListJobs();
  const { data: filteredJobs = [], isLoading: loadingFiltered } = useFilterJobs(
    filterLocation,
    filterWorkType,
    filterBudget
  );
  const isLoading = isFiltering ? loadingFiltered : loadingAll;
  const rawJobs = isFiltering ? filteredJobs : allJobs;
  const categoryFilteredJobs = reactExports.useMemo(() => {
    const categoryTypes = activeCategory === "construction" ? CONSTRUCTION_WORK_TYPES : MAID_WORK_TYPES;
    const byCategory = rawJobs.filter(
      (j) => categoryTypes.includes(j.workType)
    );
    return sortJobs(byCategory, sortKey);
  }, [rawJobs, sortKey, activeCategory]);
  const constructionCount = reactExports.useMemo(
    () => rawJobs.filter((j) => CONSTRUCTION_WORK_TYPES.includes(j.workType)).length,
    [rawJobs]
  );
  const maidCount = reactExports.useMemo(
    () => rawJobs.filter((j) => MAID_WORK_TYPES.includes(j.workType)).length,
    [rawJobs]
  );
  const clearFilters = () => {
    setLocationSearch("");
    setWorkType("all");
    setMaxBudget(5e5);
  };
  const categoryWorkTypes = activeCategory === "construction" ? CONSTRUCTION_WORK_TYPES : MAID_WORK_TYPES;
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { label: "Loading jobs..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg construction-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Browse Jobs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: categoryFilteredJobs.length }),
              " ",
              categoryFilteredJobs.length === 1 ? "job" : "jobs",
              " available",
              isFiltering && " (filtered)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "jobs.post_job.primary_button",
            size: "sm",
            className: "btn-primary text-xs hidden sm:flex",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5 mr-1" }),
              "Post a Job"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 bg-muted/50 p-1 rounded-lg w-fit mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "data-ocid": "jobs.construction_tab.tab",
            type: "button",
            onClick: () => {
              setActiveCategory("construction");
              setWorkType("all");
            },
            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === "construction" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-3.5 w-3.5" }),
              "Construction",
              constructionCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "h-4 text-[10px] px-1.5 leading-none ml-0.5", children: constructionCount })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "data-ocid": "jobs.maid_tab.tab",
            type: "button",
            onClick: () => {
              setActiveCategory("maid");
              setWorkType("all");
            },
            className: `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeCategory === "maid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
              "Maid Services",
              maidCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "h-4 text-[10px] px-1.5 leading-none ml-0.5", children: maidCount })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[180px] max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "jobs.location_search.input",
              placeholder: "Search by location...",
              value: locationSearch,
              onChange: (e) => setLocationSearch(e.target.value),
              className: "bg-background pl-9"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "jobs.filters.toggle",
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => setFiltersOpen((v) => !v),
            className: "flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
              "Filters",
              isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-1 h-4 text-[10px] px-1 leading-none", children: "On" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: sortKey,
            onValueChange: (v) => setSortKey(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  "data-ocid": "jobs.sort.select",
                  className: "w-40 bg-background",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
            ]
          }
        )
      ] }),
      filtersOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex flex-wrap gap-4 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "jobs-worktype-select",
              className: "text-xs text-muted-foreground font-medium",
              children: activeCategory === "construction" ? "Work Type" : "Service Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: workType, onValueChange: setWorkType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                id: "jobs-worktype-select",
                "data-ocid": "jobs.worktype.select",
                className: "w-48 bg-background",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Types" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Types" }),
              categoryWorkTypes.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                WORK_TYPE_META[key].icon,
                " ",
                WORK_TYPE_META[key].label
              ] }, key))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "label",
            {
              htmlFor: "jobs-max-budget",
              className: "text-xs text-muted-foreground font-medium",
              children: [
                "Max Budget: ₹",
                maxBudget.toLocaleString("en-IN"),
                maxBudget >= 5e5 && " (any)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "jobs-max-budget",
              "data-ocid": "jobs.max_budget.input",
              type: "range",
              min: 1e3,
              max: 5e5,
              step: 1e3,
              value: maxBudget,
              onChange: (e) => setMaxBudget(Number(e.target.value)),
              className: "w-full accent-primary"
            }
          )
        ] }),
        isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "jobs.clear_filters.button",
            type: "button",
            variant: "ghost",
            size: "sm",
            onClick: clearFilters,
            className: "text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 mr-1" }),
              "Clear Filters"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6", children: [
      isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mb-4", children: [
        locationSearch && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-xs", children: [
          "Location: ",
          locationSearch,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setLocationSearch(""),
              "aria-label": "Remove location filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        workType !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-xs", children: [
          ((_a = WORK_TYPE_META[workType]) == null ? void 0 : _a.label) ?? workType,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setWorkType("all"),
              "aria-label": "Remove type filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] }),
        maxBudget < 5e5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-xs", children: [
          "Max ₹",
          maxBudget.toLocaleString("en-IN"),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMaxBudget(5e5),
              "aria-label": "Remove budget filter",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
            }
          )
        ] })
      ] }),
      categoryFilteredJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "jobs.empty_state",
          className: "flex flex-col items-center justify-center py-20 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: activeCategory === "construction" ? /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-10 w-10 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-10 w-10 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: [
              "No",
              " ",
              activeCategory === "construction" ? "Construction" : "Maid Service",
              " ",
              "Jobs Found"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm", children: isFiltering ? "Try adjusting your filters to see more results." : "No jobs in this category yet. Be the first to post one!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
              isFiltering && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "jobs.empty_clear_filters.button",
                  type: "button",
                  variant: "outline",
                  onClick: clearFilters,
                  children: "Clear Filters"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "jobs.empty_post_job.primary_button",
                  type: "button",
                  className: "btn-primary",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 mr-2" }),
                    "Post a Job"
                  ]
                }
              ) })
            ] })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: categoryFilteredJobs.map((job, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(JobCard, { job, index: idx + 1 }, job.id.toString())) })
    ] })
  ] });
}
export {
  JobsPage as default
};
