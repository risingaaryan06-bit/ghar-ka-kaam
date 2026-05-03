import { c as createLucideIcon, n as useInternetIdentity, a6 as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, H as House, b as Briefcase, d as Sparkles, l as HardHat } from "./index-Bl6m0gAG.js";
import { C as Card, a as CardContent } from "./card-BOlP-LKW.js";
import { Z as Zap } from "./zap-RxZkr_NM.js";
import { A as ArrowRight } from "./arrow-right-INLZETnx.js";
import { C as CircleCheck } from "./circle-check-C-fSTZgk.js";
import { B as Baby } from "./baby-CjYl5-VT.js";
import { S as Shield } from "./shield-crZFjXTF.js";
import { S as Smartphone } from "./smartphone-BNmbRkEe.js";
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
      d: "M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z",
      key: "1qvrer"
    }
  ],
  ["path", { d: "M6 17h12", key: "1jwigz" }]
];
const ChefHat = createLucideIcon("chef-hat", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const STEPS = [
  {
    step: "1",
    title: "Click Sign Up",
    description: "Tap the button below to open Internet Identity — no email or password required."
  },
  {
    step: "2",
    title: "Verify with your device",
    description: "Use Face ID, fingerprint, or a PIN to confirm your identity securely."
  },
  {
    step: "3",
    title: "Set up your profile",
    description: "Tell us your name, location, and what role fits you — homeowner, laborer, or maid service provider."
  },
  {
    step: "4",
    title: "Start hiring or working",
    description: "Post jobs, connect with workers and maids, or browse opportunities — all in one place."
  }
];
const ROLES = [
  {
    icon: House,
    title: "Homeowners",
    description: "Find verified workers and maids for any home need.",
    points: [
      "Post construction & repair jobs",
      "Hire cooks, cleaners & more",
      "Compare ratings & reviews",
      "Secure milestone payments"
    ]
  },
  {
    icon: Briefcase,
    title: "Skilled Laborers",
    description: "Masons, carpenters, electricians, plumbers & more.",
    color: "bg-orange-100 text-orange-700",
    points: [
      "Browse jobs near you",
      "Showcase your skills",
      "Build your reputation",
      "Get paid directly"
    ]
  },
  {
    icon: Sparkles,
    title: "Maid Service Providers",
    description: "Cooks, cleaners, childcare, laundry & babysitters.",
    color: "bg-rose-100 text-rose-700",
    points: [
      "Set your own hourly/daily rate",
      "Choose your service category",
      "Connect with families nearby",
      "Earn steady income"
    ]
  }
];
const MAID_SERVICES = [
  { icon: ChefHat, label: "Cook", desc: "Prepare daily meals for families" },
  {
    icon: Sparkles,
    label: "House Cleaner",
    desc: "Deep cleaning & regular upkeep"
  },
  {
    icon: Baby,
    label: "Childcare & Babysitter",
    desc: "Nurturing care for children"
  },
  { icon: Zap, label: "Laundry", desc: "Washing, folding & ironing" }
];
function SignupPage() {
  const { isAuthenticated, login, isLoggingIn, isInitializing } = useInternetIdentity();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isAuthenticated, navigate]);
  const isLoading = isLoggingIn || isInitializing;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[calc(100vh-4rem)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 px-4 overflow-hidden",
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/72" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl mx-auto text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: "Free to join — no hidden charges" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-3xl md:text-5xl text-white leading-tight mb-4", children: [
              "Join Ghar Ka Kaam",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "in 60 seconds" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg mb-3 leading-relaxed", children: "India's fastest-growing platform for homeowners, skilled laborers, and home service providers." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-sm mb-8", children: "Hire workers, find maids, or get hired — all in one place." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "signup.submit_button",
                className: "btn-primary text-base px-8 py-4 h-auto text-lg shadow-2xl",
                onClick: login,
                disabled: isLoading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 mr-2" }),
                  isLoading ? "Opening Internet Identity..." : "Create Free Account",
                  !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 ml-2" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs mt-4", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/login",
                  className: "text-primary font-semibold hover:underline",
                  children: "Sign in here"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground text-center mb-10", children: "How it works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: STEPS.map(({ step, title, description }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `signup.step.${i + 1}`,
          className: "flex items-start gap-4 p-4 bg-card rounded-xl border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full construction-gradient flex items-center justify-center shrink-0 shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-bold text-sm", children: step }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 leading-relaxed", children: description })
            ] }),
            i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground shrink-0 mt-2.5" })
          ]
        },
        step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground text-center mb-2", children: "Choose your path" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm mb-10", children: "Three ways to use Ghar Ka Kaam — you can always update your role later." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: ROLES.map(({ icon: Icon, title, description, points }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `signup.role_card.${i + 1}`,
          className: "border-2 border-border hover:border-primary/50 transition-smooth",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl construction-gradient flex items-center justify-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground leading-tight", children: title }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4 leading-relaxed", children: description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: points.map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground", children: point })
            ] }, point)) })
          ] })
        },
        title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-center mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl construction-gradient flex items-center justify-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "New: Maid Services" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm mb-8", children: "We've expanded beyond construction — now hire trusted home service providers for everyday needs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: MAID_SERVICES.map(({ icon: Icon, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center text-center p-4 bg-card rounded-xl border border-border hover:border-primary/40 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-rose-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: desc })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/maids", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "signup.browse_maids.button",
          variant: "outline",
          className: "border-primary/40 text-primary hover:bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
            "Browse Maid Services"
          ]
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2 border-primary/30 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl construction-gradient flex items-center justify-center shadow shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-6 w-6 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: "What is Internet Identity?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Internet Identity is a secure, privacy-preserving login system. It uses your device's built-in security (Face ID, fingerprint, PIN) to create an identity that's completely private — no company can track you across sites." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
          { icon: Shield, label: "No password to remember" },
          { icon: Smartphone, label: "Works on any device" },
          { icon: Zap, label: "Instant, secure login" }
        ].map(({ icon: Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs text-foreground bg-card rounded-lg p-2.5 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary shrink-0" }),
              label
            ]
          },
          label
        )) })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 construction-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-10 w-10 text-primary-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-extrabold text-2xl text-primary-foreground mb-3", children: "Ready to get started?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mb-6", children: "Join thousands of homeowners, laborers, and home service providers already on Ghar Ka Kaam." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "signup.cta.submit_button",
          className: "bg-card text-primary hover:bg-card/90 font-bold px-8 py-3 h-auto text-base shadow-xl",
          onClick: login,
          disabled: isLoading,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-5 w-5 mr-2" }),
            isLoading ? "Opening..." : "Sign Up Free Now"
          ]
        }
      )
    ] }) })
  ] });
}
export {
  SignupPage as default
};
