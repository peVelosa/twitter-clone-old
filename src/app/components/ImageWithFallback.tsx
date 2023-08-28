import { useState, type FC } from "react";
import Image, { type ImageProps } from "next/image";

const ImageWithFallback: FC<ImageProps> = ({ src, alt, ...rest }) => {
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
