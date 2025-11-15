/**
 * CV Data Mapper
 * Maps various CV data formats to our internal schema
 * Handles synonyms and different field names from AI parsing
 */

/**
 * Map parsed CV data to our internal schema
 * Handles various field name synonyms and structures
 */
export function mapParsedCVToSchema(parsedData: any): any {
  // Personal/Header mapping
  const personal = mapPersonalInfo(parsedData)
  
  // Summary mapping
  const summary = mapSummary(parsedData)
  
  // Experience mapping
  const experience = mapExperience(parsedData)
  
  // Education mapping
  const education = mapEducation(parsedData)
  
  // Skills mapping
  const skills = mapSkills(parsedData)
  
  // Projects mapping
  const projects = mapProjects(parsedData)
  
  // Certifications mapping
  const certifications = mapCertifications(parsedData)
  
  // Languages mapping
  const languages = mapLanguages(parsedData)
  
  // Interests/Hobbies mapping
  const interests = mapInterests(parsedData)

  return {
    personal,
    summary,
    experience,
    education,
    skills,
    projects,
    certifications,
    languages,
    interests,
  }
}

/**
 * Map personal information (handles: header, personal, contact, profile)
 */
function mapPersonalInfo(data: any): any {
  const source = data.header || data.personal || data.contact || data.profile || {}
  
  return {
    fullName: source.fullName || source.name || source.full_name || '',
    title: source.title || source.headline || source.position || source.job_title || '',
    email: source.email || source.mail || source.emailAddress || '',
    phone: source.phone || source.telephone || source.phoneNumber || source.mobile || '',
    location: source.location || source.address || source.city || '',
    linkedin: source.linkedin || source.linkedIn || source.links?.linkedin || '',
    github: source.github || source.links?.github || '',
    website: source.website || source.portfolio || source.links?.portfolio || source.url || '',
  }
}

/**
 * Map summary (handles: summary, about, profile, objective, bio)
 */
function mapSummary(data: any): string {
  return data.summary || 
         data.about || 
         data.profile || 
         data.objective || 
         data.bio || 
         data.professionalSummary || 
         data.description || 
         ''
}

/**
 * Map experience (handles: experience, work, employment, workHistory, jobs)
 */
function mapExperience(data: any): any[] {
  const source = data.experience || 
                 data.work || 
                 data.employment || 
                 data.workHistory || 
                 data.workExperience || 
                 data.jobs || 
                 []
  
  return source.map((exp: any) => {
    // Get achievements/bullets - ensure it's always an array
    let achievements = exp.achievements || 
                       exp.bullets || 
                       exp.responsibilities || 
                       exp.highlights || 
                       []
    
    // If still empty and there's a description, use it
    if ((!achievements || achievements.length === 0) && exp.description) {
      achievements = [exp.description]
    }
    
    // Ensure it's an array
    if (!Array.isArray(achievements)) {
      achievements = []
    }
    
    console.log('[Mapper] Experience:', exp.company, '- Achievements:', achievements)
    
    // Some templates use 'description' as a single string, others use 'achievements' array
    // Create both formats for maximum compatibility
    const description = exp.description || exp.summary || (achievements.length > 0 ? achievements.join('\n• ') : '')
    
    return {
      company: exp.company || exp.employer || exp.organization || exp.companyName || '',
      position: exp.position || exp.title || exp.role || exp.jobTitle || '', // Template expects 'position'
      title: exp.title || exp.position || exp.role || exp.jobTitle || '', // Keep for compatibility
      location: exp.location || exp.city || exp.place || '',
      startDate: exp.startDate || exp.start || exp.from || exp.start_date || '',
      endDate: exp.endDate || exp.end || exp.to || exp.end_date || 'Present',
      current: exp.current || exp.isCurrent || exp.present || false,
      description, // For templates that use single description field
      achievements, // For templates that use achievements array
      bullets: achievements, // Keep for compatibility
    }
  })
}

/**
 * Map education (handles: education, academic, schooling, qualifications)
 */
