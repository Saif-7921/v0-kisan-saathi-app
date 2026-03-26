export const farmerProfile = {
  name: "Ramesh Kumar",
  nameHindi: "रमेश कुमार",
  phone: "+91 98765 43210",
  aadhaar: "XXXX XXXX 4532",
  village: "Peddapalli",
  district: "Peddapalli",
  state: "Telangana",
  photo: "",
  cropType: "Rice",
  landArea: 5.2,
  insurancePolicyNumber: "PMFBY-TS-2025-78432",
  insuranceCompany: "Agriculture Insurance Co. of India",
  bankAccount: "XXXX XXXX XXXX 7891",
  verified: {
    aadhaar: true,
    landRecords: true,
  },
}

export const weatherData = {
  current: {
    temp: 32,
    humidity: 78,
    rainfall: 12,
    condition: "Partly Cloudy",
    windSpeed: 14,
  },
  weeklyRainfall: [
    { day: "Mon", value: 0 },
    { day: "Tue", value: 5 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 30 },
    { day: "Sun", value: 12 },
  ],
  weeklyTemp: [
    { day: "Mon", value: 34 },
    { day: "Tue", value: 33 },
    { day: "Wed", value: 29 },
    { day: "Thu", value: 26 },
    { day: "Fri", value: 28 },
    { day: "Sat", value: 31 },
    { day: "Sun", value: 32 },
  ],
}

export const alerts = [
  {
    id: 1,
    type: "flood",
    title: "Heavy Rainfall Alert",
    titleHindi: "भारी बारिश की चेतावनी",
    description: "Heavy rainfall expected in Peddapalli district for next 48 hours",
    time: "2 hours ago",
    severity: "high",
  },
  {
    id: 2,
    type: "pest",
    title: "Pest Warning",
    titleHindi: "कीट चेतावनी",
    description: "Brown planthopper outbreak reported in nearby villages",
    time: "5 hours ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "drought",
    title: "Low Rainfall Advisory",
    titleHindi: "कम बारिश की सूचना",
    description: "Below-normal rainfall predicted for upcoming Kharif season",
    time: "1 day ago",
    severity: "low",
  },
]

export const equipmentListings = [
  {
    id: "eq1",
    name: "Mahindra 575 DI Tractor",
    specs: "45 HP, Diesel",
    type: "Tractor",
    owner: "Ramesh",
    village: "Karimnagar",
    distance: 1.2,
    price: 900,
    priceUnit: "day",
    available: true,
    rating: 4.5,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1556080798-9f44ef9652ec?w=600&h=400&fit=crop&q=85",
    emoji: "🚜",
    condition: "Good",
    phone: "9876543210",
  },
  {
    id: "eq2",
    name: "John Deere 5050D Tractor",
    specs: "50 HP, Diesel",
    type: "Tractor",
    owner: "Suresh",
    village: "Warangal",
    distance: 3.5,
    price: 1200,
    priceUnit: "day",
    available: false,
    rating: 4.8,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1517881712202-14219c27df9f?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop&q=85",
    emoji: "🚜",
    condition: "Good",
    phone: "9876541111",
  },
  {
    id: "eq3",
    name: "New Holland TC5.30 Combine Harvester",
    specs: "106 HP, Diesel",
    type: "Harvester",
    owner: "Venkat",
    village: "Nalgonda",
    distance: 5.1,
    price: 3500,
    priceUnit: "day",
    available: true,
    rating: 4.9,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop&q=85",
    emoji: "🌾",
    condition: "Good",
    phone: "9876542222",
  },
  {
    id: "eq4",
    name: "Fieldking Seed Driller",
    specs: "9 Row, PTO Driven",
    type: "Seed Driller",
    owner: "Raju",
    village: "Khammam",
    distance: 2.8,
    price: 600,
    priceUnit: "day",
    available: true,
    rating: 4.2,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad409?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop&q=85",
    emoji: "🌱",
    condition: "Fair",
    phone: "9876543333",
  },
  {
    id: "eq5",
    name: "Kirloskar 5HP Water Pump",
    specs: "5 HP, Petrol",
    type: "Water Pump",
    owner: "Lakshmi",
    village: "Siddipet",
    distance: 0.8,
    price: 200,
    priceUnit: "day",
    available: true,
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=85",
    emoji: "💧",
    condition: "Good",
    phone: "9876544444",
  },
  {
    id: "eq6",
    name: "Sonalika Rotavator",
    specs: "5 ft, PTO Driven",
    type: "Rotavator",
    owner: "Anand",
    village: "Nizamabad",
    distance: 4.2,
    price: 500,
    priceUnit: "day",
    available: true,
    rating: 4.3,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&q=85",
    emoji: "🔄",
    condition: "Good",
    phone: "9876545555",
  },
  {
    id: "eq7",
    name: "Aspee Battery Sprayer",
    specs: "16 Litre, Battery",
    type: "Sprayer",
    owner: "Priya",
    village: "Medak",
    distance: 1.5,
    price: 150,
    priceUnit: "day",
    available: true,
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1632923057155-dd35366b6c18?w=600&h=400&fit=crop&q=85",
    emoji: "💦",
    condition: "Good",
    phone: "9876546666",
  },
  {
    id: "eq8",
    name: "Kubota MU5502 Tractor",
    specs: "55 HP, Diesel",
    type: "Tractor",
    owner: "Gopal",
    village: "Rangareddy",
    distance: 6.3,
    price: 1100,
    priceUnit: "day",
    available: true,
    rating: 4.4,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1517881712202-14219c27df9f?w=600&h=400&fit=crop&q=85",
    fallbackImage: "https://images.unsplash.com/photo-1556080798-9f44ef9652ec?w=600&h=400&fit=crop&q=85",
    emoji: "🚜",
    condition: "Good",
    phone: "9876547777",
  },
]

