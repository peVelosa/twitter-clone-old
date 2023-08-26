import { useState } from "react";
import Image, { type ImageProps } from "next/image";

const ImageWithFallback = ({ src, alt, ...rest }: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc ? imgSrc : "/fallbackImage.webp"}
      onError={() => {
        setImgSrc("");
      }}
    />
  );
};

export default ImageWithFallback;
