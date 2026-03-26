import { diseaseDatabase, DiseaseResult } from "./mock-data"

export interface CropKeywords {
  [key: string]: string[]
}

const cropKeywords: CropKeywords = {
  rice: ["rice", "paddy", "dhaan", "chawal"],
  cotton: ["cotton", "kapas", "karpas"],
  wheat: ["wheat", "gehun", "godhuma"],
  tomato: ["tomato", "tamatar"],
  sugarcane: ["sugarcane", "cane", "ganna", "ikshu"],
  maize: ["maize", "corn", "makka", "cholam"],
  groundnut: ["groundnut", "peanut", "moongphali"],
  chilli: ["chilli", "chili", "mirchi", "pepper"],
  sugarbeet: ["sugarbeet", "beet", "chukandar"]
}

const cropToDiseaseIndex: { [key: string]: number[] } = {
  rice: [0, 1],
  cotton: [2],
  wheat: [3],
  tomato: [4],
  sugarcane: [5],
  maize: [6],
  groundnut: [7],
  chilli: [8],
  sugarbeet: [9]
}

export function getDiseaseForCrop(crop: string): DiseaseResult {
  const indices = cropToDiseaseIndex[crop.toLowerCase()]
  if (!indices) {
    return diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)]
  }
  const randomIndex = indices[Math.floor(Math.random() * indices.length)]
  return diseaseDatabase[randomIndex]
}

export function detectDisease(file: File): DiseaseResult {
  const fileName = file.name.toLowerCase()
  const size = file.size

  for (const [crop, keywords] of Object.entries(cropKeywords)) {
    if (keywords.some(kw => fileName.includes(kw))) {
      return getDiseaseForCrop(crop)
    }
  }

  const cropList = Object.keys(cropKeywords)
  const selectedCrop = cropList[size % cropList.length]
  return getDiseaseForCrop(selectedCrop)
}

export function getConfidence(baseScore: number, fileName: string): number {
  const qualityBoost = 
    fileName.includes("clear") ||
    fileName.includes("hd") ||
    fileName.includes("photo") ? 3 : 0

  const variation = (Math.random() * 8) - 4
  return Math.min(98, Math.max(72, Math.round(baseScore + qualityBoost + variation)))
}

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 90) return "High Confidence"
  if (confidence >= 75) return "Moderate Confidence"
  return "Low Confidence — Rescan"
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return "#16a34a"
  if (confidence >= 75) return "#d97706"
  return "#dc2626"
}

export const processingStages = [
  {
    id: 1,
    icon: "📷",
    title: "Image Quality Check",
    detail: "Analyzing resolution, brightness & clarity...",
    duration: 900
  },
  {
    id: 2,
    icon: "🌿",
    title: "Crop Type Identification",
    detail: "Detecting leaf shape, color patterns & texture...",
    duration: 1100
  },
  {
    id: 3,
    icon: "🧬",
    title: "Disease Pattern Matching",
    detail: "Comparing against 12,000+ disease sample database...",
    duration: 1300
  },
  {
    id: 4,
    icon: "📊",
    title: "Severity & Loss Calculation",
    detail: "Estimating affected area percentage & yield impact...",
    duration: 900
  }
]

export const totalProcessingTime = processingStages.reduce((sum, stage) => sum + stage.duration, 0)
