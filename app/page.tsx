import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Layers,
  Search,
  Sparkles,
  Zap,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/5 -z-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="px-3 py-1 text-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                AI-Powered Blog Generation
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Automate Your{" "}
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Content Strategy
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Generate SEO-optimized blogs automatically. Save time, boost rankings, and grow your business with
                AI-powered content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/generate">
                    Generate a Blog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-primary" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-primary" />
                  Free plan available
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl border">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Blogger AI Dashboard Preview"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end">
                  <div className="p-6">
                    <Button variant="default" size="sm">
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
              <div className="absolute -right-12 -bottom-12 -z-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Automated Blog Creation</h2>
            <p className="text-muted-foreground text-lg">
              Our platform handles the entire content creation process, from ideation to publishing, so you can focus on
              growing your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-6 w-6" />,
                title: "AI-Generated Content",
                description: "Our advanced AI creates high-quality, engaging blog posts tailored to your business.",
              },
              {
                icon: <Search className="h-6 w-6" />,
                title: "SEO Optimization",
                description: "Every blog is optimized for search engines with relevant keywords and meta descriptions.",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Automated Scheduling",
                description: "Set your preferred posting frequency and let our system handle the rest.",
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "WordPress Integration",
                description: "Seamlessly publish to your WordPress site with our custom plugin.",
              },
              {
                icon: <FileText className="h-6 w-6" />,
                title: "Content Customization",
                description: "Control tone, style, length, and topics to match your brand voice.",
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Performance Analytics",
                description: "Track how your blogs perform with comprehensive analytics.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border bg-background/60 hover:bg-background/80 transition-colors">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Blogger AI Works</h2>
            <p className="text-muted-foreground text-lg">Our simple 3-step process makes content creation effortless</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Input Your Details",
                description: "Provide information about your business, values, location, and industry.",
                icon: <Layers className="h-8 w-8" />,
              },
              {
                step: "02",
                title: "AI Generates Content",
                description: "Our AI creates SEO-optimized blog posts tailored to your specifications.",
                icon: <Sparkles className="h-8 w-8" />,
              },
              {
                step: "03",
                title: "Publish & Promote",
                description: "Automatically publish to your WordPress site or review before posting.",
                icon: <Zap className="h-8 w-8" />,
              },
            ].map((step, index) => (
              <div key={index} className="relative p-6 rounded-lg border bg-background/60">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {step.step}
                </div>
                <div className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Demo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See Blogger AI in Action</h2>
            <p className="text-muted-foreground text-lg">Watch how our platform automates your content strategy</p>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border">
            <div className="aspect-video bg-black/5 flex items-center justify-center">
              <Button size="lg" className="rounded-full px-6">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground text-lg">
              Join hundreds of businesses already saving time with Blogger AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Blogger AI has completely transformed our content strategy. We're publishing 3x more blogs with half the effort.",
                author: "Sarah Johnson",
                role: "Marketing Director",
                company: "TechStart Inc.",
              },
              {
                quote:
                  "The SEO optimization is incredible. Our organic traffic has increased by 45% since we started using Blogger AI.",
                author: "Michael Chen",
                role: "SEO Specialist",
                company: "Growth Metrics",
              },
              {
                quote:
                  "As a small business owner, I don't have time to write blogs. Blogger AI handles it all for me, and the quality is outstanding.",
                author: "Emma Rodriguez",
                role: "Founder",
                company: "Bright Solutions",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border bg-background/60 hover:bg-background/80 transition-colors">
                <CardContent className="p-6">
                  <div className="mb-4 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate Your Blog Content?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses saving time and boosting their SEO with AI-generated blog content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/generate">
                  Generate Your First Blog
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
