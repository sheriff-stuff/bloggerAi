import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "For individuals just getting started",
      price: "£1",
      period: "per month",
      features: [
        "1 blog post per month",
        "Basic SEO optimization",
        "Manual publishing",
        "Standard blog templates",
        "AI-generated content",
      ],
      limitations: ["No AI image generation", "No auto-posting", "No advanced customization"],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Pro",
      description: "For small businesses and content creators",
      price: "£29",
      period: "per month",
      features: [
        "10 blog posts per month",
        "Advanced SEO optimization",
        "Auto-posting to WordPress",
        "AI image generation",
        "Custom blog templates",
        "Content scheduling",
        "Email notifications",
        "Multiple publishing platforms",
      ],
      limitations: [],
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Business",
      description: "For growing businesses with high content needs",
      price: "£79",
      period: "per month",
      features: [
        "30 blog posts per month",
        "Premium SEO optimization",
        "Auto-posting to all platforms",
        "AI image generation",
        "Custom blog templates",
        "Content scheduling",
        "Email notifications",
        "Analytics dashboard",
        "Priority support",
        "Team collaboration",
        "API access",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="outline" className="mb-4">
          Pricing
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground">
          Choose the plan that fits your content needs. All plans include our core AI blog generation technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`border ${plan.popular ? "border-primary shadow-lg relative" : "border-border"}`}
          >
            {plan.popular && (
              <Badge
                className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 px-3 py-1"
                variant="default"
              >
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">What's included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex items-start">
                        <X className="h-4 w-4 mr-2 text-muted-foreground mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant={plan.buttonVariant} className="w-full" asChild>
                <Link href={plan.name === "Starter" ? "/signup" : "/contact"}>{plan.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Advanced Analytics",
              description:
                "Detailed performance metrics for your blog content, including traffic, engagement, and conversion data.",
            },
            {
              title: "AI Rewriting",
              description: "Submit old blogs to be restructured and refreshed for better SEO impact and relevance.",
            },
            {
              title: "Personalization",
              description: "Train AI on your brand's tone and writing style for more authentic content generation.",
            },
            {
              title: "Smart Categories & Tagging",
              description:
                "AI will automatically assign categories and tags based on industry trends and content analysis.",
            },
            {
              title: "Image Branding & Watermarking",
              description: "Automatically brand AI-generated images with your company logo or custom overlays.",
            },
            {
              title: "Bulk Blog Generation",
              description: "Schedule multiple blogs at once for automated creation and posting over time.",
            },
          ].map((feature, index) => (
            <Card key={index} className="border bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline">Coming Soon</Badge>
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              question: "Can I upgrade or downgrade my plan at any time?",
              answer:
                "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
            },
            {
              question: "Do unused blog posts roll over to the next month?",
              answer:
                "No, unused blog posts do not roll over to the next month. They reset at the beginning of each billing cycle.",
            },
            {
              question: "How does the WordPress integration work?",
              answer:
                "Our system connects to your WordPress site via our custom plugin. Once connected, blogs can be automatically published to your site based on your settings.",
            },
            {
              question: "Can I customize the AI-generated content?",
              answer:
                "Yes, you can review and edit all AI-generated content before publishing. You can also set preferences for tone, style, and content structure.",
            },
            {
              question: "Is there a long-term contract?",
              answer: "No, all our plans are month-to-month with no long-term commitment. You can cancel at any time.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b pb-6">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          If you have specific requirements or need more blog posts than our standard plans offer, contact our sales
          team for a custom solution.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </div>
    </div>
  )
}

