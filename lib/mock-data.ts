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
    type: "Tractor",
    owner: "Ramesh",
    village: "Karimnagar",
    distance: 1.2,
    pricePerDay: 900,
    pricePerHour: 150,
    available: true,
    availabilityLabel: "Available Now",
    rating: 4.5,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    condition: "Good",
    model: "Mahindra 575 DI",
    year: 2021,
    capacity: "45 HP",
    fuelType: "Diesel",
    deliveryAvailable: true,
    deliveryCost: 200,
    phone: "+91 98765 43210",
  },
  {
    id: "eq2",
    name: "John Deere 5050D Tractor",
    type: "Tractor",
    owner: "Suresh",
    village: "Warangal",
    distance: 3.5,
    pricePerDay: 1200,
    pricePerHour: 250,
    available: false,
    availabilityLabel: "Booked",
    rating: 4.8,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1605338803155-e5a5b7a3b1b8?w=400&q=80",
    condition: "Good",
    model: "John Deere 5050D",
    year: 2022,
    capacity: "50 HP",
    fuelType: "Diesel",
    deliveryAvailable: true,
    deliveryCost: 300,
    phone: "+91 98765 11111",
  },
  {
    id: "eq3",
    name: "New Holland TC5.30 Harvester",
    type: "Harvester",
    owner: "Venkat",
    village: "Nalgonda",
    distance: 5.1,
    pricePerDay: 3500,
    pricePerHour: 700,
    available: true,
    availabilityLabel: "Available Now",
    rating: 4.9,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
    condition: "Good",
    model: "New Holland TC5.30",
    year: 2023,
    capacity: "106 HP",
    fuelType: "Diesel",
    deliveryAvailable: false,
    deliveryCost: 0,
    phone: "+91 98765 22222",
  },
  {
    id: "eq4",
    name: "Fieldking Seed Driller",
    type: "Seed Driller",
    owner: "Raju",
    village: "Khammam",
    distance: 2.8,
    pricePerDay: 600,
    pricePerHour: 120,
    available: true,
    availabilityLabel: "Available Tomorrow",
    rating: 4.2,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80",
    condition: "Fair",
    model: "Fieldking RSP-9",
    year: 2020,
    capacity: "9 Row",
    fuelType: "PTO Driven",
    deliveryAvailable: true,
    deliveryCost: 150,
    phone: "+91 98765 33333",
  },
  {
    id: "eq5",
    name: "Kirloskar 5HP Water Pump",
    type: "Water Pump",
    owner: "Lakshmi",
    village: "Siddipet",
    distance: 0.8,
    pricePerDay: 200,
    pricePerHour: 50,
    available: true,
    availabilityLabel: "Available Now",
    rating: 4.6,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    condition: "Good",
    model: "Kirloskar 5HP",
    year: 2023,
    capacity: "5 HP",
    fuelType: "Petrol",
    deliveryAvailable: true,
    deliveryCost: 50,
    phone: "+91 98765 44444",
  },
  {
    id: "eq6",
    name: "Sonalika Rotavator",
    type: "Rotavator",
    owner: "Anand",
    village: "Nizamabad",
    distance: 4.2,
    pricePerDay: 500,
    pricePerHour: 100,
    available: true,
    availabilityLabel: "Available Now",
    rating: 4.3,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
    condition: "Good",
    model: "Sonalika Regular",
    year: 2021,
    capacity: "5 ft",
    fuelType: "PTO Driven",
    deliveryAvailable: true,
    deliveryCost: 250,
    phone: "+91 98765 55555",
  },
  {
    id: "eq7",
    name: "Aspee Battery Sprayer",
    type: "Sprayer",
    owner: "Priya",
    village: "Medak",
    distance: 1.5,
    pricePerDay: 150,
    pricePerHour: 30,
    available: true,
    availabilityLabel: "Available Now",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&q=80",
    condition: "Good",
    model: "Aspee BS-21",
    year: 2024,
    capacity: "16 Litre",
    fuelType: "Battery",
    deliveryAvailable: true,
    deliveryCost: 0,
    phone: "+91 98765 66666",
  },
  {
    id: "eq8",
    name: "Kubota MU5502 Tractor",
    type: "Tractor",
    owner: "Gopal",
    village: "Rangareddy",
    distance: 6.3,
    pricePerDay: 1100,
    pricePerHour: 220,
    available: true,
    availabilityLabel: "Available Now",
    rating: 4.4,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    condition: "Needs Service",
    model: "Kubota MU5502",
    year: 2020,
    capacity: "55 HP",
    fuelType: "Diesel",
    deliveryAvailable: true,
    deliveryCost: 350,
    phone: "+91 98765 77777",
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
  scientificName: string
  type: string
  confidence: number
  severity: "Severe" | "Moderate" | "Mild"
  cropAffectedPct: number
  description: string
  causes: string
  weatherCause: string
  affectedParts: string[]
  treatment: { name: string; dosage: string; cost: number }[]
  recoveryTimeline: string
  expectedYield: number
  estimatedActualYield: number
  marketPrice: number
}

