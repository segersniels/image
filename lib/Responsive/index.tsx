import NextImage from 'next/image';
import React, { SyntheticEvent, useState } from 'react';

import { Props } from '..';

/**
 * In a normal situation we can make use of 'responsive' as our layout as can scale the small dimensions of
 * the event target up without noticeable quality loss
 */
const ResponsiveImage = (props: Props) => {
  const { layout = 'responsive' } = props;
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setHeight(event.currentTarget.naturalHeight);
    setWidth(event.currentTarget.naturalWidth);
  };

  return (
    <NextImage
      {...props}
      layout={layout}
      onLoad={handleLoad}
      width={width}
      height={height}
    />
  );
};

export default ResponsiveImage;
