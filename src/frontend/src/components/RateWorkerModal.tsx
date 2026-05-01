import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/hooks/useQueries";
import { Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RateWorkerModalProps {
  open: boolean;
  onClose: () => void;
  workerPrincipal: string;
  workerName: string;
  /** A completed job id to attach the review to */
  jobId?: bigint;
}

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

export function RateWorkerModal({
  open,
  onClose,
  workerPrincipal,
  workerName,
  jobId = BigInt(1),
}: RateWorkerModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const createReview = useCreateReview();

  function handleClose() {
    setRating(0);
    setComment("");
    onClose();
  }

  async function handleSubmit() {
    if (rating === 0) {
      toast.error("Please select a star rating before submitting.");
      return;
    }
    try {
      await createReview.mutateAsync({
        revieweePrincipal: workerPrincipal,
        jobId,
        rating: BigInt(rating),
        comment: comment.trim(),
      });
      toast.success(`Review for ${workerName} submitted! Thank you.`);
      handleClose();
    } catch {
      toast.error("Could not submit review. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        data-ocid="rate_worker.dialog"
        className="sm:max-w-md rounded-2xl border-2 border-primary/20 p-0 overflow-hidden"
      >
        {/* Pink top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

        <div className="p-6">
          <DialogHeader className="mb-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="font-display font-extrabold text-xl text-foreground leading-tight">
                  Rate {workerName}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your experience to help other homeowners
                </p>
              </div>
              <button
                type="button"
                data-ocid="rate_worker.close_button"
                onClick={handleClose}
                className="h-8 w-8 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors flex-shrink-0"
                aria-label="Close rating dialog"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </DialogHeader>

          {/* Star rating */}
          <div className="flex flex-col items-center gap-3 py-4 bg-primary/5 rounded-xl border border-primary/15 mb-5">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-foreground">
                Your Rating
              </span>
            </div>
            <StarRating
              data-ocid="rate_worker.star_rating"
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
              className="gap-2"
            />
            <p
              className={`text-sm font-bold transition-colors duration-200 ${
                rating > 0 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {rating > 0 ? RATING_LABELS[rating] : "Tap to rate"}
            </p>
          </div>

          {/* Comment */}
          <div className="mb-5">
            <label
              htmlFor="review-comment"
              className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block"
            >
              Comment{" "}
              <span className="normal-case font-normal text-muted-foreground/60">
                (optional)
              </span>
            </label>
            <Textarea
              id="review-comment"
              data-ocid="rate_worker.comment.textarea"
              placeholder={`How was your experience with ${workerName}?`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="resize-none border-primary/20 focus:border-primary/50 rounded-xl text-sm"
              maxLength={500}
            />
            <p className="text-right text-xs text-muted-foreground mt-1">
              {comment.length}/500
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              data-ocid="rate_worker.cancel_button"
              variant="outline"
              className="flex-1 border-border hover:border-primary/40 rounded-xl"
              onClick={handleClose}
              disabled={createReview.isPending}
            >
              Cancel
            </Button>
            <Button
              data-ocid="rate_worker.submit_button"
              className="flex-1 btn-primary rounded-xl font-bold"
              onClick={handleSubmit}
              disabled={createReview.isPending || rating === 0}
            >
              {createReview.isPending ? (
                <>
                  <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting…
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-1.5" />
                  Submit Review
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
