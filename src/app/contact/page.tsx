'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { SelectField } from '@/components/common/SelectField'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Define the schema for form validation using Zod
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Enter a valid email'),
  subject: z.enum(['general', 'support', 'feedback', 'partnership', 'post a job'], {
    message: 'Please choose a subject',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})
export default function ContactPage() {
  return (
    <Suspense>
      <Contact />
    </Suspense>
  )
}
function Contact() {
  const searchParams = useSearchParams()
  const subjectParam = searchParams.get('subject')
  // Define the form using react-hook-form and integrate Zod for validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: subjectParam == 'post' ? 'post a job' : undefined,
      message: '',
    },
  })
  function onSubmit() {
    toast.success('Message submitted! Please allow 3 - 5 business days for a response.', {
      position: 'top-center',
    })
    form.reset()
  }
  return (
    <section aria-labelledby="contact-title" className="max-w-3xl mx-auto px-4 py-8 space-y-5 ">
      <h1 className="border-b pb-3" id="contact-title">
        Contact Us
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <SelectField
                  options={[
                    { value: 'general', label: 'General' },
                    { value: 'support', label: 'Support' },
                    { value: 'feedback', label: 'Feedback' },
                    { value: 'partnership', label: 'Partnership' },
                    { value: 'post a job', label: 'Post a Job' },
                  ]}
                  placeholder="Select a subject"
                  onValueChange={field.onChange}
                  value={field.value?.length >= 1 ? field.value : ''}
                  initialStaticLabel="Select a subject"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea rows={10} placeholder="Write your message here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            Send Message
          </Button>
        </form>
      </Form>
    </section>
  )
}
