import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types";
import { WORK_TYPE_META } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Baby,
  Briefcase,
  Clock,
  Hammer,
  Home,
  MapPin,
  Phone,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import { RatingDisplay } from "./StarRating";

interface WorkerCardProps {
  worker: UserProfile;
  index?: number;
  className?: string;
}

// Skill → lucide icon mapping
function getSkillIcon(skill: string) {
  const s = skill.toLowerCase();
  if (s.includes("plumb") || s.includes("pipe") || s.includes("water"))
    return <Wrench className="h-3 w-3" />;
  if (s.includes("carp") || s.includes("furniture") || s.includes("door"))
    return <Hammer className="h-3 w-3" />;
  if (s.includes("electr") || s.includes("wiring"))
    return <Zap className="h-3 w-3" />;
  if (s.includes("baby") || s.includes("child"))
    return <Baby className="h-3 w-3" />;
  if (
    s.includes("clean") ||
    s.includes("cook") ||
    s.includes("maid") ||
    s.includes("sparkle")
  )
    return <Sparkles className="h-3 w-3" />;
  if (s.includes("home") || s.includes("laundry"))
    return <Home className="h-3 w-3" />;
  return <Hammer className="h-3 w-3" />;
}

// Stable gradient from name hash
function getAvatarGradient(str: string): string {
  const gradients = [
    "from-primary/30 to-primary/10",
    "from-secondary/20 to-secondary/5",
    "from-primary/20 to-secondary/15",
    "from-primary/25 to-primary/8",
    "from-secondary/15 to-primary/10",
  ];
  const idx =
    str.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length;
  return gradients[idx];
}

function getAvatarText(str: string): string {
  const colors = [
    "text-primary",
    "text-secondary",
    "text-primary",
    "text-primary",
    "text-secondary",
  ];
  const idx =
    str.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

export function WorkerCard({ worker, index = 1, className }: WorkerCardProps) {
  const avatarGradient = getAvatarGradient(worker.name);
  const avatarText = getAvatarText(worker.name);
  const initials = worker.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const skills = worker.skills ?? [];
  const skillMetas = skills.slice(0, 3).map(
    (s) =>
      WORK_TYPE_META[s] ?? {
        label: s,
        icon: "🛠️",
        color: "bg-muted text-muted-foreground",
      },
  );

  return (
    <Card
      data-ocid={`worker.item.${index}`}
      className={cn(
        "group bg-card border border-border rounded-2xl overflow-hidden",
        "shadow-sm transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:shadow-pink-lg hover:border-primary/40",
        className,
      )}
    >
      {/* Pink top accent bar */}
      <div className="h-1.5 w-full construction-gradient" />

      <CardContent className="p-5 pt-5">
        {/* Header: avatar + name + rating */}
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex-shrink-0 rounded-full bg-gradient-to-br flex items-center justify-center",
              "font-display font-bold text-lg border-2 border-primary/20",
              avatarGradient,
              avatarText,
            )}
            style={{ height: "52px", width: "52px" }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-foreground truncate text-base">
              {worker.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <RatingDisplay rating={worker.averageRating} />
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
            {worker.location}
          </span>
          {worker.yearsExperience !== undefined && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-primary" />
              {Number(worker.yearsExperience)} yrs exp
            </span>
          )}
          {worker.completedJobsCount !== undefined && (
            <span className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-primary" />
              {Number(worker.completedJobsCount)} jobs
            </span>
          )}
        </div>

        {/* Phone number — prominently visible */}
        {worker.phone && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/8 rounded-lg px-2.5 py-1.5 border border-primary/15">
            <Phone className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{worker.phone}</span>
          </div>
        )}

        {/* Skills badges */}
        {skillMetas.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {skillMetas.map((meta) => (
              <Badge
                key={meta.label}
                variant="outline"
                className="text-[11px] px-2 py-0.5 border-0 bg-primary/10 text-primary font-medium flex items-center gap-1"
              >
                {getSkillIcon(meta.label)}
                {meta.label || meta.icon}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge
                variant="outline"
                className="text-[11px] px-2 py-0.5 bg-muted text-muted-foreground border-0"
              >
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-4 flex gap-2">
          {worker.phone && (
            <a
              href={`tel:${worker.phone.replace(/\s+/g, "")}`}
              className="flex-1"
              data-ocid={`worker.call_button.${index}`}
            >
              <Button
                size="sm"
                className="w-full h-9 text-xs font-bold bg-foreground text-background hover:bg-foreground/85 transition-all duration-200 flex items-center gap-1.5 rounded-xl"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </Button>
            </a>
          )}
          <Link
            to="/workers/$workerId"
            params={{ workerId: worker.id.toText() }}
            className={worker.phone ? "" : "flex-1"}
          >
            <Button
              data-ocid={`worker.view_button.${index}`}
              size="sm"
              variant="outline"
              className={cn(
                "h-9 text-xs font-semibold rounded-xl border-primary/30 text-primary hover:bg-primary/8 hover:border-primary/50 transition-all duration-200",
                worker.phone ? "px-3" : "w-full btn-primary",
              )}
            >
              {worker.phone ? "Profile" : "View Profile & Hire"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
