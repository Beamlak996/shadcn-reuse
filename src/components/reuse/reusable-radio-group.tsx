"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon } from "lucide-react";

// Define the structure for each radio item, including optional icon
interface RadioItem {
  id: string;
  label: string;
  description?: string; // Optional description
  icon?: React.ReactNode; // Optional icon
}

interface ReusableRadioGroupProps {
  items: RadioItem[];
  defaultValue: string;
  onValueChange: (value: string) => void;
  grid?: number; // Optional prop to control grid columns (e.g., 2, 3, 4...)
}

export const ReusableRadioGroup: React.FC<ReusableRadioGroupProps> = ({
  items,
  defaultValue,
  onValueChange,
  grid = 1, // Default to a single-column layout
}) => {
  // Define a style object for the grid columns
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))`,
    gap: "1.5rem", // Adjust the gap between grid items if needed
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-background">
      <RadioGroup value={defaultValue} onValueChange={onValueChange}>
        <div style={gridStyle}>
          {items.map((item) => {
            const isSelected = defaultValue === item.id; // Check if the radio item is selected

            return (
              <Label
                key={item.id}
                htmlFor={item.id}
                className={`flex items-center justify-between gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                  isSelected ? "bg-sky-100 border-sky-200" : ""
                }`}
              >
                <RadioGroupItem
                  value={item.id}
                  id={item.id}
                  className="sr-only"
                />
                {item.icon && (
                  <div
                    className={`mr-4 ${
                      isSelected ? "text-sky-400" : "text-gray-500"
                    }`} // Change icon color based on selection
                  >
                    {item.icon}
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-semibold capitalize">{item.label}</div>
                  {item.description && (
                    <div className="text-sm text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-sky-600 bg-sky-600" : "border-gray-300"
                  }`}
                >
                  {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
                </div>
              </Label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
};
