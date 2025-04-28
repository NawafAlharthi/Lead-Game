'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

type Language = 'ar' | 'en'

interface LanguageToggleProps {
  onChange: (lang: Language) => void
  initialLanguage?: Language
}

export default function LanguageToggle({ onChange, initialLanguage = 'ar' }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    // Set initial language
    onChange(language)
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar'
    setLanguage(newLanguage)
    onChange(newLanguage)
    
    // Update HTML lang attribute
    document.documentElement.lang = newLanguage
    
    // Update text direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
  }

  return (
    <Button 
      onClick={toggleLanguage}
      variant="outline"
      className="rounded-full w-12 h-12 p-0 fixed top-4 right-4 z-50"
    >
      {language === 'ar' ? '🇺🇸' : '🇸🇦'}
    </Button>
  )
}
