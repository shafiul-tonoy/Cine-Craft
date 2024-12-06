import { useForm, Controller } from "react-hook-form";
export default function Star({ isFilled, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        fontSize: "30px",
        color: isFilled ? "#ffc107" : "#e4e5e9", // Gold for filled, gray for empty
      }}
    >
      ★
    </span>
  );
}
