"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReusableCheckboxGroup } from "./reusable-checkbox-group";
import { User } from "lucide-react";

// Define the validation schema using zod
const FormSchema = z.object({
  items: z.array(z.string()).min(1, "You need to select at least one option."),
});

type FormValues = z.infer<typeof FormSchema>;

const checkboxItems = [
  { id: "item1", label: "Item 1", description: "This is item 1", icon: <User /> },
  { id: "item2", label: "Item 2", description: "This is item 2" },
  { id: "item3", label: "Item 3", description: "This is item 3" },
];

export function CheckboxForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["item1"], // Pre-select one item by default
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Selected values:", data.items);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select items</FormLabel>
              <FormControl>
                <ReusableCheckboxGroup
                  items={checkboxItems}
                  defaultValues={field.value}
                  onValueChange={field.onChange}
                  grid={2}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.items?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CheckboxForm;
