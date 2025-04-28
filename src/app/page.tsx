'use client'

import { useState } from 'react'
import LanguageToggle from '@/components/LanguageToggle'
import { LanguageProvider, useLanguage } from '@/components/LanguageContext'
import WordSelectionForm from '@/components/WordSelectionForm'

function MainContent() {
  const { language, setLanguage, dir } = useLanguage()
  
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={dir}>
      <LanguageToggle 
        onChange={setLanguage} 
        initialLanguage={language}
      />
      
      <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <img 
            src="/lead-logo.svg" 
            alt="LEAD KFUPM Logo" 
            className="h-16 mx-auto mb-4"
            onError={(e) => {
              // Fallback if image doesn't exist yet
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
        
        <WordSelectionForm />
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  )
}
