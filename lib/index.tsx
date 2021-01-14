import { ImageLoader } from 'next/image';
import React from 'react';

import IntrinsicImage from './Intrinsic';
import ResponsiveImage from './Responsive';

declare const VALID_LOADING_VALUES: readonly ['lazy', 'eager', undefined];
declare type LoadingValue = typeof VALID_LOADING_VALUES[number];
declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements['img']['style']
>;

enum Layout {
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
  const { layout = 'responsive' } = props;

  return layout === Layout.Intrinsic ? (
    <IntrinsicImage {...props} />
  ) : (
    <ResponsiveImage {...props} />
  );
};

export default Image;
