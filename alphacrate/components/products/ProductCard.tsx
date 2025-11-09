import Link from 'next/link'
import Image from 'next/image'
import { ProductWithRelations } from '@/types'
import { formatPrice } from '@/lib/utils'
import { Card, CardBody, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface ProductCardProps {
  product: ProductWithRelations
  onAddToCart?: (productId: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const imageUrl = product.images[0] || '/placeholder-engine.jpg'

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <div className="absolute top-2 right-2">
              <Badge variant="danger">Featured</Badge>
            </div>
          )}
          {product.isSleeved && (
            <div className="absolute top-2 left-2">
              <Badge variant="info">Sleeved</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardBody>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-red-600 transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <span className="font-medium">{product.brand.name}</span>
          {product.displacement && (
            <>
              <span>•</span>
              <span>{product.displacement}</span>
            </>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </p>
            {product.inventory < 10 && product.inventory > 0 && (
              <p className="text-sm text-orange-600">
                Only {product.inventory} left!
              </p>
            )}
            {product.inventory === 0 && (
              <p className="text-sm text-red-600 font-medium">
                Out of Stock
              </p>
            )}
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex gap-2">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        {product.inventory > 0 && (
          <Button
            onClick={() => onAddToCart?.(product.id)}
            className="flex-1"
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
