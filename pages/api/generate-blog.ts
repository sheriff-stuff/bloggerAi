import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const {
    companyName = "",
    companyValues = "",
    location = "",
    industry = "",
    topics = [],
    wordCount = 1000,
    formatOptions = {},
  } = req.body

  const LOCAL_AI_URL = "http://localhost:11434/api/generate"

  const topicsList = Array.isArray(topics) ? topics.join(", ") : topics

  const prompt = `
  Generate a ${wordCount}-word SEO-friendly blog post for ${companyName}, a company based in ${location} within the ${industry} industry. 
  Focus on topics: ${Array.isArray(topicsList) ? topicsList.join(", ") : topicsList}. 
  The company's values include: ${companyValues}.
  Format the blog using strict Markdown syntax.
  
  ### Markdown Formatting Requirements:
  - Use "#" for the blog post title.
  - Use "##" and "###" for subheadings.
  - Use "**bold**" and "*italic*" for emphasis.
  - Use "-" or "*" for unordered lists.
  - Use "1." for ordered lists.
  - Use "|" and "---" to create Markdown tables (if applicable).
  - If images are needed, return them as "![alt text](image_url)".
  - **DO NOT** include explanations, notes, or comments.
  - **DO NOT** include extra text before or after the Markdown content.
  - **ONLY** return valid Markdown with no additional formatting.
  
  Return **only the Markdown-formatted blog post**.
  `
  try {
    const response = await fetch(LOCAL_AI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "llama3.2", prompt, stream: false }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate blog content from local AI")
    }

    const data = await response.json()
    const blogContent = data.response || "No response from local AI"

    res.setHeader("Content-Type", "application/json")
    res.status(200).json({ blogContent })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
