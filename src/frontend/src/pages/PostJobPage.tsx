import { ExternalBlob } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { usePostJob } from "@/hooks/useQueries";
import {
  CONSTRUCTION_WORK_TYPES,
  MAID_WORK_TYPES,
  WORK_TYPE_META,
  WorkType,
} from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  HardHat,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  PlusCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

interface FormState {
  title: string;
  workType: WorkType;
  description: string;
  location: string;
  budget: string;
  timelineDays: string;
}

const INITIAL_FORM: FormState = {
  title: "",
  workType: WorkType.general,
  description: "",
  location: "",
  budget: "",
  timelineDays: "",
};

interface ImagePreview {
  file: File;
  previewUrl: string;
}

function ImageUploadZone({
  images,
  onAdd,
  onRemove,
}: {
  images: ImagePreview[];
  onAdd: (files: File[]) => void;
  onRemove: (idx: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (valid.length) onAdd(valid);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const valid = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith("image/"),
      );
      if (valid.length) onAdd(valid);
    },
    [onAdd],
  );

  return (
    <div className="space-y-3">
      <button
        type="button"
        data-ocid="post_job.images.dropzone"
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        }`}
      >
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <p className="font-medium text-foreground text-sm">
          Drag & drop photos here
        </p>
        <p className="text-xs text-muted-foreground">
          or <span className="text-primary font-semibold">browse files</span>
        </p>
        <Badge variant="outline" className="text-xs mt-1">
          PNG, JPG, WEBP · up to 5 photos
        </Badge>
        <input
          data-ocid="post_job.images.upload_button"
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </button>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img, idx) => (
            <div
              key={img.previewUrl}
              className="relative group h-20 w-20 rounded-lg overflow-hidden border border-border"
            >
              <img
                src={img.previewUrl}
                alt={`Uploaded file ${idx + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                aria-label={`Remove image ${idx + 1}`}
              >
                <Trash2 className="h-4 w-4 text-background" />
              </button>
            </div>
          ))}
          {images.length < 5 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="h-20 w-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors"
              aria-label="Add more photos"
            >
              <PlusCircle className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function PostJobPage() {
  const postJob = usePostJob();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [images, setImages] = useState<ImagePreview[]>([]);

  const updateForm = (patch: Partial<FormState>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleAddImages = (files: File[]) => {
    const previews = files.map((f) => ({
      file: f,
      previewUrl: URL.createObjectURL(f),
    }));
    setImages((prev) => [...prev, ...previews].slice(0, 5));
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const validate = () => {
    if (!form.title.trim()) {
      toast.error("Please enter a job title.");
      return false;
    }
    if (!form.description.trim()) {
      toast.error("Please describe the job.");
      return false;
    }
    if (!form.location.trim()) {
      toast.error("Please enter a location.");
      return false;
    }
    const budget = Number(form.budget);
    if (!form.budget || Number.isNaN(budget) || budget <= 0) {
      toast.error("Please enter a valid budget.");
      return false;
    }
    const days = Number(form.timelineDays);
    if (!form.timelineDays || Number.isNaN(days) || days <= 0) {
      toast.error("Please enter a valid timeline.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const imageBlobs: ExternalBlob[] = await Promise.all(
      images.map(async ({ file }) => {
        const buf = await file.arrayBuffer();
        return ExternalBlob.fromBytes(new Uint8Array(buf));
      }),
    );

    postJob.mutate(
      {
        title: form.title.trim(),
        description: form.description.trim(),
        workType: form.workType,
        location: form.location.trim(),
        budget: BigInt(Math.round(Number(form.budget))),
        timelineDays: BigInt(Math.round(Number(form.timelineDays))),
        requiredMaterials: null,
        imageUrls: imageBlobs,
      },
      {
        onSuccess: (job) => {
          for (const img of images) URL.revokeObjectURL(img.previewUrl);
          toast.success("Job posted! Workers will contact you directly.");
          navigate({
            to: "/jobs/$jobId",
            params: { jobId: job.id.toString() },
          });
        },
        onError: (e) =>
          toast.error(
            `Failed to post job: ${e instanceof Error ? e.message : "Unknown error"}`,
          ),
      },
    );
  };

  const selectedMeta = WORK_TYPE_META[form.workType];

  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <Link to="/jobs">
              <Button
                data-ocid="post_job.cancel.button"
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg construction-gradient flex items-center justify-center flex-shrink-0">
                <PlusCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground leading-tight">
                  Post a Job
                </h1>
                <p className="text-xs text-muted-foreground">
                  Workers will contact you directly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-4">
          {/* ── Section 1: Job Type & Title ── */}
          <Card className="card-elevated">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Job Type & Title
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="workType">Service Type *</Label>
                <Select
                  value={form.workType}
                  onValueChange={(v) => updateForm({ workType: v as WorkType })}
                >
                  <SelectTrigger
                    data-ocid="post_job.worktype.select"
                    id="workType"
                    className="bg-background"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value=""
                      disabled
                      className="text-muted-foreground font-semibold text-xs"
                    >
                      — Construction Services —
                    </SelectItem>
                    {CONSTRUCTION_WORK_TYPES.map((key) => {
                      const meta = WORK_TYPE_META[key];
                      return (
                        <SelectItem key={key} value={key}>
                          {meta.icon} {meta.label}
                        </SelectItem>
                      );
                    })}
                    <SelectItem
                      value=""
                      disabled
                      className="text-muted-foreground font-semibold text-xs"
                    >
                      — Maid & Home Services —
                    </SelectItem>
                    {MAID_WORK_TYPES.map((key) => {
                      const meta = WORK_TYPE_META[key];
                      return (
                        <SelectItem key={key} value={key}>
                          {meta.icon} {meta.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {selectedMeta && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1 pt-0.5">
                    <span>{selectedMeta.icon}</span>
                    {selectedMeta.category === "maid"
                      ? "Maid & home service — your request will appear in the Maid Services section"
                      : "Construction work — your request will appear in Browse Jobs"}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  data-ocid="post_job.title.input"
                  id="title"
                  placeholder={
                    selectedMeta?.category === "maid"
                      ? "e.g. Need a daily cook for 2 people"
                      : "e.g. Experienced Mason for Wall Repair"
                  }
                  value={form.title}
                  onChange={(e) => updateForm({ title: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Section 2: Location, Budget, Timeline ── */}
          <Card className="card-elevated">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Location & Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="location">
                  <MapPin className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  Location *
                </Label>
                <Input
                  data-ocid="post_job.location.input"
                  id="location"
                  placeholder="e.g. Sector 62, Noida, UP"
                  value={form.location}
                  onChange={(e) => updateForm({ location: e.target.value })}
                  className="bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="budget">Budget (₹) *</Label>
                  <Input
                    data-ocid="post_job.budget.input"
                    id="budget"
                    type="number"
                    placeholder="e.g. 8000"
                    value={form.budget}
                    onChange={(e) => updateForm({ budget: e.target.value })}
                    min="1"
                    className="bg-background"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="timeline">
                    <Calendar className="inline h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    Duration (days) *
                  </Label>
                  <Input
                    data-ocid="post_job.timeline.input"
                    id="timeline"
                    type="number"
                    placeholder="e.g. 7"
                    value={form.timelineDays}
                    onChange={(e) =>
                      updateForm({ timelineDays: e.target.value })
                    }
                    min="1"
                    className="bg-background"
                  />
                </div>
              </div>

              {form.budget && form.timelineDays && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Budget
                    </p>
                    <p className="font-display font-bold text-primary text-lg leading-tight">
                      ₹{Number(form.budget).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Daily Rate</p>
                    <p className="font-semibold text-foreground text-sm">
                      ₹
                      {Math.round(
                        Number(form.budget) / Number(form.timelineDays),
                      ).toLocaleString("en-IN")}
                      /day
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Section 3: Description ── */}
          <Card className="card-elevated">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold">
                  3
                </span>
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <Textarea
                data-ocid="post_job.description.textarea"
                id="description"
                placeholder={
                  selectedMeta?.category === "maid"
                    ? "Describe what you need: timings, number of people, special requirements..."
                    : "Describe the work: scope, quality expectations, materials if any..."
                }
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-2">
                A clear description helps workers understand what you need.
              </p>
            </CardContent>
          </Card>

          {/* ── Section 4: Photos (optional) ── */}
          <Card className="card-elevated">
            <CardHeader className="pb-3 pt-5 px-5">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold">
                  4
                </span>
                Photos
                <Badge variant="outline" className="text-xs font-normal ml-1">
                  Optional
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <ImageUploadZone
                images={images}
                onAdd={handleAddImages}
                onRemove={handleRemoveImage}
              />
              {images.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {images.length} of 5 photos added
                </p>
              )}
            </CardContent>
          </Card>

          {/* ── Info banner ── */}
          <div className="flex items-start gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3">
            <MessageCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">
                No bidding needed.
              </span>{" "}
              Workers who are interested will contact you directly. Review their
              profiles, chat, and hire the best fit.
            </p>
          </div>

          {/* ── Submit ── */}
          <div className="flex gap-3 pb-6">
            <Link to="/jobs" className="flex-1">
              <Button
                data-ocid="post_job.cancel_bottom.button"
                variant="outline"
                className="w-full"
                disabled={postJob.isPending}
              >
                Cancel
              </Button>
            </Link>
            <Button
              data-ocid="post_job.submit_button"
              onClick={handleSubmit}
              className="flex-1 btn-primary"
              disabled={postJob.isPending}
            >
              <HardHat className="h-4 w-4 mr-2" />
              {postJob.isPending ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
