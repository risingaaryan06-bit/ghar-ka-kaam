import { d as createLucideIcon, M as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, b as Button, S as Separator, m as CirclePlus, n as HardHat, c as ue } from "./index-D5ASyzS6.js";
import { a as WorkType, W as WORK_TYPE_META, C as CONSTRUCTION_WORK_TYPES, M as MAID_WORK_TYPES, E as ExternalBlob } from "./types-D7fAxLqk.js";
import { B as Badge } from "./badge-7GCgTXu2.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-JZLgIumC.js";
import { I as Input } from "./input-ZAgHlKlK.js";
import { L as Label } from "./label-BRLaVITT.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-b-AYbpxr.js";
import { T as Textarea } from "./textarea-DhZv5i2k.js";
import { l as usePostJob } from "./useQueries-wsg2UjNw.js";
import { A as ArrowLeft } from "./arrow-left-IPlMlt4d.js";
import { M as MapPin } from "./index-D8faD2En.js";
import { C as Calendar } from "./calendar-mCFMjJLa.js";
import { M as MessageCircle } from "./message-circle-DP648pQY.js";
import "./index-DvqHBqJ-.js";
import "./useActor-BVPqwPhj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
const INITIAL_FORM = {
  title: "",
  workType: WorkType.general,
  description: "",
  location: "",
  budget: "",
  timelineDays: ""
};
function ImageUploadZone({
  images,
  onAdd,
  onRemove
}) {
  const inputRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const handleFiles = (files) => {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (valid.length) onAdd(valid);
  };
  const onDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const valid = Array.from(e.dataTransfer.files).filter(
        (f) => f.type.startsWith("image/")
      );
      if (valid.length) onAdd(valid);
    },
    [onAdd]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        "data-ocid": "post_job.images.dropzone",
        onDragOver: (e) => {
          e.preventDefault();
          setDragging(true);
        },
        onDragLeave: () => setDragging(false),
        onDrop,
        onClick: () => {
          var _a;
          return (_a = inputRef.current) == null ? void 0 : _a.click();
        },
        className: `w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm", children: "Drag & drop photos here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "or ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "browse files" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs mt-1", children: "PNG, JPG, WEBP · up to 5 photos" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              "data-ocid": "post_job.images.upload_button",
              ref: inputRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              className: "hidden",
              onChange: (e) => handleFiles(e.target.files)
            }
          )
        ]
      }
    ),
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      images.map((img, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative group h-20 w-20 rounded-lg overflow-hidden border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: img.previewUrl,
                alt: `Uploaded file ${idx + 1}`,
                className: "h-full w-full object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onRemove(idx),
                className: "absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity",
                "aria-label": `Remove image ${idx + 1}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-background" })
              }
            )
          ]
        },
        img.previewUrl
      )),
      images.length < 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = inputRef.current) == null ? void 0 : _a.click();
          },
          className: "h-20 w-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center hover:border-primary/50 transition-colors",
          "aria-label": "Add more photos",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-5 w-5 text-muted-foreground" })
        }
      )
    ] })
  ] });
}
function PostJobPage() {
  const postJob = usePostJob();
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [images, setImages] = reactExports.useState([]);
  const updateForm = (patch) => setForm((prev) => ({ ...prev, ...patch }));
  const handleAddImages = (files) => {
    const previews = files.map((f) => ({
      file: f,
      previewUrl: URL.createObjectURL(f)
    }));
    setImages((prev) => [...prev, ...previews].slice(0, 5));
  };
  const handleRemoveImage = (idx) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };
  const validate = () => {
    if (!form.title.trim()) {
      ue.error("Please enter a job title.");
      return false;
    }
    if (!form.description.trim()) {
      ue.error("Please describe the job.");
      return false;
    }
    if (!form.location.trim()) {
      ue.error("Please enter a location.");
      return false;
    }
    const budget = Number(form.budget);
    if (!form.budget || Number.isNaN(budget) || budget <= 0) {
      ue.error("Please enter a valid budget.");
      return false;
    }
    const days = Number(form.timelineDays);
    if (!form.timelineDays || Number.isNaN(days) || days <= 0) {
      ue.error("Please enter a valid timeline.");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    const imageBlobs = await Promise.all(
      images.map(async ({ file }) => {
        const buf = await file.arrayBuffer();
        return ExternalBlob.fromBytes(new Uint8Array(buf));
      })
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
        imageUrls: imageBlobs
      },
      {
        onSuccess: (job) => {
          for (const img of images) URL.revokeObjectURL(img.previewUrl);
          ue.success("Job posted! Workers will contact you directly.");
          navigate({
            to: "/jobs/$jobId",
            params: { jobId: job.id.toString() }
          });
        },
        onError: (e) => ue.error(
          `Failed to post job: ${e instanceof Error ? e.message : "Unknown error"}`
        )
      }
    );
  };
  const selectedMeta = WORK_TYPE_META[form.workType];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "post_job.cancel.button",
          variant: "ghost",
          size: "sm",
          className: "gap-1.5 text-muted-foreground hover:text-foreground -ml-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back"
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg construction-gradient flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground leading-tight", children: "Post a Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Workers will contact you directly" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-6 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold", children: "1" }),
          "Job Type & Title"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "workType", children: "Service Type *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.workType,
                onValueChange: (v) => updateForm({ workType: v }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      "data-ocid": "post_job.worktype.select",
                      id: "workType",
                      className: "bg-background",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectItem,
                      {
                        value: "",
                        disabled: true,
                        className: "text-muted-foreground font-semibold text-xs",
                        children: "— Construction Services —"
                      }
                    ),
                    CONSTRUCTION_WORK_TYPES.map((key) => {
                      const meta = WORK_TYPE_META[key];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                        meta.icon,
                        " ",
                        meta.label
                      ] }, key);
                    }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectItem,
                      {
                        value: "",
                        disabled: true,
                        className: "text-muted-foreground font-semibold text-xs",
                        children: "— Maid & Home Services —"
                      }
                    ),
                    MAID_WORK_TYPES.map((key) => {
                      const meta = WORK_TYPE_META[key];
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: key, children: [
                        meta.icon,
                        " ",
                        meta.label
                      ] }, key);
                    })
                  ] })
                ]
              }
            ),
            selectedMeta && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 pt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedMeta.icon }),
              selectedMeta.category === "maid" ? "Maid & home service — your request will appear in the Maid Services section" : "Construction work — your request will appear in Browse Jobs"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Job Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "post_job.title.input",
                id: "title",
                placeholder: (selectedMeta == null ? void 0 : selectedMeta.category) === "maid" ? "e.g. Need a daily cook for 2 people" : "e.g. Experienced Mason for Wall Repair",
                value: form.title,
                onChange: (e) => updateForm({ title: e.target.value })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold", children: "2" }),
          "Location & Budget"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "location", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "inline h-3.5 w-3.5 mr-1 text-muted-foreground" }),
              "Location *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "post_job.location.input",
                id: "location",
                placeholder: "e.g. Sector 62, Noida, UP",
                value: form.location,
                onChange: (e) => updateForm({ location: e.target.value }),
                className: "bg-background"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "budget", children: "Budget (₹) *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "post_job.budget.input",
                  id: "budget",
                  type: "number",
                  placeholder: "e.g. 8000",
                  value: form.budget,
                  onChange: (e) => updateForm({ budget: e.target.value }),
                  min: "1",
                  className: "bg-background"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "timeline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "inline h-3.5 w-3.5 mr-1 text-muted-foreground" }),
                "Duration (days) *"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "post_job.timeline.input",
                  id: "timeline",
                  type: "number",
                  placeholder: "e.g. 7",
                  value: form.timelineDays,
                  onChange: (e) => updateForm({ timelineDays: e.target.value }),
                  min: "1",
                  className: "bg-background"
                }
              )
            ] })
          ] }),
          form.budget && form.timelineDays && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-lg px-4 py-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total Budget" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-primary text-lg leading-tight", children: [
                "₹",
                Number(form.budget).toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Daily Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
                "₹",
                Math.round(
                  Number(form.budget) / Number(form.timelineDays)
                ).toLocaleString("en-IN"),
                "/day"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full bg-primary/15 text-primary text-xs flex items-center justify-center font-bold", children: "3" }),
          "Description"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "post_job.description.textarea",
              id: "description",
              placeholder: (selectedMeta == null ? void 0 : selectedMeta.category) === "maid" ? "Describe what you need: timings, number of people, special requirements..." : "Describe the work: scope, quality expectations, materials if any...",
              value: form.description,
              onChange: (e) => updateForm({ description: e.target.value }),
              rows: 4
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "A clear description helps workers understand what you need." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "card-elevated", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3 pt-5 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center font-bold", children: "4" }),
          "Photos",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs font-normal ml-1", children: "Optional" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImageUploadZone,
            {
              images,
              onAdd: handleAddImages,
              onRemove: handleRemoveImage
            }
          ),
          images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3" }),
            images.length,
            " of 5 photos added"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted/50 border border-border rounded-xl px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4 text-primary mt-0.5 flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "No bidding needed." }),
          " ",
          "Workers who are interested will contact you directly. Review their profiles, chat, and hire the best fit."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/jobs", className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "post_job.cancel_bottom.button",
            variant: "outline",
            className: "w-full",
            disabled: postJob.isPending,
            children: "Cancel"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "post_job.submit_button",
            onClick: handleSubmit,
            className: "flex-1 btn-primary",
            disabled: postJob.isPending,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-4 w-4 mr-2" }),
              postJob.isPending ? "Posting..." : "Post Job"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  PostJobPage as default
};
