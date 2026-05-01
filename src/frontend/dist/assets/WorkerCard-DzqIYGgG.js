import { j as jsxRuntimeExports, e as cn, B as Briefcase, f as Phone, b as Button, L as Link, g as Sparkles, H as House } from "./index-D5ASyzS6.js";
import { B as Badge } from "./badge-7GCgTXu2.js";
import { C as Card, a as CardContent } from "./card-JZLgIumC.js";
import { W as WORK_TYPE_META } from "./types-D7fAxLqk.js";
import { R as RatingDisplay } from "./StarRating-Dhf_oYHL.js";
import { M as MapPin } from "./index-D8faD2En.js";
import { C as Clock } from "./clock-BxfKOb3c.js";
import { W as Wrench } from "./wrench-BeTwoe7Q.js";
import { H as Hammer } from "./hammer-DH3vruuy.js";
import { Z as Zap } from "./zap-DHP3rMnD.js";
import { B as Baby } from "./baby-D70gyuWx.js";
function getSkillIcon(skill) {
  const s = skill.toLowerCase();
  if (s.includes("plumb") || s.includes("pipe") || s.includes("water"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-3 w-3" });
  if (s.includes("carp") || s.includes("furniture") || s.includes("door"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-3 w-3" });
  if (s.includes("electr") || s.includes("wiring"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3" });
  if (s.includes("baby") || s.includes("child"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Baby, { className: "h-3 w-3" });
  if (s.includes("clean") || s.includes("cook") || s.includes("maid") || s.includes("sparkle"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" });
  if (s.includes("home") || s.includes("laundry"))
    return /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "h-3 w-3" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Hammer, { className: "h-3 w-3" });
}
function getAvatarGradient(str) {
  const gradients = [
    "from-primary/30 to-primary/10",
    "from-secondary/20 to-secondary/5",
    "from-primary/20 to-secondary/15",
    "from-primary/25 to-primary/8",
    "from-secondary/15 to-primary/10"
  ];
  const idx = str.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length;
  return gradients[idx];
}
function getAvatarText(str) {
  const colors = [
    "text-primary",
    "text-secondary",
    "text-primary",
    "text-primary",
    "text-secondary"
  ];
  const idx = str.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}
function WorkerCard({ worker, index = 1, className }) {
  const avatarGradient = getAvatarGradient(worker.name);
  const avatarText = getAvatarText(worker.name);
  const initials = worker.name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  const skills = worker.skills ?? [];
  const skillMetas = skills.slice(0, 3).map(
    (s) => WORK_TYPE_META[s] ?? {
      label: s,
      icon: "🛠️",
      color: "bg-muted text-muted-foreground"
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      "data-ocid": `worker.item.${index}`,
      className: cn(
        "group bg-card border border-border rounded-2xl overflow-hidden",
        "shadow-sm transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:shadow-pink-lg hover:border-primary/40",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full construction-gradient" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 pt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex-shrink-0 rounded-full bg-gradient-to-br flex items-center justify-center",
                  "font-display font-bold text-lg border-2 border-primary/20",
                  avatarGradient,
                  avatarText
                ),
                style: { height: "52px", width: "52px" },
                children: initials
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground truncate text-base", children: worker.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingDisplay, { rating: worker.averageRating }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary flex-shrink-0" }),
              worker.location
            ] }),
            worker.yearsExperience !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-primary" }),
              Number(worker.yearsExperience),
              " yrs exp"
            ] }),
            worker.completedJobsCount !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3 text-primary" }),
              Number(worker.completedJobsCount),
              " jobs"
            ] })
          ] }),
          worker.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 rounded-lg px-2.5 py-1.5 border border-primary/15", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: worker.phone })
          ] }),
          skillMetas.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1.5", children: [
            skillMetas.map((meta) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-[11px] px-2 py-0.5 border-0 bg-primary/10 text-primary font-medium flex items-center gap-1",
                children: [
                  getSkillIcon(meta.label),
                  meta.label || meta.icon
                ]
              },
              meta.label
            )),
            skills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "text-[11px] px-2 py-0.5 bg-muted text-muted-foreground border-0",
                children: [
                  "+",
                  skills.length - 3,
                  " more"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
            worker.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${worker.phone.replace(/\s+/g, "")}`,
                className: "flex-1",
                "data-ocid": `worker.call_button.${index}`,
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/workers/$workerId",
                params: { workerId: worker.id.toText() },
                className: worker.phone ? "" : "flex-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `worker.view_button.${index}`,
                    size: "sm",
                    variant: "outline",
                    className: cn(
                      "h-9 text-xs font-semibold rounded-xl border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 transition-all duration-200",
                      worker.phone ? "px-3" : "w-full btn-primary"
                    ),
                    children: worker.phone ? "Profile" : "View Profile & Hire"
                  }
                )
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  WorkerCard as W
};
