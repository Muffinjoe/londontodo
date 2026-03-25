import Groq from 'groq-sdk'

function getGroq() {
  return new Groq({ apiKey: process.env.GROQ_API_KEY || '' })
}

export type ArticleTemplate =
  | 'weekend-roundup'
  | 'best-of-category'
  | 'area-guide'
  | 'new-openings'
  | 'free-things'
  | 'seasonal-guide'
  | 'event-preview'

interface GenerateArticleInput {
  template: ArticleTemplate
  topic: string
  area?: string
  category?: string
  events?: { title: string; venue: string; date: string; description: string }[]
  extraContext?: string
}

const SYSTEM_PROMPT = `You are an editorial writer for LondonTodo.com, a London city guide publication. Write in a lively, informed, editorial tone. Be specific about London places, neighbourhoods, and culture. Never use generic filler. Every recommendation should feel like it comes from someone who knows London well.

Format articles in clean HTML with proper h2/h3 headings, paragraphs, and occasional bold text. Do not include the article title in the body — it will be rendered separately.

Include:
- Engaging opening paragraph
- Well-structured sections with h2 headings
- Specific venue names, addresses where relevant
- Practical info (prices, times, how to get there)
- A mix of well-known and lesser-known picks
- A closing paragraph

Do NOT:
- Use generic phrases like "vibrant city" or "bustling metropolis"
- Write clickbait or hype
- Use excessive exclamation marks
- Sound robotic or templated
- Include meta commentary about the article itself`

const TEMPLATES: Record<ArticleTemplate, string> = {
  'weekend-roundup': `Write a "Best things to do in London this weekend" article. Include 10-15 specific events, activities, and experiences happening this weekend. Mix free and paid, family and adult, indoor and outdoor. Group loosely by theme.`,
  'best-of-category': `Write a "Best {category} in London" guide. Include 10-12 specific recommendations with descriptions, what makes each special, and practical details. Order from most essential to hidden gem.`,
  'area-guide': `Write a neighbourhood guide for {area}, London. Cover the area's character, best things to do, where to eat and drink, cultural highlights, and tips for visitors. Make it feel like a local showing someone around.`,
  'new-openings': `Write a "New in London" article about recent openings, launches, and new things to try. Include restaurants, bars, exhibitions, shops, and experiences that have opened recently or are about to.`,
  'free-things': `Write a "Best free things to do in London" guide. Include 12-15 genuinely good free activities, from galleries to parks to markets to views. Avoid obvious tourist traps and focus on quality experiences.`,
  'seasonal-guide': `Write a seasonal London guide for {topic}. Include the best seasonal activities, events, and experiences. Be specific about dates, venues, and what makes each recommendation worthwhile.`,
  'event-preview': `Write an editorial preview of {topic}. Cover what to expect, why it matters, who should go, practical info, and related events or activities nearby.`,
}

export async function generateArticle(input: GenerateArticleInput) {
  let userPrompt = TEMPLATES[input.template]
    .replace('{topic}', input.topic)
    .replace('{area}', input.area || input.topic)
    .replace('{category}', input.category || input.topic)

  if (input.events?.length) {
    userPrompt += '\n\nReference these events:\n' + input.events.map(e =>
      `- ${e.title} at ${e.venue} (${e.date}): ${e.description}`
    ).join('\n')
  }

  if (input.extraContext) {
    userPrompt += '\n\nAdditional context: ' + input.extraContext
  }

  const completion = await getGroq().chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  })

  return completion.choices[0]?.message?.content || ''
}

export async function generateSeoMeta(title: string, body: string) {
  const completion = await getGroq().chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'system',
        content: 'Generate SEO metadata for a London city guide article. Return JSON with: metaTitle (max 60 chars, include "London"), metaDescription (max 155 chars, compelling), excerpt (2-3 sentences). Only return valid JSON, no markdown.',
      },
      { role: 'user', content: `Title: ${title}\n\nFirst 500 chars: ${body.slice(0, 500)}` },
    ],
    temperature: 0.3,
    max_tokens: 300,
  })

  try {
    return JSON.parse(completion.choices[0]?.message?.content || '{}')
  } catch {
    return { metaTitle: title, metaDescription: '', excerpt: '' }
  }
}

export async function generateRelatedTopics(topic: string, category: string) {
  const completion = await getGroq().chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [
      {
        role: 'system',
        content: 'Suggest 5 related London article topics. Return a JSON array of strings. Only return valid JSON.',
      },
      { role: 'user', content: `Current topic: "${topic}" in category "${category}"` },
    ],
    temperature: 0.8,
    max_tokens: 200,
  })

  try {
    return JSON.parse(completion.choices[0]?.message?.content || '[]')
  } catch {
    return []
  }
}
