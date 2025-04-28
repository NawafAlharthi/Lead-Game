
import { useState } from 'react' // Removed useEffect as it's no longer needed for fallback
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/components/LanguageContext'

// ... (keep leadershipWords and leadershipStyles definitions as they are) ...

// Define all 25 words in both languages with more modern/relatable terms
const leadershipWords = {
  en: [
    'Vision', 'Innovation', 'Strategy', 'Empathy', 'Communication',
    'Decisiveness', 'Integrity', 'Adaptability', 'Passion', 'Resilience',
    'Delegation', 'Accountability', 'Creativity', 'Collaboration', 'Confidence',
    'Humility', 'Patience', 'Courage', 'Discipline', 'Empowerment',
    'Transparency', 'Optimism', 'Fairness', 'Persistence', 'Wisdom'
  ],
  ar: [
    'رؤية', 'ابتكار', 'استراتيجية', 'تعاطف', 'تواصل',
    'حسم', 'نزاهة', 'تكيف', 'شغف', 'مرونة',
    'تفويض', 'مسؤولية', 'إبداع', 'تعاون', 'ثقة',
    'تواضع', 'صبر', 'شجاعة', 'انضباط', 'تمكين',
    'شفافية', 'تفاؤل', 'عدالة', 'مثابرة', 'حكمة'
  ]
}

