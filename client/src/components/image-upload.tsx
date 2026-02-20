import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
  labels: {
    title: string;
    description: string;
    noFile: string;
    selectFile: string;
    preview: string;
  };
}

export function ImageUpload({ onImageSelect, selectedImage, labels }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.type.startsWith("image/")) {
        onImageSelect(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        alert("Please select an image file");
      }
    } else {
      onImageSelect(null);
      setPreviewUrl(null);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    onImageSelect(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e.target.files[0]);
          }
        }}
        accept="image/*"
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="upload-zone"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
              "relative group cursor-pointer flex flex-col items-center justify-center w-full h-80 rounded-3xl border-3 border-dashed transition-all duration-300 ease-out",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50"
            )}
          >
            <div className="flex flex-col items-center gap-4 p-6 text-center">
              <div className={cn(
                "p-4 rounded-full transition-colors duration-300",
                isDragging ? "bg-primary/20 text-primary" : "bg-green-100 text-green-600 group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <Upload className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-700 font-display">
                  {labels.title}
                </h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                  {labels.description}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            key="preview-zone"
            className="relative w-full overflow-hidden rounded-3xl border border-border shadow-md bg-white"
          >
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="rounded-full shadow-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="relative aspect-video w-full bg-gray-100 flex items-center justify-center overflow-hidden">
               <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 text-white">
                 <p className="text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                   {labels.preview}
                 </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
