# NLP Library Research for Box Chat AI

## Requirements
- Extract entities: categories, areas, price ranges from user prompts
- Lightweight and fast
- Compatible with TypeScript/Next.js
- Easy to use and integrate

## Library Options

### 1. Natural (https://github.com/NaturalNode/natural)
- Pros:
  - Mature library with extensive features
  - Good TypeScript support
  - Supports tokenization, stemming, classification, etc.
- Cons:
  - May be overkill for our simple entity extraction needs
  - Larger bundle size

### 2. Compromise (https://github.com/spencermountain/compromise)
- Pros:
  - Lightweight and browser-friendly
  - Very intuitive API
  - Good for entity extraction
  - Works well in browsers and Node.js
- Cons:
  - Fewer advanced NLP features

### 3. NLP.js (https://github.com/axa-group/nlp.js)
- Pros:
  - Supports multiple languages
  - Has entity extraction capabilities
  - Good TypeScript support
- Cons:
  - More complex setup
  - Might be overkill for our needs

## Recommendation
For our use case of simple entity extraction from user prompts, **Compromise** seems to be the best fit because:
1. It's lightweight and fast
2. Has good entity extraction capabilities
3. Works well with TypeScript/Next.js
4. Has a simple API that's easy to integrate

## Implementation Plan
1. Install Compromise library - DONE (using pnpm add compromise)
2. Create a simple module to extract entities (categories, areas, price ranges) - DONE
   - Created nlpProcessor.ts with functions to extract and refine entities
   - Created nlpProcessor.test.ts with unit tests
3. Test with sample prompts