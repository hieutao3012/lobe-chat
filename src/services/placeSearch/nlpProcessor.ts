// src/services/placeSearch/nlpProcessor.ts
import nlp from 'compromise';

// Define types for our entities
export interface SearchCriteria {
  categories: string[];
  areas: string[];
  priceRanges: string[];
  query: string;
  minRating?: number;
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
  // For Vietnamese, we'll use a more sophisticated approach
  const categories: string[] = [];
  
  // Extract potential locations (places)
  // For Vietnamese, we'll look for common location indicators
  const places: string[] = [];
  
  // Extract potential price ranges (currency)
  // For Vietnamese, we look for "giá rẻ", "giá cao", etc.
  const priceIndicators = ['giá rẻ', 'giá thấp', 'rẻ', 'thấp', 'giá cao', 'đắt', 'cao', 'tiết kiệm'];
  const priceRanges = priceIndicators.filter(indicator => 
    prompt.toLowerCase().includes(indicator)
  );
  
  // Manual extraction for Vietnamese
  // Categories
  const categoryKeywords = ['nhà hàng', 'quán ăn', 'quán cà phê', 'cà phê', 'bar', 'pub', 'nhà hàng nhật', 'nhà hàng hàn', 'nhà hàng trung', 'ăn vặt', 'buffet', 'lẩu', 'nướng', 'hải sản'];
  categoryKeywords.forEach(keyword => {
    if (prompt.toLowerCase().includes(keyword)) {
      categories.push(keyword);
    }
  });
  
  // Areas - Districts in HCMC
  const districtKeywords = ['quận 1', 'quận 2', 'quận 3', 'quận 4', 'quận 5', 'quận 6', 'quận 7', 'quận 8', 'quận 9', 'quận 10', 'quận 11', 'quận 12', 'quận bình thạnh', 'quận phú nhuận', 'quận tân bình', 'quận tân phú', 'quận gò vấp', 'quận bình tân', 'thủ đức', 'bình chánh', 'củ chi', 'hóc môn', 'nhà bè'];
  districtKeywords.forEach(keyword => {
    if (prompt.toLowerCase().includes(keyword)) {
      places.push(keyword);
    }
  });
  
  // Cities
  const cityKeywords = ['tp hcm', 'tp. hcm', 'hồ chí minh', 'hcm', 'hà nội', 'đà nẵng', 'huế', 'nha trang', 'đà lạt'];
  cityKeywords.forEach(keyword => {
    if (prompt.toLowerCase().includes(keyword)) {
      places.push(keyword);
    }
  });
  
  // Rating indicators
  let minRating: number | undefined = undefined;
  if (prompt.toLowerCase().includes('đánh giá cao') || prompt.toLowerCase().includes('rating cao') || prompt.toLowerCase().includes('sao cao')) {
    minRating = 8.0;
  }
  
  // Return the extracted criteria
  return {
    categories: [...new Set(categories)], // Remove duplicates
    areas: [...new Set(places)], // Remove duplicates
    priceRanges,
    query: prompt,
    minRating
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
    cat => !stopWords.includes(cat.toLowerCase())
  );
  
  // Filter areas
  const refinedAreas = criteria.areas.filter(
    area => !stopWords.includes(area.toLowerCase())
  );
  
  return {
    ...criteria,
    categories: refinedCategories,
    areas: refinedAreas
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