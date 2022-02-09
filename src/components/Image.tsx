import { FC } from "react";
import {
  ScrollPosition,
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type Prop = {
  src: string;
  scrollPosition: ScrollPosition;
};

const Image: FC<Prop> = ({ src, scrollPosition }) => {
  return (
    <LazyLoadImage
      src={src}
      className="image"
      scrollPosition={scrollPosition}
    />
  );
};
export default trackWindowScroll(Image);
