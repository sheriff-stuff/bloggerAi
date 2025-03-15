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
    Focus on topics: ${topicsList}. 
    The company's values include: ${companyValues}.
    Format the blog with engaging content, subheadings, and call-to-actions.
    ${formatOptions.images ? "Include a description for an AI-generated image." : ""}
    ${formatOptions.tables ? "Provide a structured table with relevant industry data." : ""}
    ${formatOptions.charts ? "Describe a dataset suitable for a graph or chart." : ""}
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

    res.status(200).json({ blogContent })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
