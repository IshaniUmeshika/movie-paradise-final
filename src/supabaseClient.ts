// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/supabase' 


 

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// ✅ Add these functions:

export const getMovies = async () => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('year', { ascending: false })

  if (error) throw error
  return data
}

export const getReviewsByMovieId = async (movieId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const addReview = async ({
  movie_id,
  username,
  rating,
  comment
}: {
  movie_id: string
  username: string
  rating: number
  comment?: string
}) => {
  const { data, error } = await supabase.from('reviews').insert([
    {
      movie_id,
      username,
      rating,
      comment
    }
  ])

  if (error) throw error
  return data
}
