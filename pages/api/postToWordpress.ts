import { marked } from "marked"
import type { NextApiRequest, NextApiResponse } from "next"

interface PostRequestBody {
  blogTitle: string
  blogMarkdown: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { blogTitle, blogMarkdown } = req.body as PostRequestBody
  const wordpressUrl = "http://testsite.local"
  const username = "api@test.com"
  const appPassword = "password"

  if (!blogTitle || !blogMarkdown) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  // Convert Markdown to HTML
  const blogHtml = marked(blogMarkdown)

  try {
    const response = await fetch(`${wordpressUrl}/wp-json/wp/v2/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${username}:${appPassword}`),
      },
      body: JSON.stringify({
        title: blogTitle,
        content: blogHtml,
        status: "publish",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Failed to publish post")
    }

    res.status(200).json({ message: "Blog posted successfully!", postUrl: data.link })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
