import { Icons } from "./components/icons";
import { MultiSelect } from "./components/reuse/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./components/ui/button";

const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
    icon: Icons.dog,
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    icon: Icons.cat,
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
    icon: Icons.turtle,
  },
  {
    value: "remix",
    label: "Remix",
    icon: Icons.rabbit,
  },
  {
    value: "astro",
    label: "Astro",
    icon: Icons.fish,
  },
];

function App() {
  const FormSchema = z.object({
    frameworks: z
      .array(z.string().min(1))
      .min(1)
      .nonempty("Please select at least one framework."),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      frameworks: ["next.js", "nuxt.js"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(`You have selected following frameworks: ${data.frameworks.join(", ")}.`);
    
  }

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[500px]">
          <FormField
            control={form.control}
            name="frameworks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frameworks</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={frameworksList}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    placeholder="Select options"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                </FormControl>
                <FormDescription>
                  Choose the frameworks you are interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default App;
