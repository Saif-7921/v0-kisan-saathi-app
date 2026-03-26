"use client"

import { useState, useRef, useEffect } from "react"
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Loader2,
  MessageSquare,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/lib/language-context"
import { chatbotQuickActions, weatherData } from "@/lib/mock-data"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface SmartChatbotProps {
  isOpen: boolean
  onClose: () => void
}

// Mock responses based on context
const getContextualResponse = (query: string, language: "en" | "hi" | "te"): string => {
  const lowerQuery = query.toLowerCase()

  // Weather related
  if (lowerQuery.includes("weather") || lowerQuery.includes("मौसम") || lowerQuery.includes("వాతావరణం")) {
    const responses = {
      en: `Current weather in your area:\n- Temperature: ${weatherData.current.temp}°C\n- Humidity: ${weatherData.current.humidity}%\n- Condition: ${weatherData.current.condition}\n- Wind: ${weatherData.current.windSpeed} km/h\n\nForecast: Expect moderate rainfall in the next 48 hours. Good time for paddy cultivation!`,
      hi: `आपके क्षेत्र में मौजूदा मौसम:\n- तापमान: ${weatherData.current.temp}°C\n- नमी: ${weatherData.current.humidity}%\n- स्थिति: ${weatherData.current.condition}\n- हवा: ${weatherData.current.windSpeed} किमी/घंटा\n\nपूर्वानुमान: अगले 48 घंटों में मध्यम बारिश की उम्मीद। धान की खेती के लिए अच्छा समय!`,
      te: `మీ ప్రాంతంలో ప్రస్తుత వాతావరణం:\n- ఉష్ణోగ్రత: ${weatherData.current.temp}°C\n- తేమ: ${weatherData.current.humidity}%\n- పరిస్థితి: ${weatherData.current.condition}\n- గాలి: ${weatherData.current.windSpeed} కి.మీ/గం\n\nసూచన: తదుపరి 48 గంటల్లో మధ్యస్థ వర్షపాతం ఆశించవచ్చు. వరి సాగుకు మంచి సమయం!`,
    }
    return responses[language]
  }

  // Best crop
  if (lowerQuery.includes("best crop") || lowerQuery.includes("कौनसी फसल") || lowerQuery.includes("crop") || lowerQuery.includes("फसल")) {
    const responses = {
      en: `Based on current weather and soil conditions in Peddapalli:\n\nRecommended crops for this season:\n1. Rice (Paddy) - High suitability\n2. Cotton - Good market prices expected\n3. Maize - Short duration, good returns\n\nTip: Rice is ideal given the expected rainfall. Consider BPT-5204 (Samba Masuri) variety for best yield.`,
      hi: `पेद्दापल्ली में मौजूदा मौसम और मिट्टी की स्थिति के आधार पर:\n\nइस सीजन के लिए अनुशंसित फसलें:\n1. धान - उच्च उपयुक्तता\n2. कपास - अच्छे बाजार भाव की उम्मीद\n3. मक्का - कम अवधि, अच्छा रिटर्न\n\nटिप: अपेक्षित बारिश को देखते हुए धान आदर्श है। सर्वश्रेष्ठ उपज के लिए BPT-5204 (सांबा मसूरी) किस्म पर विचार करें।`,
      te: `పెద్దపల్లిలో ప్రస్తుత వాతావరణం మరియు నేల పరిస్థితుల ఆధారంగా:\n\nఈ సీజన్‌కు సిఫార్సు చేయబడిన పంటలు:\n1. వరి - అధిక అనుకూలత\n2. పత్తి - మంచి మార్కెట్ ధరలు ఆశించవచ్చు\n3. మొక్కజొన్న - తక్కువ వ్యవధి, మంచి రాబడి\n\nటిప్: ఆశించిన వర్షపాతాన్ని బట్టి వరి అనువైనది. ఉత్తమ దిగుబడి కోసం BPT-5204 (సంబా మసూరి) రకాన్ని పరిగణించండి.`,
    }
    return responses[language]
  }

  // Market prices
  if (lowerQuery.includes("market") || lowerQuery.includes("price") || lowerQuery.includes("बाजार") || lowerQuery.includes("भाव") || lowerQuery.includes("మార్కెట్")) {
    const responses = {
      en: `Current market prices in Peddapalli mandi:\n\n- Rice (Sona Masuri): Rs. 2,200-2,400/quintal\n- Cotton: Rs. 6,500-6,800/quintal\n- Wheat: Rs. 2,400-2,600/quintal\n- Groundnut: Rs. 5,800-6,200/quintal\n\nMSP for Kharif 2025: Rice Rs. 2,300/quintal\n\nTip: Cotton prices are expected to rise by 5% next month.`,
      hi: `पेद्दापल्ली मंडी में वर्तमान बाजार भाव:\n\n- चावल (सोना मसूरी): रु. 2,200-2,400/क्विंटल\n- कपास: रु. 6,500-6,800/क्विंटल\n- गेहूं: रु. 2,400-2,600/क्विंटल\n- मूंगफली: रु. 5,800-6,200/क्विंटल\n\nखरीफ 2025 के लिए MSP: चावल रु. 2,300/क्विंटल\n\nटिप: अगले महीने कपास की कीमतें 5% बढ़ने की उम्मीद है।`,
      te: `పెద్దపల్లి మార్కెట్‌లో ప్రస్తుత ధరలు:\n\n- బియ్యం (సోనా మసూరి): రూ. 2,200-2,400/క్వింటాల్\n- పత్తి: రూ. 6,500-6,800/క్వింటాల్\n- గోధుమలు: రూ. 2,400-2,600/క్వింటాల్\n- వేరుశెనగ: రూ. 5,800-6,200/క్వింటాల్\n\nఖరీఫ్ 2025 కోసం MSP: బియ్యం రూ. 2,300/క్వింటాల్\n\nటిప్: వచ్చే నెలలో పత్తి ధరలు 5% పెరుగుతాయని అంచనా.`,
    }
    return responses[language]
  }

  // Disease help
  if (lowerQuery.includes("disease") || lowerQuery.includes("रोग") || lowerQuery.includes("వ్యాధి") || lowerQuery.includes("pest") || lowerQuery.includes("कीट")) {
    const responses = {
      en: `For disease diagnosis:\n1. Use our AI Disease Detection feature - upload a photo of the affected plant\n2. Common issues this season:\n   - Rice Blast: Apply Tricyclazole 75% WP (6g/10L)\n   - Brown Spot: Use Mancozeb 75% WP (25g/10L)\n\nPrevention tips:\n- Ensure proper drainage\n- Avoid excessive nitrogen\n- Use certified seeds\n\nNeed detailed diagnosis? Go to Home > Detect Crop Disease`,
      hi: `रोग निदान के लिए:\n1. हमारी AI रोग पहचान सुविधा का उपयोग करें - प्रभावित पौधे की फोटो अपलोड करें\n2. इस सीजन की सामान्य समस्याएं:\n   - धान का ब्लास्ट: ट्राइसाइक्लाज़ोल 75% WP (6g/10L) लगाएं\n   - भूरा धब्बा: मैंकोज़ेब 75% WP (25g/10L) उपयोग करें\n\nरोकथाम के उपाय:\n- उचित जल निकासी सुनिश्चित करें\n- अधिक नाइट्रोजन से बचें\n- प्रमाणित बीज का उपयोग करें\n\nविस्तृत निदान चाहिए? होम > फसल रोग पहचानें पर जाएं`,
      te: `వ్యాధి నిర్ధారణ కోసం:\n1. మా AI వ్యాధి గుర్తింపు ఫీచర్ ఉపయోగించండి - ప్రభావిత మొక్క ఫోటో అప్‌లోడ్ చేయండి\n2. ఈ సీజన్‌లో సాధారణ సమస్యలు:\n   - వరి బ్లాస్ట్: ట్రైసైక్లాజోల్ 75% WP (6g/10L) వాడండి\n   - బ్రౌన్ స్పాట్: మాంకోజెబ్ 75% WP (25g/10L) ఉపయోగించండి\n\nనివారణ చిట్కాలు:\n- సరైన డ్రైనేజ్ నిర్ధారించండి\n- అధిక నత్రజని నివారించండి\n- ధృవీకరించబడిన విత్తనాలు వాడండి\n\nవివరమైన నిర్ధారణ కావాలా? హోమ్ > పంట వ్యాధి గుర్తించండి కు వెళ్ళండి`,
    }
    return responses[language]
  }

  // Government schemes
  if (lowerQuery.includes("scheme") || lowerQuery.includes("योजना") || lowerQuery.includes("పథకం") || lowerQuery.includes("govt") || lowerQuery.includes("सरकार")) {
    const responses = {
      en: `Government schemes available for you:\n\n1. PM-KISAN: Rs. 6,000/year (You're enrolled)\n2. Rythu Bandhu: Rs. 10,000/acre/season\n3. PM Fasal Bima Yojana: Crop insurance at 2% premium\n4. Kisan Credit Card: Up to Rs. 3 Lakh at 4% interest\n\nDeadlines:\n- PM-KISAN: Ongoing\n- PMFBY Kharif: July 31\n\nCheck the Government Schemes section for full details and apply online!`,
      hi: `आपके लिए उपलब्ध सरकारी योजनाएं:\n\n1. PM-KISAN: रु. 6,000/वर्ष (आप नामांकित हैं)\n2. रायथु बंधु: रु. 10,000/एकड़/सीजन\n3. PM फसल बीमा योजना: 2% प्रीमियम पर फसल बीमा\n4. किसान क्रेडिट कार्ड: 4% ब्याज पर रु. 3 लाख तक\n\nसमय सीमा:\n- PM-KISAN: जारी\n- PMFBY खरीफ: 31 जुलाई\n\nपूर्ण विवरण और ऑनलाइन आवेदन के लिए सरकारी योजनाएं अनुभाग देखें!`,
      te: `మీ కోసం అందుబాటులో ఉన్న ప్రభుత్వ పథకాలు:\n\n1. PM-KISAN: రూ. 6,000/సంవత్సరం (మీరు నమోదయ్యారు)\n2. రైతు బంధు: రూ. 10,000/ఎకరం/సీజన్\n3. PM ఫసల్ బీమా యోజన: 2% ప్రీమియంతో పంట బీమా\n4. కిసాన్ క్రెడిట్ కార్డ్: 4% వడ్డీతో రూ. 3 లక్షల వరకు\n\nగడువులు:\n- PM-KISAN: కొనసాగుతోంది\n- PMFBY ఖరీఫ్: జూలై 31\n\nపూర్తి వివరాలు మరియు ఆన్‌లైన్ దరఖాస్తు కోసం ప్రభుత్వ పథకాల విభాగం చూడండి!`,
    }
    return responses[language]
  }

  // Loan status
  if (lowerQuery.includes("loan") || lowerQuery.includes("ऋण") || lowerQuery.includes("రుణం")) {
    const responses = {
      en: `Your loan status:\n\nKisan Credit Card:\n- Limit: Rs. 1,50,000\n- Outstanding: Rs. 42,000\n- Interest Rate: 4%\n- EMI: Rs. 3,500/month\n- Next Due: March 15, 2025\n\nYou're eligible for:\n- Additional KCC limit up to Rs. 3,00,000\n- Agri Gold Loan: Rs. 50,000 at 7%\n\nVisit the Finance section to pay EMI or check eligibility for new loans.`,
      hi: `आपकी ऋण स्थिति:\n\nकिसान क्रेडिट कार्ड:\n- सीमा: रु. 1,50,000\n- बकाया: रु. 42,000\n- ब्याज दर: 4%\n- EMI: रु. 3,500/माह\n- अगली देय: 15 मार्च, 2025\n\nआप पात्र हैं:\n- अतिरिक्त KCC सीमा रु. 3,00,000 तक\n- कृषि गोल्ड लोन: 7% पर रु. 50,000\n\nEMI भुगतान या नए ऋण पात्रता जांचने के लिए वित्त अनुभाग देखें।`,
      te: `మీ రుణ స్థితి:\n\nకిసాన్ క్రెడిట్ కార్డ్:\n- పరిమితి: రూ. 1,50,000\n- బకాయి: రూ. 42,000\n- వడ్డీ రేటు: 4%\n- EMI: రూ. 3,500/నెల\n- తదుపరి చెల్లింపు: మార్చి 15, 2025\n\nమీరు అర్హులు:\n- అదనపు KCC పరిమితి రూ. 3,00,000 వరకు\n- వ్యవసాయ గోల్డ్ రుణం: 7%తో రూ. 50,000\n\nEMI చెల్లింపు లేదా కొత్త రుణాల అర్హత తనిఖీ కోసం ఫైనాన్స్ విభాగం చూడండి.`,
    }
    return responses[language]
  }

  // Default response
  const responses = {
    en: `I'm KisanSaathi, your smart farming assistant! I can help you with:\n\n- Weather forecasts and farming advice\n- Crop recommendations\n- Market prices\n- Disease diagnosis\n- Government schemes\n- Loan information\n\nTry asking about any of these topics, or use the quick action buttons below!`,
    hi: `मैं किसानसाथी हूं, आपका स्मार्ट खेती सहायक! मैं इनमें आपकी मदद कर सकता हूं:\n\n- मौसम पूर्वानुमान और खेती सलाह\n- फसल सिफारिशें\n- बाजार भाव\n- रोग निदान\n- सरकारी योजनाएं\n- ऋण जानकारी\n\nइनमें से किसी भी विषय के बारे में पूछें, या नीचे त्वरित कार्य बटन का उपयोग करें!`,
    te: `నేను కిసాన్‌సాథీ, మీ స్మార్ట్ వ్యవసాయ సహాయకుడు! నేను మీకు సహాయం చేయగలను:\n\n- వాతావరణ సూచనలు మరియు వ్యవసాయ సలహా\n- పంట సిఫార్సులు\n- మార్కెట్ ధరలు\n- వ్యాధి నిర్ధారణ\n- ప్రభుత్వ పథకాలు\n- రుణ సమాచారం\n\nఈ అంశాలలో ఏదైనా గురించి అడగండి, లేదా క్రింద క్విక్ యాక్షన్ బటన్లు ఉపయోగించండి!`,
  }
  return responses[language]
}

