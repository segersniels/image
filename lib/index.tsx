import NextImage, { ImageLoader } from 'next/image';
import React from 'react';

import IntrinsicImage from './Intrinsic';
import ResponsiveImage from './Responsive';

declare const VALID_LOADING_VALUES: readonly ['lazy', 'eager', undefined];
declare type LoadingValue = typeof VALID_LOADING_VALUES[number];
declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements['img']['style']
>;

export enum Layout {
  Intrinsic = 'intrinsic',
  Fixed = 'fixed',
  Responsive = 'responsive',
}

export type Props = Omit<
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
  layout?: Layout;
  width?: number;
  height?: number;
};

const Image = (props: Props) => {
  // Fallback to default next/image if user passes width and height
  if (props.width && props.height) {
    return (
      <NextImage
        {...props}
        layout={props.layout ?? Layout.Intrinsic} // Respect default value `intrinsic`
        width={props.width}
        height={props.height}
      />
    );
  }

  return props.layout === Layout.Intrinsic ? (
    <IntrinsicImage {...props} />
  ) : (
    <ResponsiveImage {...props} />
  );
};

export default Image;
