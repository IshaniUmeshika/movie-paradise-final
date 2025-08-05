// src/services/api.ts
import { supabase } from '../supabaseClient'


export const getMovieById = async (id: string) => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
