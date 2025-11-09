import { Product, Brand, Category, Order, OrderItem, User, CartItem } from '@prisma/client'

// Extended types with relations
export type ProductWithRelations = Product & {
  brand: Brand
  category: Category
}

export type OrderWithRelations = Order & {
  items: (OrderItem & {
    product: Product
  })[]
  user: User
}

export type CartItemWithProduct = CartItem & {
  product: Product
}

// Cart types
export interface CartItem {
  productId: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
}

// Filter types
export interface ProductFilters {
  brandId?: string
  categoryId?: string
  isSleeved?: boolean
  minPrice?: number
  maxPrice?: number
  search?: string
}

// Address type
export interface Address {
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

// Checkout types
export interface CheckoutData {
  shippingAddress: Address
  billingAddress: Address
  sameAsShipping: boolean
}

// API Response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// User session extension
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role: 'CUSTOMER' | 'ADMIN'
      discountPercent: number
    }
  }

  interface User {
    role: 'CUSTOMER' | 'ADMIN'
    discountPercent: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'CUSTOMER' | 'ADMIN'
    discountPercent: number
  }
}
