import { describe, it, expect } from 'vitest';
import { normalizeText, extractTextFromImagesWithVision } from '@/AIservice/lib/parse';

describe('Text normalization', () => {
  it('should normalize bullets, spaces and newlines', () => {
    const input = '• Item 1\r\n\r\nItem   2\n\n\n•  Item 3';
    const out = normalizeText(input);
    expect(out).toBe('- Item 1\n\nItem 2\n\n- Item 3');
  });
});

describe('Vision extraction (basic)', () => {
  it('should throw when no images are provided', async () => {
    await expect(extractTextFromImagesWithVision([])).rejects.toThrow();
  });
});
