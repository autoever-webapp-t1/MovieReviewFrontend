import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Star } from "@mui/icons-material";

interface CustomRatingProps {
  value: number;
  size: "small" | "medium" | "large";
}

export default function CustomRating({ value, size }: CustomRatingProps) {
  return (
    <Rating
      readOnly
      value={value}
      max={5}
      precision={0.1}
      size={size}
      icon={
        <Star
          style={{ opacity: 1, color: "var(--color-primary)" }}
          fontSize="inherit"
        />
      }
      emptyIcon={
        <StarIcon
          style={{ opacity: 1, color: "var(--color-gray-500)" }}
          fontSize="inherit"
        />
      }
    />
  );
}
