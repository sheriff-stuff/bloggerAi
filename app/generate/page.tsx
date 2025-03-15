"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, Info, Loader2, Sparkles, Upload } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    companyValues: "",
    location: "",
    industry: "",
    topics: "",
    tone: "professional",
    length: 1000,
    includeImages: true,
    includeTables: false,
    includeGraphs: false,
    includeInfographics: false,
    autoPost: false,
    keywordOptimization: true,
    internalLinking: true,
    platform: "wordpress",
    uploadedFiles: [] as File[],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const generateBlogContent = async () => {
    const response = await fetch("/api/generate-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Failed to generate blog content")
    }

    const data = await response.json()
    return data.blogContent
  }

  const [blogContent, setBlogContent] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const content = await generateBlogContent()
      setBlogContent(content)
    } catch (error) {
      console.error(error)
      // Handle error (e.g., show error message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            AI Blog Generator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Generate SEO-Optimized Blog Content</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill in the details below and our AI will create high-quality, engaging blog posts tailored to your
            business.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <div className={`h-1 w-16 self-center ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <div className={`h-1 w-16 self-center ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Step {currentStep} of 3</div>
          </div>

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Tell us about your business to create tailored content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="e.g., Acme Corporation"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyValues">
                    Company Values & Mission
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 ml-1 inline text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            What does your company stand for? What's your mission? This helps our AI match your brand
                            voice.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Textarea
                    id="companyValues"
                    name="companyValues"
                    placeholder="e.g., We believe in sustainable practices and providing exceptional customer service..."
                    value={formData.companyValues}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g., New York, NY"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry/Niche</Label>
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="realestate">Real Estate</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
                <CardDescription>Customize how your blog content will be generated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topics">Topics of Interest</Label>
                  <Textarea
                    id="topics"
                    name="topics"
                    placeholder="e.g., Digital marketing, SEO best practices, Customer retention..."
                    value={formData.topics}
                    onChange={handleInputChange}
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground">Separate multiple topics with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Content Tone</Label>
                  <Select value={formData.tone} onValueChange={(value) => handleSelectChange("tone", value)}>
                    <SelectTrigger id="tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="authoritative">Authoritative</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Upload Additional Context (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Input id="fileUpload" type="file" multiple onChange={handleFileUpload} className="hidden" />
                    <label htmlFor="fileUpload" className="flex flex-col items-center cursor-pointer">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <span className="text-sm font-medium mb-1">Drag & drop files or click to browse</span>
                      <span className="text-xs text-muted-foreground">PDF, DOCX, TXT (Max 10MB each)</span>
                    </label>
                  </div>
                  {formData.uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium">Uploaded Files:</p>
                      <ul className="space-y-2">
                        {formData.uploadedFiles.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-muted/50 rounded-md p-2 text-sm"
                          >
                            <span className="truncate max-w-[200px]">{file.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              ✕
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="length">Blog Length (words)</Label>
                    <span className="text-sm font-medium">{formData.length} words</span>
                  </div>
                  <Slider
                    id="length"
                    min={500}
                    max={2000}
                    step={100}
                    value={[formData.length]}
                    onValueChange={(value) => handleSliderChange("length", value)}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Short (500)</span>
                    <span>Medium (1000)</span>
                    <span>Long (2000)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="includeImages">Include AI-Generated Images</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Our AI will generate relevant images to accompany your blog post</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      id="includeImages"
                      checked={formData.includeImages}
                      onCheckedChange={(checked) => handleSwitchChange("includeImages", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
                <CardDescription>Fine-tune your blog generation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="seo" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="seo">SEO Options</TabsTrigger>
                    <TabsTrigger value="publishing">Publishing</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  <TabsContent value="seo" className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="keywordOptimization"
                        checked={formData.keywordOptimization}
                        onCheckedChange={(checked) => handleCheckboxChange("keywordOptimization", checked as boolean)}
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="keywordOptimization">Automatic Keyword Optimization</Label>
                        <p className="text-sm text-muted-foreground">
                          AI will research and include relevant keywords for your industry
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="internalLinking"
                        checked={formData.internalLinking}
                        onCheckedChange={(checked) => handleCheckboxChange("internalLinking", checked as boolean)}
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="internalLinking">Internal Linking</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically link to your existing content when relevant
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="publishing" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Publishing Platform</h4>
                      <RadioGroup
                        defaultValue="wordpress"
                        onValueChange={(value) => handleSelectChange("platform", value)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="wordpress" id="wordpress" />
                          <Label htmlFor="wordpress" className="font-normal cursor-pointer">
                            <span className="font-medium">WordPress</span>
                            <p className="text-xs text-muted-foreground mt-1">Via custom plugin integration</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="ghost" id="ghost" />
                          <Label htmlFor="ghost" className="font-normal cursor-pointer">
                            <span className="font-medium">Ghost</span>
                            <p className="text-xs text-muted-foreground mt-1">Modern blogging platform</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium" className="font-normal cursor-pointer">
                            <span className="font-medium">Medium</span>
                            <p className="text-xs text-muted-foreground mt-1">For public blogging</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="shopify" id="shopify" />
                          <Label htmlFor="shopify" className="font-normal cursor-pointer">
                            <span className="font-medium">Shopify Blog</span>
                            <p className="text-xs text-muted-foreground mt-1">For e-commerce businesses</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="webflow" id="webflow" />
                          <Label htmlFor="webflow" className="font-normal cursor-pointer">
                            <span className="font-medium">Webflow CMS</span>
                            <p className="text-xs text-muted-foreground mt-1">For Webflow-built sites</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="notion" id="notion" />
                          <Label htmlFor="notion" className="font-normal cursor-pointer">
                            <span className="font-medium">Notion</span>
                            <p className="text-xs text-muted-foreground mt-1">For knowledge bases</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="linkedin" id="linkedin" />
                          <Label htmlFor="linkedin" className="font-normal cursor-pointer">
                            <span className="font-medium">LinkedIn Articles</span>
                            <p className="text-xs text-muted-foreground mt-1">For business-related posts</p>
                          </Label>
                        </div>
                        <div className="flex items-start space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="manual" id="manual" />
                          <Label htmlFor="manual" className="font-normal cursor-pointer">
                            <span className="font-medium">Manual Download</span>
                            <p className="text-xs text-muted-foreground mt-1">Export as Markdown, HTML, or JSON</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="autoPost">Auto-Post to Platform</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically publish blogs to your selected platform
                        </p>
                      </div>
                      <Switch
                        id="autoPost"
                        checked={formData.autoPost}
                        onCheckedChange={(checked) => handleSwitchChange("autoPost", checked)}
                      />
                    </div>
                    {formData.autoPost && (
                      <div className="p-4 bg-muted rounded-lg mt-2">
                        <p className="text-sm flex items-center">
                          <Info className="h-4 w-4 mr-2 text-blue-500" />
                          You'll need to connect your{" "}
                          {formData.platform === "manual" ? "publishing platform" : formData.platform} in the dashboard
                          after generating your first blog.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="advanced" className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Blog Structure</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger>
                            <SelectValue placeholder="Select structure" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="listicle">Listicle</SelectItem>
                            <SelectItem value="howto">How-To Guide</SelectItem>
                            <SelectItem value="comparison">Comparison</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Content Complexity</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue placeholder="Select complexity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner-Friendly</SelectItem>
                            <SelectItem value="medium">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Blog Formatting Options</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeImages"
                            checked={formData.includeImages}
                            onCheckedChange={(checked) => handleCheckboxChange("includeImages", checked as boolean)}
                          />
                          <Label htmlFor="includeImages">AI-Generated Images</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeTables"
                            checked={formData.includeTables}
                            onCheckedChange={(checked) => handleCheckboxChange("includeTables", checked as boolean)}
                          />
                          <Label htmlFor="includeTables">Tables</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeGraphs"
                            checked={formData.includeGraphs}
                            onCheckedChange={(checked) => handleCheckboxChange("includeGraphs", checked as boolean)}
                          />
                          <Label htmlFor="includeGraphs">Graphs & Charts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeInfographics"
                            checked={formData.includeInfographics}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange("includeInfographics", checked as boolean)
                            }
                          />
                          <Label htmlFor="includeInfographics">Infographics</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Blog
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {blogContent && (
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Generated Blog Post</h2>
            <div dangerouslySetInnerHTML={{ __html: blogContent }} />
          </div>
        )}

        <div className="bg-muted/40 rounded-lg p-6 border">
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium mb-2">How Our AI Blog Generator Works</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Our AI analyzes your business information to create relevant content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Each blog is SEO-optimized with relevant keywords for your industry</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>You can review and edit before publishing or set up auto-posting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Free plan users can generate 1 blog per month, upgrade for more</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
