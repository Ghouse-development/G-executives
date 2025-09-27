export interface Executive {
  id: string
  name: string
  email: string
  position: string
  department: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Material {
  id: string
  category_id: string
  title: string
  file_url: string
  file_type: 'pdf' | 'jpeg' | 'ppt' | 'pptx'
  content?: string
  created_at: string
}

export interface Question {
  id: string
  material_id: string
  category_id: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  created_at: string
}

export interface TestSession {
  id: string
  executive_id: string
  started_at: string
  completed_at?: string
  score?: number
  total_questions: number
}

export interface TestAnswer {
  id: string
  session_id: string
  question_id: string
  user_answer: string
  is_correct: boolean
  answered_at: string
}

export interface LearningProgress {
  executive_id: string
  category_id: string
  total_questions_answered: number
  correct_answers: number
  last_activity: string
  mastery_level: number
}