"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ReusableRadioGroup } from "./components/reuse/reusable-radio-group";

// Define the validation schema using zod
const FormSchema = z.object({
  selectedOption: z.string().min(1, "You need to select an option."),
});

type FormValues = z.infer<typeof FormSchema>;

const radioItems = [
  { id: "option1", label: "Option 1", description: "This is option 1" },
  { id: "option2", label: "Option 2", description: "This is option 2" },
  { id: "option3", label: "Option 3", description: "This is option 3" },
];

export function App() {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedOption: "", // Use the ID as default value
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Selected value:", data.selectedOption);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
        <FormField
          control={form.control}
          name="selectedOption"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select an option</FormLabel>
              <FormControl>
                <ReusableRadioGroup
                  items={radioItems}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.selectedOption?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default App;
