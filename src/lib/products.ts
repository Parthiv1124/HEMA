import { products } from '@/data/products'
import type { Product, ProductCategory, TherapeuticArea, ProductCategoryInfo, TherapeuticAreaInfo } from '@/types/product'

/* ─── Label Maps ─── */
const categoryLabels: Record<ProductCategory, string> = {
    api: 'APIs',
    sterile: 'Sterile APIs',
    intermediate: 'Intermediates',
    development: 'Under Development',
}

const therapeuticAreaLabels: Record<TherapeuticArea, string> = {
    antihistamine: 'Antihistamine',
    antifungal: 'Antifungal',
    cardiovascular: 'Cardiovascular',
    antidiabetic: 'Antidiabetic',
    oncology: 'Oncology',
    respiratory: 'Respiratory',
    dermatology: 'Dermatology',
    anticoagulant: 'Anticoagulant',
    'anti-infective': 'Anti-Infective',
    gastrointestinal: 'Gastrointestinal',
    musculoskeletal: 'Musculoskeletal',
    urology: 'Urology',
    cns: 'CNS',
    other: 'Other',
}

/* ─── Core Getters ─── */

export function getAllProducts(): Product[] {
    return products
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
    return products.filter((p) => p.category === category)
}

export function getProductsByTherapeuticArea(area: TherapeuticArea): Product[] {
    return products.filter((p) => p.therapeuticArea === area)
}

/* ─── Aggregation Getters ─── */

export function getCategories(): ProductCategoryInfo[] {
    const counts = new Map<ProductCategory, number>()
    for (const p of products) {
        counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
    }
    return (Object.keys(categoryLabels) as ProductCategory[]).map((value) => ({
        value,
        label: categoryLabels[value],
        count: counts.get(value) ?? 0,
    }))
}

export function getTherapeuticAreas(): TherapeuticAreaInfo[] {
    const counts = new Map<TherapeuticArea, number>()
    for (const p of products) {
        counts.set(p.therapeuticArea, (counts.get(p.therapeuticArea) ?? 0) + 1)
    }
    return (Object.keys(therapeuticAreaLabels) as TherapeuticArea[]).map((value) => ({
        value,
        label: therapeuticAreaLabels[value],
        count: counts.get(value) ?? 0,
    }))
}

/* ─── Search ─── */

export function searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim()
    if (!q) return products
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(q) ||
            p.casNumber.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
    )
}

/* ─── Re-export labels for UI usage ─── */
export { categoryLabels, therapeuticAreaLabels }
