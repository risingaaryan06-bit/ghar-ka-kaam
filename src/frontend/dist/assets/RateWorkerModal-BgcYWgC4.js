import { r as reactExports, j as jsxRuntimeExports, X, B as Button, u as ue } from "./index-Bl6m0gAG.js";
import { S as StarRating } from "./StarRating-tS6JAhqF.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-G5HeEmEv.js";
import { T as Textarea } from "./textarea-CGwFhK7E.js";
import { u as useCreateReview } from "./useQueries-DlGKg5lf.js";
import { S as Star } from "./star-FaVzG57j.js";
const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
function RateWorkerModal({
  open,
  onClose,
  workerPrincipal,
  workerName,
  jobId = BigInt(1)
}) {
  const [rating, setRating] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const createReview = useCreateReview();
  function handleClose() {
    setRating(0);
    setComment("");
    onClose();
  }
  async function handleSubmit() {
    if (rating === 0) {
      ue.error("Please select a star rating before submitting.");
      return;
    }
    try {
      await createReview.mutateAsync({
        revieweePrincipal: workerPrincipal,
        jobId,
        rating: BigInt(rating),
        comment: comment.trim()
      });
      ue.success(`Review for ${workerName} submitted! Thank you.`);
      handleClose();
    } catch {
      ue.error("Could not submit review. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && handleClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      "data-ocid": "rate_worker.dialog",
      className: "sm:max-w-md rounded-2xl border-2 border-primary/20 p-0 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display font-extrabold text-xl text-foreground leading-tight", children: [
                "Rate ",
                workerName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Share your experience to help other homeowners" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "rate_worker.close_button",
                onClick: handleClose,
                className: "h-8 w-8 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors flex-shrink-0",
                "aria-label": "Close rating dialog",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4 bg-primary/5 rounded-xl border border-primary/15 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-primary fill-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Your Rating" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                "data-ocid": "rate_worker.star_rating",
                rating,
                size: "lg",
                interactive: true,
                onChange: setRating,
                className: "gap-2"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: `text-sm font-bold transition-colors duration-200 ${rating > 0 ? "text-primary" : "text-muted-foreground"}`,
                children: rating > 0 ? RATING_LABELS[rating] : "Tap to rate"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                htmlFor: "review-comment",
                className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block",
                children: [
                  "Comment",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "normal-case font-normal text-muted-foreground/60", children: "(optional)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "review-comment",
                "data-ocid": "rate_worker.comment.textarea",
                placeholder: `How was your experience with ${workerName}?`,
                value: comment,
                onChange: (e) => setComment(e.target.value),
                rows: 3,
                className: "resize-none border-primary/20 focus:border-primary/50 rounded-xl text-sm",
                maxLength: 500
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-right text-xs text-muted-foreground mt-1", children: [
              comment.length,
              "/500"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "rate_worker.cancel_button",
                variant: "outline",
                className: "flex-1 border-border hover:border-primary/40 rounded-xl",
                onClick: handleClose,
                disabled: createReview.isPending,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "rate_worker.submit_button",
                className: "flex-1 btn-primary rounded-xl font-bold",
                onClick: handleSubmit,
                disabled: createReview.isPending || rating === 0,
                children: createReview.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" }),
                  "Submitting…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 mr-1.5" }),
                  "Submit Review"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
export {
  RateWorkerModal as R
};
