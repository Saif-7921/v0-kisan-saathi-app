// Strict static mapping - DO NOT modify or use dynamic lookup
export const equipmentImages = {
  "Kirloskar 5HP Water Pump": "https://images.unsplash.com/photo-1581091215367-59ab6b3d3c9b?w=800&h=500&fit=crop&q=85",
  "Mahindra 575 DI Tractor": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&h=500&fit=crop&q=85",
  "Aspee Battery Sprayer": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop&q=85",
  "Fieldking Seed Driller": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&q=85",
  "John Deere 5050D Tractor": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=500&fit=crop&q=85",
  "Sonalika Rotavator": "https://images.unsplash.com/photo-1625246333043-3c6c7a3e7c33?w=800&h=500&fit=crop&q=85",
  "New Holland TC5.30 Combine Harvester": "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&h=500&fit=crop&q=85",
  "Kubota MU5502 Tractor": "https://images.unsplash.com/photo-1598514982901-1c4a4a9b8d1c?w=800&h=500&fit=crop&q=85",
} as const

// Default fallback image
const DEFAULT_IMAGE = "https://via.placeholder.com/400x300?text=No+Image"

// Get image URL for equipment - strict matching only
export function getEquipmentImageUrl(equipmentName: string): string {
  return equipmentImages[equipmentName as keyof typeof equipmentImages] || DEFAULT_IMAGE
}
