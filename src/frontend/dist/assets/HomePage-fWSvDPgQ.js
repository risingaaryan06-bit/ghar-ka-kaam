import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, U as Users, l as HardHat, L as Link, b as Briefcase } from "./index-Bl6m0gAG.js";
import { B as Badge } from "./badge-BnwEIvSF.js";
import { m as motion } from "./proxy-BQt9Bh9G.js";
import { M as MapPin } from "./index-CL8mI724.js";
import { W as Wrench } from "./wrench-mSk-es6i.js";
import { W as WorkerCard } from "./WorkerCard-DyTnuu3t.js";
import { C as Card, a as CardContent } from "./card-BOlP-LKW.js";
import { S as Skeleton } from "./skeleton-Cl90XyEF.js";
import { i as usePlatformStats, j as useListWorkers, k as useListMaids } from "./useQueries-DlGKg5lf.js";
import { M as MAID_WORK_TYPES } from "./types-DGUL2UgN.js";
import { C as ClipboardList } from "./clipboard-list-Cp7S-_cj.js";
import { C as CircleCheck } from "./circle-check-C-fSTZgk.js";
import { S as Star } from "./star-FaVzG57j.js";
import { S as Search } from "./search-DEULgNsb.js";
import { C as CreditCard } from "./credit-card-BXb6_VXb.js";
import { A as ArrowRight } from "./arrow-right-INLZETnx.js";
import { S as Shield } from "./shield-crZFjXTF.js";
import { Z as Zap } from "./zap-RxZkr_NM.js";
import "./StarRating-tS6JAhqF.js";
import "./clock-Fe6S3N1I.js";
import "./hammer-Dxxls0wG.js";
import "./baby-CjYl5-VT.js";
import "./backend-DBy7dtNU.js";
import "./useActor-Bw0dW3YB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
const NEARBY_WORKERS = [
  { name: "Hira Singh", skill: "Plumber", distance: "0.8 km", available: true },
  { name: "Chintu", skill: "Plumber", distance: "1.2 km", available: true },
  { name: "Lucky", skill: "Carpenter", distance: "2.1 km", available: true },
  {
    name: "Suresh Painter",
    skill: "Painter",
    distance: "3.4 km",
    available: false
  },
  {
    name: "Arvind Electrician",
    skill: "Electrician",
    distance: "1.9 km",
    available: true
  },
  { name: "Raju Mistri", skill: "Mason", distance: "4.2 km", available: true }
];
function WorkerPinCard({
  name,
  skill,
  distance,
  available,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.3, delay: index * 0.06 },
      "data-ocid": `map.worker_pin.${index}`,
      className: "flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 shadow-sm hover:border-primary/40 hover:shadow-pink transition-all duration-200 cursor-pointer",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/12 border border-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: skill })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-primary", children: distance }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${available ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
              children: available ? "Available" : "Busy"
            }
          )
        ] })
      ]
    }
  );
}
function MapSection() {
  const [coords, setCoords] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState("idle");
  const requestLocation = reactExports.useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("denied");
      return;
    }
    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setStatus("granted");
      },
      () => {
        setStatus("denied");
      },
      { timeout: 1e4 }
    );
  }, []);
  reactExports.useEffect(() => {
    requestLocation();
  }, [requestLocation]);
  const mapSrc = coords ? `https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.03},${coords.lat - 0.02},${coords.lon + 0.03},${coords.lat + 0.02}&layer=mapnik&marker=${coords.lat},${coords.lon}` : "https://www.openstreetmap.org/export/embed.html?bbox=77.17,28.56,77.23,28.60&layer=mapnik";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      "data-ocid": "map.section",
      className: "bg-card py-16 border-y border-primary/10",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            className: "text-center mb-10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5 mr-1.5" }),
                "Location"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2", children: "Find Workers Near You" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-md mx-auto", children: "Workers available in your area — share your location to see who's closest" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "lg:col-span-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-pink-lg", children: [
                  status === "requesting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-medium", children: "Getting your location…" })
                  ] }),
                  status === "denied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 gap-4 p-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl", children: "📍" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground mb-1", children: "Enable location access" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Allow location access to see workers available near you" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        "data-ocid": "map.enable_location.button",
                        className: "btn-primary",
                        size: "sm",
                        onClick: requestLocation,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 mr-1.5" }),
                          "Enable Location"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "iframe",
                    {
                      title: "Workers near you",
                      src: mapSrc,
                      width: "100%",
                      height: "340",
                      style: { border: 0, display: "block" },
                      loading: "lazy",
                      referrerPolicy: "no-referrer-when-downgrade"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-elevated flex items-center gap-2 border border-primary/15", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
                      NEARBY_WORKERS.filter((w) => w.available).length,
                      " workers available nearby"
                    ] })
                  ] }),
                  coords && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 right-3 bg-primary/90 text-primary-foreground text-xs px-2.5 py-1.5 rounded-lg font-semibold shadow-sm", children: "📍 Your location" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-2", children: [
                  "Map data ©",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "https://www.openstreetmap.org/copyright",
                      target: "_blank",
                      rel: "noreferrer",
                      className: "underline hover:text-primary",
                      children: "OpenStreetMap"
                    }
                  ),
                  " ",
                  "contributors"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.1 },
              className: "lg:col-span-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm", children: "Workers in Your Area" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: NEARBY_WORKERS.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WorkerPinCard,
                  {
                    name: w.name,
                    skill: w.skill,
                    distance: w.distance,
                    available: w.available,
                    index: i + 1
                  },
                  w.name
                )) })
              ]
            }
          )
        ] })
      ] })
    }
  );
}
const CONSTRUCTION_CATS = [
  { type: "masonry", label: "Masonry", icon: "🧱" },
  { type: "carpentry", label: "Carpentry", icon: "🪚" },
  { type: "plumbing", label: "Plumbing", icon: "🔧" },
  { type: "electrical", label: "Electrical", icon: "⚡" },
  { type: "painting", label: "Painting", icon: "🖌️" },
  { type: "general", label: "General Labor", icon: "🔨" }
];
const MAID_CATS = [
  { type: "cook", label: "Cook", icon: "👩‍🍳" },
  { type: "houseCleaner", label: "House Cleaner", icon: "🧹" },
  { type: "laundry", label: "Laundry", icon: "👕" },
  { type: "childcare", label: "Childcare", icon: "👶" },
  { type: "babysitter", label: "Babysitter", icon: "🍼" },
  { type: "maidServices", label: "Maid Services", icon: "🏠" }
];
const STEPS = [
  {
    step: 1,
    title: "Post Your Job",
    desc: "Describe the work, set your budget and location. Always free to post!",
    icon: ClipboardList,
    emoji: "📋"
  },
  {
    step: 2,
    title: "Browse Profiles",
    desc: "View verified worker and maid profiles, sorted by experience and area.",
    icon: Search,
    emoji: "🔍"
  },
  {
    step: 3,
    title: "Hire Directly",
    desc: "Pick the right person, message them, and pay securely via milestones.",
    icon: CreditCard,
    emoji: "✅"
  }
];
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "PS",
    rating: 5,
    text: "Found an excellent mason in just 2 hours! Great profiles, easy to compare, and transparent pricing.",
    job: "Kitchen Wall Repair"
  },
  {
    name: "Rohit Verma",
    location: "Mumbai",
    avatar: "RV",
    rating: 5,
    text: "Hired a cook from Ghar Ka Kaam — she's been with us for 3 months. The platform made it super simple.",
    job: "Home Cook — Full Time"
  },
  {
    name: "Sunita Gupta",
    location: "Bangalore",
    avatar: "SG",
    rating: 5,
    text: "The cleaner we hired through this app is thorough and reliable. Ratings gave us real confidence.",
    job: "Weekly Cleaning Service"
  }
];
const TRUST = [
  {
    icon: Shield,
    title: "Verified Profiles",
    desc: "Identity-verified workers and maids before they join",
    emoji: "🛡️"
  },
  {
    icon: Star,
    title: "Rated & Reviewed",
    desc: "Read real reviews from homeowners like you",
    emoji: "⭐"
  },
  {
    icon: CreditCard,
    title: "Safe Payments",
    desc: "Secure milestone-based payments via Stripe",
    emoji: "💳"
  }
];
const ACTION_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
    alt: "Construction workers on a job site",
    caption: "Skilled Construction Workers",
    sub: "Masons, carpenters, electricians & more — ready for any project",
    badge: "🏗️ Construction"
  },
  {
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80&auto=format&fit=crop",
    alt: "Caregiver with infant",
    caption: "Trusted Babysitters & Caregivers",
    sub: "Experienced caregivers for your little ones — warm, gentle & reliable",
    badge: "🍼 Childcare"
  }
];
function StatBadge({
  value,
  label,
  icon: Icon,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-primary/12 flex items-center justify-center mx-auto mb-2 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 mx-auto mb-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground leading-none", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-medium", children: label })
  ] });
}
function CategoryPill({
  icon,
  label,
  index,
  to
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.9 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true },
      transition: { duration: 0.3, delay: index * 0.05 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-border bg-card hover:border-primary/40 hover:bg-primary/5 cursor-pointer transition-all duration-200 group shadow-sm hover:shadow-pink", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-xl bg-primary/8 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200 border border-primary/15", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground text-center leading-tight", children: label })
      ] }) })
    }
  );
}
function HomePage() {
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { data: workers, isLoading: workersLoading } = useListWorkers();
  const { data: maids, isLoading: maidsLoading } = useListMaids();
  const allProfiles = [
    ...(workers ?? []).filter(
      (w) => !MAID_WORK_TYPES.some((m) => (w.skills ?? []).includes(m))
    ),
    ...maids ?? []
  ];
  const featured = [...allProfiles].filter((p) => (p.averageRating ?? 0) > 0).sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0)).slice(0, 4);
  const isLoadingFeatured = workersLoading || maidsLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "hero.section",
        className: "relative overflow-hidden",
        style: {
          background: "linear-gradient(160deg, oklch(0.85 0.08 350) 0%, oklch(0.93 0.05 350) 40%, oklch(0.97 0.02 350) 100%)",
          minHeight: "600px"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-30",
              style: {
                background: "radial-gradient(circle, oklch(0.78 0.12 350) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 -left-16 h-64 w-64 rounded-full opacity-20",
              style: {
                background: "radial-gradient(circle, oklch(0.65 0.14 340) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pink-dot-pattern opacity-40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-4 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55 },
                className: "space-y-6 max-w-xl",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-secondary text-secondary-foreground border-0 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-3.5 w-3.5 mr-1.5" }),
                    "Ghar Ka Kaam — घर का काम"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl lg:text-5xl font-display font-extrabold text-foreground leading-[1.1] tracking-tight", children: [
                    "Your Home,",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-pink", children: "Perfectly Managed." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-lg text-foreground/65 leading-relaxed max-w-xl", children: "Hire verified construction workers, skilled maids, cooks, cleaners and more — all in one place." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/40 font-medium", children: "कुशल कारीगरों और सेवाओं से सीधे जुड़ें — सरल, सुरक्षित और किफायती।" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        "data-ocid": "hero.find_workers.primary_button",
                        size: "lg",
                        className: "btn-primary font-bold shadow-pink h-11 px-6",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4 mr-2" }),
                          "Find Workers"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        "data-ocid": "hero.find_maids.primary_button",
                        size: "lg",
                        className: "btn-outline-pink font-bold h-11 px-6",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 text-base", children: "🏠" }),
                          "Find Maids"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        "data-ocid": "hero.post_job.secondary_button",
                        size: "lg",
                        className: "btn-secondary font-semibold h-11 px-6",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 mr-2" }),
                          "Post a Job"
                        ]
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-4 pt-1", children: [
                    "Free to post jobs",
                    "Verified professionals",
                    "Secure payments"
                  ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 text-foreground/55 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-primary flex-shrink-0" }),
                        item
                      ]
                    },
                    item
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 30 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.65, delay: 0.15 },
                className: "hidden lg:block relative",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-pink-lg border-4 border-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80&auto=format&fit=crop",
                        alt: "Indian construction workers on a job site",
                        className: "w-full h-80 object-cover"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full construction-gradient flex items-center justify-center text-white font-bold flex-shrink-0", children: "RS" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "Rajesh Singh — Plumber" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5", children: [
                          [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Star,
                            {
                              className: "h-3 w-3 fill-primary text-primary"
                            },
                            s
                          )),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "4.9 · 87 jobs" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/12 text-primary border-0 text-xs ml-auto flex-shrink-0", children: "Available" })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-xl p-3 shadow-elevated animate-float", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold", children: "500+ Workers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-secondary-foreground/70", children: "Pan India" })
                  ] })
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute bottom-0 left-0 right-0 h-8 bg-card",
              style: { clipPath: "ellipse(55% 100% at 50% 100%)" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b-2 border-primary/10 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 md:gap-20 max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatBadge,
        {
          value: stats ? `${Number(stats.totalJobs).toLocaleString("en-IN")}+` : "200+",
          label: "Jobs Posted",
          icon: ClipboardList,
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatBadge,
        {
          value: stats ? `${Number(stats.totalWorkers).toLocaleString("en-IN")}+` : "500+",
          label: "Professionals",
          icon: Users,
          loading: statsLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatBadge,
        {
          value: stats ? `${Number(stats.totalCompletedJobs).toLocaleString("en-IN")}+` : "150+",
          label: "Completed",
          icon: CircleCheck,
          loading: statsLoading
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "categories.section", className: "pink-section py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold", children: "All Services" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2", children: "What Do You Need?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Browse workers and home service professionals by category" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-xl construction-gradient flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base", children: "Construction & Repairs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary ml-2 hover:underline cursor-pointer font-semibold", children: "View all →" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-3", children: CONSTRUCTION_CATS.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryPill,
          {
            icon: cat.icon,
            label: cat.label,
            index: i,
            to: "/jobs"
          },
          cat.type
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-xl bg-secondary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "🏠" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base", children: "Maids & Home Services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary ml-2 hover:underline cursor-pointer font-semibold", children: "View all →" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-6 gap-3", children: MAID_CATS.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CategoryPill,
          {
            icon: cat.icon,
            label: cat.label,
            index: i,
            to: "/maids"
          },
          cat.type
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "work_action.section", className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold", children: "Our Work" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2", children: "Our Work In Action" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Real professionals, real results — across construction & home care" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: ACTION_IMAGES.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: i === 0 ? 20 : -20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.15 },
          "data-ocid": `work_action.image.${i + 1}`,
          className: "group relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-pink hover:shadow-pink-lg transition-all duration-300 hover:border-primary/40 hover:scale-[1.02]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img.src,
                alt: img.alt,
                className: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-sm", children: img.badge }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-white text-lg leading-tight mb-1", children: img.caption }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/75 text-xs leading-relaxed", children: img.sub })
            ] })
          ]
        },
        img.caption
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MapSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "how-it-works.section", className: "bg-card py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary/8 text-secondary border-0 mb-3 px-3 py-1 text-xs font-semibold", children: "Simple Process" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2", children: "How It Works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Hire anyone in 3 simple steps" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.45, delay: i * 0.12 },
          className: "relative flex flex-col items-center text-center p-7 rounded-2xl border-2 border-primary/12 bg-background hover:border-primary/30 hover:shadow-pink transition-all duration-200",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl construction-gradient flex items-center justify-center shadow-pink mb-5 text-2xl", children: s.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 h-7 w-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center", children: s.step }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base mb-2", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: s.desc })
          ]
        },
        s.step
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center mt-8 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "how-it-works.post_job.primary_button",
            className: "btn-primary h-11 px-6",
            children: [
              "Post a Job Free",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "how-it-works.browse.secondary_button",
            variant: "outline",
            className: "h-11 px-6 border-border hover:border-primary/40 hover:bg-primary/5",
            children: "Browse Professionals"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "featured.section", className: "pink-section py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 mb-2 px-3 py-1 text-xs font-semibold", children: "Top Rated" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-1", children: "Meet Our Professionals" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Highest-rated workers and maids on the platform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "featured.view_workers.link",
                  variant: "outline",
                  size: "sm",
                  className: "border-border hover:border-primary/40 hover:bg-primary/5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-3.5 w-3.5 mr-1.5 text-primary" }),
                    "Workers"
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  "data-ocid": "featured.view_maids.link",
                  variant: "outline",
                  size: "sm",
                  className: "border-border hover:border-primary/40 hover:bg-primary/5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1.5 text-sm", children: "🏠" }),
                    "Maids"
                  ]
                }
              ) })
            ] })
          ]
        }
      ),
      isLoadingFeatured ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 space-y-3 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-full flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full rounded-lg" })
      ] }, i)) }) : featured.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4", children: featured.map((profile, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.4, delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCard, { worker: profile, index: i + 1 })
        },
        profile.id.toText()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "featured.empty_state",
          className: "text-center py-16 card-elevated rounded-2xl border-2 border-dashed border-primary/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-3xl", children: "👷" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-1", children: "No professionals yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Be the first to join our platform!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "featured.join.primary_button",
                className: "btn-primary",
                children: "Join as a Professional"
              }
            ) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "testimonials.section", className: "bg-card py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-0 mb-3 px-3 py-1 text-xs font-semibold", children: "Testimonials" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-2", children: "What Our Users Say" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Thousands of happy homeowners across India" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: i === 1 ? -16 : 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              "data-ocid": `testimonials.item.${i + 1}`,
              className: "card-elevated h-full border-t-4 border-t-primary hover:shadow-pink transition-all duration-200",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: Array.from({ length: t.rating }, (_, s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "h-4 w-4 fill-primary text-primary"
                  },
                  `${t.name}-${s}`
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/75 leading-relaxed flex-1 italic", children: [
                  '"',
                  t.text,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-3 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full construction-gradient flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-sm", children: t.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm truncate", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      t.location,
                      " · ",
                      t.job
                    ] })
                  ] })
                ] })
              ] })
            }
          )
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pink-section border-y border-primary/10 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-8 text-center", children: TRUST.map(({ title, desc, emoji }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.1 },
        className: "flex flex-col items-center gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-card flex items-center justify-center text-2xl shadow-sm border-2 border-primary/15", children: emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[200px]", children: desc })
        ]
      },
      title
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "cta.section",
        className: "relative overflow-hidden py-20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 banner-gradient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-0 left-1/2 -translate-x-1/2 h-full w-3/4 opacity-15 blur-3xl",
              style: {
                background: "radial-gradient(ellipse, oklch(0.80 0.12 350) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 construction-gradient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "max-w-2xl mx-auto space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-5 w-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm uppercase tracking-widest", children: "Get Started Today" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-4xl font-display font-extrabold text-white leading-tight", children: [
                  "Find the Right Help ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
                  "for Your Home"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-base max-w-lg mx-auto leading-relaxed", children: "Whether it's a construction job or daily household help, find verified, reviewed professionals near you." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "cta.find_workers.primary_button",
                      size: "lg",
                      className: "btn-primary font-bold h-12 px-7 shadow-pink",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 mr-2" }),
                        "Find Workers"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "cta.find_maids.primary_button",
                      size: "lg",
                      className: "bg-white/10 border border-white/20 text-white hover:bg-white/20 font-bold h-12 px-7",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: "🏠" }),
                        "Find Maids"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "cta.post_job.secondary_button",
                      size: "lg",
                      className: "bg-white text-foreground hover:bg-white/90 font-semibold border-0 h-12 px-7 shadow-sm",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4 mr-2" }),
                        "Post a Job"
                      ]
                    }
                  ) })
                ] })
              ]
            }
          ) })
        ]
      }
    )
  ] });
}
export {
  HomePage as default
};
