import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Job } from "@/types";
import { JobStatus, WORK_TYPE_META, formatBudget, timeAgo } from "@/types";
import { Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";

interface JobCardProps {
  job: Job;
  index?: number;
  className?: string;
}

const statusConfig: Record<
  JobStatus,
  {
    label: string;
    cls: string;
  }
> = {
  [JobStatus.open]: {
    label: "Open",
    cls: "bg-primary/12 text-primary border-primary/25 border",
  },
  [JobStatus.assigned]: {
    label: "Assigned",
    cls: "bg-secondary/10 text-secondary border-secondary/20 border",
  },
  [JobStatus.completed]: {
    label: "Completed",
    cls: "bg-muted text-muted-foreground border-border border",
  },
  [JobStatus.cancelled]: {
    label: "Cancelled",
    cls: "bg-destructive/10 text-destructive border-destructive/20 border",
  },
};

export function JobCard({ job, index = 1, className }: JobCardProps) {
  const meta = WORK_TYPE_META[job.workType] ?? WORK_TYPE_META.other;
  const status = statusConfig[job.status] ?? statusConfig[JobStatus.open];

  return (
    <Card
      data-ocid={`job.item.${index}`}
      className={cn(
        "group bg-card rounded-xl border border-border shadow-sm",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/25",
        "border-l-4 border-l-primary",
        className,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          {/* Icon + Title */}
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl border border-primary/15">
              {meta.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-foreground text-sm leading-snug truncate">
                {job.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {job.description}
              </p>
            </div>
          </div>

          {/* Status + Work type */}
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span
              className={cn(
                "text-xs font-semibold rounded-full px-2.5 py-0.5",
                status.cls,
              )}
            >
              {status.label}
            </span>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full font-medium",
                meta.color,
              )}
            >
              {meta.label}
            </span>
          </div>
        </div>

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-primary" />
            {Number(job.timelineDays)} days
          </span>
          <span className="text-muted-foreground/60">
            {timeAgo(job.createdAt)}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-border">
          <div>
            <span className="font-display font-extrabold text-foreground text-base">
              {formatBudget(job.budget)}
            </span>
            <span className="text-xs text-muted-foreground ml-1">budget</span>
          </div>
          <Link to="/jobs/$jobId" params={{ jobId: job.id.toString() }}>
            <Button
              data-ocid={`job.view_button.${index}`}
              size="sm"
              className="btn-primary text-xs h-8"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