export function SmartChatbot({ isOpen, onClose }: SmartChatbotProps) {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: language === "hi" 
        ? "नमस्ते! मैं किसानसाथी हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
        : language === "te"
        ? "నమస్కారం! నేను కిసాన్‌సాథీ. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?"
        : "Namaste! I'm KisanSaathi. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [waveAmps, setWaveAmps] = useState<number[]>(Array(12).fill(0.2))
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isRecording) {
      animRef.current = setInterval(() => {
        setWaveAmps(Array(12).fill(0).map(() => 0.2 + Math.random() * 0.8))
      }, 100)
    } else {
      if (animRef.current) clearInterval(animRef.current)
      setWaveAmps(Array(12).fill(0.2))
    }
    return () => {
      if (animRef.current) clearInterval(animRef.current)
    }
  }, [isRecording])

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = getContextualResponse(text, language as "en" | "hi" | "te")
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)

      // Text-to-speech for voice mode
      if (voiceMode && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.lang = language === "hi" ? "hi-IN" : language === "te" ? "te-IN" : "en-IN"
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        window.speechSynthesis.speak(utterance)
      }
    }, 1000 + Math.random() * 500)
  }

  const handleQuickAction = (actionId: string) => {
    const action = chatbotQuickActions.find((a) => a.id === actionId)
    if (action) {
      const label = language === "hi" ? action.labelHi : action.label
      handleSend(label)
    }
  }

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false)
      // Simulate voice transcription
      setTimeout(() => {
        const sampleQueries = [
          "What is the weather today?",
          "Best crop for this season?",
          "Current market prices",
        ]
        const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
        handleSend(randomQuery)
      }, 500)
    } else {
      setIsRecording(true)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <Card className="flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary">
              <Bot className="size-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">
                {t("KisanSaathi Assistant", "किसानसाथी सहायक", "కిసాన్‌సాథీ సహాయకుడు")}
              </CardTitle>
              <div className="flex items-center gap-1.5">
                <span className="size-2 animate-pulse rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">
                  {t("Online", "ऑनलाइन", "ఆన్‌లైన్")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={voiceMode ? "default" : "outline"}
              size="icon"
              className="size-8"
              onClick={() => setVoiceMode(!voiceMode)}
            >
              {voiceMode ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user" ? "bg-primary" : "bg-muted"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="size-4 text-primary-foreground" />
                  ) : (
                    <Bot className="size-4 text-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-muted">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-2xl bg-muted px-4 py-2">
                  <div className="flex items-center gap-1">
                    <Loader2 className="size-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">
                      {t("Thinking...", "सोच रहा हूं...", "ఆలోచిస్తున్నాను...")}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="border-t bg-muted/30 p-2">
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-1">
              {chatbotQuickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className="shrink-0 gap-1 text-xs"
                  onClick={() => handleQuickAction(action.id)}
                >
                  <Sparkles className="size-3" />
                  {language === "hi" ? action.labelHi : action.label}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Voice Recording UI */}
        {isRecording && (
          <div className="flex flex-col items-center gap-2 border-t bg-destructive/5 p-4">
            <div className="flex h-8 items-end gap-0.5">
              {waveAmps.map((amp, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-destructive transition-all duration-100"
                  style={{ height: `${amp * 32}px` }}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-destructive">
              {t("Listening... Tap mic to stop", "सुन रहा हूं... बंद करने के लिए माइक टैप करें", "వింటున్నాను... ఆపడానికి మైక్ నొక్కండి")}
            </span>
          </div>
        )}

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="flex items-center justify-center gap-2 border-t bg-primary/5 p-2">
            <Volume2 className="size-4 animate-pulse text-primary" />
            <span className="text-xs text-primary">
              {t("Speaking...", "बोल रहा हूं...", "మాట్లాడుతున్నాను...")}
            </span>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={stopSpeaking}>
              {t("Stop", "रुकें", "ఆపు")}
            </Button>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2 border-t p-4">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className="shrink-0"
            onClick={handleVoiceInput}
          >
            {isRecording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
          </Button>
          <Input
            placeholder={t("Type your question...", "अपना प्रश्न लिखें...", "మీ ప్రశ్న టైప్ చేయండి...")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isRecording}
          />
          <Button
            size="icon"
            className="shrink-0"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
