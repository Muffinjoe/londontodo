import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Broken ID -> Working replacement
const replacements: Record<string, string> = {
  '1545042746-ec9e50e7db86': '1526129318478-62ed807ebdf9',  // gallery/exhibition
  '1517502884422-e8e5f25a7bff': '1534430480872-3498386e7856',  // Shoreditch/street
  '1533929736562-87b04b5ba4ea': '1542435503-956c469947f6',  // Soho/restaurant
  '1528809217021-151305b04551': '1569587112025-0d460e81a126',  // Camden/market
  '1582719471384-894fbb16564e': '1501594907352-04cda38ebc29',  // Greenwich/park
  '1414235077428-338989a2e8c0': '1506501139174-099022df5260',  // restaurant interior
}

async function main() {
  let fixed = 0
  
  // Fix articles
  const articles = await prisma.article.findMany()
  for (const a of articles) {
    if (!a.featureImage) continue
    let changed = false
    let img = a.featureImage
    for (const [broken, working] of Object.entries(replacements)) {
      if (img.includes(broken)) {
        img = img.replace(broken, working)
        changed = true
      }
    }
    if (changed) {
      await prisma.article.update({ where: { id: a.id }, data: { featureImage: img } })
      fixed++
      console.log('  Fixed article: ' + a.title)
    }
  }

  // Fix events
  const events = await prisma.event.findMany()
  for (const e of events) {
    if (!e.featureImage) continue
    let changed = false
    let img = e.featureImage
    for (const [broken, working] of Object.entries(replacements)) {
      if (img.includes(broken)) {
        img = img.replace(broken, working)
        changed = true
      }
    }
    if (changed) {
      await prisma.event.update({ where: { id: e.id }, data: { featureImage: img } })
      fixed++
      console.log('  Fixed event: ' + e.title)
    }
  }

  // Fix areas
  const areas = await prisma.area.findMany()
  for (const a of areas) {
    if (!a.heroImage) continue
    let changed = false
    let img = a.heroImage
    for (const [broken, working] of Object.entries(replacements)) {
      if (img.includes(broken)) {
        img = img.replace(broken, working)
        changed = true
      }
    }
    if (changed) {
      await prisma.area.update({ where: { id: a.id }, data: { heroImage: img } })
      fixed++
      console.log('  Fixed area: ' + a.name)
    }
  }

  console.log('\nFixed ' + fixed + ' images in database')
  await prisma.$disconnect()
}

main()
