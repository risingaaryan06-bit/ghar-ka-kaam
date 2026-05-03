import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, d as Sparkles, B as Button, L as Link, P as Phone, H as House } from "./index-Bl6m0gAG.js";
import { R as RateWorkerModal } from "./RateWorkerModal-BgcYWgC4.js";
import { B as Badge } from "./badge-BnwEIvSF.js";
import { C as Card, a as CardContent } from "./card-BOlP-LKW.js";
import { I as Input } from "./input-Cwar-sC0.js";
import { M as MAID_WORK_TYPES, W as WORK_TYPE_META } from "./types-DGUL2UgN.js";
import { U as UserRole } from "./backend-DBy7dtNU.js";
import { S as Search } from "./search-DEULgNsb.js";
import { m as motion } from "./proxy-BQt9Bh9G.js";
import { S as Star } from "./star-FaVzG57j.js";
import { M as MapPin } from "./index-CL8mI724.js";
import { B as Baby } from "./baby-CjYl5-VT.js";
import { H as Heart } from "./heart-BAXN7A2t.js";
import "./StarRating-tS6JAhqF.js";
import "./dialog-G5HeEmEv.js";
import "./textarea-CGwFhK7E.js";
import "./useQueries-DlGKg5lf.js";
import "./useActor-Bw0dW3YB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function MaidPhotoUpload({
  photoUrl,
  onPhotoChange,
  name,
  size = 52
}) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [localUrl, setLocalUrl] = reactExports.useState(photoUrl);
  const initials = name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  function handleFileChange(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setUploading(true);
    const url = URL.createObjectURL(file);
    setTimeout(() => {
      setLocalUrl(url);
      onPhotoChange(url);
      setUploading(false);
    }, 600);
  }
  function handleRemove(ev) {
    ev.stopPropagation();
    setLocalUrl(void 0);
    onPhotoChange("");
    if (inputRef.current) inputRef.current.value = "";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex-shrink-0",
      style: { width: size, height: size },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary/25 to-primary/8",
            style: { width: size, height: size },
            children: localUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: localUrl,
                alt: `${name} avatar`,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-lg", children: initials })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "maid.photo_upload.button",
            "aria-label": `Upload photo for ${name}`,
            onClick: () => {
              var _a;
              return !uploading && ((_a = inputRef.current) == null ? void 0 : _a.click());
            },
            className: "absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary border-2 border-card flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors cursor-pointer",
            children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 text-primary-foreground animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3 w-3 text-primary-foreground" })
          }
        ),
        localUrl && !uploading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "maid.photo_remove.button",
            "aria-label": `Remove photo for ${name}`,
            onClick: handleRemove,
            className: "absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground border-2 border-card flex items-center justify-center shadow-sm hover:bg-foreground/80 transition-colors cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-2.5 w-2.5 text-background" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept: "image/*",
            className: "sr-only",
            onChange: handleFileChange,
            tabIndex: -1
          }
        )
      ]
    }
  );
}
const CATEGORY_EMOJI = {
  maidServices: "🏠",
  cook: "👩‍🍳",
  houseCleaner: "🧹",
  laundry: "👕",
  childcare: "👶",
  babysitter: "🍼"
};
function getCategoryIcon(cat) {
  if (cat === "babysitter" || cat === "childcare") return Baby;
  if (cat === "houseCleaner" || cat === "cook") return Sparkles;
  if (cat === "maidServices") return House;
  return Heart;
}
const CATEGORY_FILTERS = [
  { key: "all", label: "All Categories" },
  ...MAID_WORK_TYPES.map((key) => {
    var _a;
    return {
      key,
      label: ((_a = WORK_TYPE_META[key]) == null ? void 0 : _a.label) ?? key
    };
  })
];
const now = BigInt(Date.now()) * BigInt(1e6);
function makePrincipal(id) {
  return { toText: () => id };
}
const HARDCODED_MAIDS = [
  {
    id: makePrincipal("maid-sunita-devi"),
    name: "Sunita Devi",
    phone: "+91 91234 56789",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(5),
    averageRating: 4.7,
    completedJobsCount: BigInt(130),
    skills: ["House Cleaning", "Cooking", "Kitchen Cleaning"],
    maidCategory: "houseCleaner"
  },
  {
    id: makePrincipal("maid-pooja-sharma"),
    name: "Pooja Sharma",
    phone: "+91 92345 67890",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(3),
    averageRating: 4.9,
    completedJobsCount: BigInt(60),
    skills: ["Babysitting", "Child Care", "Homework Help"],
    maidCategory: "babysitter"
  },
  {
    id: makePrincipal("maid-meena-kumari"),
    name: "Meena Kumari",
    phone: "+91 93456 78901",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(6),
    averageRating: 4.8,
    completedJobsCount: BigInt(180),
    skills: ["Full-time Maid", "House Cleaning", "Cooking", "Laundry"],
    maidCategory: "maidServices"
  },
  {
    id: makePrincipal("maid-rekha-thakur"),
    name: "Rekha Thakur",
    phone: "+91 94567 89012",
    location: "Delhi",
    role: UserRole.maid,
    createdAt: now,
    yearsExperience: BigInt(4),
    averageRating: 4.6,
    completedJobsCount: BigInt(85),
    skills: ["Childcare", "House Cleaning", "Infant Care"],
    maidCategory: "childcare"
  }
];
function MaidCard({ maid, index }) {
  const categoryKey = maid.maidCategory ?? "maidServices";
  const meta = WORK_TYPE_META[categoryKey];
  const emoji = CATEGORY_EMOJI[categoryKey] ?? "🏠";
  const CategoryIcon = getCategoryIcon(categoryKey);
  const [photoUrl, setPhotoUrl] = reactExports.useState(void 0);
  const [rateOpen, setRateOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.05 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            "data-ocid": `maids.item.${index}`,
            className: "group bg-card border border-border rounded-2xl shadow-sm hover:scale-[1.03] hover:shadow-pink-lg hover:border-primary/40 transition-all duration-300 ease-out overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-gradient-to-r from-primary via-primary/60 to-primary/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MaidPhotoUpload,
                    {
                      photoUrl,
                      onPhotoChange: setPhotoUrl,
                      name: maid.name,
                      size: 52
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground truncate text-base", children: maid.name }),
                        meta && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            variant: "outline",
                            className: "text-xs mt-1 bg-primary/10 text-primary border-0 font-semibold px-2 flex items-center gap-1 w-fit",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { className: "h-3 w-3" }),
                              emoji,
                              " ",
                              meta.label
                            ]
                          }
                        )
                      ] }),
                      maid.averageRating != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-ocid": `maids.rate_button.${index}`,
                          onClick: () => setRateOpen(true),
                          className: "flex items-center gap-1 shrink-0 text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer",
                          title: "Rate this maid",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-primary text-primary" }),
                            maid.averageRating.toFixed(1)
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground", children: [
                      maid.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" }),
                        maid.location
                      ] }),
                      maid.yearsExperience != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                        Number(maid.yearsExperience),
                        "+ yrs exp"
                      ] }),
                      maid.completedJobsCount != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                        Number(maid.completedJobsCount),
                        " jobs done"
                      ] })
                    ] }),
                    maid.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 rounded-lg px-2.5 py-1.5 border border-primary/15", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 flex-shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: maid.phone })
                    ] }),
                    maid.skills && maid.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2.5 flex flex-wrap gap-1", children: maid.skills.slice(0, 3).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full font-medium border border-primary/15",
                        children: skill
                      },
                      skill
                    )) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
                  maid.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `tel:${maid.phone.replace(/\s+/g, "")}`,
                      className: "flex-1",
                      "data-ocid": `maids.call_button.${index}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          className: "w-full h-9 text-xs font-bold bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 flex items-center gap-1.5 rounded-xl",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5" }),
                            "Call Now"
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `maids.rate_open_button.${index}`,
                      onClick: () => setRateOpen(true),
                      className: "h-9 text-xs font-semibold rounded-xl border border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 transition-all duration-200 px-3 flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5" }),
                        "Rate"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/workers/$workerId",
                      params: { workerId: maid.id.toText() },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          "data-ocid": `maids.hire_button.${index}`,
                          size: "sm",
                          variant: "outline",
                          className: "h-9 text-xs font-semibold rounded-xl border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 transition-all duration-200 px-3",
                          children: "Profile"
                        }
                      )
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          RateWorkerModal,
          {
            open: rateOpen,
            onClose: () => setRateOpen(false),
            workerPrincipal: maid.id.toText(),
            workerName: maid.name
          }
        )
      ]
    }
  );
}
function MaidsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    return HARDCODED_MAIDS.filter((m) => {
      const matchesSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.location.toLowerCase().includes(search.toLowerCase()) || (m.skills ?? []).some(
        (s) => s.toLowerCase().includes(search.toLowerCase())
      );
      const matchesCategory = activeCategory === "all" || m.maidCategory === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "border-b-2 border-primary/12",
        style: {
          background: "linear-gradient(160deg, oklch(0.88 0.07 350) 0%, oklch(0.95 0.04 350) 50%, oklch(0.985 0.01 350) 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-pink flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-foreground/8 text-foreground border-0 text-xs font-semibold mb-1 px-2.5 py-0.5", children: "Domestic Services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground leading-tight", children: "Maids & Babysitters" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
                filtered.length,
                " trusted helper",
                filtered.length !== 1 ? "s" : "",
                " — verified & reliable"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-4 max-w-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "maids.search_input",
                placeholder: "Search by name, location, or skill...",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "pl-9 bg-card border-primary/20 focus:border-primary/50 rounded-xl h-11 shadow-sm"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b-2 border-primary/8 py-3 sticky top-0 z-10 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1 scrollbar-none", children: CATEGORY_FILTERS.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        "data-ocid": `maids.category.${cat.key}`,
        onClick: () => setActiveCategory(cat.key),
        type: "button",
        className: `flex items-center gap-1.5 shrink-0 text-xs font-semibold px-4 py-2 rounded-full border-2 transition-all duration-200 ${activeCategory === cat.key ? "bg-primary text-primary-foreground border-primary shadow-pink" : "bg-card border-border text-foreground/65 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"}`,
        children: [
          cat.key !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_EMOJI[cat.key] ?? "" }),
          cat.label
        ]
      },
      cat.key
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10", children: MAID_WORK_TYPES.map((key, i) => {
        const meta = WORK_TYPE_META[key];
        if (!meta) return null;
        const isActive = activeCategory === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.button,
          {
            "data-ocid": `maids.service_tile.${key}`,
            onClick: () => setActiveCategory(key),
            type: "button",
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3, delay: i * 0.05 },
            className: `flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center group ${isActive ? "border-primary bg-primary/8 shadow-pink" : "border-border bg-card hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `h-11 w-11 rounded-xl flex items-center justify-center text-2xl transition-transform duration-200 group-hover:scale-110 ${isActive ? "bg-primary/20 text-primary" : "bg-muted"}`,
                  children: CATEGORY_EMOJI[key] ?? "🏠"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-semibold leading-tight ${isActive ? "text-primary" : "text-foreground"}`,
                  children: meta.label
                }
              )
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground font-medium", children: [
          filtered.length,
          " maid",
          filtered.length !== 1 ? "s" : "",
          " available"
        ] }),
        (search || activeCategory !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "text-xs text-muted-foreground hover:text-foreground",
            onClick: () => {
              setSearch("");
              setActiveCategory("all");
            },
            children: "Clear filters"
          }
        )
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "maids.empty_state", className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 text-4xl border-2 border-primary/15", children: "🏠" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: "No maids found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 mb-5", children: "Try a different search or category" }),
        (search || activeCategory !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "btn-outline-pink",
            size: "sm",
            onClick: () => {
              setSearch("");
              setActiveCategory("all");
            },
            children: "Clear filters"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((maid, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MaidCard, { maid, index: i + 1 }, maid.id.toText())) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "banner-gradient py-12 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "✨" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-white mb-2", children: "Are you a maid looking for work?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60 mb-6", children: "Register on Ghar Ka Kaam and connect with homeowners near you." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "maids.register_cta.primary_button",
          className: "btn-primary shadow-pink",
          children: "Register as Maid"
        }
      ) })
    ] }) }) })
  ] });
}
export {
  MaidsPage as default
};
