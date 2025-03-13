import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="outline" className="mb-4">
          About Us
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Mission is to Revolutionize Content Creation</h1>
        <p className="text-lg text-muted-foreground">
          We're building the future of AI-powered content generation to help businesses grow their online presence.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Blogger AI was founded in 2023 by a team of content marketers and AI engineers who were frustrated with the
            time-consuming process of creating high-quality blog content.
          </p>
          <p className="text-muted-foreground mb-4">
            We realized that many businesses struggle to maintain a consistent content schedule, despite knowing how
            important it is for SEO and customer engagement.
          </p>
          <p className="text-muted-foreground">
            Our solution combines cutting-edge AI technology with content marketing best practices to automate the blog
            creation process, helping businesses save time while still producing valuable content for their audience.
          </p>
        </div>
        <div className="relative">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Blogger AI Team"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -z-10 -bottom-6 -right-6 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <p className="text-muted-foreground">These core principles guide everything we do at Blogger AI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality Content",
              description:
                "We believe that AI-generated content should be indistinguishable from human-written content. Our technology focuses on creating high-quality, valuable content that engages readers.",
              icon: <CheckCircle className="h-10 w-10" />,
            },
            {
              title: "Time Efficiency",
              description:
                "We're committed to saving our customers time. Our platform automates the most time-consuming aspects of content creation so you can focus on growing your business.",
              icon: <Clock className="h-10 w-10" />,
            },
            {
              title: "Customer Success",
              description:
                "Your success is our success. We're dedicated to helping our customers achieve their content marketing goals and grow their online presence.",
              icon: <Users className="h-10 w-10" />,
            },
          ].map((value, index) => (
            <Card key={index} className="border bg-background/60">
              <CardContent className="p-6">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground">The passionate people behind Blogger AI</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "CEO & Co-Founder",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Former content marketing director with 10+ years of experience.",
            },
            {
              name: "Michael Chen",
              role: "CTO & Co-Founder",
              image: "/placeholder.svg?height=300&width=300",
              bio: "AI engineer with a background in natural language processing.",
            },
            {
              name: "Emma Rodriguez",
              role: "Head of Product",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Product manager specializing in SaaS and AI applications.",
            },
            {
              name: "David Kim",
              role: "Lead Developer",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Full-stack developer with expertise in AI integration.",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Roadmap</h2>
          <p className="text-muted-foreground">What we're working on and what's coming next</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-muted" />
          <div className="space-y-12">
            {[
              {
                title: "Q4 2023",
                features: ["Launch of Blogger AI platform", "WordPress integration", "Basic SEO optimization"],
                status: "Completed",
              },
              {
                title: "Q1 2024",
                features: ["Advanced customization options", "AI image generation", "Content scheduling"],
                status: "In Progress",
              },
              {
                title: "Q2 2024",
                features: ["Analytics dashboard", "Team collaboration features", "Advanced SEO tools"],
                status: "Planned",
              },
              {
                title: "Q3 2024",
                features: ["Multi-language support", "Social media integration", "Custom API access"],
                status: "Planned",
              },
            ].map((milestone, index) => (
              <div
                key={index}
                className={`relative flex items-start ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <Badge
                    variant={
                      milestone.status === "Completed"
                        ? "default"
                        : milestone.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                    className="mb-4"
                  >
                    {milestone.status}
                  </Badge>
                  <ul className={`space-y-2 ${index % 2 === 0 ? "ml-auto" : ""}`}>
                    {milestone.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        {index % 2 === 1 && <CheckCircle className="h-4 w-4 text-primary shrink-0" />}
                        <span className="text-muted-foreground">{feature}</span>
                        {index % 2 === 0 && <CheckCircle className="h-4 w-4 text-primary ml-auto shrink-0" />}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background" />
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-primary/5 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Content Strategy?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join thousands of businesses already using Blogger AI to automate their blog content creation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/generate">
              Try It Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