// Define leadership styles with precise 5-word combinations
// Including more roasting/comedy styles for viral potential
const leadershipStyles = [
  // Serious leadership styles
  {
    id: 'visionary',
    wordIndices: [0, 1, 8, 12, 21], // Vision, Innovation, Passion, Creativity, Optimism
    nameEn: 'Visionary Leader',
    nameAr: 'قائد رؤيوي',
    descriptionEn: 'You\'re the Steve Jobs of your squad! Your creative vision and optimistic outlook have people lining up to follow your next big idea.',
    descriptionAr: 'أنت ستيف جوبز في فريقك! رؤيتك الإبداعية ونظرتك المتفائلة تجعل الناس يصطفون لمتابعة فكرتك الكبيرة القادمة.'
  },
  {
    id: 'servant',
    wordIndices: [3, 4, 15, 16, 19], // Empathy, Communication, Humility, Patience, Empowerment
    nameEn: 'Servant Leader',
    nameAr: 'قائد خدمي',
    descriptionEn: 'You\'re the team\'s secret MVP! Your superpower is making everyone around you better while staying humble about your own contributions.',
    descriptionAr: 'أنت اللاعب الأكثر قيمة السري في الفريق! قوتك الخارقة هي جعل كل من حولك أفضل مع البقاء متواضعًا بشأن مساهماتك.'
  },
  {
    id: 'strategic',
    wordIndices: [2, 5, 10, 11, 18], // Strategy, Decisiveness, Delegation, Accountability, Discipline
    nameEn: 'Strategic Leader',
    nameAr: 'قائد استراتيجي',
    descriptionEn: 'You\'re playing chess while others are playing checkers! Your strategic mind and decisive action make you the ultimate boss material.',
    descriptionAr: 'أنت تلعب الشطرنج بينما يلعب الآخرون الداما! عقلك الاستراتيجي وعملك الحاسم يجعلانك المادة النهائية للقائد.'
  },
  {
    id: 'transformational',
    wordIndices: [1, 7, 12, 17, 23], // Innovation, Adaptability, Creativity, Courage, Persistence
    nameEn: 'Transformational Leader',
    nameAr: 'قائد تحويلي',
    descriptionEn: 'You\'re the ultimate game-changer! When everyone else sees obstacles, you see opportunities to innovate and level up.',
    descriptionAr: 'أنت مغير اللعبة النهائي! عندما يرى الجميع العقبات، ترى أنت فرصًا للابتكار والارتقاء.'
  },
  {
    id: 'ethical',
    wordIndices: [6, 15, 20, 22, 24], // Integrity, Humility, Transparency, Fairness, Wisdom
    nameEn: 'Ethical Leader',
    nameAr: 'قائد أخلاقي',
    descriptionEn: 'You\'re the moral compass everyone needs! Your integrity and fairness make you the leader people trust with their careers and futures.',
    descriptionAr: 'أنت البوصلة الأخلاقية التي يحتاجها الجميع! نزاهتك وعدالتك تجعلانك القائد الذي يثق به الناس بمستقبلهم المهني.'
  },
  {
    id: 'collaborative',
    wordIndices: [3, 9, 13, 14, 19], // Empathy, Resilience, Collaboration, Confidence, Empowerment
    nameEn: 'Collaborative Leader',
    nameAr: 'قائد تعاوني',
    descriptionEn: 'You\'re the ultimate team player who became team captain! Your ability to bring out the best in others makes your squad unstoppable.',
    descriptionAr: 'أنت لاعب الفريق المثالي الذي أصبح قائد الفريق! قدرتك على إظهار أفضل ما لدى الآخرين تجعل فريقك لا يمكن إيقافه.'
  },
  
  // Comedy/Roasting leadership styles
  {
    id: 'micromanager',
    wordIndices: [5, 11, 14, 18, 23], // Decisiveness, Accountability, Confidence, Discipline, Persistence
    nameEn: 'Micromanager Extraordinaire',
    nameAr: 'مدير تفاصيل استثنائي',
    descriptionEn: 'You\'ve never met a task you couldn\'t do better yourself! Your team\'s favorite hobby is pretending they didn\'t see your texts at 11PM. Maybe LEAD 2025 can help with that trust issue?',
    descriptionAr: 'لم تقابل أبدًا مهمة لا يمكنك القيام بها بشكل أفضل بنفسك! هواية فريقك المفضلة هي التظاهر بأنهم لم يروا رسائلك النصية في الساعة 11 مساءً. ربما يمكن لـ LEAD 2025 المساعدة في مشكلة الثقة هذه؟'
  },
  {
    id: 'chaosAgent',
    wordIndices: [7, 8, 12, 17, 21], // Adaptability, Passion, Creativity, Courage, Optimism
    nameEn: 'Chaos Agent (With Good Intentions)',
    nameAr: 'عامل فوضى (بنوايا حسنة)',
    descriptionEn: 'Your leadership style is "let\'s figure it out as we go!" Your team needs therapy and energy drinks in equal measure. LEAD 2025 might help channel that chaotic energy!',
    descriptionAr: 'أسلوب قيادتك هو "دعنا نكتشف الأمر أثناء المضي قدمًا!" يحتاج فريقك إلى العلاج ومشروبات الطاقة بنفس القدر. قد يساعد LEAD 2025 في توجيه تلك الطاقة الفوضوية!'
  },
  {
    id: 'overthinker',
    wordIndices: [2, 6, 16, 20, 24], // Strategy, Integrity, Patience, Transparency, Wisdom
    nameEn: 'Professional Overthinker',
    nameAr: 'مفكر مفرط محترف',
    descriptionEn: 'You\'ve considered 17 different scenarios before your morning coffee! Your team presentations have more footnotes than content. LEAD 2025 might help you actually make a decision someday!',
    descriptionAr: 'لقد فكرت في 17 سيناريو مختلفًا قبل قهوة الصباح! عروضك التقديمية للفريق تحتوي على حواشي أكثر من المحتوى. قد يساعدك LEAD 2025 في اتخاذ قرار فعلي يومًا ما!'
  },
  {
    id: 'reluctantLeader',
    wordIndices: [3, 9, 15, 16, 22], // Empathy, Resilience, Humility, Patience, Fairness
    nameEn: 'Reluctant Leader',
    nameAr: 'قائد متردد',
    descriptionEn: 'You were definitely the kid who hoped the teacher wouldn\'t call on you! Now you\'re in charge and still wondering how that happened. LEAD 2025 can help you embrace the role you\'re already good at!',
    descriptionAr: 'كنت بالتأكيد الطفل الذي كان يأمل ألا يناديك المعلم! الآن أنت المسؤول ولا تزال تتساءل كيف حدث ذلك. يمكن لـ LEAD 2025 مساعدتك في تبني الدور الذي أنت بالفعل جيد فيه!'
  },
  {
    id: 'workaholic',
    wordIndices: [8, 10, 11, 18, 23], // Passion, Delegation, Accountability, Discipline, Persistence
    nameEn: 'Certified Workaholic',
    nameAr: 'مدمن عمل معتمد',
    descriptionEn: 'Sleep is for the weak, and weekends are just weekdays in disguise! Your idea of work-life balance is having your laptop at the beach. LEAD 2025 might teach you the revolutionary concept of "time off"!',
    descriptionAr: 'النوم للضعفاء، وعطلات نهاية الأسبوع هي مجرد أيام عمل متنكرة! فكرتك عن التوازن بين العمل والحياة هي وجود حاسوبك المحمول على الشاطئ. قد يعلمك LEAD 2025 المفهوم الثوري "للإجازة"!'
  },
  {
    id: 'peoplepleaser',
    wordIndices: [3, 4, 13, 15, 22], // Empathy, Communication, Collaboration, Humility, Fairness
    nameEn: 'Professional People-Pleaser',
    nameAr: 'مرضي الناس المحترف',
    descriptionEn: 'You\'ve never met an opinion you didn\'t agree with! Your calendar is a graveyard of meetings you didn\'t want to attend. LEAD 2025 might help you discover this cool thing called "boundaries"!',
    descriptionAr: 'لم تقابل أبدًا رأيًا لم توافق عليه! تقويمك مقبرة للاجتماعات التي لم ترغب في حضورها. قد يساعدك LEAD 2025 في اكتشاف هذا الشيء الرائع المسمى "الحدود"!'
  },
  {
    id: 'noLeader',
    wordIndices: [0, 1, 2, 5, 14], // Vision, Innovation, Strategy, Decisiveness, Confidence
    nameEn: 'Not Actually a Leader (Yet!)',
    nameAr: 'لست قائدًا فعليًا (بعد!)',
    descriptionEn: 'Unfortunately, you\'ve mastered the buzzwords but not the actual leadership! It\'s like having the recipe but forgetting to turn on the oven. Join LEAD 2025 to transform those keywords into actual skills!',
    descriptionAr: 'للأسف، لقد أتقنت الكلمات الطنانة ولكن ليس القيادة الفعلية! الأمر أشبه بامتلاك الوصفة ولكن نسيان تشغيل الفرن. انضم إلى LEAD 2025 لتحويل تلك الكلمات المفتاحية إلى مهارات فعلية!'
  },
  {
    id: 'theoreticalLeader',
    wordIndices: [0, 2, 12, 20, 24], // Vision, Strategy, Creativity, Transparency, Wisdom
    nameEn: 'Theoretical Leader',
    nameAr: 'قائد نظري',
    descriptionEn: 'You\'ve read every leadership book but haven\'t quite practiced any of it! Your team meetings sound like TED Talks but somehow nothing gets done. LEAD 2025 can help turn that knowledge into action!',
    descriptionAr: 'لقد قرأت كل كتاب قيادة ولكنك لم تمارس أيًا منها! اجتماعات فريقك تبدو مثل محادثات TED ولكن بطريقة ما لا يتم إنجاز أي شيء. يمكن لـ LEAD 2025 المساعدة في تحويل تلك المعرفة إلى عمل!'
  }
]