export const diseaseDatabase: DiseaseResult[] = [
  {
    id: 1,
    name: "Rice Blast Disease",
    scientificName: "Magnaporthe oryzae",
    type: "Fungal",
    confidence: 94,
    severity: "Severe",
    cropAffectedPct: 65,
    description:
      "Rice blast is one of the most destructive diseases of rice worldwide. It causes diamond-shaped lesions on leaves that can rapidly expand and kill the entire leaf tissue, leading to significant yield losses.",
    causes:
      "High humidity (>80%), prolonged leaf wetness from dew or rain, moderate temperatures (20-28\u00b0C), excessive nitrogen fertilization, and susceptible rice varieties create ideal conditions for this disease.",
    weatherCause:
      "Recent heavy rainfall (87mm over 3 days) combined with high humidity (89%) and moderate temperatures (28\u00b0C) created perfect conditions for Magnaporthe oryzae spore germination.",
    affectedParts: ["leaves", "stems", "nodes"],
    treatment: [
      { name: "Tricyclazole 75% WP (Beam)", dosage: "300g per acre in 200L water", cost: 450 },
      { name: "Isoprothiolane 40% EC (Fujione)", dosage: "500ml per acre in 200L water", cost: 380 },
      { name: "Carbendazim 50% WP (Bavistin)", dosage: "250g per acre in 200L water", cost: 220 },
    ],
    recoveryTimeline:
      "With immediate treatment, partial recovery in 10-14 days. Full recovery unlikely at 65% infection. New growth may recover in 3-4 weeks.",
    expectedYield: 25,
    estimatedActualYield: 9,
    marketPrice: 2200,
  },
  {
    id: 2,
    name: "Cotton Leaf Curl Virus",
    scientificName: "Begomovirus (CLCuV)",
    type: "Viral",
    confidence: 87,
    severity: "Moderate",
    cropAffectedPct: 45,
    description:
      "Cotton leaf curl disease causes upward curling of leaves, thickening of veins, and formation of cup-shaped leaf lamina. It is spread by whitefly (Bemisia tabaci) and can cause significant fiber quality reduction.",
    causes:
      "Whitefly (Bemisia tabaci) population buildup due to warm dry weather, late sowing of cotton, proximity to infected fields, and lack of pest management during early growth stages.",
    weatherCause:
      "Extended dry spell followed by warm temperatures (30-35\u00b0C) promoted whitefly proliferation. Low wind speeds allowed pest population to concentrate in the field.",
    affectedParts: ["leaves", "stems"],
    treatment: [
      { name: "Imidacloprid 17.8% SL (Confidor)", dosage: "100ml per acre in 200L water", cost: 520 },
      { name: "Thiamethoxam 25% WG (Actara)", dosage: "100g per acre in 200L water", cost: 480 },
      { name: "Neem oil 1500 PPM", dosage: "1L per acre in 200L water", cost: 180 },
    ],
    recoveryTimeline:
      "Viral infection cannot be cured once established. Focus on vector control to prevent spread. New growth in 2-3 weeks may be healthy if whitefly controlled.",
    expectedYield: 12,
    estimatedActualYield: 7,
    marketPrice: 6500,
  },
  {
    id: 3,
    name: "Tomato Early Blight",
    scientificName: "Alternaria solani",
    type: "Fungal",
    confidence: 91,
    severity: "Mild",
    cropAffectedPct: 30,
    description:
      "Early blight causes dark, concentric ring-patterned spots on lower leaves first, progressing upward. Affected leaves turn yellow and drop. Fruits may develop sunken, leathery spots near the stem end.",
    causes:
      "Warm humid conditions (24-29\u00b0C), overhead irrigation, crowded plant spacing, nutrient-deficient soil, and presence of crop debris from previous seasons harbor the pathogen.",
    weatherCause:
      "Alternating wet and warm periods over the past 2 weeks with temperatures averaging 27\u00b0C and intermittent rainfall provided ideal infection conditions.",
    affectedParts: ["leaves"],
    treatment: [
      { name: "Mancozeb 75% WP (Dithane M-45)", dosage: "500g per acre in 200L water", cost: 280 },
      { name: "Chlorothalonil 75% WP (Kavach)", dosage: "400g per acre in 200L water", cost: 350 },
      { name: "Copper Oxychloride 50% WP (Blitox)", dosage: "500g per acre in 200L water", cost: 240 },
    ],
    recoveryTimeline:
      "Good recovery expected with treatment. Visible improvement in 7-10 days. Full recovery of new foliage in 2-3 weeks. Yield impact limited at 30% infection.",
    expectedYield: 80,
    estimatedActualYield: 56,
    marketPrice: 1800,
  },
  {
    id: 4,
    name: "Wheat Rust",
    scientificName: "Puccinia triticina",
    type: "Fungal",
    confidence: 96,
    severity: "Severe",
    cropAffectedPct: 70,
    description:
      "Wheat rust produces orange-brown pustules on leaf surfaces that release millions of spores. Severe infections can destroy the leaf canopy, drastically reducing grain filling and causing shriveled grains.",
    causes:
      "Cool nights (15-20\u00b0C) with warm days (20-25\u00b0C), high humidity, dew formation, wind-blown spores from nearby infected fields, and susceptible wheat varieties planted across the region.",
    weatherCause:
      "Ideal rust development conditions: daytime temperatures of 22\u00b0C, nighttime 16\u00b0C, heavy dew formation, and 78% average humidity over the past week.",
    affectedParts: ["leaves", "stems"],
    treatment: [
      { name: "Propiconazole 25% EC (Tilt)", dosage: "200ml per acre in 200L water", cost: 550 },
      { name: "Tebuconazole 25.9% EC (Folicur)", dosage: "200ml per acre in 200L water", cost: 480 },
      { name: "Mancozeb 75% WP (Dithane M-45)", dosage: "500g per acre in 200L water", cost: 280 },
    ],
    recoveryTimeline:
      "At 70% infection during grain filling, significant yield loss is inevitable. Fungicide application can protect remaining healthy tissue. Expect 3-4 week stabilization period.",
    expectedYield: 20,
    estimatedActualYield: 6,
    marketPrice: 2400,
  },
  {
    id: 5,
    name: "Sugarcane Red Rot",
    scientificName: "Colletotrichum falcatum",
    type: "Fungal",
    confidence: 82,
    severity: "Moderate",
    cropAffectedPct: 50,
    description:
      "Red rot causes reddening of internal cane tissue with white patches. Infected canes show wilting of crown leaves, discoloration of stem, and a characteristic alcohol smell when split open.",
    causes:
      "Waterlogged conditions, infected seed cane (sett-borne disease), mechanical injuries from harvesting, rat damage providing entry points, and high soil moisture during monsoon season.",
    weatherCause:
      "Excessive rainfall (120mm over 5 days) causing waterlogging, combined with high temperature (30\u00b0C) and humidity (85%), activated latent Colletotrichum infections in the field.",
    affectedParts: ["stems"],
    treatment: [
      { name: "Carbendazim 50% WP (Bavistin)", dosage: "250g per acre in 200L water", cost: 220 },
      { name: "Thiophanate Methyl 70% WP", dosage: "300g per acre in 200L water", cost: 380 },
      { name: "Trichoderma viride (Bio-agent)", dosage: "2kg per acre in soil application", cost: 150 },
    ],
    recoveryTimeline:
      "Red rot recovery is limited once internal tissue is damaged. Healthy ratoon may emerge in 4-6 weeks. Severely affected canes should be removed to prevent spread.",
    expectedYield: 350,
    estimatedActualYield: 175,
    marketPrice: 315,
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