export const claims = [
  {
    id: "CLM-2025-001",
    crop: "Rice",
    lossAmount: 30000,
    damageType: "Flood",
    date: "2025-01-15",
    status: "approved",
    statusStep: 5,
    aiScore: 87,
    weatherVerified: true,
  },
  {
    id: "CLM-2025-002",
    crop: "Cotton",
    lossAmount: 45000,
    damageType: "Pest Attack",
    date: "2025-02-02",
    status: "under-review",
    statusStep: 3,
    aiScore: 74,
    weatherVerified: true,
  },
  {
    id: "CLM-2025-003",
    crop: "Wheat",
    lossAmount: 22000,
    damageType: "Storm",
    date: "2025-02-10",
    status: "submitted",
    statusStep: 1,
    aiScore: 91,
    weatherVerified: false,
  },
]

export const bookings = [
  {
    id: "BK-001",
    equipment: "Mahindra 575 DI Tractor",
    owner: "Suresh Reddy",
    date: "2025-02-20",
    duration: "Full Day",
    cost: 800,
    status: "upcoming",
  },
  {
    id: "BK-002",
    equipment: "Honda WB30X Water Pump",
    owner: "Anjali Kumari",
    date: "2025-02-14",
    duration: "4 Hours",
    cost: 200,
    status: "completed",
  },
  {
    id: "BK-003",
    equipment: "Battery Sprayer - Neptune",
    owner: "Priya Devi",
    date: "2025-02-01",
    duration: "Full Day",
    cost: 100,
    status: "completed",
  },
]

export const communityFeed = [
  {
    id: 1,
    type: "equipment",
    message: "New Tractor listed by Suresh Reddy in Sultanabad",
    time: "30 min ago",
  },
  {
    id: 2,
    type: "claim",
    message: "3 claims approved in your village this week",
    time: "2 hours ago",
  },
  {
    id: 3,
    type: "equipment",
    message: "Water Pump available at just Rs. 50/hour near you",
    time: "4 hours ago",
  },
]

export const transparencyStats = {
  claimsProcessed: 1247,
  avgClaimTime: 4.2,
  totalPayout: 23000000,
  farmersServed: 856,
}

export const claimStatuses = [
  "Submitted",
  "AI Verified",
  "Weather Checked",
  "Under Review",
  "Approved",
  "Paid",
]

export const damageTypes = [
  { id: "flood", label: "Flood", labelHindi: "बाढ़", icon: "Waves" },
  { id: "drought", label: "Drought", labelHindi: "सूखा", icon: "Sun" },
  { id: "pest", label: "Pest Attack", labelHindi: "कीट हमला", icon: "Bug" },
  { id: "storm", label: "Storm", labelHindi: "तूफ़ान", icon: "Wind" },
  { id: "fire", label: "Fire", labelHindi: "आग", icon: "Flame" },
  { id: "other", label: "Other", labelHindi: "अन्य", icon: "HelpCircle" },
]

export const cropTypes = [
  "Rice",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Maize",
  "Soybean",
  "Groundnut",
  "Others",
]

export const equipmentTypes = [
  "All",
  "Tractor",
  "Harvester",
  "Seed Driller",
  "Water Pump",
  "Rotavator",
  "Sprayer",
]

// ---- Disease Detection Mock Data ----
export interface DiseaseResult {
  id: number
  name: string
  teluguName?: string
  scientificName: string
  type: "Fungal" | "Viral" | "Bacterial"
  confidence: number
  severity: "Severe" | "Moderate" | "Mild"
  severityColor?: "red" | "yellow" | "green"
  cropAffectedPct: number
  cropType?: string
  cropEmoji?: string
  description: string
  symptoms?: string[]
  causes: string[] | string
  weatherCause: string
  affectedParts: string[]
  treatment: { name: string; dosage: string; cost: number }[] | {
    chemical?: { name: string; dose: string; cost: number; frequency: string }[]
    organic?: { name: string; dose: string; cost: number; frequency: string }[]
    preventive?: { name: string; description: string }[]
  }
  recoveryTimeline: string
  yieldLoss?: string
  estimatedTreatmentCost?: string
  expectedYield: number
  estimatedActualYield: number
  marketPrice: number
  totalCost?: number
}

