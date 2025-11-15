import { describe, it, expect } from 'vitest'
import { mapParsedCVToSchema } from '@/lib/utils/cv-data-mapper'
import parsedCV from '../services/cv_ahmad_parsed.json'

describe('CV Data Mapper', () => {
  it('should map parsed CV to schema correctly', () => {
    const mapped = mapParsedCVToSchema(parsedCV)
    
    console.log('Mapped CV:', JSON.stringify(mapped, null, 2))
    
    // Check personal info
    expect(mapped.personal.fullName).toBe('Ahmad HADDOU')
    expect(mapped.personal.email).toBe('ahmadhaddou95@gmail.com')
    expect(mapped.personal.phone).toBe('(+33) 7 69 41 57 43')
    
    // Check experience
    expect(mapped.experience).toHaveLength(4)
    expect(mapped.experience[0].company).toBe('Credit Agricole')
    expect(mapped.experience[0].position).toBe('Quantitative Developer')
    expect(mapped.experience[0].title).toBe('Quantitative Developer')
    expect(mapped.experience[0].achievements).toBeDefined()
    expect(mapped.experience[0].achievements.length).toBeGreaterThan(0)
    expect(mapped.experience[0].bullets).toBeDefined()
    
    // Check education
    expect(mapped.education).toHaveLength(3)
    expect(mapped.education[0].institution).toBe('Ensimag-Grenoble INP')
    expect(mapped.education[0].school).toBe('Ensimag-Grenoble INP')
    expect(mapped.education[0].degree).toBe('Option Financial engineering')
    expect(mapped.education[0].dates).toBe('2015–2019')
    
    // Check skills
    expect(mapped.skills).toBeDefined()
    expect(mapped.skills.languages).toContain('C++')
    
    // Check languages
    expect(mapped.languages).toHaveLength(3)
    expect(mapped.languages[0].name).toBe('French')
    
    // Check interests
    expect(mapped.interests).toContain('Biliardo')
  })
})
