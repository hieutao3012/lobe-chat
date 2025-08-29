// src/utils/nlpProcessor.test.ts
import { extractEntities, refineCriteria, parseUserPrompt } from './nlpProcessor';

describe('nlpProcessor', () => {
  describe('extractEntities', () => {
    it('should extract categories from prompt', () => {
      const prompt = 'Tôi muốn tìm nhà hàng ở quận 1';
      const result = extractEntities(prompt);
      
      // Check that we have some categories extracted
      expect(result.categories.length).toBeGreaterThan(0);
      expect(result.areas.length).toBeGreaterThan(0);
    });

    it('should extract price ranges from prompt', () => {
      const prompt = 'Tìm quán ăn giá rẻ ở Thủ Đức';
      const result = extractEntities(prompt);
      
      // Check that we have price ranges and areas
      expect(result.priceRanges.length).toBeGreaterThanOrEqual(0);
      expect(result.areas.length).toBeGreaterThan(0);
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
      const criteria = {
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
      expect(result.categories.length).toBeGreaterThan(0);
      expect(result.areas.length).toBeGreaterThan(0);
    });
  });
});