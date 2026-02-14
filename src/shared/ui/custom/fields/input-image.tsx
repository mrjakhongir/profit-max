import { cn } from "@/shared/lib/utilities";
import { Button } from "@/shared/ui/button";
import { RotateCcwKey, UploadCloud } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

type Properties = {
  value?: File | null;
  onChange?: (file: File | null) => void;
  maxSizeMB?: number;
  className?: string;
};

export function ImageUploader({
  value,
  onChange,
  maxSizeMB = 5,
  className,
}: Properties) {
  const inputReference = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  // Derive preview directly from value - no useEffect needed!
  const preview = useMemo(() => {
    if (!value) return "";
    return URL.createObjectURL(value);
  }, [value]);

  // Clean up the URL when component unmounts or value changes
  useEffect(() => {
    if (preview) {
      return () => URL.revokeObjectURL(preview);
    }
  }, [preview]);

  const validate = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > maxSizeMB * 1024 * 1024) return false;
      return true;
    },
    [maxSizeMB],
  );

  const handleFile = useCallback(
    (file?: File) => {
      if (!file) return;
      if (!validate(file)) {
        if (inputReference.current) inputReference.current.value = "";
        return;
      }
      onChange?.(file);
    },
    [validate, onChange],
  );

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  // drag
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(false);
      handleFile(event.dataTransfer.files?.[0]);
    },
    [handleFile],
  );

  return (
    <div className={cn("space-y-3", className)}>
      <input
        ref={inputReference}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={onInput}
      />

      {!preview && (
        <div
          onClick={() => inputReference.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "flex aspect-3/2 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition",
            dragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/30 hover:bg-muted/50",
          )}
        >
          <UploadCloud className="text-muted-foreground mb-2 h-8 w-8" />
          <p className="text-muted-foreground text-sm">
            Drag image or click to upload
          </p>
          <p className="text-muted-foreground/70 text-xs">
            PNG / JPG up to {maxSizeMB}MB
          </p>
        </div>
      )}

      {preview && (
        <div className="bg-muted relative aspect-3/2 overflow-hidden rounded-lg border">
          <img
            src={preview}
            alt="preview"
            className="h-full w-full object-cover"
          />

          <Button
            type="button"
            size="sm"
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
            onClick={() => inputReference.current?.click()}
          >
            <RotateCcwKey />
            Change
          </Button>
        </div>
      )}
    </div>
  );
}
