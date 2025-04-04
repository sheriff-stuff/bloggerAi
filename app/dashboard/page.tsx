"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  BarChart3,
  Calendar,
  Clock,
  Edit,
  FileText,
  MoreHorizontal,
  Settings,
  Sparkles,
  Trash2,
  Upload,
  CalendarDays,
  FileUp,
  RefreshCw,
  Wand2,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for blogs
  const blogs = [
    {
      id: 1,
      title: "10 Ways to Improve Your Website's SEO",
      status: "published",
      date: "2023-11-15",
      keywords: ["SEO", "Digital Marketing", "Website"],
      type: "How-To",
      excerpt:
        "Learn the top 10 strategies to improve your website's search engine ranking and drive more organic traffic.",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Content Marketing in 2023",
      status: "scheduled",
      date: "2023-11-20",
      keywords: ["Content Marketing", "Strategy", "ROI"],
      type: "Guide",
      excerpt:
        "Discover the latest content marketing trends and strategies to help your business grow in 2023 and beyond.",
    },
    {
      id: 3,
      title: "Why Customer Experience Matters More Than Ever",
      status: "draft",
      date: "2023-11-18",
      keywords: ["Customer Experience", "CX", "Customer Service"],
      type: "Opinion",
      excerpt:
        "In today's competitive market, providing an exceptional customer experience is crucial for business success.",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "draft":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Published"
      case "scheduled":
        return "Scheduled"
      case "draft":
        return "Draft"
      default:
        return status
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your blog content and settings</p>
        </div>
        <Button asChild>
          <Link href="/generate">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate New Blog
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blogs">My Blogs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="wordpress">WordPress</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Blog Posts This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3/10</div>
                <Progress value={30} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">7 posts remaining in your Pro plan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Published</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-muted-foreground mt-2">+3 from last month</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Pro</div>
                <div className="text-xs text-muted-foreground mt-2">Renews on Dec 15, 2023</div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/pricing">Upgrade</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>WordPress Integration</AlertTitle>
            <AlertDescription>
              Connect your WordPress site to enable auto-posting of your generated blogs.{" "}
              <Link
                href="/dashboard?tab=wordpress"
                onClick={() => setActiveTab("wordpress")}
                className="font-medium underline underline-offset-4"
              >
                Set up now
              </Link>
            </AlertDescription>
          </Alert>

          <h2 className="text-xl font-semibold mt-6">Recent Blogs</h2>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(blog.status)}`} />
                        <span className="text-sm text-muted-foreground">{getStatusText(blog.status)}</span>
                        <span className="text-sm text-muted-foreground">{blog.date}</span>
                      </div>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs bg-primary/10">
                          {blog.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard?tab=blogs" onClick={() => setActiveTab("blogs")}>
                View All Blogs
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Bulk Blog Generation",
                  description: "Schedule multiple blogs at once for automated posting.",
                  icon: <CalendarDays className="h-8 w-8 text-muted-foreground/50" />,
                },
                {
                  title: "AI Blog Rewriting",
                  description: "Restructure and refresh old blogs for better SEO impact.",
                  icon: <RefreshCw className="h-8 w-8 text-muted-foreground/50" />,
                },
                {
                  title: "AI Personalization",
                  description: "Train AI on your brand's tone and writing style.",
                  icon: <Wand2 className="h-8 w-8 text-muted-foreground/50" />,
                },
                {
                  title: "Image Branding",
                  description: "Automatically brand AI-generated images with your logo.",
                  icon: <FileUp className="h-8 w-8 text-muted-foreground/50" />,
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-muted/30">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="font-medium flex items-center">
                        {feature.title}
                        <Badge variant="outline" className="ml-2 text-xs">
                          Soon
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="blogs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Blogs</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[...blogs, ...blogs].map((blog, index) => (
              <Card key={`${blog.id}-${index}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(blog.status)}`} />
                        <span className="text-sm text-muted-foreground">{getStatusText(blog.status)}</span>
                        <span className="text-sm text-muted-foreground">{blog.date}</span>
                      </div>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs bg-primary/10">
                          {blog.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="h-4 w-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>Track the performance of your blog content</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Analytics Coming Soon</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  We're working on a comprehensive analytics dashboard to help you track the performance of your blog
                  content. Stay tuned!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wordpress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Platforms</CardTitle>
              <CardDescription>Connect your preferred platforms to enable auto-posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  name: "WordPress",
                  description: "Connect via custom plugin",
                  connected: false,
                },
                {
                  name: "Ghost",
                  description: "Modern blogging platform",
                  connected: false,
                },
                {
                  name: "Medium",
                  description: "For public blogging",
                  connected: false,
                },
                {
                  name: "Shopify Blog",
                  description: "For e-commerce businesses",
                  connected: false,
                },
                {
                  name: "Webflow CMS",
                  description: "For Webflow-built sites",
                  connected: false,
                },
                {
                  name: "Notion",
                  description: "For knowledge bases",
                  connected: false,
                },
                {
                  name: "LinkedIn Articles",
                  description: "For business-related posts",
                  connected: false,
                },
              ].map((platform, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                    </div>
                    <Button variant={platform.connected ? "outline" : "default"} size="sm">
                      {platform.connected ? "Manage" : "Connect"}
                    </Button>
                  </div>
                </div>
              ))}

              <div>
                <h3 className="font-medium mb-4">How to Connect WordPress</h3>
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
                  <li className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      3
                    </div>
                    <p className="text-sm">Enter your API key (found in your account settings) and click Connect</p>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      4
                    </div>
                    <p className="text-sm">Once connected, you can configure auto-posting settings in your dashboard</p>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Change Profile Picture
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Subscription</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">$29/month, renews on Dec 15, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Blog Posting Preferences</h3>
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Posting Frequency</p>
                      <p className="text-sm text-muted-foreground">How often blogs are published</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when blogs are published</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">API Access</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">API Key</p>
                      <p className="text-sm text-muted-foreground">Use this key to connect WordPress</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Key
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

