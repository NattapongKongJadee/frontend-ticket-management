import React from "react";
import Chip from "@mui/material/Chip";
import { BadgeProperties } from "../../interfaces/badge";

const BadgeCustom: React.FC<BadgeProperties> = ({ title, color, number }) => {
  const tailwindColors = {
    "bg-red-400": "#F87171",
    "bg-green-400": "#4ADE80",
    "bg-yellow-400": "#FACC15",
    "bg-blue-400": "#60A5FA",
  } as const;

  const chipColor =
    tailwindColors[color as keyof typeof tailwindColors] || "#E5E7EB";
  return (
    <div className="flex flex-row items-center bg-white rounded-lg h-8 font-medium text-sm text-black p-2 justify-between shadow-md hover:cursor-pointer transition-transform duration-300 ease-in-out transform hover:translate-x-1 hover:-translate-y-1">
      {title}
      <Chip
        label={`${number}`}
        size="small"
        sx={{
          backgroundColor: chipColor,
          color: "#FFFFFF", // White text
        }}
      />
    </div>
  );
};

export default BadgeCustom;
