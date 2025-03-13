"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Download, Edit, FileText, Share2, ThumbsUp, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BlogPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)

  // Mock blog data
  const blog = {
    id: params.id,
    title: "10 Ways to Improve Your Website's SEO",
    date: "November 15, 2023",
    author: "Blogger AI",
    content: `
    <p>Search Engine Optimization (SEO) is crucial for any business looking to improve their online visibility. In this blog post, we'll explore 10 effective strategies to boost your website's SEO and drive more organic traffic.</p>
    
    <h2>1. Conduct Keyword Research</h2>
    <p>Understanding what terms your potential customers are searching for is the foundation of good SEO. Use tools like Google Keyword Planner, Ahrefs, or SEMrush to identify relevant keywords for your business.</p>
    
    <h2>2. Optimize On-Page Elements</h2>
    <p>Ensure your title tags, meta descriptions, headers, and content are optimized for your target keywords. Each page should focus on a primary keyword and several related secondary keywords.</p>
  `,
    hasTable: true,
    hasChart: true,
    image: "/placeholder.svg?height=600&width=1200",
    keywords: ["SEO", "Digital Marketing", "Website Optimization"],
    readTime: "5 min read",
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          {isEditing ? (
            <div className="space-y-4">
              <textarea className="w-full text-3xl font-bold p-2 border rounded-md" defaultValue={blog.title} />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <h1 className="text-3xl md:text-4xl font-bold">{blog.title}</h1>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          )}

          <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-4 gap-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {blog.date}
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <FileText className="mr-1 h-4 w-4" />
              {blog.readTime}
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />

          {blog.hasTable && (
            <div className="my-8">
              <h3>SEO Ranking Factors Comparison</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ranking Factor</TableHead>
                    <TableHead>Importance</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Time to Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Content Quality</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>1-3 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Backlink Profile</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>3-6 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Technical SEO</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>1-2 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Experience</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>1-3 months</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mobile Optimization</TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Low</TableCell>
                    <TableCell>Immediate</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}

          {blog.hasChart && (
            <div className="my-8">
              <h3>SEO Impact by Strategy</h3>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Chart showing the relative impact of different SEO strategies based on industry data.
              </p>
            </div>
          )}

          <h2>3. Create High-Quality Content</h2>
          <p>
            Content is king in SEO. Publish valuable, informative, and engaging content that addresses your audience's
            needs and questions. Longer, in-depth content tends to rank better in search results.
          </p>

          <h2>4. Improve Site Speed</h2>
          <p>
            Page speed is a ranking factor for both desktop and mobile searches. Optimize images, leverage browser
            caching, and minimize code to improve loading times.
          </p>

          <h2>5. Make Your Site Mobile-Friendly</h2>
          <p>
            With Google's mobile-first indexing, having a responsive website that works well on mobile devices is
            essential for SEO success.
          </p>

          <h2>6. Build Quality Backlinks</h2>
          <p>
            Backlinks from reputable websites signal to search engines that your content is valuable and trustworthy.
            Focus on earning high-quality links through great content, outreach, and relationship building.
          </p>

          <h2>7. Optimize for Local Search</h2>
          <p>
            If you have a local business, claim and optimize your Google My Business listing, get listed in local
            directories, and encourage customer reviews.
          </p>

          <h2>8. Use Internal Linking</h2>
          <p>
            Connect your content with internal links to help search engines understand your site structure and
            distribute page authority throughout your website.
          </p>

          <h2>9. Improve User Experience</h2>
          <p>
            A positive user experience leads to longer time on site, lower bounce rates, and higher engagement—all
            signals that can boost your SEO.
          </p>

          <h2>10. Monitor and Analyze Performance</h2>
          <p>
            Use tools like Google Analytics and Google Search Console to track your SEO performance, identify issues,
            and find opportunities for improvement.
          </p>

          <h2>Conclusion</h2>
          <p>
            Implementing these SEO strategies can significantly improve your website's visibility in search results and
            drive more organic traffic. Remember that SEO is a long-term investment—it takes time to see results, but
            the benefits are well worth the effort.
          </p>
        </div>

        <div className="flex justify-between items-center border-t pt-6">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Helpful
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Twitter</DropdownMenuItem>
                <DropdownMenuItem>Facebook</DropdownMenuItem>
                <DropdownMenuItem>LinkedIn</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Markdown</DropdownMenuItem>
              <DropdownMenuItem>Word Document</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

