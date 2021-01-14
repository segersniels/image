import NextImage from 'next/image';
import React, { useEffect, useState } from 'react';

import { Props } from '..';

/**
 * When layout is set to 'intrinsic' and due to the onLoad event target having incorrect dimensions
 * we need to create a HTMLImageElement component to mimic the onLoad event and grab the correct height and width
 */
const IntrinsicImage = (props: Props) => {
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

export default IntrinsicImage;
