export const zodSchemaTemplate = (name: string) => `import { z } from "zod"

export const ${name}Schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})

export type ${name}Input = z.infer<typeof ${name}Schema>
`

export const serverActionsTemplate = (name: string, pascalName: string) => `
"use server"

import { db } from "@/lib/db"
import { ${name}Schema, ${name}Input } from "@/lib/validations/${name}"
import { revalidatePath } from "next/cache"

export async function create${pascalName}(data: ${name}Input) {
  const result = ${name}Schema.safeParse(data)

  if (!result.success) {
    return { error: "Invalid input" }
  }

  try {
    await db.${name}.create({
      data: result.data,
    })
    revalidatePath("/${name}s")
    return { success: true }
  } catch (error) {
    return { error: "Failed to create ${name}" }
  }
}

export async function delete${pascalName}(id: string) {
  try {
    await db.${name}.delete({
      where: { id },
    })
    revalidatePath("/${name}s")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete ${name}" }
  }
}
`

export const formComponentTemplate = (name: string, pascalName: string) => `
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ${name}Schema, ${name}Input } from "@/lib/validations/${name}"
import { create${pascalName} } from "@/lib/actions/${name}"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

export function ${pascalName}Form() {
  const form = useForm<${name}Input>({
    resolver: zodResolver(${name}Schema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  async function onSubmit(data: ${name}Input) {
    const result = await create${pascalName}(data)

    if (result.error) {
      toast.error(result.error)
      return
    }

    toast.success("${pascalName} created successfully")
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter content" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create ${pascalName}</Button>
      </form>
    </Form>
  )
}
`

export const pageTemplate = (name: string, pascalName: string) => `
import { db } from "@/lib/db"
import { ${pascalName}Form } from "@/components/${name}/${name}-form"

export default async function ${pascalName}sPage() {
  const items = await db.${name}.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">${pascalName}s</h1>
      
      <div className="mb-10 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create New</h2>
        <${pascalName}Form />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All ${pascalName}s</h2>
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-muted-foreground mt-1">{item.content}</p>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-muted-foreground">No items found.</p>
        )}
      </div>
    </div>
  )
}
`
