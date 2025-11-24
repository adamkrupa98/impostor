import { useState } from "react";

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const Toggle = ({ value, onChange }: ToggleProps) => {
  return (
   <div 
  onClick={() => onChange(!value)}
  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition 
  ${value ? "bg-purple-500" : "bg-gray-500"}`}
>
  <div
    className={`w-4 h-4 bg-white rounded-full shadow transform transition-all duration-300
    ${value ? "translate-x-6" : "translate-x-0"}`}
  />
</div>
  );
};