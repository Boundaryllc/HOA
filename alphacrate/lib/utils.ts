import { type ClassValue, clsx } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(new Date(date))
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 7)
  return `AC-${timestamp}-${random}`.toUpperCase()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function calculateDiscount(price: number, discountPercent: number): number {
  return price * (discountPercent / 100)
}

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate
}

export function calculateShipping(subtotal: number): number {
  // Free shipping over $500
  if (subtotal >= 500) return 0
  // Flat rate shipping
  return 50
}