export const diseaseDatabase: DiseaseResult[] = [
  {
    id: 1,
    name: "Rice Blast Disease",
    teluguName: "వరి బ్లాస్ట్",
    scientificName: "Magnaporthe oryzae",
    type: "Fungal",
    confidence: 94,
    severity: "Severe",
    severityColor: "red",
    cropAffectedPct: 68,
    cropType: "Rice",
    cropEmoji: "🌾",
    description: "Rice blast is one of the most destructive diseases of rice worldwide causing diamond-shaped lesions with gray centers on leaves.",
    symptoms: [
      "Diamond-shaped lesions with gray centers on leaves",
      "Brown to reddish-brown leaf margins around lesions",
      "White to gray powdery coating on infected areas",
      "Neck rot causing panicle to fall over",
      "Stunted plant growth and yellowing"
    ],
    causes: [
      "High humidity above 90% for 10+ consecutive hours",
      "Temperature between 24–28°C favoring fungal spread",
      "Excessive nitrogen fertilizer application",
      "Waterlogged fields with poor drainage",
      "Wind spreading spores from infected plants"
    ],
    weatherCause: "Recent heavy rainfall with high humidity (89%) and moderate temperatures (28°C)",
    affectedParts: ["leaves", "nodes", "panicles"],
    treatment: {
      chemical: [
        { name: "Tricyclazole 75% WP", dose: "6g per 10L", cost: 280, frequency: "7-day intervals" },
        { name: "Isoprothiolane 40% EC", dose: "1.5ml per L", cost: 320, frequency: "10-day intervals" }
      ],
      organic: [
        { name: "Sulfur dust 80%", dose: "20-25kg per acre", cost: 120, frequency: "Weekly" },
        { name: "Copper fungicide", dose: "1.5kg per acre", cost: 200, frequency: "10-day intervals" }
      ],
      preventive: [
        { name: "Use resistant rice varieties", description: "Plant blast-resistant varieties suited to your region" },
        { name: "Manage nitrogen levels", description: "Apply balanced fertilizer, avoid excess nitrogen" },
        { name: "Improve drainage", description: "Ensure proper field drainage to reduce humidity" }
      ]
    },
    recoveryTimeline: "14–21 days with proper treatment",
    yieldLoss: "20–70% if untreated",
    estimatedTreatmentCost: "��1,800 – ₹3,200 per acre",
    expectedYield: 25,
    estimatedActualYield: 9,
    marketPrice: 2200,
    totalCost: 2400,
  },
  {
    id: 2,
    name: "Rice Brown Spot",
    teluguName: "గోధుమ గోధుమ మచ్చ",
    scientificName: "Bipolaris oryzae",
    type: "Fungal",
    confidence: 91,
    severity: "Moderate",
    cropAffectedPct: 45,
    description: "Brown spot disease causes circular to oval brown spots on leaves with light centers and dark brown borders.",
    symptoms: [
      "Circular to oval brown spots on leaves",
      "Light brown center with dark brown border",
      "Glume discoloration to dark brown or black",
      "Infected seeds appear brown and shriveled",
      "Seedling blight in severe cases"
    ],
    causes: [
      "Nutrient deficient soil (especially potassium & silicon)",
      "Drought stress followed by high humidity",
      "Temperature between 25–30°C",
      "Poor soil fertility and acidic soils",
      "Infected seed used for planting"
    ],
    weatherCause: "Moderate rainfall with humid conditions and nutrient stress",
    affectedParts: ["leaves", "glumes", "seeds"],
    treatment: [
      { name: "Mancozeb 75% WP", dosage: "25g per 10L", cost: 180 },
      { name: "Propiconazole 25% EC", dosage: "10ml per 10L", cost: 240 }
    ],
    recoveryTimeline: "10–18 days with treatment",
    yieldLoss: "5–45% depending on severity",
    estimatedTreatmentCost: "₹1,200 – ₹2,400 per acre",
    expectedYield: 30,
    estimatedActualYield: 18,
    marketPrice: 2200,
  },
  {
    id: 3,
    name: "Cotton Leaf Curl Virus",
    teluguName: "పత్తి ఆకు మురికి వైరస్",
    scientificName: "Cotton leaf curl Multan virus (CLCuMuV)",
    type: "Viral",
    confidence: 96,
    severity: "Severe",
    cropAffectedPct: 72,
    description: "Cotton leaf curl causes upward or downward curling of leaves with vein thickening and reduced boll formation.",
    symptoms: [
      "Upward or downward curling of leaves",
      "Vein thickening and darkening",
      "Enation on underside of leaves",
      "Stunted plant growth",
      "Reduced boll formation and premature drop"
    ],
    causes: [
      "Transmitted by whitefly (Bemisia tabaci)",
      "Hot and dry weather promoting whitefly",
      "Temperature 30–38°C accelerating spread",
      "Monoculture cotton farming",
      "Proximity to infected fields"
    ],
    weatherCause: "Hot, dry conditions (30-38°C) promoting whitefly population",
    affectedParts: ["leaves", "stems", "bolls"],
    treatment: [
      { name: "Imidacloprid 70% WG", dosage: "0.3g per L", cost: 680 },
      { name: "Thiamethoxam 25% WG", dosage: "0.5g per L", cost: 520 }
    ],
    recoveryTimeline: "No cure — manage spread. New growth in 30+ days",
    yieldLoss: "40–90% in severely infected fields",
    estimatedTreatmentCost: "₹2,500 – ₹5,000 per acre",
    expectedYield: 12,
    estimatedActualYield: 3,
    marketPrice: 6500,
  },
  {
    id: 4,
    name: "Yellow Stripe Rust (Wheat)",
    scientificName: "Puccinia striiformis f.sp. tritici",
    type: "Fungal",
    confidence: 93,
    severity: "Severe",
    cropAffectedPct: 65,
    description: "Yellow stripe rust produces yellow to orange pustules arranged in stripes along wheat leaves.",
    symptoms: [
      "Yellow to orange pustules in stripes on leaf",
      "Powdery yellow spore masses on surface",
      "Leaves turn pale yellow to white",
      "Premature leaf death",
      "Severe reduction in grain filling"
    ],
    causes: [
      "Cool temperatures 10–15°C with moisture",
      "Heavy dew, fog, or rainfall",
      "Wind carrying spores from distant fields",
      "Susceptible wheat varieties",
      "Late sown wheat crops"
    ],
    weatherCause: "Cool weather (10-15°C) with heavy dew and high humidity (75%+)",
    affectedParts: ["leaves", "glumes", "awns"],
    treatment: [
      { name: "Propiconazole 25% EC", dosage: "10ml per 10L", cost: 240 },
      { name: "Tebuconazole 25.9% EC", dosage: "10ml per 10L", cost: 380 }
    ],
    recoveryTimeline: "15–20 days if sprayed early",
    yieldLoss: "10–70% depending on crop stage",
    estimatedTreatmentCost: "₹900 – ₹2,100 per acre",
    expectedYield: 20,
    estimatedActualYield: 6,
    marketPrice: 2400,
  },
  {
    id: 5,
    name: "Tomato Early Blight",
    scientificName: "Alternaria solani",
    type: "Fungal",
    confidence: 89,
    severity: "Moderate",
    cropAffectedPct: 38,
    description: "Early blight causes dark circular spots with concentric rings (target board pattern) on lower leaves first.",
    symptoms: [
      "Dark brown circular spots with concentric rings",
      "Yellow halo surrounding dark lesion",
      "Lower and older leaves infected first",
      "Dark sunken lesions on stem",
      "Dark leathery spots on fruits near stem"
    ],
    causes: [
      "Warm temperatures 24–29°C with rainfall",
      "Extended leaf wetness period over 2 hours",
      "Plant stress from nutrient deficiency",
      "Infected soil and debris",
      "Overhead irrigation wetting foliage"
    ],
    weatherCause: "Warm, humid conditions (24-29°C) with intermittent rainfall",
    affectedParts: ["leaves", "stem", "fruits"],
    treatment: [
      { name: "Chlorothalonil 75% WP", dosage: "20g per 10L", cost: 160 },
      { name: "Azoxystrobin 23% SC", dosage: "10ml per 10L", cost: 580 }
    ],
    recoveryTimeline: "12–16 days with consistent spray",
    yieldLoss: "15–50% if not controlled early",
    estimatedTreatmentCost: "₹1,400 – ₹2,800 per acre",
    expectedYield: 80,
    estimatedActualYield: 56,
    marketPrice: 1800,
  },
  {
    id: 6,
    name: "Sugarcane Red Rot",
    scientificName: "Colletotrichum falcatum",
    type: "Fungal",
    confidence: 92,
    severity: "Severe",
    cropAffectedPct: 58,
    description: "Red rot causes reddening of internal stalk tissue with white patches and characteristic alcoholic smell.",
    symptoms: [
      "Reddening of internal stalk tissue",
      "Alcoholic/vinegar smell from cut stalk",
      "Yellowing of leaves from tips",
      "Wilting of top leaves (dead heart)",
      "Pink to red discoloration inside internode"
    ],
    causes: [
      "Fungal infection through wounds",
      "Waterlogged fields and poor drainage",
      "High humidity 85%+ with temp 28–32°C",
      "Infected seed setts",
      "Insect borer entry wounds"
    ],
    weatherCause: "Heavy rainfall causing waterlogging with high temperature and humidity",
    affectedParts: ["stalk", "internodes", "leaves"],
    treatment: [
      { name: "Carbendazim 50% WP", dosage: "1g per L", cost: 180 },
      { name: "Propiconazole 25% EC", dosage: "10ml per 10L", cost: 240 }
    ],
    recoveryTimeline: "No cure for infected stalks — 30 days prevention",
    yieldLoss: "25–75% in heavily infected fields",
    estimatedTreatmentCost: "₹2,000 – ₹4,500 per acre",
    expectedYield: 350,
    estimatedActualYield: 175,
    marketPrice: 315,
  },
  {
    id: 7,
    name: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",
    type: "Fungal",
    confidence: 88,
    severity: "Moderate",
    cropAffectedPct: 42,
    description: "Northern corn leaf blight produces long cigar-shaped gray-green to tan lesions on leaves.",
    symptoms: [
      "Long cigar-shaped gray-green lesions",
      "Lesions 2.5–15 cm running parallel to veins",
      "Dark green water-soaked appearance initially",
      "Lesions turn tan/gray with dark borders",
      "Premature death of leaves"
    ],
    causes: [
      "Moderate temperatures 18–27°C with humidity",
      "Extended leaf wetness (12+ hours)",
      "Infected crop residue in field",
      "Wind-driven rain spreading spores",
      "Susceptible hybrid varieties"
    ],
    weatherCause: "Moderate temps (18-27°C) with high humidity (75%+) and frequent rain",
    affectedParts: ["leaves", "husks"],
    treatment: [
      { name: "Mancozeb 75% WP", dosage: "25g per 10L", cost: 180 },
      { name: "Azoxystrobin + Propiconazole", dosage: "10ml per 10L", cost: 620 }
    ],
    recoveryTimeline: "14–21 days with fungicide program",
    yieldLoss: "10–50% depending on timing",
    estimatedTreatmentCost: "₹1,100 – ₹2,300 per acre",
    expectedYield: 35,
    estimatedActualYield: 20,
    marketPrice: 2500,
  },
  {
    id: 8,
    name: "Groundnut Late Leaf Spot",
    scientificName: "Cercosporidium personatum",
    type: "Fungal",
    confidence: 90,
    severity: "Moderate",
    cropAffectedPct: 50,
    description: "Late leaf spot causes dark brown to black circular spots on upper leaf surface with grayish spore masses below.",
    symptoms: [
      "Dark brown to black circular spots",
      "Spots smaller (1–6mm) and darker",
      "Concentric rings visible under magnification",
      "Grayish powdery spore masses below",
      "Premature defoliation"
    ],
    causes: [
      "High humidity 85%+ with temps 25–30°C",
      "Rainfall or heavy dew",
      "Dense crop canopy",
      "Susceptible varieties",
      "Infected plant debris"
    ],
    weatherCause: "High humidity (85%+) with temperatures (25-30°C) and regular rainfall",
    affectedParts: ["leaves", "petioles", "stems"],
    treatment: [
      { name: "Chlorothalonil 75% WP", dosage: "20g per 10L", cost: 160 },
      { name: "Tebuconazole 25.9% EC", dosage: "10ml per 10L", cost: 380 }
    ],
    recoveryTimeline: "15–20 days with regular spray",
    yieldLoss: "10–50% pod yield loss",
    estimatedTreatmentCost: "₹1,300 – ₹2,600 per acre",
    expectedYield: 20,
    estimatedActualYield: 10,
    marketPrice: 5500,
  },
  {
    id: 3,
    name: "Cotton Leaf Curl Virus",
    teluguName: "పత్తి ఆకు మురికి వైరస్",
    scientificName: "Cotton leaf curl Multan virus (CLCuMuV)",
    type: "Viral",
    confidence: 85,
    severity: "Moderate",
    cropAffectedPct: 40,
    description: "Chilli leaf curl causes severe leaf curling, stunting, and reduced fruit production in chilli peppers.",
    symptoms: [
      "Leaf curling upward or downward",
      "Chlorotic mottling on leaves",
      "Plant stunting and dwarfing",
      "Reduced fruit set",
      "Smaller fruits with distortion"
    ],
    causes: [
      "Whitefly vector transmission",
      "Warm temperatures favoring whitefly",
      "Infected chilli plants nearby",
      "Susceptible varieties",
      "Early crop infection"
    ],
    weatherCause: "Warm, dry conditions (28-35°C) promoting whitefly multiplication",
    affectedParts: ["leaves", "fruits"],
    treatment: [
      { name: "Imidacloprid 17.8% SL", dosage: "100ml per acre", cost: 520 },
      { name: "Neem oil 1500 PPM", dosage: "1L per acre", cost: 180 }
    ],
    recoveryTimeline: "No cure — prevent spread. 30+ days for new growth",
    yieldLoss: "30–70% yield reduction",
    estimatedTreatmentCost: "₹1,800 – ₹3,500 per acre",
    expectedYield: 15,
    estimatedActualYield: 5,
    marketPrice: 8000,
  },
  {
    id: 10,
    name: "Sugarbeet Rust",
    scientificName: "Uromyces betae",
    type: "Fungal",
    confidence: 87,
    severity: "Moderate",
    cropAffectedPct: 48,
    description: "Sugarbeet rust produces reddish-brown pustules on leaf undersides causing leaf yellowing and premature dropping.",
    symptoms: [
      "Reddish-brown pustules on leaf undersides",
      "Small yellow spots on upper leaf surface",
      "Leaves turn yellow and drop",
      "Reduced canopy coverage",
      "Stunted plant growth"
    ],
    causes: [
      "Cool temperatures 15–20°C with moisture",
      "High humidity with heavy dew",
      "Wind-borne spores",
      "Infected volunteer plants",
      "Poor field sanitation"
    ],
    weatherCause: "Cool, humid conditions (15-20°C) with regular dew formation",
    affectedParts: ["leaves"],
    treatment: [
      { name: "Sulfur dust 80%", dosage: "20kg per acre", cost: 45 },
      { name: "Propiconazole 25% EC", dosage: "10ml per 10L", cost: 240 }
    ],
    recoveryTimeline: "12–18 days with treatment",
    yieldLoss: "5–30% sugar loss",
    estimatedTreatmentCost: "₹800 – ₹1,800 per acre",
    expectedYield: 65,
    estimatedActualYield: 45,
    marketPrice: 350,
  },
]

