import { JobCard } from "@/components/JobCard";
import { PageLoader } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterJobs, useListJobs } from "@/hooks/useQueries";
import {
  CONSTRUCTION_WORK_TYPES,
  MAID_WORK_TYPES,
  WORK_TYPE_META,
} from "@/types";
import type { Job, WorkType } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  HardHat,
  PlusCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type SortKey = "newest" | "budget_low" | "budget_high";
type JobCategory = "construction" | "maid";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Lowest Budget", value: "budget_low" },
  { label: "Highest Budget", value: "budget_high" },
];

function sortJobs(jobs: Job[], sort: SortKey): Job[] {
  return [...jobs].sort((a, b) => {
    if (sort === "newest") return Number(b.createdAt - a.createdAt);
    if (sort === "budget_low") return Number(a.budget - b.budget);
    return Number(b.budget - a.budget);
  });
}

export default function JobsPage() {
  const [locationSearch, setLocationSearch] = useState("");
  const [workType, setWorkType] = useState<string>("all");
  const [maxBudget, setMaxBudget] = useState<number>(500000);
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<JobCategory>("construction");

  const isFiltering =
    locationSearch.trim().length > 0 ||
    workType !== "all" ||
    maxBudget < 500000;

  const filterWorkType = workType === "all" ? null : (workType as WorkType);
  const filterLocation = locationSearch.trim() || null;
  const filterBudget = maxBudget < 500000 ? BigInt(maxBudget) : null;

  const { data: allJobs = [], isLoading: loadingAll } = useListJobs();
  const { data: filteredJobs = [], isLoading: loadingFiltered } = useFilterJobs(
    filterLocation,
    filterWorkType,
    filterBudget,
  );

  const isLoading = isFiltering ? loadingFiltered : loadingAll;
  const rawJobs = isFiltering ? filteredJobs : allJobs;

  // Split by category then sort
  const categoryFilteredJobs = useMemo(() => {
    const categoryTypes =
      activeCategory === "construction"
        ? CONSTRUCTION_WORK_TYPES
        : MAID_WORK_TYPES;
    const byCategory = rawJobs.filter((j) =>
      categoryTypes.includes(j.workType),
    );
    return sortJobs(byCategory, sortKey);
  }, [rawJobs, sortKey, activeCategory]);

  const constructionCount = useMemo(
    () =>
      rawJobs.filter((j) => CONSTRUCTION_WORK_TYPES.includes(j.workType))
        .length,
    [rawJobs],
  );
  const maidCount = useMemo(
    () => rawJobs.filter((j) => MAID_WORK_TYPES.includes(j.workType)).length,
    [rawJobs],
  );

  const clearFilters = () => {
    setLocationSearch("");
    setWorkType("all");
    setMaxBudget(500000);
  };

  const categoryWorkTypes =
    activeCategory === "construction"
      ? CONSTRUCTION_WORK_TYPES
      : MAID_WORK_TYPES;

  if (isLoading) return <PageLoader label="Loading jobs..." />;

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg construction-gradient flex items-center justify-center flex-shrink-0">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl text-foreground">
                  Browse Jobs
                </h1>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">
                    {categoryFilteredJobs.length}
                  </span>{" "}
                  {categoryFilteredJobs.length === 1 ? "job" : "jobs"} available
                  {isFiltering && " (filtered)"}
                </p>
              </div>
            </div>
            <Link to="/post-job">
              <Button
                data-ocid="jobs.post_job.primary_button"
                size="sm"
                className="btn-primary text-xs hidden sm:flex"
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                Post a Job
              </Button>
            </Link>
          </div>

          {/* Category toggle tabs */}
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit mb-4">
            <button
              data-ocid="jobs.construction_tab.tab"
              type="button"
              onClick={() => {
                setActiveCategory("construction");
                setWorkType("all");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeCategory === "construction"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HardHat className="h-3.5 w-3.5" />
              Construction
              {constructionCount > 0 && (
                <Badge className="h-4 text-[10px] px-1.5 leading-none ml-0.5">
                  {constructionCount}
                </Badge>
              )}
            </button>
            <button
              data-ocid="jobs.maid_tab.tab"
              type="button"
              onClick={() => {
                setActiveCategory("maid");
                setWorkType("all");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeCategory === "maid"
                  ? "bg-card shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Maid Services
              {maidCount > 0 && (
                <Badge className="h-4 text-[10px] px-1.5 leading-none ml-0.5">
                  {maidCount}
                </Badge>
              )}
            </button>
          </div>

          {/* Search + controls row */}
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                data-ocid="jobs.location_search.input"
                placeholder="Search by location..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="bg-background pl-9"
              />
            </div>

            <Button
              data-ocid="jobs.filters.toggle"
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-1.5"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {isFiltering && (
                <Badge className="ml-1 h-4 text-[10px] px-1 leading-none">
                  On
                </Badge>
              )}
            </Button>

            <Select
              value={sortKey}
              onValueChange={(v) => setSortKey(v as SortKey)}
            >
              <SelectTrigger
                data-ocid="jobs.sort.select"
                className="w-40 bg-background"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Expanded filters */}
          {filtersOpen && (
            <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-4 items-end">
              <div className="space-y-1">
                <label
                  htmlFor="jobs-worktype-select"
                  className="text-xs text-muted-foreground font-medium"
                >
                  {activeCategory === "construction"
                    ? "Work Type"
                    : "Service Type"}
                </label>
                <Select value={workType} onValueChange={setWorkType}>
                  <SelectTrigger
                    id="jobs-worktype-select"
                    data-ocid="jobs.worktype.select"
                    className="w-48 bg-background"
                  >
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {categoryWorkTypes.map((key) => (
                      <SelectItem key={key} value={key}>
                        {WORK_TYPE_META[key].icon} {WORK_TYPE_META[key].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 min-w-[200px]">
                <label
                  htmlFor="jobs-max-budget"
                  className="text-xs text-muted-foreground font-medium"
                >
                  Max Budget: ₹{maxBudget.toLocaleString("en-IN")}
                  {maxBudget >= 500000 && " (any)"}
                </label>
                <input
                  id="jobs-max-budget"
                  data-ocid="jobs.max_budget.input"
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              {isFiltering && (
                <Button
                  data-ocid="jobs.clear_filters.button"
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground"
                >
                  <X className="h-3.5 w-3.5 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job list */}
      <div className="container mx-auto px-4 py-6">
        {/* Active filter badges */}
        {isFiltering && (
          <div className="flex flex-wrap gap-2 mb-4">
            {locationSearch && (
              <Badge variant="secondary" className="gap-1 text-xs">
                Location: {locationSearch}
                <button
                  type="button"
                  onClick={() => setLocationSearch("")}
                  aria-label="Remove location filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {workType !== "all" && (
              <Badge variant="secondary" className="gap-1 text-xs">
                {WORK_TYPE_META[workType]?.label ?? workType}
                <button
                  type="button"
                  onClick={() => setWorkType("all")}
                  aria-label="Remove type filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {maxBudget < 500000 && (
              <Badge variant="secondary" className="gap-1 text-xs">
                Max ₹{maxBudget.toLocaleString("en-IN")}
                <button
                  type="button"
                  onClick={() => setMaxBudget(500000)}
                  aria-label="Remove budget filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}

        {categoryFilteredJobs.length === 0 ? (
          <div
            data-ocid="jobs.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              {activeCategory === "construction" ? (
                <HardHat className="h-10 w-10 text-primary" />
              ) : (
                <Sparkles className="h-10 w-10 text-primary" />
              )}
            </div>
            <h3 className="font-display font-bold text-foreground text-lg mb-2">
              No{" "}
              {activeCategory === "construction"
                ? "Construction"
                : "Maid Service"}{" "}
              Jobs Found
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              {isFiltering
                ? "Try adjusting your filters to see more results."
                : "No jobs in this category yet. Be the first to post one!"}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {isFiltering && (
                <Button
                  data-ocid="jobs.empty_clear_filters.button"
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
              <Link to="/post-job">
                <Button
                  data-ocid="jobs.empty_post_job.primary_button"
                  type="button"
                  className="btn-primary"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryFilteredJobs.map((job, idx) => (
              <JobCard key={job.id.toString()} job={job} index={idx + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
