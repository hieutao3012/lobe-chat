// src/services/placeSearch/userPromptProcessor.ts
import { SearchCriteria, parseUserPrompt } from './nlpProcessor';
import { advancedSearch, AdvancedSearchResult } from './advancedSearchService';
import { Place } from '@/types/place';

export interface ProcessedPromptResult {
  places: Place[];
  criteria: SearchCriteria;
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Process user prompt and return relevant places
 * @param prompt User input prompt
 * @param page Page number (1-indexed)
 * @param pageSize Number of items per page
 * @returns ProcessedPromptResult with places and search criteria
 */
export async function processUserPrompt(
  prompt: string,
  page: number = 1,
  pageSize: number = 10
): Promise<ProcessedPromptResult> {
  try {
    // Parse the user prompt to extract search criteria
    const criteria = parseUserPrompt(prompt);
    
    // Perform advanced search based on the criteria
    const searchResult: AdvancedSearchResult = advancedSearch(criteria, page, pageSize);
    
    return {
      places: searchResult.places,
      criteria,
      totalCount: searchResult.totalCount,
      page: searchResult.page,
      pageSize: searchResult.pageSize,
      totalPages: searchResult.totalPages
    };
  } catch (error) {
    console.error('Error processing user prompt:', error);
    throw new Error('Failed to process user prompt');
  }
}

/**
 * Get fallback places when no results are found
 * @returns Array of popular places as fallback
 */
export function getFallbackPlaces(): Place[] {
  // For now, we'll return an empty array
  // In a real implementation, this would return popular places
  return [];
}

/**
 * Handle ambiguous prompts by requesting clarification
 * @param prompt User input prompt
 * @returns String with clarification request or null if prompt is clear
 */
export function handleAmbiguousPrompt(prompt: string): string | null {
  // Check if the prompt is too vague or ambiguous
  const vagueTerms = ['ăn gì', 'chơi đâu', 'đi chơi', 'gì cũng được', 'bất kỳ'];
  const isVague = vagueTerms.some(term => prompt.toLowerCase().includes(term));
  
  if (isVague) {
    return 'Xin vui lòng cung cấp thêm thông tin chi tiết về loại địa điểm bạn muốn tìm (ví dụ: nhà hàng, quán cà phê, công viên, v.v.)';
  }
  
  // Check if the prompt is too short
  if (prompt.trim().length < 3) {
    return 'Xin vui lòng nhập yêu cầu chi tiết hơn (ít nhất 3 ký tự)';
  }
  
  // Prompt seems clear enough
  return null;
}