export const monthlyEarnings = [
  { month: "Sep", claims: 0, rental: 1200 },
  { month: "Oct", claims: 15000, rental: 2400 },
  { month: "Nov", claims: 0, rental: 800 },
  { month: "Dec", claims: 30000, rental: 1600 },
  { month: "Jan", claims: 45000, rental: 3200 },
  { month: "Feb", claims: 0, rental: 2000 },
]

// ---- IoT Sensor Data ----
export const iotSensorData = {
  soilMoisture: {
    current: 42,
    threshold: 35,
    unit: "%",
    history: [
      { time: "6AM", value: 55 },
      { time: "9AM", value: 52 },
      { time: "12PM", value: 48 },
      { time: "3PM", value: 44 },
      { time: "6PM", value: 42 },
      { time: "9PM", value: 45 },
    ],
  },
  temperature: {
    current: 32,
    min: 24,
    max: 38,
    unit: "°C",
    history: [
      { time: "6AM", value: 24 },
      { time: "9AM", value: 28 },
      { time: "12PM", value: 35 },
      { time: "3PM", value: 38 },
      { time: "6PM", value: 32 },
      { time: "9PM", value: 28 },
    ],
  },
  humidity: {
    current: 68,
    unit: "%",
    history: [
      { time: "6AM", value: 85 },
      { time: "9AM", value: 75 },
      { time: "12PM", value: 62 },
      { time: "3PM", value: 58 },
      { time: "6PM", value: 68 },
      { time: "9PM", value: 78 },
    ],
  },
  lastUpdated: "2 min ago",
}

