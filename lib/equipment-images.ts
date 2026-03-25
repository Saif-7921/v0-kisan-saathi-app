export const equipmentImageMap = {
  "Kirloskar 5HP Water Pump": {
    primary: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "💧",
    gradient: "linear-gradient(135deg, #0369a1 0%, #06b6d4 100%)",
    keywords: ["water pump", "pump", "irrigation", "kirloskar"]
  },
  "Mahindra 575 DI Tractor": {
    primary: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "🚜",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #dc2626 100%)",
    keywords: ["tractor", "mahindra", "farm equipment", "575"]
  },
  "Aspee Battery Sprayer": {
    primary: "https://images.unsplash.com/photo-1632923057155-dd35366b6c18?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "💦",
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
    keywords: ["sprayer", "battery sprayer", "pesticide", "crop protection", "aspee"]
  },
  "Fieldking Seed Driller": {
    primary: "https://images.unsplash.com/photo-1625246333195-78d9c38ad409?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "🌱",
    gradient: "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
    keywords: ["seed driller", "seed drill", "planting equipment", "fieldking"]
  },
  "John Deere 5050D Tractor": {
    primary: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "🚜",
    gradient: "linear-gradient(135deg, #15803d 0%, #22c55e 100%)",
    keywords: ["tractor", "john deere", "farm equipment", "5050"]
  },
  "Sonalika Rotavator": {
    primary: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "⚙️",
    gradient: "linear-gradient(135deg, #475569 0%, #94a3b8 100%)",
    keywords: ["rotavator", "rotary tiller", "soil preparation", "cultivator", "sonalika"]
  },
  "New Holland TC5.30 Combine Harvester": {
    primary: "https://images.unsplash.com/photo-1599033329459-cc8c4e0a4327?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1625246333195-78d9c38ad409?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "🌾",
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    keywords: ["harvester", "combine harvester", "crop harvesting", "grain harvester", "new holland"]
  },
  "Kubota MU5502 Tractor": {
    primary: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=500&fit=crop&crop=entropy&q=85",
    fallback: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=500&fit=crop&crop=entropy&q=85",
    emoji: "🚜",
    gradient: "linear-gradient(135deg, #b91c1c 0%, #ef4444 100%)",
    keywords: ["tractor", "kubota", "farm equipment", "5502"]
  }
}

// Helper function to get image by keywords if exact name doesn't match
export function getEquipmentImage(equipmentName: string) {
  const exactMatch = equipmentImageMap[equipmentName as keyof typeof equipmentImageMap]
  if (exactMatch) return exactMatch

  // Fallback: try to match by keywords
  const nameLower = equipmentName.toLowerCase()
  for (const [, imageData] of Object.entries(equipmentImageMap)) {
    if (imageData.keywords?.some(kw => nameLower.includes(kw))) {
      return imageData
    }
  }

  // Default fallback
  return {
    primary: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=500&fit=crop&q=85",
    fallback: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800&h=500&fit=crop&q=85",
    emoji: "🚜",
    gradient: "linear-gradient(135deg, #666666, #999999)",
    keywords: ["equipment"]
  }
}
