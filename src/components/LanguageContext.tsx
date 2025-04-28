'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'ar' | 'en'

type Translations = {
  [key: string]: {
    ar: string
    en: string
  }
}

// Define all text content in both languages
const translations: Translations = {
  title: {
    ar: 'ما هو تعريفك للقيادة؟ اكتشف نوع القائد الذي بداخلك!',
    en: 'What\'s your definition of leadership? Discover the leader within you!'
  },
  submitButton: {
    ar: 'اكتشف نوع قيادتك!',
    en: 'Discover Your Leadership Style!'
  },
  placeholder: {
    ar: 'اكتب تعريفك للقيادة هنا...',
    en: 'Write your definition of leadership here...'
  },
  resultPrefix: {
    ar: 'أنت',
    en: 'You are a'
  },
  joinText: {
    ar: 'إذا كنت ترغب في تطوير مهاراتك القيادية، انضم إلى LEAD اليوم!',
    en: 'Want to become even better? Join LEAD KFUPM today!'
  },
  visitButton: {
    ar: 'زيارة موقع LEAD',
    en: 'Visit LEAD website'
  },
  shareButton: {
    ar: 'شارك على تويتر',
    en: 'Share on Twitter'
  },
  // Leadership types
  visionaryLeader: {
    ar: 'قائد رؤيوي!',
    en: 'Visionary Leader!'
  },
  servantLeader: {
    ar: 'قائد خدمي!',
    en: 'Servant Leader!'
  },
  strategicLeader: {
    ar: 'قائد استراتيجي!',
    en: 'Strategic Leader!'
  },
  charismaticLeader: {
    ar: 'قائد ملهم!',
    en: 'Charismatic Leader!'
  },
  transformationalLeader: {
    ar: 'قائد تحويلي!',
    en: 'Transformational Leader!'
  },
  democraticLeader: {
    ar: 'قائد ديمقراطي!',
    en: 'Democratic Leader!'
  },
  authoritativeLeader: {
    ar: 'قائد سلطوي!',
    en: 'Authoritative Leader!'
  },
  emergingLeader: {
    ar: 'قائد ناشئ!',
    en: 'Emerging Leader!'
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: 'rtl' | 'ltr'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar')
  
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`)
      return key
    }
    return translations[key][language]
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
