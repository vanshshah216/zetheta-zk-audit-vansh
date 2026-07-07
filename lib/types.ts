export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: 'cyan' | 'blue' | 'emerald' | 'purple'
}

export interface AuditCase {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  reward: number
  auditors: number
  image: string
}

export interface TimelineStep {
  number: number
  title: string
  description: string
  details: string[]
}

export interface Stat {
  label: string
  value: string
  suffix?: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

export interface FAQItem {
  question: string
  answer: string
}
