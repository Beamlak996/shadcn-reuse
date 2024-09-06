"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon } from "lucide-react";

// Define the structure for each radio item
interface RadioItem {
  id: string;
  label: string;
  description?: string; // Optional description
}

interface ReusableRadioGroupProps {
  items: RadioItem[];
  defaultValue: string;
  onValueChange: (value: string) => void;
}

export const ReusableRadioGroup: React.FC<ReusableRadioGroupProps> = ({
  items,
  defaultValue,
  onValueChange,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-background">
      <RadioGroup value={defaultValue} onValueChange={onValueChange}>
        <div className="grid gap-6">
          {items.map((item) => (
            <Label
              key={item.id}
              htmlFor={item.id}
              className={`flex items-center justify-between gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${
                defaultValue === item.id ? "bg-sky-100 border-sky-200" : ""
              }`}
            >
              <RadioGroupItem
                value={item.id}
                id={item.id}
                className="sr-only"
              />
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
                  defaultValue === item.id
                    ? "border-sky-600 bg-sky-600"
                    : "border-gray-300"
                }`}
              >
                {defaultValue === item.id && (
                  <CheckIcon className="w-4 h-4 text-white" />
                )}
              </div>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
