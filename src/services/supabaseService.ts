import { supabase } from '../supabaseClient'
import type { Database } from '../types/supabase'

type Movie = Database['public']['Tables']['movies']['Row']
type Review = Database['public']['Tables']['reviews']['Row']
type ReviewInsert = Database['public']['Tables']['reviews']['Insert']

export type { Movie, Review, ReviewInsert }

// ✅ Fetch all movies
export const getMovies = async (): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('year', { ascending: false })

  if (error) throw error
  return data
}

// ✅ Fetch reviews for a specific movie
export const getReviewsByMovieId = async (movieId: string): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ✅ Add a review
export const addReview = async (review: ReviewInsert): Promise<Review[]> => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([review])
    .select()

  if (error) throw error
  return data
}