function mapEducation(data: any): any[] {
  const source = data.education || 
                 data.academic || 
                 data.schooling || 
                 data.qualifications || 
                 []
  
  return source.map((edu: any) => {
    const startDate = edu.startDate || edu.start || edu.from || edu.start_date || ''
    const endDate = edu.endDate || edu.end || edu.to || edu.end_date || edu.graduation || ''
    const dates = edu.dates || (startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate || '')
    
    return {
      institution: edu.institution || edu.school || edu.university || edu.college || '', // Template expects 'institution'
      school: edu.school || edu.institution || edu.university || edu.college || '', // Keep for compatibility
      degree: edu.degree || edu.qualification || edu.program || '',
      field: edu.field || edu.major || edu.specialization || edu.area || '',
      location: edu.location || edu.city || edu.place || '',
      startDate,
      endDate,
      dates,
      gpa: edu.gpa || edu.grade || edu.score || '',
      description: edu.description || edu.summary || '',
      honors: edu.honors || edu.achievements || [],
    }
  })
}

/**
 * Map skills (handles: skills, technologies, competencies, expertise)
 */
function mapSkills(data: any): any {
  const source = data.skills || 
                 data.technologies || 
                 data.competencies || 
                 data.expertise || 
                 {}
  
  // Handle different skill structures
  if (Array.isArray(source)) {
    // If it's a flat array of strings
    return source
  } else if (typeof source === 'object') {
    // If it's an object with categories
    return {
      languages: source.languages || source.programming || source.programmingLanguages || [],
      frameworks: source.frameworks || source.libraries || source.tools || [],
      databases: source.databases || source.db || source.data || [],
      tools: source.tools || source.software || source.applications || [],
      other: source.other || source.misc || source.additional || [],
      ...source, // Keep any other categories
    }
  }
  
  return []
}

/**
 * Map projects (handles: projects, portfolio, work, personalProjects)
 */
function mapProjects(data: any): any[] {
  const source = data.projects || 
                 data.portfolio || 
                 data.personalProjects || 
                 data.sideProjects || 
                 []
  
  return source.map((proj: any) => ({
    name: proj.name || proj.title || proj.projectName || '',
    description: proj.description || proj.summary || proj.about || '',
    technologies: proj.technologies || 
                  proj.tech || 
                  proj.stack || 
                  proj.tools || 
                  [],
    url: proj.url || proj.link || proj.website || proj.github || '',
    startDate: proj.startDate || proj.start || proj.from || '',
    endDate: proj.endDate || proj.end || proj.to || '',
    highlights: proj.highlights || 
                proj.achievements || 
                proj.features || 
                (proj.description ? [proj.description] : []) ||
                [],
  }))
}

/**
 * Map certifications (handles: certifications, certificates, credentials, licenses)
 */
function mapCertifications(data: any): any[] {
  const source = data.certifications || 
                 data.certificates || 
                 data.credentials || 
                 data.licenses || 
                 []
  
  return source.map((cert: any) => ({
    name: cert.name || cert.title || cert.certification || '',
    issuer: cert.issuer || cert.organization || cert.authority || cert.provider || '',
    date: cert.date || cert.issued || cert.year || cert.issueDate || '',
    expiryDate: cert.expiryDate || cert.expires || cert.expiration || '',
    credentialId: cert.credentialId || cert.id || cert.credential || cert.number || '',
    url: cert.url || cert.link || cert.verificationUrl || '',
  }))
}

/**
 * Map languages (handles: languages, spokenLanguages, linguistic)
 */
function mapLanguages(data: any): any[] {
  const source = data.languages || 
                 data.spokenLanguages || 
                 data.linguistic || 
                 []
  
  // Handle both string array and object array formats
  return source.map((lang: any) => {
    if (typeof lang === 'string') {
      // Parse "Language: Level" or "Language (Level)" format
      const match = lang.match(/^(.+?)[\s:(-]+(.+?)[\s)]*$/)
      if (match) {
        return {
          name: match[1].trim(),
          proficiency: match[2].trim(),
        }
      }
      return {
        name: lang,
        proficiency: '',
      }
    }
    
    return {
      name: lang.name || lang.language || '',
      proficiency: lang.proficiency || lang.level || lang.fluency || '',
    }
  })
}

/**
 * Map interests (handles: interests, hobbies, activities, personal)
 */
function mapInterests(data: any): string[] {
  const source = data.interests || 
                 data.hobbies || 
                 data.activities || 
                 data.personal || 
                 []
  
  // Handle both string array and object array formats
  if (Array.isArray(source)) {
    return source.map((item: any) => 
      typeof item === 'string' ? item : (item.name || item.interest || item.hobby || '')
    )
  }
  
  return []
}
