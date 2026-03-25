import PromoCallout from '@/components/shared/PromoCallout'

interface PromoData {
  title: string
  description: string
  ctaText: string
  ctaUrl: string
  image?: string
  sponsored?: boolean
}

interface ArticleBodyProps {
  body: string
  promos?: PromoData[]
}

export default function ArticleBody({ body, promos = [] }: ArticleBodyProps) {
  if (!promos.length) {
    return (
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    )
  }

  // Split body at h2 boundaries to insert promos at strategic points
  const sections = body.split(/(?=<h2)/gi)

  // Insert promos after roughly every 3-4 sections
  const insertAfter = promos.length === 1 ? [3] : [2, 5]

  const elements: React.ReactNode[] = []

  sections.forEach((section, index) => {
    elements.push(
      <div
        key={`section-${index}`}
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: section }}
      />
    )

    const promoIndex = insertAfter.indexOf(index)
    if (promoIndex !== -1 && promos[promoIndex]) {
      const promo = promos[promoIndex]
      elements.push(
        <PromoCallout
          key={`promo-${promoIndex}`}
          title={promo.title}
          description={promo.description}
          ctaText={promo.ctaText}
          ctaUrl={promo.ctaUrl}
          image={promo.image}
          sponsored={promo.sponsored}
        />
      )
    }
  })

  return <div>{elements}</div>
}
