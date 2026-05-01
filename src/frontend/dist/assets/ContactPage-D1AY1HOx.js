import { r as reactExports, j as jsxRuntimeExports, f as Phone, b as Button, c as ue } from "./index-D5ASyzS6.js";
import { B as Badge } from "./badge-7GCgTXu2.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-JZLgIumC.js";
import { I as Input } from "./input-ZAgHlKlK.js";
import { L as Label } from "./label-BRLaVITT.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as ChevronUp, e as ChevronDown } from "./select-b-AYbpxr.js";
import { T as Textarea } from "./textarea-DhZv5i2k.js";
import { m as motion } from "./proxy-D6oRaX3w.js";
import { M as MessageSquare } from "./message-square-BVug2VO_.js";
import { S as Send } from "./send-Dim-qHFl.js";
import { C as Clock } from "./clock-BxfKOb3c.js";
import "./index-DvqHBqJ-.js";
const CONTACTS = [
  {
    icon: Phone,
    title: "Contact Person",
    name: "Aaryan Kathuga",
    phone: "8894186675",
    desc: "For all queries, support, payments, and issues related to the platform.",
    gradientClass: "construction-gradient",
    badgeClass: "border-primary text-primary"
  }
];
const FAQS = [
  {
    q: "How do I post a job on Ghar Ka Kaam?",
    a: "Simply sign up, click 'Post a Job', fill in your work details like type of work, location, budget and timeline. Workers in your area will see your job and can contact you directly."
  },
  {
    q: "How are workers verified?",
    a: "All workers go through identity verification and skill assessment. You can also check their profile ratings, past reviews, and completed jobs before hiring."
  },
  {
    q: "Is payment secure on the platform?",
    a: "Yes. We use milestone-based escrow payments. Your money is held securely and released to the worker only when you confirm each milestone is complete."
  },
  {
    q: "What types of work can I find workers for?",
    a: "We cover masonry, carpentry, painting, electrical, plumbing, tiling, general labor, renovation, and more. If it's home-related, we have workers for it."
  },
  {
    q: "How do I find and hire the right worker?",
    a: "Browse verified worker profiles, compare their ratings, reviews, experience, and skills — all in one place. Message the workers you like directly and hire them on the spot."
  },
  {
    q: "Can workers create free profiles?",
    a: "Absolutely. Workers can create a free profile, showcase their skills and past work, and start getting hired right away — no subscription fees required."
  }
];
const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 7:00 PM" },
  { day: "Saturday", time: "10:00 AM – 5:00 PM" },
  { day: "Sunday", time: "Closed" }
];
function FAQItem({ q, a }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border rounded-lg overflow-hidden",
      "data-ocid": "contact.faq.item",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen(!open),
            className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-card hover:bg-muted/30 transition-colors",
            "aria-expanded": open,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: q }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground flex-shrink-0" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 text-sm text-muted-foreground leading-relaxed bg-card border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-3", children: a }) })
      ]
    }
  );
}
function ContactPage() {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleSubjectChange(val) {
    setFormData((prev) => ({ ...prev, subject: val }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      ue.error("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    ue.success("Message sent! We'll get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative py-20 overflow-hidden",
        style: {
          backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/78" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "construction-gradient text-primary-foreground border-0 mb-4 uppercase tracking-wider text-xs font-semibold px-3 py-1", children: "Get in Touch" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-extrabold text-card mb-4", children: "We're Here to Help" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-card/75 max-w-lg mx-auto text-lg", children: "Reach out to the right person directly — no bots, no queues. Real people who care about your experience." })
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-1 gap-6 max-w-sm mx-auto", children: CONTACTS.map((c, i) => {
      const Icon = c.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          "data-ocid": `contact.contact_card.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full border-border shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 pb-5 text-center space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `mx-auto h-14 w-14 rounded-2xl ${c.gradientClass} flex items-center justify-center shadow-md`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-card" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `${c.badgeClass} text-xs font-semibold mb-2`,
                  children: c.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base", children: c.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: c.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: `tel:${c.phone}`,
                className: "flex items-center justify-center gap-2 bg-muted rounded-lg px-4 py-2.5 hover:bg-primary/10 transition-colors group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground group-hover:text-primary transition-colors", children: [
                    "+91 ",
                    c.phone
                  ] })
                ]
              }
            )
          ] }) })
        },
        c.title
      );
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:col-span-3",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg construction-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-xl", children: "Send Us a Message" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", className: "text-sm font-medium", children: "Your Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      name: "name",
                      "data-ocid": "contact.name.input",
                      placeholder: "Rahul Sharma",
                      value: formData.name,
                      onChange: handleChange,
                      className: "border-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-sm font-medium", children: "Email Address" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      name: "email",
                      type: "email",
                      "data-ocid": "contact.email.input",
                      placeholder: "rahul@example.com",
                      value: formData.email,
                      onChange: handleChange,
                      className: "border-input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Subject" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: formData.subject,
                    onValueChange: handleSubjectChange,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          "data-ocid": "contact.subject.select",
                          className: "border-input",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a topic…" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "general", children: "General Query" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "payment", children: "Payment Issue" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "complaint", children: "Complaint / Issue" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "feedback", children: "Feedback" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "partnership", children: "Partnership" })
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "message", className: "text-sm font-medium", children: "Message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "message",
                    name: "message",
                    "data-ocid": "contact.message.textarea",
                    placeholder: "Describe your query in detail…",
                    rows: 5,
                    value: formData.message,
                    onChange: handleChange,
                    className: "border-input resize-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  "data-ocid": "contact.form.submit_button",
                  className: "btn-primary w-full",
                  disabled: submitting,
                  children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }),
                    "Sending…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
                    "Send Message"
                  ] })
                }
              )
            ] }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "lg:col-span-2 space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg construction-gradient flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Working Hours" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-2 space-y-3", children: [
                HOURS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between items-center py-2.5 border-b border-border last:border-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: h.day }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-sm font-semibold ${h.time === "Closed" ? "text-destructive" : "text-foreground"}`,
                          children: h.time
                        }
                      )
                    ]
                  },
                  h.day
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pt-1", children: "* All times are in IST (India Standard Time)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/30 bg-primary/5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full construction-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-primary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm mb-1", children: "Prefer to call directly?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Our team is available during working hours for urgent queries. Choose the right contact for faster resolution." })
              ] })
            ] }) }) })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center mb-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-primary text-primary mb-3",
                children: "Frequently Asked"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-bold text-foreground", children: "Common Questions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Can't find your answer? Reach out directly — we're happy to help." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.06 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FAQItem, { q: faq.q, a: faq.a })
        },
        faq.q
      )) })
    ] }) })
  ] });
}
export {
  ContactPage as default
};
