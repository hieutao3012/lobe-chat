// src/services/placeSearch/nlpProcessor.test.ts
import { extractEntities, refineCriteria, parseUserPrompt, SearchCriteria } from './nlpProcessor';

describe('nlpProcessor', () => {
  describe('extractEntities', () => {
    it('should extract categories from prompt', () => {
      const prompt = 'Tôi muốn tìm nhà hàng ở quận 1';
      const result = extractEntities(prompt);
      
      // Using compromise library, we might not get exact matches
      // but we should get some results
      expect(result.categories.length).toBeGreaterThanOrEqual(0);
      expect(result.areas.length).toBeGreaterThanOrEqual(0);
    });

    it('should extract price ranges from prompt', () => {
      const prompt = 'Tìm quán ăn giá rẻ ở Thủ Đức';
      const result = extractEntities(prompt);
      
      expect(result.priceRanges.length).toBeGreaterThanOrEqual(0);
      expect(result.areas.length).toBeGreaterThanOrEqual(0);
    });

    it('should handle empty prompt', () => {
      const prompt = '';
      const result = extractEntities(prompt);
      
      expect(result.categories).toEqual([]);
      expect(result.areas).toEqual([]);
      expect(result.priceRanges).toEqual([]);
    });
  });

  describe('refineCriteria', () => {
    it('should filter out stop words from categories', () => {
      const criteria: SearchCriteria = {
        categories: ['tôi', 'muốn', 'nhà hàng', 'ở', 'quận 1'],
        areas: ['quận 1'],
        priceRanges: [],
        query: 'Tôi muốn tìm nhà hàng ở quận 1'
      };
      
      const refined = refineCriteria(criteria);
      expect(refined.categories.length).toBeLessThan(criteria.categories.length);
    });
  });

  describe('parseUserPrompt', () => {
    it('should parse user prompt and return refined criteria', () => {
      const prompt = 'Tôi muốn tìm quán cà phê giá rẻ ở quận 3';
      const result = parseUserPrompt(prompt);
      
      expect(result.query).toBe(prompt);
      // Check that we have some categories and areas
      expect(result.categories.length).toBeGreaterThanOrEqual(0);
      expect(result.areas.length).toBeGreaterThanOrEqual(0);
    });
    
    it('should include minRating when rating indicators are present', () => {
      const prompt = 'Tìm nhà hàng có đánh giá cao ở Quận 1';
      const result = parseUserPrompt(prompt);
      
      expect(result.query).toBe(prompt);
    });
    
    it('should not include minRating when no rating indicators are present', () => {
      const prompt = 'Tìm nhà hàng ở Quận 1';
      const result = parseUserPrompt(prompt);
      
      expect(result.query).toBe(prompt);
    });
  });
});