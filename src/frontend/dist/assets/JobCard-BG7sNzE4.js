import { j as jsxRuntimeExports, e as cn, L as Link, b as Button } from "./index-D5ASyzS6.js";
import { C as Card, a as CardContent } from "./card-JZLgIumC.js";
import { W as WORK_TYPE_META, J as JobStatus, t as timeAgo, f as formatBudget } from "./types-D7fAxLqk.js";
import { M as MapPin } from "./index-D8faD2En.js";
import { C as Calendar } from "./calendar-mCFMjJLa.js";
const statusConfig = {
  [JobStatus.open]: {
    label: "Open",
    cls: "bg-primary/12 text-primary border-primary/25 border"
  },
  [JobStatus.assigned]: {
    label: "Assigned",
    cls: "bg-secondary/10 text-secondary border-secondary/20 border"
  },
  [JobStatus.completed]: {
    label: "Completed",
    cls: "bg-muted text-muted-foreground border-border border"
  },
  [JobStatus.cancelled]: {
    label: "Cancelled",
    cls: "bg-destructive/10 text-destructive border-destructive/20 border"
  }
};
function JobCard({ job, index = 1, className }) {
  const meta = WORK_TYPE_META[job.workType] ?? WORK_TYPE_META.other;
  const status = statusConfig[job.status] ?? statusConfig[JobStatus.open];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": `job.item.${index}`,
      className: cn(
        "group bg-card rounded-xl border border-border shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/25",
        "border-l-4 border-l-primary",
        className
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl border border-primary/15", children: meta.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm leading-snug truncate", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: job.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-xs font-semibold rounded-full px-2.5 py-0.5",
                  status.cls
                ),
                children: status.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  meta.color
                ),
                children: meta.label
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-primary" }),
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3 text-primary" }),
            Number(job.timelineDays),
            " days"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: timeAgo(job.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between pt-2.5 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-extrabold text-foreground text-base", children: formatBudget(job.budget) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "budget" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs/$jobId", params: { jobId: job.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": `job.view_button.${index}`,
              size: "sm",
              className: "btn-primary text-xs h-8",
              children: "View Details"
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  JobCard as J
};
