import NextImage, { ImageLoader } from 'next/image';
import React, { useEffect, useState } from 'react';

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

const ResponsiveImage = (props: Props) => {
  const { src, layout = 'intrinsic' } = props;
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isInitialised, setIsInitialised] = useState(false);

  useEffect(() => {
    if (isInitialised) {
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setIsInitialised(true);
    };
  }, [src, isInitialised]);

  if (!isInitialised) {
    return null;
  }

  return <NextImage {...props} layout={layout} width={width} height={height} />;
};

export default ResponsiveImage;
