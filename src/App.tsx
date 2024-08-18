import z from "zod"
import { useForm } from "react-hook-form"
import { PasswordInput } from "./components/reuse/password-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./components/ui/button"


function App() {
  const Test = z.object({
    password: z.string().min(1, {
      message: "Password is requried."
    })
  })

  const form = useForm<z.infer<typeof Test>>({
    resolver: zodResolver(Test),
    defaultValues: {
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof Test>) => {
      console.log(values)
  }

  return (
    <div className="p-6" >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-[20%]" >
          <FormField 
            name="password"
            control={form.control}
            render={({field})=> (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <PasswordInput {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button>Check</Button>
        </form>

      </Form>
    </div>
  )
}

export default App
