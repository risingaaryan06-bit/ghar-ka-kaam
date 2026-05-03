import { j as jsxRuntimeExports, a as cn } from "./index-Bl6m0gAG.js";
import { S as Star } from "./star-FaVzG57j.js";
const sizeMap = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5"
};
function StarRating({
  rating,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center gap-0.5", className), children: Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = !filled && i < rating;
    const starKey = `star-${i + 1}`;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: !interactive,
        onClick: () => interactive && (onChange == null ? void 0 : onChange(i + 1)),
        className: cn(
          "transition-colors",
          interactive && "cursor-pointer hover:scale-110",
          !interactive && "cursor-default pointer-events-none"
        ),
        "aria-label": interactive ? `Rate ${i + 1} stars` : void 0,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: cn(
              sizeMap[size],
              filled || partial ? "fill-primary text-primary" : "fill-muted text-muted-foreground/40"
            )
          }
        )
      },
      starKey
    );
  }) });
}
function RatingDisplay({
  rating,
  count,
  size = "sm",
  className
}) {
  if (rating === void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs text-muted-foreground italic", className), children: "No reviews yet" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-1.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating, size }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: rating.toFixed(1) }),
    count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
      "(",
      count,
      ")"
    ] })
  ] });
}
export {
  RatingDisplay as R,
  StarRating as S
};
