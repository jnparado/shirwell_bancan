import Image, { type ImageProps } from "next/image";
import { BrandLegalMarks } from "@/components/legal/brand-legal-marks";

type BrandPhotoFrameProps = Omit<ImageProps, "fill"> & {
  frameClassName?: string;
  imageClassName?: string;
};

/**
 * Image frame with inset crop and a clear bottom-right margin for TM / © marks.
 */
export function BrandPhotoFrame({
  frameClassName = "",
  imageClassName = "",
  className,
  alt,
  ...imageProps
}: BrandPhotoFrameProps) {
  return (
    <div className={`relative ${frameClassName} ${className ?? ""}`}>
      <div className="absolute inset-x-2 top-2 bottom-12 right-10 overflow-hidden rounded-lg sm:inset-x-3 sm:top-3 sm:bottom-14 sm:right-11">
        <Image
          alt={alt}
          fill
          className={`object-cover object-[32%_22%] ${imageClassName}`}
          {...imageProps}
        />
      </div>
      <div className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-md bg-black/50 px-1.5 py-1 backdrop-blur-sm">
        <BrandLegalMarks variant="inline" className="relative" />
      </div>
    </div>
  );
}
