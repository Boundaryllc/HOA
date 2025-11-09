import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@alphacrate.com' },
    update: {},
    create: {
      email: 'admin@alphacrate.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      discountPercent: 0,
    },
  })
  console.log('✅ Created admin user')

  // Create test customer with discount
  const customerPassword = await bcrypt.hash('customer123', 12)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'John Racer',
      password: customerPassword,
      role: 'CUSTOMER',
      discountPercent: 10, // 10% discount
    },
  })
  console.log('✅ Created test customer with 10% discount')

  // Create Brands
  const ford = await prisma.brand.upsert({
    where: { slug: 'ford' },
    update: {},
    create: {
      name: 'Ford',
      slug: 'ford',
      description: 'Premium Ford engine blocks, specializing in the legendary Coyote platform',
      logoUrl: '/brands/ford-logo.svg',
    },
  })

  const mazda = await prisma.brand.upsert({
    where: { slug: 'mazda' },
    update: {},
    create: {
      name: 'Mazda',
      slug: 'mazda',
      description: 'High-performance Mazda engine blocks for rotary and piston engines',
      logoUrl: '/brands/mazda-logo.svg',
    },
  })
  console.log('✅ Created brands')

  // Create Categories
  const standardBlocks = await prisma.category.upsert({
    where: { slug: 'standard-blocks' },
    update: {},
    create: {
      name: 'Standard Blocks',
      slug: 'standard-blocks',
      description: 'Cast iron and aluminum blocks for street and track',
    },
  })

  const sleevedBlocks = await prisma.category.upsert({
    where: { slug: 'sleeved-blocks' },
    update: {},
    create: {
      name: 'Sleeved Blocks',
      slug: 'sleeved-blocks',
      description: 'Premium sleeved blocks for maximum durability and power',
    },
  })
  console.log('✅ Created categories')

  // Create Ford Coyote Products
  const products = [
    // Ford Coyote 5.0L Standard
    {
      name: 'Ford Coyote 5.0L Gen 3 Standard Block',
      slug: 'ford-coyote-5-0l-gen3-standard',
      description: 'Factory-spec Ford Coyote 5.0L Gen 3 block. Perfect for street builds up to 800hp. Features improved oiling system and strengthened webbing.',
      price: 3499.99,
      images: ['/products/coyote-5-0-standard.jpg'],
      inventory: 12,
      brandId: ford.id,
      categoryId: standardBlocks.id,
      isSleeved: false,
      displacement: '5.0L',
      material: 'Aluminum',
      cylinders: 8,
      bore: '3.63 inches',
      stroke: '3.65 inches',
      specifications: {
        maxHorsepower: 800,
        weight: '215 lbs',
        deckHeight: '8.937 inches',
        mainBearing: '2.657 inches',
        recommended: 'Street/Strip builds, naturally aspirated or boosted up to 15psi',
      },
      featured: true,
      active: true,
    },
    // Ford Coyote 5.0L Sleeved
    {
      name: 'Ford Coyote 5.0L Gen 3 Sleeved Block',
      slug: 'ford-coyote-5-0l-gen3-sleeved',
      description: 'Premium sleeved Ford Coyote 5.0L block with ductile iron sleeves. Built for extreme power applications exceeding 1200hp. Professional installation recommended.',
      price: 8499.99,
      images: ['/products/coyote-5-0-sleeved.jpg'],
      inventory: 5,
      brandId: ford.id,
      categoryId: sleevedBlocks.id,
      isSleeved: true,
      displacement: '5.0L',
      material: 'Aluminum with Ductile Iron Sleeves',
      cylinders: 8,
      bore: '3.63 inches',
      stroke: '3.65 inches',
      specifications: {
        maxHorsepower: 1500,
        weight: '230 lbs',
        deckHeight: '8.937 inches',
        mainBearing: '2.657 inches',
        sleeveType: 'Ductile Iron',
        recommended: 'Drag racing, road racing, extreme boost applications',
      },
      featured: true,
      active: true,
    },
    // Ford Coyote 5.2L Voodoo
    {
      name: 'Ford Coyote 5.2L Voodoo Block',
      slug: 'ford-coyote-5-2l-voodoo',
      description: 'GT350 Voodoo engine block with flat-plane crank capability. 5.2L displacement for serious track applications. Race-proven reliability.',
      price: 6999.99,
      images: ['/products/coyote-5-2-voodoo.jpg'],
      inventory: 3,
      brandId: ford.id,
      categoryId: standardBlocks.id,
      isSleeved: false,
      displacement: '5.2L',
      material: 'Aluminum',
      cylinders: 8,
      bore: '3.70 inches',
      stroke: '3.66 inches',
      specifications: {
        maxHorsepower: 1000,
        weight: '220 lbs',
        deckHeight: '8.937 inches',
        crankType: 'Flat-plane compatible',
        recommended: 'Road racing, high-RPM applications',
      },
      featured: true,
      active: true,
    },
    // Ford Coyote 5.2L Sleeved
    {
      name: 'Ford Coyote 5.2L Sleeved Competition Block',
      slug: 'ford-coyote-5-2l-sleeved-comp',
      description: 'Ultimate 5.2L Coyote block with premium sleeves. Designed for professional racing teams. Capable of handling 1500+ horsepower with proper supporting mods.',
      price: 12999.99,
      images: ['/products/coyote-5-2-sleeved.jpg'],
      inventory: 2,
      brandId: ford.id,
      categoryId: sleevedBlocks.id,
      isSleeved: true,
      displacement: '5.2L',
      material: 'Aluminum with Ductile Iron Sleeves',
      cylinders: 8,
      bore: '3.70 inches',
      stroke: '3.66 inches',
      specifications: {
        maxHorsepower: 2000,
        weight: '235 lbs',
        deckHeight: '8.937 inches',
        sleeveType: 'Premium Ductile Iron',
        crankType: 'Flat-plane compatible',
        recommended: 'Professional racing, time attack, unlimited class drag racing',
      },
      featured: true,
      active: true,
    },
    // Mazda 13B Rotary
    {
      name: 'Mazda 13B-REW Rotary Block Assembly',
      slug: 'mazda-13b-rew-rotary',
      description: 'Legendary twin-rotor 13B-REW block assembly. Fully rebuilt with new housings, rotors, and seals. Ready for turbo applications up to 500hp.',
      price: 5499.99,
      images: ['/products/mazda-13b.jpg'],
      inventory: 8,
      brandId: mazda.id,
      categoryId: standardBlocks.id,
      isSleeved: false,
      displacement: '1.3L',
      material: 'Aluminum Housings',
      cylinders: 0, // Rotary doesn't have traditional cylinders
      bore: null,
      stroke: null,
      specifications: {
        maxHorsepower: 500,
        weight: '280 lbs',
        rotors: 2,
        displacement: '1308cc',
        configuration: 'Twin Rotor',
        recommended: 'Street/Track, turbo applications',
      },
      featured: true,
      active: true,
    },
    // Mazda 13B Peripheral Port
    {
      name: 'Mazda 13B Peripheral Port Racing Block',
      slug: 'mazda-13b-peripheral-port',
      description: 'Competition-spec peripheral port 13B block. Features large port openings for maximum airflow. Built for dedicated race cars requiring 600+ horsepower.',
      price: 9999.99,
      images: ['/products/mazda-13b-pp.jpg'],
      inventory: 3,
      brandId: mazda.id,
      categoryId: sleevedBlocks.id,
      isSleeved: false,
      displacement: '1.3L',
      material: 'Aluminum Housings - Peripheral Port',
      cylinders: 0,
      bore: null,
      stroke: null,
      specifications: {
        maxHorsepower: 800,
        weight: '285 lbs',
        rotors: 2,
        displacement: '1308cc',
        configuration: 'Twin Rotor - Peripheral Port',
        portType: 'Full Peripheral',
        recommended: 'Drag racing, time attack, dedicated race vehicles only',
      },
      featured: false,
      active: true,
    },
    // Mazda Skyactiv-G 2.5L
    {
      name: 'Mazda Skyactiv-G 2.5L Turbocharged Block',
      slug: 'mazda-skyactiv-2-5l-turbo',
      description: 'Modern Skyactiv-G 2.5L turbo block from CX-9/Mazda6. Perfect for turbo swaps into Miata and Mazda3. Proven reliability up to 400hp.',
      price: 2999.99,
      images: ['/products/mazda-skyactiv.jpg'],
      inventory: 15,
      brandId: mazda.id,
      categoryId: standardBlocks.id,
      isSleeved: false,
      displacement: '2.5L',
      material: 'Aluminum',
      cylinders: 4,
      bore: '3.50 inches',
      stroke: '3.94 inches',
      specifications: {
        maxHorsepower: 400,
        weight: '180 lbs',
        deckHeight: '8.4 inches',
        compression: '10.5:1',
        recommended: 'Swap projects, moderate turbo builds',
      },
      featured: false,
      active: true,
    },
    // Mazda Skyactiv-G Sleeved
    {
      name: 'Mazda Skyactiv-G 2.5L Sleeved High-Performance Block',
      slug: 'mazda-skyactiv-2-5l-sleeved',
      description: 'Sleeved Skyactiv-G 2.5L block for extreme boost applications. Iron sleeves allow for safe power levels up to 700hp. Perfect for track-focused builds.',
      price: 6499.99,
      images: ['/products/mazda-skyactiv-sleeved.jpg'],
      inventory: 4,
      brandId: mazda.id,
      categoryId: sleevedBlocks.id,
      isSleeved: true,
      displacement: '2.5L',
      material: 'Aluminum with Cast Iron Sleeves',
      cylinders: 4,
      bore: '3.50 inches',
      stroke: '3.94 inches',
      specifications: {
        maxHorsepower: 700,
        weight: '195 lbs',
        deckHeight: '8.4 inches',
        sleeveType: 'Cast Iron',
        recommended: 'High-boost applications, track racing, drift builds',
      },
      featured: false,
      active: true,
    },
  ]

  for (const productData of products) {
    await prisma.product.create({
      data: productData,
    })
  }

  console.log('✅ Created products')
  console.log('')
  console.log('🎉 Seed completed successfully!')
  console.log('')
  console.log('👤 Test Accounts:')
  console.log('   Admin: admin@alphacrate.com / admin123')
  console.log('   Customer: customer@example.com / customer123 (10% discount)')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