// ---- Government Schemes ----
export interface GovernmentScheme {
  id: string
  title: string
  titleHi: string
  category: "loan" | "subsidy" | "insurance"
  state: string
  eligibility: string[]
  benefits: string[]
  deadline: string
  applicationUrl: string
  amount?: string
}

export const governmentSchemes: GovernmentScheme[] = [
  {
    id: "pm-kisan",
    title: "PM-KISAN Samman Nidhi",
    titleHi: "पीएम-किसान सम्मान निधि",
    category: "subsidy",
    state: "All India",
    eligibility: [
      "Small & marginal farmers",
      "Land ownership required",
      "Aadhaar linked bank account",
    ],
    benefits: [
      "Rs. 6,000 per year direct transfer",
      "Paid in 3 installments of Rs. 2,000",
      "No repayment required",
    ],
    deadline: "Ongoing",
    applicationUrl: "https://pmkisan.gov.in",
    amount: "Rs. 6,000/year",
  },
  {
    id: "pmfby",
    title: "PM Fasal Bima Yojana",
    titleHi: "प्रधानमंत्री फसल बीमा योजना",
    category: "insurance",
    state: "All India",
    eligibility: [
      "All farmers growing notified crops",
      "Share-croppers & tenant farmers included",
      "Valid land records or tenancy agreement",
    ],
    benefits: [
      "Low premium: 2% for Kharif, 1.5% for Rabi",
      "Full sum insured on crop loss",
      "Coverage for natural calamities, pests, diseases",
    ],
    deadline: "Kharif: July 31, Rabi: Dec 31",
    applicationUrl: "https://pmfby.gov.in",
    amount: "Up to Rs. 2 Lakh",
  },
  {
    id: "kcc",
    title: "Kisan Credit Card",
    titleHi: "किसान क्रेडिट कार्ड",
    category: "loan",
    state: "All India",
    eligibility: [
      "Farmers, sharecroppers, tenant farmers",
      "Self-help groups, joint liability groups",
      "Age: 18-75 years",
    ],
    benefits: [
      "Credit limit up to Rs. 3 Lakh",
      "Interest rate: 4% (with subsidy)",
      "Flexible repayment after harvest",
    ],
    deadline: "Ongoing",
    applicationUrl: "https://www.nabard.org",
    amount: "Up to Rs. 3 Lakh",
  },
  {
    id: "ts-rythu-bandhu",
    title: "Rythu Bandhu Scheme",
    titleHi: "रायथु बंधु योजना",
    category: "subsidy",
    state: "Telangana",
    eligibility: [
      "All land-owning farmers in Telangana",
      "No income limit",
      "Valid land patta required",
    ],
    benefits: [
      "Rs. 10,000 per acre per season",
      "Direct bank transfer",
      "Two seasons - Kharif & Rabi",
    ],
    deadline: "Before each cropping season",
    applicationUrl: "https://treasury.telangana.gov.in",
    amount: "Rs. 10,000/acre/season",
  },
  {
    id: "ap-ysr-rythu",
    title: "YSR Rythu Bharosa",
    titleHi: "वायएसआर रायतु भरोसा",
    category: "subsidy",
    state: "Andhra Pradesh",
    eligibility: [
      "All farmers in Andhra Pradesh",
      "Includes tenant farmers",
      "Land ceiling: 5 acres wet / 10 acres dry",
    ],
    benefits: [
      "Rs. 13,500 per year for land owners",
      "Rs. 13,500 for tenant farmers",
      "Additional Rs. 4,000 during Kharif",
    ],
    deadline: "May 15 (Kharif), Oct 15 (Rabi)",
    applicationUrl: "https://ysrrythubharosa.ap.gov.in",
    amount: "Rs. 13,500/year",
  },
  {
    id: "solar-pump",
    title: "PM-KUSUM Solar Pump",
    titleHi: "पीएम-कुसुम सोलर पंप",
    category: "subsidy",
    state: "All India",
    eligibility: [
      "Individual farmers or groups",
      "Barren/cultivable land available",
      "Existing grid-connected pumps for solarization",
    ],
    benefits: [
      "60% subsidy on solar pumps",
      "Additional 30% bank loan support",
      "Farmer pays only 10%",
    ],
    deadline: "Ongoing till target achieved",
    applicationUrl: "https://pmkusum.mnre.gov.in",
    amount: "Up to 60% subsidy",
  },
]

