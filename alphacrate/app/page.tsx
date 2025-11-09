import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/db'
import { ProductGrid } from '@/components/products/ProductGrid'

export default async function HomePage() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
      active: true,
    },
    include: {
      brand: true,
      category: true,
    },
    take: 6,
  }).catch(() => []) // Graceful fallback if DB not yet set up

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-red-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Premium Engine Blocks for Champions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Engineered for performance. Built for the aftermarket racing community.
              Specializing in Ford Coyote platforms and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platforms We Support
            </h2>
            <p className="text-lg text-gray-600">
              Premium blocks for the most demanding racing applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="/products?brand=ford">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Ford Coyote</h3>
                <p className="text-gray-600 mb-4">
                  5.0L & 5.2L platforms engineered for extreme performance and reliability
                </p>
                <Button variant="outline">View Ford Products →</Button>
              </div>
            </Link>

            <Link href="/products?brand=mazda">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mazda</h3>
                <p className="text-gray-600 mb-4">
                  Rotary and piston platforms built for motorsports excellence
                </p>
                <Button variant="outline">View Mazda Products →</Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600">
                Our most popular engine blocks trusted by racing professionals
              </p>
            </div>

            <ProductGrid products={featuredProducts} />

            <div className="text-center mt-12">
              <Link href="/products">
                <Button size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose AlphaCrate */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose AlphaCrate?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-300">
                Every block is precision-engineered and thoroughly tested to meet the highest standards
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Race-Proven</h3>
              <p className="text-gray-300">
                Trusted by professional racing teams and enthusiasts worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-300">
                Our team of engineers is here to help you choose the right block for your build
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
