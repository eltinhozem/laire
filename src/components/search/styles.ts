// styles.ts
import { supabase } from '../config/supabase';

// Estilos
export const searchContainer = "space-y-6";
export const searchHeader = "bg-white shadow-sm rounded-lg p-4";
export const searchInputContainer = "flex flex-col md:flex-row gap-4";
export const searchInputWrapper = "flex-1 relative";
export const searchIcon = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none";
export const searchInput = "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
export const resultsGrid = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4";
export const resultCard = "bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer";
export const resultImageContainer = "aspect-square relative";
export const resultImage = "absolute inset-0 w-full h-full object-cover";
export const resultCardContent = "p-2";
export const resultTitle = "text-sm font-semibold text-gray-900 truncate";
export const resultDescription = "text-xs text-gray-500 truncate";

// Funções utilitárias
export async function getCategories() {
  const { data, error } = await supabase.from('categories').select('*');
  console.log(data, error);
}