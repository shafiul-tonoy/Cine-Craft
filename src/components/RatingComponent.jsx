import { Controller } from "react-hook-form";
import { useState } from "react";
import Star from "../components/Star";

export default function RatingComponent({ value, onChange }) {
  const [currentRating, setCurrentRating] = useState(value || 0);

  const handleClick = (rating) => {
    setCurrentRating(rating);
    onChange(rating); // Update the value in React Hook Form
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          isFilled={star <= currentRating}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
}
