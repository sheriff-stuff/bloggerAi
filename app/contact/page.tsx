"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, CheckCircle, Loader2, Mail, MapPin, MessageSquare, Phone } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="outline" className="mb-4">
          Contact Us
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch with Our Team</h1>
        <p className="text-lg text-muted-foreground">
          Have questions about Blogger AI? We're here to help you automate your content strategy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">support@bloggerai.com</p>
                <p className="text-muted-foreground">sales@bloggerai.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-muted-foreground">123 Innovation Drive, Suite 400</p>
                <p className="text-muted-foreground">San Francisco, CA 94103</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How does the AI blog generation work?",
                  answer:
                    "Our AI analyzes your business information and industry to create relevant, SEO-optimized blog content tailored to your brand voice and target audience.",
                },
                {
                  question: "Can I edit the AI-generated content?",
                  answer:
                    "Yes, you have full control to review and edit all content before publishing. You can also set it to auto-post if you prefer.",
                },
                {
                  question: "How to Connect WordPress",
                  answer: (
                    <ol className="space-y-4">
                      <li className="flex items-start space-x-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          1
                        </div>
                        <div>
                          <p className="text-sm">Install the Blogger AI WordPress plugin on your WordPress site</p>
                          <Button variant="link" className="h-auto p-0 text-sm">
                            Download Plugin
                          </Button>
                        </div>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          2
                        </div>
                        <p className="text-sm">Activate the plugin and go to the Blogger AI settings page</p>
                      </li>
                    </ol>
                  ),
                },
                {
                  question: "What if I'm not satisfied with the content?",
                  answer:
                    "We offer a 14-day money-back guarantee. If you're not happy with the quality of the content, we'll refund your subscription.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="sales">Sales Question</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback/Suggestions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your message" rows={6} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 p-6 border rounded-lg bg-muted/30">
            <h3 className="font-semibold mb-4">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is available via live chat during business hours.
            </p>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Try Blogger AI today and see how our AI-powered blog generation can transform your content strategy.
        </p>
        <Button size="lg" asChild>
          <Link href="/generate">
            Generate Your First Blog
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
