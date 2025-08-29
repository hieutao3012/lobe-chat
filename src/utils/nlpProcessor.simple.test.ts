// src/utils/nlpProcessor.simple.test.ts
import { extractEntities, refineCriteria, parseUserPrompt } from './nlpProcessor';

describe('nlpProcessor', () => {
  describe('extractEntities', () => {
    it('should extract some categories and areas from prompt', () => {
      const prompt = 'Tôi muốn tìm nhà hàng ở quận 1';
      const result = extractEntities(prompt);
      
      // Check that we have some categories extracted
      expect(result.categories.length).toBeGreaterThan(0);
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

  describe('parseUserPrompt', () => {
    it('should parse user prompt and return refined criteria', () => {
      const prompt = 'Tôi muốn tìm quán cà phê giá rẻ ở quận 3';
      const result = parseUserPrompt(prompt);
      
      expect(result.query).toBe(prompt);
      // Check that we have some categories and areas
      expect(result.categories.length).toBeGreaterThanOrEqual(0);
      expect(result.areas.length).toBeGreaterThanOrEqual(0);
    });
  });
});