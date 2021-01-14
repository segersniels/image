# @segersniels/image

A dynamic and responsive default implementation of `next/image` that determines height and width on the go.

<p align="center">
<img src="./resources/image.png" width="300">

## Why

Recently Next.js released version v10.0.0 which introduced `next/image`.

> Since version 10.0.0, Next.js has a built-in Image Component and Automatic Image Optimization.

> The Next.js Image Component, next/image, is an extension of the HTML <img> element, evolved for the modern web.

> The Automatic Image Optimization allows for resizing, optimizing, and serving images in modern formats like WebP when the browser supports it. This avoids shipping large images to devices with a smaller viewport. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.

So the TLDR; is it does a lot of internal image optimization for you so you don't have to implement your own solutions for them manually. The component supports different `layout` values that define how your image size behaves according to the current viewport or surrounding element. Besides passing a `layout` prop they require you to always pass the desired `height` and `width` dimensions.

This is perfectly fine if you're using local images that you know the dimensions of. But things quickly become annoying when you try including images from external sources like eg. Twitter. Neither of the current implementations was doing the _magic_ I was promised and still required weird logic to make things work.

This wrapped implementation will determine the `height` and `width` for you on image load so you don't have to worry about any of this anymore. The default `layout` is set to `intrinsic` which will scale down for smaller viewports but won't scale up.

## Usage

Use it like you would use `next/image`. The default `layout` is `intrinsic` but can be changed to `responsive` if your use case requires it. View below example using it as a renderer provided to [`react-markdown`](https://github.com/remarkjs/react-markdown).

```js
export default {
  code: Window,
  image: ({
    alt,
    src,
    title,
  }: {
    alt?: string;
    src?: string;
    title?: string;
  }) => {
    return (
      <Wrapper>
        <ResponsiveImage src={src} alt={alt} title={title} />
      </Wrapper>
    );
  },
};
```

## Demo

View it in action on my blog at [https://nielssegers.be/blog/segersniels-image](https://nielssegers.be/blog/segersniels-image).