// ---- Finance Data ----
export const financeData = {
  bankAccount: {
    bankName: "State Bank of India",
    accountNumber: "XXXX XXXX 7891",
    ifsc: "SBIN0001234",
    balance: 45680,
  },
  loans: [
    {
      id: "LN-001",
      type: "Kisan Credit Card",
      amount: 150000,
      outstanding: 42000,
      interestRate: 4,
      emi: 3500,
      nextDue: "2025-03-15",
      status: "active",
    },
  ],
  subsidies: [
    {
      id: "SUB-001",
      name: "Rythu Bandhu",
      amount: 25000,
      status: "credited",
      date: "2025-01-15",
    },
    {
      id: "SUB-002",
      name: "PM-KISAN",
      amount: 2000,
      status: "pending",
      date: "2025-02-28",
    },
  ],
  transactions: [
    { id: "TXN-001", type: "credit", description: "Rythu Bandhu", amount: 25000, date: "2025-01-15" },
    { id: "TXN-002", type: "debit", description: "Seeds Purchase", amount: 8500, date: "2025-01-18" },
    { id: "TXN-003", type: "debit", description: "KCC EMI", amount: 3500, date: "2025-01-20" },
    { id: "TXN-004", type: "credit", description: "Equipment Rental", amount: 1200, date: "2025-01-25" },
    { id: "TXN-005", type: "debit", description: "Fertilizer", amount: 4200, date: "2025-02-01" },
  ],
}

