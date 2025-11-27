"use client";

import { Rating } from "react-simple-star-rating";


interface RatingStarsProps {
  ratingValue: number
  size?: number
  readonly: boolean;
   onChange?: (rate: number) => void;
}


export default function RatingStars({ ratingValue, size = 20, readonly, onChange }: RatingStarsProps) {


  return (
    <Rating
      readonly={readonly}
      initialValue={ratingValue}
      allowFraction
      size={size}
      SVGstyle={{ display: "inline-block" }}
      onClick={onChange}
    />
  );
}
