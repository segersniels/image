import NextImage, { ImageProps } from 'next/image';
import React, { useEffect, useRef } from 'react';

interface Ref {
  width: number;
  height: number;
  loaded: boolean;
}

const ResponsiveImage = (
  props: ImageProps & { layout?: 'fixed' | 'intrinsic' | 'responsive' },
) => {
  const { src, layout = 'intrinsic' } = props;
  const ref = useRef<Ref>(null);

  useEffect(() => {
    if (ref.current.loaded) {
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      ref.current.width = img.naturalWidth;
      ref.current.height = img.naturalHeight;
      ref.current.loaded = true;
    };
  }, [src]);

  if (!ref.current.loaded) {
    return null;
  }

  return (
    <NextImage
      {...props}
      layout={layout}
      width={ref.current.width}
      height={ref.current.height}
    />
  );
};

export default ResponsiveImage;