// ---- Expense Tracker ----
export const expenseCategories = [
  { id: "seeds", label: "Seeds", labelHi: "बीज", icon: "Sprout" },
  { id: "fertilizer", label: "Fertilizer", labelHi: "उर्वरक", icon: "FlaskConical" },
  { id: "pesticide", label: "Pesticide", labelHi: "कीटनाशक", icon: "Bug" },
  { id: "labor", label: "Labor", labelHi: "मजदूरी", icon: "Users" },
  { id: "equipment", label: "Equipment", labelHi: "उपकरण", icon: "Tractor" },
  { id: "irrigation", label: "Irrigation", labelHi: "सिंचाई", icon: "Droplets" },
  { id: "transport", label: "Transport", labelHi: "परिवहन", icon: "Truck" },
  { id: "other", label: "Other", labelHi: "अन्य", icon: "MoreHorizontal" },
]

export const expenses = [
  { id: "EXP-001", category: "seeds", description: "Rice Seeds (25kg)", amount: 3500, date: "2025-01-10" },
  { id: "EXP-002", category: "fertilizer", description: "DAP 50kg x 2", amount: 2800, date: "2025-01-15" },
  { id: "EXP-003", category: "labor", description: "Field Preparation", amount: 5000, date: "2025-01-18" },
  { id: "EXP-004", category: "equipment", description: "Tractor Rental", amount: 1800, date: "2025-01-20" },
  { id: "EXP-005", category: "irrigation", description: "Pump Diesel", amount: 1200, date: "2025-01-25" },
  { id: "EXP-006", category: "pesticide", description: "Fungicide Spray", amount: 1500, date: "2025-02-01" },
]

