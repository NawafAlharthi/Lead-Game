'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/components/LanguageContext'

interface LeadershipType {
  type: string
  keywords: {
    en: string[]
    ar: string[]
  }
}

// Define leadership types with their trigger keywords
const leadershipTypes: LeadershipType[] = [
  {
    type: 'visionaryLeader',
    keywords: {
      en: ['vision', 'innovate', 'future', 'dream', 'ideas'],
      ar: ['رؤية', 'ابتكار', 'مستقبل', 'حلم', 'أفكار']
    }
  },
  {
    type: 'servantLeader',
    keywords: {
      en: ['serve', 'help', 'community', 'support', 'care'],
      ar: ['خدمة', 'مساعدة', 'مجتمع', 'دعم', 'رعاية']
    }
  },
  {
    type: 'strategicLeader',
    keywords: {
      en: ['plan', 'strategy', 'efficiency', 'results'],
      ar: ['خطة', 'إستراتيجية', 'كفاءة', 'نتائج']
    }
  },
  {
    type: 'charismaticLeader',
    keywords: {
      en: ['inspire', 'motivate', 'passion', 'energy'],
      ar: ['إلهام', 'تحفيز', 'شغف', 'طاقة']
    }
  },
  {
    type: 'transformationalLeader',
    keywords: {
      en: ['change', 'evolve', 'breakthrough', 'revolution'],
      ar: ['تغيير', 'تطور', 'إنجاز', 'ثورة']
    }
  },
  {
    type: 'democraticLeader',
    keywords: {
      en: ['team', 'discussion', 'feedback', 'consensus'],
      ar: ['فريق', 'نقاش', 'تغذية راجعة', 'إجماع']
    }
  },
  {
    type: 'authoritativeLeader',
    keywords: {
      en: ['direct', 'command', 'control', 'lead'],
      ar: ['قيادة', 'توجيه', 'سيطرة', 'أمر']
    }
  }
]

// Default type if no match is found
const defaultType = 'emergingLeader'

export default function LeadershipForm() {
  const { language, t, dir } = useLanguage()
  const [definition, setDefinition] = useState('')
  const [leadershipType, setLeadershipType] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const analyzeLeadership = (text: string): string => {
    // Normalize text: lowercase, remove punctuation
    const normalizedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    
    // Count keyword matches for each leadership type
    const matches = leadershipTypes.map(type => {
      const keywords = type.keywords[language]
      const matchCount = keywords.filter(keyword => 
        normalizedText.includes(keyword.toLowerCase())
      ).length
      return { type: type.type, matchCount }
    })
    
    // Find the type with the most matches
    const bestMatch = matches.reduce((prev, current) => 
      (current.matchCount > prev.matchCount) ? current : prev
    )
    
    // Return default type if no matches found
    return bestMatch.matchCount > 0 ? bestMatch.type : defaultType
  }

  const handleSubmit = () => {
    if (definition.trim().length > 0) {
      const type = analyzeLeadership(definition)
      setLeadershipType(type)
      setIsSubmitted(true)
    }
  }

  const handleShareTwitter = () => {
    if (!leadershipType) return
    
    const tweetText = language === 'ar' 
      ? `أنا ${t(leadershipType)}! 🚀 اكتشف نوع قيادتك: [GameLink] عبر @LEAD_KFUPM #القيادة #جامعة_البترول`
      : `I'm a ${t(leadershipType)} 🚀 Discover your leadership style: [GameLink] via @LEAD_KFUPM #Leadership #KFUPM`
    
    // Encode the tweet text for URL
    const encodedTweet = encodeURIComponent(tweetText)
    window.open(`https://twitter.com/intent/tweet?text=${encodedTweet}`, '_blank')
  }

  const handleVisitLead = () => {
    window.open('https://lead-kfupm.com/', '_blank')
  }

  const handleReset = () => {
    setDefinition('')
    setLeadershipType(null)
    setIsSubmitted(false)
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      {!isSubmitted ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">{t('title')}</h1>
          <Textarea
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder={t('placeholder')}
            className="min-h-[150px] mb-6 text-lg"
            dir={dir}
          />
          <Button 
            onClick={handleSubmit} 
            className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
          >
            {t('submitButton')}
          </Button>
        </>
      ) : (
        <Card className="w-full p-8 flex flex-col items-center animate-fadeIn">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {t('resultPrefix')} <span className="text-primary">{leadershipType && t(leadershipType)}</span>
          </h2>
          <p className="text-center mb-8">{t('joinText')}</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button 
              onClick={handleVisitLead}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {t('visitButton')}
            </Button>
            <Button 
              onClick={handleShareTwitter}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10"
            >
              {t('shareButton')}
            </Button>
          </div>
          <Button
            onClick={handleReset}
            variant="ghost"
            className="mt-6"
          >
            ↩ {language === 'ar' ? 'حاول مرة أخرى' : 'Try again'}
          </Button>
        </Card>
      )}
    </div>
  )
}
