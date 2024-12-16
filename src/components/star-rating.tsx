"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ name, value, onChange }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= (hover || value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
