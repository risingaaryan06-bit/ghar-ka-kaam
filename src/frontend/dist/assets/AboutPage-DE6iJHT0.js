import { d as createLucideIcon, j as jsxRuntimeExports, n as HardHat, H as House, L as Link, b as Button, U as Users } from "./index-D5ASyzS6.js";
import { B as Badge } from "./badge-7GCgTXu2.js";
import { C as Card, a as CardContent } from "./card-JZLgIumC.js";
import { m as motion } from "./proxy-D6oRaX3w.js";
import { C as CircleCheck } from "./circle-check-CVdAC1pa.js";
import { M as MapPin } from "./index-D8faD2En.js";
import { S as Star } from "./star-D8-H6J5G.js";
import { S as Shield } from "./shield-Bq4Jsf7E.js";
import { H as Heart } from "./heart-RTyXaSKK.js";
import { W as Wrench } from "./wrench-BeTwoe7Q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$2);
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
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
      key: "m3kijz"
    }
  ],
  [
    "path",
    {
      d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
      key: "1fmvmk"
    }
  ],
  ["path", { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0", key: "1f8sc4" }],
  ["path", { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5", key: "qeys4" }]
];
const Rocket = createLucideIcon("rocket", __iconNode);
const STATS = [
  { value: "10,000+", label: "Jobs Completed", icon: CircleCheck },
  { value: "5,000+", label: "Skilled Workers", icon: HardHat },
  { value: "50+", label: "Cities Covered", icon: MapPin },
  { value: "4.8★", label: "Average Rating", icon: Star }
];
const VALUES = [
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "Every worker is verified with background checks. Your home, your safety — our priority."
  },
  {
    icon: Lightbulb,
    title: "Transparency",
    desc: "Clear pricing, no hidden fees. Browse and compare worker profiles side-by-side with full confidence."
  },
  {
    icon: Heart,
    title: "Community First",
    desc: "We uplift local laborers by connecting them directly to homeowners — no middlemen."
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    desc: "Workers grow their careers; homeowners get quality work. Win-win every time."
  }
];
const HOMEOWNER_BENEFITS = [
  "Post jobs for free and hire workers directly",
  "Compare worker ratings, reviews & pricing",
  "Milestone-based secure payment system",
  "Real-time messaging with workers",
  "Quality guarantee on every project",
  "Hire from a pool of 5,000+ verified workers"
];
const WORKER_BENEFITS = [
  "Build a verified digital profile & portfolio",
  "Get hired for jobs matching your skills",
  "Get paid securely for every milestone",
  "Grow your business with reviews & ratings",
  "Access a steady stream of local projects",
  "Zero subscription fees to get started"
];
const TEAM = [
  {
    name: "Aaryan Kathuga",
    role: "Contact Person",
    contact: "8894186675",
    emoji: "📞",
    desc: "Your primary point of contact for all queries, support, and assistance."
  }
];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        "data-ocid": "about.hero.section",
        className: "relative min-h-[55vh] flex items-center overflow-hidden",
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "max-w-2xl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "construction-gradient text-primary-foreground border-0 mb-4 text-xs font-semibold uppercase tracking-wider px-3 py-1", children: "Our Story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-extrabold text-card leading-tight mb-4", children: [
                  "Connecting Homes",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "with Skilled Hands" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-card/80 text-lg leading-relaxed max-w-xl", children: "Ghar Ka Kaam was born from a simple idea — every homeowner deserves skilled, trustworthy labor, and every worker deserves fair pay and steady work." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: STATS.map((stat, i) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "flex flex-col items-center text-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl construction-gradient flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-extrabold text-foreground", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: stat.label })
          ]
        },
        stat.label
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-primary text-primary mb-4",
                children: "How It Started"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold text-foreground mb-5 leading-tight", children: [
              "Built by Indians,",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "for Indian Homes"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-muted-foreground leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Millions of Indian homeowners struggle to find reliable laborers for repairs, renovations, and construction — while millions of skilled workers struggle to find consistent, well-paying work. Ghar Ka Kaam bridges this gap." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Founded in 2024, we set out to digitize India's labor market and create a transparent, fair platform where quality work meets fair pay. From a simple paint job to a full home renovation, we handle it all." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Today, we operate across 50+ cities, connecting over 5,000 verified workers with homeowners who need them — all through a simple, mobile-first platform." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80",
                alt: "Skilled workers at construction site",
                className: "rounded-2xl shadow-xl w-full object-cover h-80"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full construction-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: "India's #1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Labor Connect Platform" })
              ] })
            ] }) })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-primary text-primary mb-3",
                children: "What We Stand For"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Our Core Values" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6", children: VALUES.map((val, i) => {
        const Icon = val.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full card-elevated border-border/50 hover:border-primary/40 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl construction-gradient flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: val.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: val.desc })
            ] }) })
          },
          val.title
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Built for Everyone on the Job Site" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full border-border shadow-md overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "construction-gradient px-6 py-5 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-6 w-6 text-primary-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-primary-foreground", children: "For Homeowners" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 space-y-3", children: HOMEOWNER_BENEFITS.map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: benefit })
              ] }, benefit)) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full border-border shadow-md overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary px-6 py-5 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-6 w-6 text-secondary-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-secondary-foreground", children: "For Workers" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 space-y-3", children: WORKER_BENEFITS.map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-secondary mt-0.5 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: benefit })
              ] }, benefit)) })
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-12",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-primary text-primary mb-3",
                children: "The Team"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Meet the People Behind Ghar Ka Kaam" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-1 gap-6 max-w-xs mx-auto", children: TEAM.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center card-elevated border-border/50 hover:border-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-16 w-16 rounded-full construction-gradient flex items-center justify-center text-3xl shadow-md", children: member.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: member.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-primary font-semibold uppercase tracking-wide", children: member.role })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: member.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${member.contact}`,
                className: "inline-block text-sm font-bold text-secondary hover:text-secondary/80 transition-colors",
                children: [
                  "+91 ",
                  member.contact
                ]
              }
            )
          ] }) })
        },
        member.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 overflow-hidden",
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 60%"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl font-extrabold text-card mb-4", children: "Ready to Get Started?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-card/80 max-w-md mx-auto mb-8", children: "Join thousands of homeowners and workers already using Ghar Ka Kaam to get work done right." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/post-job", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      "data-ocid": "about.cta_post_job.primary_button",
                      size: "lg",
                      className: "btn-primary text-base w-full sm:w-auto",
                      children: "Post a Job Free"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/workers", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      "data-ocid": "about.cta_find_workers.secondary_button",
                      size: "lg",
                      variant: "outline",
                      className: "border-card/50 text-card hover:bg-card/10 w-full sm:w-auto",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 mr-2" }),
                        "Browse Workers"
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
  AboutPage as default
};
