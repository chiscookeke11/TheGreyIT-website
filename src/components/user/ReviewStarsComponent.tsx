"use client";

import { Rating } from "react-simple-star-rating";


interface RatingStarsProps{
  ratingValue: number
  size?: number
}


export default function RatingStars({ratingValue, size=20}: RatingStarsProps) {


  return (
    <Rating
      readonly
      initialValue={ratingValue}
      allowFraction
      size={size}
      SVGstyle={{ display: "inline-block" }}
    />
  );
}
