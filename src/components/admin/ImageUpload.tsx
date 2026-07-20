"use client";

import { useCallback, useId, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const DEFAULT_MAX_IMAGES = 12;

export type ImageUploadFolder = "tours" | "circuitos" | "traslados";

type ImageUploadProps = {
  /** URLs públicas de la galería (orden = principal primero). */
  value: string[];
  /** Se llama con el array actualizado de URLs. */
  onChange: (urls: string[]) => void;
  /** Carpeta dentro del bucket `imagenes`. */
  folder: ImageUploadFolder;
  /** Texto del label (opcional). */
  label?: string;
  /** Deshabilitar interacción. */
  disabled?: boolean;
  /** Máximo de imágenes permitidas. */
  maxImages?: number;
};

function buildFileName(file: File): string {
  const ext =
    file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const stamp = Date.now();
  const random = Math.random().toString(36).slice(2, 10);
  return `${stamp}-${random}.${safeExt}`;
}

function pathFromPublicUrl(
  publicUrl: string,
  folder: ImageUploadFolder,
): string | null {
  try {
    const marker = `/object/public/imagenes/`;
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return null;
    const path = decodeURIComponent(publicUrl.slice(idx + marker.length));
    if (!path.startsWith(`${folder}/`)) return null;
    return path;
  } catch {
    return null;
  }
}

export default function ImageUpload({
  value,
  onChange,
  folder,
  label = "Galería de imágenes",
  disabled = false,
  maxImages = DEFAULT_MAX_IMAGES,
}: ImageUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const images = useMemo(
    () => (Array.isArray(value) ? value.filter(Boolean) : []),
    [value],
  );
  const canAddMore = images.length < maxImages;

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/") || !ACCEPTED_TYPES.includes(file.type)) {
      return "Solo se permiten imágenes (JPG, PNG, WEBP o GIF).";
    }
    if (file.size > MAX_SIZE_BYTES) {
      return "Cada imagen no debe superar 5 MB.";
    }
    return null;
  };

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const list = Array.from(files);
      if (list.length === 0) return;

      const remaining = maxImages - images.length;
      if (remaining <= 0) {
        setError(`Máximo ${maxImages} imágenes.`);
        return;
      }

      const toUpload = list.slice(0, remaining);
      if (list.length > remaining) {
        setError(
          `Solo se subirán ${remaining} imagen(es) (máximo ${maxImages}).`,
        );
      } else {
        setError(null);
      }

      setUploading(true);
      const supabase = createClient();
      const newUrls: string[] = [];

      try {
        for (const file of toUpload) {
          const validationError = validateFile(file);
          if (validationError) {
            setError(validationError);
            continue;
          }

          const filePath = `${folder}/${buildFileName(file)}`;
          const { error: uploadError } = await supabase.storage
            .from("imagenes")
            .upload(filePath, file, {
              cacheControl: "3600",
              upsert: false,
              contentType: file.type,
            });

          if (uploadError) {
            setError(uploadError.message || "No se pudo subir la imagen.");
            continue;
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("imagenes").getPublicUrl(filePath);

          newUrls.push(publicUrl);
        }

        if (newUrls.length > 0) {
          onChange([...images, ...newUrls]);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al subir las imágenes.";
        setError(message);
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [folder, images, maxImages, onChange],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) void uploadFiles(files);
  };

  const handleDropZone = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading || !canAddMore) return;
    const files = e.dataTransfer.files;
    if (files?.length) void uploadFiles(files);
  };

  const removeAt = async (index: number) => {
    if (disabled || uploading) return;
    setError(null);

    const url = images[index];
    if (!url) return;

    const path = pathFromPublicUrl(url, folder);
    if (path) {
      try {
        const supabase = createClient();
        await supabase.storage.from("imagenes").remove([path]);
      } catch {
        // Si falla el borrado en storage, igual quitamos la URL del formulario
      }
    }

    onChange(images.filter((_, i) => i !== index));
  };

  const moveImage = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= images.length || to >= images.length) {
      return;
    }
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  const handleThumbDragStart = (index: number) => {
    if (disabled || uploading) return;
    setDragIndex(index);
  };

  const handleThumbDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    setDropIndex(index);
  };

  const handleThumbDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== index) {
      moveImage(dragIndex, index);
    }
    setDragIndex(null);
    setDropIndex(null);
  };

  const handleThumbDragEnd = () => {
    setDragIndex(null);
    setDropIndex(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-xs text-gray-400">
          {images.length}/{maxImages} · La primera es la principal
        </span>
      </div>

      {images.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((url, index) => (
            <li
              key={`${url}-${index}`}
              draggable={!disabled && !uploading}
              onDragStart={() => handleThumbDragStart(index)}
              onDragOver={(e) => handleThumbDragOver(e, index)}
              onDrop={(e) => handleThumbDrop(e, index)}
              onDragEnd={handleThumbDragEnd}
              className={`group relative overflow-hidden rounded-xl border bg-gray-50 transition ${
                dropIndex === index
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : index === 0
                    ? "border-blue-300 ring-1 ring-blue-100"
                    : "border-gray-200"
              } ${dragIndex === index ? "opacity-50" : ""} ${
                disabled || uploading ? "cursor-default" : "cursor-grab active:cursor-grabbing"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Imagen ${index + 1}`}
                className="aspect-[4/3] w-full object-cover"
                draggable={false}
              />

              {index === 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Principal
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveImage(index, index - 1)}
                    disabled={disabled || uploading || index === 0}
                    className="rounded-md bg-white/95 px-1.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-white disabled:opacity-40"
                    aria-label="Mover a la izquierda"
                    title="Mover a la izquierda"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(index, index + 1)}
                    disabled={disabled || uploading || index === images.length - 1}
                    className="rounded-md bg-white/95 px-1.5 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-white disabled:opacity-40"
                    aria-label="Mover a la derecha"
                    title="Mover a la derecha"
                  >
                    →
                  </button>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, 0)}
                      disabled={disabled || uploading}
                      className="rounded-md bg-white/95 px-1.5 py-1 text-[10px] font-semibold text-blue-700 shadow-sm hover:bg-white disabled:opacity-40"
                      title="Hacer principal"
                    >
                      ★
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => void removeAt(index)}
                  disabled={disabled || uploading}
                  className="rounded-md bg-red-50 px-2 py-1 text-[11px] font-medium text-red-700 shadow-sm hover:bg-red-100 disabled:opacity-40"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {canAddMore && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled && !uploading) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDropZone}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition ${
            dragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100/80"
          } ${disabled || uploading ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
          onClick={() => !disabled && !uploading && inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">
            {uploading
              ? "Subiendo imágenes..."
              : images.length > 0
                ? "Añadir más imágenes"
                : "Haz clic o arrastra imágenes"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            JPG, PNG, WEBP o GIF · Máx. 5 MB c/u · Puedes seleccionar varias
          </p>
          {images.length > 0 && (
            <p className="mt-1.5 text-xs text-gray-400">
              Arrastra las miniaturas para reordenar
            </p>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        className="sr-only"
        onChange={handleFileChange}
        disabled={disabled || uploading || !canAddMore}
      />

      {error && (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
