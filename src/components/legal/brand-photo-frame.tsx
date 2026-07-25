import Image, { type ImageProps } from "next/image";

type BrandPhotoFrameProps = Omit<ImageProps, "fill"> & {
  frameClassName?: string;
  imageClassName?: string;
  /** Tailwind object-position, e.g. `object-center` or `object-[50%_20%]` */
  imagePosition?: string;
};

/** Full-bleed image frame for marketing photos. */
export function BrandPhotoFrame({
  frameClassName = "",
  imageClassName = "",
  imagePosition = "object-center",
  className,
  alt,
  ...imageProps
}: BrandPhotoFrameProps) {
  return (
    <div className={`relative overflow-hidden ${frameClassName} ${className ?? ""}`}>
      <Image
        alt={alt}
        fill
        className={`object-cover ${imagePosition} ${imageClassName}`}
        {...imageProps}
      />
    </div>
  );
}
