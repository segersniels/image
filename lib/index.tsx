import NextImage, { ImageLoader } from 'next/image';
import React, { useEffect, useRef } from 'react';

declare const VALID_LOADING_VALUES: readonly ['lazy', 'eager', undefined];
declare type LoadingValue = typeof VALID_LOADING_VALUES[number];
declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements['img']['style']
>;

type Props = Omit<
  JSX.IntrinsicElements['img'],
  'src' | 'srcSet' | 'ref' | 'width' | 'height' | 'loading' | 'style'
> & {
  src: string;
  loader?: ImageLoader;
  quality?: number | string;
  priority?: boolean;
  loading?: LoadingValue;
  unoptimized?: boolean;
  objectFit?: ImgElementStyle['objectFit'];
  objectPosition?: ImgElementStyle['objectPosition'];
  layout?: 'fixed' | 'intrinsic' | 'responsive';
  width?: number;
  height?: number;
};

interface Ref {
  width: number;
  height: number;
  loaded: boolean;
}

const ResponsiveImage = (props: Props) => {
  const { src, layout = 'intrinsic' } = props;
  const ref = useRef<Ref | null>(null);

  useEffect(() => {
    if (ref.current?.loaded) {
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

  if (!ref.current?.loaded) {
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
