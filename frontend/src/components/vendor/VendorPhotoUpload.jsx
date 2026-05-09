import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const MotionDiv = motion.div;

const VendorPhotoUpload = ({ photos, onAddPhotos, onRemovePhoto }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/"),
    );
    onAddPhotos(files);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      <MotionDiv
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`rounded-[1.75rem] border border-dashed p-8 text-center transition ${
          isDragging
            ? "border-indigo-300/70 bg-indigo-400/10"
            : "border-white/15 bg-slate-950/60 hover:border-white/25 hover:bg-white/[0.04]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-indigo-200">
          <UploadCloud className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Listings with photos get more student inquiries
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-400">
          Add storefront, menu, room, vehicle, or service photos. Clear phone
          photos work perfectly.
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
        >
          <ImagePlus className="h-4 w-4" />
          Choose photos
        </button>
      </MotionDiv>

      {photos.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <MotionDiv
              key={photo.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80"
            >
              <img
                src={photo.url}
                alt="Vendor upload preview"
                className="h-36 w-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemovePhoto(photo.id)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white opacity-100 backdrop-blur transition hover:bg-rose-500/80 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Remove photo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </MotionDiv>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default VendorPhotoUpload;
