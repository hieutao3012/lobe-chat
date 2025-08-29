// src/utils/nlpProcessor.ts
import nlp from 'compromise';

// Define types for our entities
export interface SearchCriteria {
  categories: string[];
  areas: string[];
  priceRanges: string[];
  query: string;
}

/**
 * Extract entities from user prompt
 * @param prompt User input prompt
 * @returns SearchCriteria object with extracted entities
 */
export function extractEntities(prompt: string): SearchCriteria {
  // Process the prompt with compromise
  const doc = nlp(prompt);
  
  // Extract potential categories (nouns that might be categories)
  // Get nouns and filter out short terms
  const nouns = doc.nouns().out('array') as string[];
  const categories = nouns.filter(cat => cat.length > 2);
  
  // Extract potential locations (places)
  // Use places() method and also look for terms that might be locations
  const places = doc.places().out('array') as string[];
  
  // Also check for potential locations in the nouns
  const locationIndicators = ['quận', 'huyện', 'tỉnh', 'thành phố', 'tp', 'q', 'h'];
  const potentialLocations = nouns.filter(noun => 
    locationIndicators.some(indicator => 
      noun.toLowerCase().includes(indicator)
    )
  );
  
  // Combine places and potential locations, removing duplicates
  const allAreas = [...new Set([...places, ...potentialLocations])];
  
  // Extract potential price ranges (currency)
  // For Vietnamese, we might look for "giá rẻ", "giá cao", etc.
  const priceIndicators = ['giá rẻ', 'giá thấp', 'rẻ', 'thấp', 'giá cao', 'đắt', 'cao', 'giá bình dân'];
  const priceRanges = priceIndicators.filter(indicator => 
    prompt.toLowerCase().includes(indicator)
  );
  
  // Return the extracted criteria
  return {
    categories: categories,
    areas: allAreas,
    priceRanges,
    query: prompt
  };
}

/**
 * Refine search criteria by removing common words and stop words
 * @param criteria SearchCriteria to refine
 * @returns Refined SearchCriteria
 */
export function refineCriteria(criteria: SearchCriteria): SearchCriteria {
  // Define common Vietnamese stop words to filter out
  const stopWords = [
    'tôi', 'muốn', 'cần', 'tìm', 'ở', 'tại', 'với', 'cho', 'và', 'hoặc', 'nhưng', 'thì', 'là', 
    'có', 'được', 'bị', 'do', 'bởi', 'theo', 'vào', 'ra', 'lên', 'xuống', 'đi', 'đến', 'về', 
    'trên', 'dưới', 'trong', 'ngoài', 'giữa', 'trước', 'sau', 'khi', 'nếu', 'mà', 'như', 'bằng', 
    'cùng', 'khác', 'nhiều', 'ít', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 
    'mười', 'của', 'các', 'những', 'cái', 'con', 'người', 'ông', 'bà', 'chị', 'anh', 'em'
  ];
  
  // Filter categories
  const refinedCategories = criteria.categories.filter(
    cat => !stopWords.includes(cat.toLowerCase()) && cat.length > 1
  );
  
  // Filter areas
  const refinedAreas = criteria.areas.filter(
    area => !stopWords.includes(area.toLowerCase()) && area.length > 1
  );
  
  return {
    ...criteria,
    categories: [...new Set(refinedCategories)], // Remove duplicates
    areas: [...new Set(refinedAreas)] // Remove duplicates
  };
}

/**
 * Parse user prompt to extract search criteria
 * @param prompt User input prompt
 * @returns Refined SearchCriteria object
 */
export function parseUserPrompt(prompt: string): SearchCriteria {
  const rawCriteria = extractEntities(prompt);
  return refineCriteria(rawCriteria);
}