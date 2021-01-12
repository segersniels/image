## @segersniels/image

A dynamic and responsive default implementation of `next/image` that determines height and width on the go.

<p align="center">
<img src="./resources/image.png" width="300">

### Why

Next.js released `next/image` quite a while ago but wasn't checking all the boxes that I was searching in their automagic `<Image />` component.
Their component supports different `layout` values that define how your image size behaves according to the current viewport or surrounding element.
Besides passing a `layout` prop they require you to always pass the desired `height` and `width` dimensions.

This is perfectly fine if you're using local images which you know the dimensions of but quickly becomes annoying when you try including images copied from eg. Twitter.
This wrapped implementation will determine the `height` and `width` for you on image load so you don't have to worry about any of this anymore.

Just implement it and your image should adjust accordingly to the current scaling.

### Usage

Use it like you would use `next/image`. The default `layout` is `intrinsic` but can be changed to `responsive` if your use case requires it.

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
