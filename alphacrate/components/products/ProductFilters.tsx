'use client'

import { useState } from 'react'
import { Brand, Category } from '@prisma/client'
import { Button } from '@/components/ui/Button'

interface ProductFiltersProps {
  brands: Brand[]
  categories: Category[]
  onFilterChange: (filters: any) => void
}

export function ProductFilters({ brands, categories, onFilterChange }: ProductFiltersProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isSleeved, setIsSleeved] = useState<boolean | undefined>()
  const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: '', max: '' })

  const handleApplyFilters = () => {
    onFilterChange({
      brandId: selectedBrand || undefined,
      categoryId: selectedCategory || undefined,
      isSleeved,
      minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
      maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
    })
  }

  const handleResetFilters = () => {
    setSelectedBrand('')
    setSelectedCategory('')
    setIsSleeved(undefined)
    setPriceRange({ min: '', max: '' })
    onFilterChange({})
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brand
        </label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sleeved Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Block Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="sleeved"
              checked={isSleeved === undefined}
              onChange={() => setIsSleeved(undefined)}
              className="mr-2"
            />
            All
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sleeved"
              checked={isSleeved === true}
              onChange={() => setIsSleeved(true)}
              className="mr-2"
            />
            Sleeved Only
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sleeved"
              checked={isSleeved === false}
              onChange={() => setIsSleeved(false)}
              className="mr-2"
            />
            Standard Only
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={handleResetFilters} variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