export const cropSales = [
  { id: "SALE-001", crop: "Rice", quantity: 15, unit: "quintals", pricePerUnit: 2200, amount: 33000, date: "2024-12-20" },
  { id: "SALE-002", crop: "Cotton", quantity: 8, unit: "quintals", pricePerUnit: 6500, amount: 52000, date: "2024-11-15" },
]

// ---- Marketplace Listings ----
export const marketplaceListings = [
  {
    id: "MKT-001",
    type: "sell",
    crop: "Rice (Sona Masuri)",
    quantity: 20,
    unit: "quintals",
    pricePerUnit: 2400,
    location: "Peddapalli",
    seller: "Ramesh Kumar",
    phone: "9876543210",
    postedDate: "2025-02-10",
    quality: "Grade A",
    available: true,
  },
  {
    id: "MKT-002",
    type: "sell",
    crop: "Cotton (DCH-32)",
    quantity: 15,
    unit: "quintals",
    pricePerUnit: 6800,
    location: "Karimnagar",
    seller: "Suresh Reddy",
    phone: "9876541111",
    postedDate: "2025-02-08",
    quality: "Premium",
    available: true,
  },
  {
    id: "MKT-003",
    type: "buy",
    crop: "Groundnut Seeds",
    quantity: 5,
    unit: "quintals",
    pricePerUnit: 8500,
    location: "Warangal",
    seller: "Anjali Farms",
    phone: "9876542222",
    postedDate: "2025-02-05",
    quality: "Certified Seeds",
    available: true,
  },
  {
    id: "MKT-004",
    type: "sell",
    crop: "Wheat (HD-2967)",
    quantity: 30,
    unit: "quintals",
    pricePerUnit: 2500,
    location: "Nizamabad",
    seller: "Gopal Rao",
    phone: "9876543333",
    postedDate: "2025-02-01",
    quality: "Grade A",
    available: true,
  },
]

// ---- Smart Alerts ----
export const smartAlerts = [
  {
    id: "ALT-001",
    type: "weather",
    title: "Heavy Rain Warning",
    titleHi: "भारी बारिश की चेतावनी",
    message: "Heavy rainfall expected in next 24-48 hours. Secure crops and drainage.",
    severity: "high",
    timestamp: "2025-02-15T10:30:00",
    read: false,
  },
  {
    id: "ALT-002",
    type: "price",
    title: "Rice Price Alert",
    titleHi: "चावल मूल्य सूचना",
    message: "Rice MSP increased by Rs. 100/quintal. Current rate: Rs. 2,300/quintal.",
    severity: "medium",
    timestamp: "2025-02-14T14:00:00",
    read: false,
  },
  {
    id: "ALT-003",
    type: "scheme",
    title: "PM-KISAN Deadline",
    titleHi: "पीएम-किसान समय सीमा",
    message: "Last date for PM-KISAN registration is Feb 28. Apply now!",
    severity: "high",
    timestamp: "2025-02-13T09:00:00",
    read: true,
  },
  {
    id: "ALT-004",
    type: "irrigation",
    title: "Low Soil Moisture",
    titleHi: "मिट्टी में कम नमी",
    message: "Soil moisture below 35%. Consider irrigation within 24 hours.",
    severity: "medium",
    timestamp: "2025-02-15T08:00:00",
    read: false,
  },
]

// ---- AI Predictions ----
export const aiPredictions = {
  yieldPrediction: {
    crop: "Rice",
    expectedYield: 28,
    predictedYield: 24,
    confidence: 85,
    factors: [
      { name: "Weather Impact", impact: -8, description: "Excess rainfall during flowering stage" },
      { name: "Soil Health", impact: +3, description: "Good nitrogen levels" },
      { name: "Disease Risk", impact: -5, description: "Moderate blast risk detected" },
    ],
  },
  diseaseRisk: {
    overall: "Medium",
    risks: [
      { disease: "Rice Blast", probability: 45, trend: "increasing" },
      { disease: "Brown Spot", probability: 25, trend: "stable" },
      { disease: "Sheath Blight", probability: 15, trend: "decreasing" },
    ],
  },
  weatherImpact: {
    nextWeek: "Moderate",
    rainfall: { expected: 45, impact: "Positive for current growth stage" },
    temperature: { avg: 30, impact: "Optimal range for grain filling" },
    humidity: { avg: 75, impact: "Monitor for fungal diseases" },
    recommendation: "Apply preventive fungicide spray before next rain spell",
  },
}

// ---- Chatbot Quick Actions ----
export const chatbotQuickActions = [
  { id: "weather", label: "Weather today?", labelHi: "आज का मौसम?" },
  { id: "best-crop", label: "Best crop now?", labelHi: "अभी कौनसी फसल?" },
  { id: "market-price", label: "Market prices", labelHi: "बाजार भाव" },
  { id: "disease-help", label: "Disease help", labelHi: "रोग सहायता" },
  { id: "scheme-info", label: "Govt schemes", labelHi: "सरकारी योजनाएं" },
  { id: "loan-status", label: "Loan status", labelHi: "ऋण स्थिति" },
]