// Define a neutral fallback style
const neutralStyle = {
  id: 'balancedLeader',
  wordIndices: [], // Not tied to specific words, used as fallback
  nameEn: 'Balanced Leader',
  nameAr: 'قائد متوازن',
  descriptionEn: 'You show a mix of different leadership qualities! Keep exploring your strengths. LEAD 2025 can help you refine your unique style.',
  descriptionAr: 'أنت تظهر مزيجًا من صفات قيادية مختلفة! استمر في استكشاف نقاط قوتك. يمكن لـ LEAD 2025 مساعدتك في صقل أسلوبك الفريد.'
};

// Add the neutral style to the main list (or handle it separately in logic)
leadershipStyles.push(neutralStyle);

// Function to check if arrays have exactly the same elements (order doesn't matter)
const areArraysEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();
  return sorted1.every((value, index) => value === sorted2[index]);
};

export default function WordSelectionForm() {
  const { language, t, dir } = useLanguage()
  const [selectedWords, setSelectedWords] = useState<number[]>([])
  const [leadershipStyle, setLeadershipStyle] = useState<typeof leadershipStyles[0] | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleWordSelection = (index: number) => {
    if (selectedWords.includes(index)) {
      // Remove word if already selected
      setSelectedWords(selectedWords.filter(i => i !== index))
    } else if (selectedWords.length < 5) {
      // Add word if less than 5 are selected
      setSelectedWords([...selectedWords, index])
    }
  }

  const determineLeadershipStyle = (selectedIndices: number[]): typeof leadershipStyles[0] | null => {
    // First check for exact matches (all 5 words match a specific style)
    for (const style of leadershipStyles) {
      // Skip the neutral style for exact matching
      if (style.id === 'balancedLeader') continue;
      if (areArraysEqual(selectedIndices, style.wordIndices)) {
        return style;
      }
    }
    
    // If no exact match, count matching words for each leadership style (excluding neutral)
    const matchCounts = leadershipStyles
      .filter(style => style.id !== 'balancedLeader') // Exclude neutral for matching
      .map(style => {
        const matches = selectedIndices.filter(index => style.wordIndices.includes(index))
        return {
          style,
          matchCount: matches.length
        }
      })
    
    // Find the style with the most matches
    const bestMatch = matchCounts.reduce((prev, current) => 
      (current.matchCount > prev.matchCount) ? current : prev
    , { style: null, matchCount: 0 })
    
    // If at least 4 words match, return that style
    if (bestMatch.matchCount >= 4 && bestMatch.style) {
      return bestMatch.style
    }
    
    // If 3 words match, return that style (prioritize serious match over roast for 3)
    if (bestMatch.matchCount >= 3 && bestMatch.style) {
      return bestMatch.style;
    }
    
    // If 0-2 words match, 50% chance of neutral, 50% chance of random roast
    if (Math.random() < 0.5) {
      // Return the neutral style
      return leadershipStyles.find(style => style.id === 'balancedLeader') || null;
    } else {
      // Return a random roasting style
      const roastingStyles = leadershipStyles.filter(style => 
        ['micromanager', 'chaosAgent', 'overthinker', 'reluctantLeader', 
         'workaholic', 'peoplepleaser', 'noLeader', 'theoreticalLeader'].includes(style.id)
      );
      // Ensure roastingStyles is not empty before picking random
      if (roastingStyles.length > 0) {
        const randomRoastIndex = Math.floor(Math.random() * roastingStyles.length);
        return roastingStyles[randomRoastIndex];
      } else {
        // Fallback to neutral if somehow no roasting styles are defined
        return leadershipStyles.find(style => style.id === 'balancedLeader') || null;
      }
    }
  }

  const handleSubmit = () => {
    if (selectedWords.length === 5) {
      const style = determineLeadershipStyle(selectedWords)
      setLeadershipStyle(style)
      setIsSubmitted(true)
    }
  }

  const handleShareTwitter = () => {
    if (!leadershipStyle) return
    
    const websiteLink = "https://game.lead-kfupm.com"; 
    const tweetText = language === 'ar' 
      ? `اكتشفت أنني ${leadershipStyle.nameAr}!

اكتشف نوع قيادتك: ${websiteLink}

عبر @LEAD_KFUPM

#LEAD | #جامعة_البترول | #LEAD2025`
      : `Just found out I'm a ${leadershipStyle.nameEn}!

Discover your leadership style: ${websiteLink}

via @LEAD_KFUPM

#LEAD | #KFUPM | #LEAD2025`
    
    // Encode the tweet text for URL
    const encodedTweet = encodeURIComponent(tweetText)
    
    // Use the standard web intent URL
    const webUrl = `https://twitter.com/intent/tweet?text=${encodedTweet}`

    // Open the web intent URL in a new tab
    window.open(webUrl, '_blank');
  }

  const handleVisitLead = () => {
    window.open('https://lead-kfupm.com/', '_blank')
  }

  const handleReset = () => {
    setSelectedWords([])
    setLeadershipStyle(null)
    setIsSubmitted(false)
  }

  return (
    // Adjusted max-width and padding for better responsiveness
    <div className={`flex flex-col items-center justify-center w-full max-w-3xl mx-auto p-4 sm:p-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      {!isSubmitted ? (
        <>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            {language === 'ar' 
              ? 'اختر ٥ كلمات تعبر عن شخصيتك القيادية 👑'
              : 'Pick 5 words that define your leadership vibe 👑'}
          </h1>
          
          <div className="mb-4 text-center">
            <p className="text-base sm:text-lg mb-2">
              {language === 'ar'
                ? `اخترت ${selectedWords.length} من ٥ كلمات`
                : `Selected ${selectedWords.length} of 5 words`}
            </p>
          </div>
          
          {/* Adjusted grid columns for better responsiveness */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8 w-full">
            {leadershipWords[language].map((word, index) => (
              <Button
                key={index}
                onClick={() => handleWordSelection(index)}
                variant={selectedWords.includes(index) ? "default" : "outline"}
                // Adjusted padding and text size for smaller buttons on mobile
                className={`text-xs sm:text-sm p-2 sm:p-3 ${selectedWords.includes(index) ? 'bg-primary text-primary-foreground' : 'border-primary text-primary hover:bg-primary/10'}`}
              >
                {word}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={handleSubmit} 
            // Adjusted padding and text size
            className="w-full py-4 sm:py-6 text-base sm:text-lg bg-primary hover:bg-primary/90"
            disabled={selectedWords.length !== 5}
          >
            {language === 'ar' ? 'اكشف شخصيتك القيادية! 🔍' : 'Reveal your leadership style! 🔍'}
          </Button>
        </>
      ) : (
        // Adjusted padding for result card
        <Card className="w-full p-6 sm:p-8 flex flex-col items-center animate-fadeIn">
          {/* Adjusted heading size */}
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
            {language === 'ar' ? 'أنت' : 'You are a'} <span className="text-primary">{language === 'ar' ? leadershipStyle?.nameAr : leadershipStyle?.nameEn}</span>
          </h2>
          {/* Adjusted description size */}
          <p className="text-center mb-6 sm:mb-8 text-base sm:text-lg">
            {language === 'ar' ? leadershipStyle?.descriptionAr : leadershipStyle?.descriptionEn}
          </p>
          {/* Adjusted text size */}
          <p className="text-center mb-6 sm:mb-8 text-sm sm:text-base">
            {language === 'ar' 
              ? 'طور مهاراتك القيادية مع LEAD 2025! 🚀'
              : 'Level up your leadership skills with LEAD 2025! 🚀'}
          </p>
          {/* Adjusted button text size and padding */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Button 
              onClick={handleVisitLead}
              className="flex-1 bg-primary hover:bg-primary/90 text-sm sm:text-base py-2 sm:py-3"
            >
              {language === 'ar' ? 'زيارة موقع LEAD' : 'Visit LEAD website'}
            </Button>
            <Button 
              onClick={handleShareTwitter}
              variant="outline"
              className="flex-1 border-primary text-primary hover:bg-primary/10 text-sm sm:text-base py-2 sm:py-3"
            >
              {/* Removed emoji from button text */}
              {language === 'ar' ? 'شارك على تويتر' : 'Share on Twitter'}
            </Button>
          </div>
          <Button
            onClick={handleReset}
            variant="ghost"
            className="mt-6 text-sm sm:text-base"
          >
            ↩ {language === 'ar' ? 'جرب مرة أخرى' : 'Try again'}
          </Button>
        </Card>
      )}
    </div>
  )
}

