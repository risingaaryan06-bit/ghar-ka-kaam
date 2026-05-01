import { Camera, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";

interface MaidPhotoUploadProps {
  /** Current photo URL (uploaded or existing) */
  photoUrl?: string;
  /** Called when a new local preview URL is created */
  onPhotoChange: (url: string) => void;
  /** Maid name (for accessible label) */
  name: string;
  /** Avatar size in px (default 52) */
  size?: number;
}

/**
 * Compact avatar upload button for maid cards.
 * In dev/mock mode, creates a local object URL for instant preview.
 * The camera icon overlays the bottom-right corner of the avatar.
 */
export function MaidPhotoUpload({
  photoUrl,
  onPhotoChange,
  name,
  size = 52,
}: MaidPhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [localUrl, setLocalUrl] = useState<string | undefined>(photoUrl);

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // Dev mode: use local object URL for preview
    const url = URL.createObjectURL(file);
    // Small delay to simulate upload feel
    setTimeout(() => {
      setLocalUrl(url);
      onPhotoChange(url);
      setUploading(false);
    }, 600);
  }

  function handleRemove(ev: React.MouseEvent) {
    ev.stopPropagation();
    setLocalUrl(undefined);
    onPhotoChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Avatar */}
      <div
        className="rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-gradient-to-br from-primary/25 to-primary/8"
        style={{ width: size, height: size }}
      >
        {localUrl ? (
          <img
            src={localUrl}
            alt={`${name} avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-primary font-bold text-lg">{initials}</span>
        )}
      </div>

      {/* Upload / loading overlay button */}
      <button
        type="button"
        data-ocid="maid.photo_upload.button"
        aria-label={`Upload photo for ${name}`}
        onClick={() => !uploading && inputRef.current?.click()}
        className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary border-2 border-card flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {uploading ? (
          <Loader2 className="h-3 w-3 text-primary-foreground animate-spin" />
        ) : (
          <Camera className="h-3 w-3 text-primary-foreground" />
        )}
      </button>

      {/* Remove button — shown when photo exists */}
      {localUrl && !uploading && (
        <button
          type="button"
          data-ocid="maid.photo_remove.button"
          aria-label={`Remove photo for ${name}`}
          onClick={handleRemove}
          className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground border-2 border-card flex items-center justify-center shadow-sm hover:bg-foreground/80 transition-colors cursor-pointer"
        >
          <X className="h-2.5 w-2.5 text-background" />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        tabIndex={-1}
      />
    </div>
  );
}
