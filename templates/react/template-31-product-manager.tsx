import React from 'react';
import { UniversalResumeData, UniversalTemplateProps } from './universal-schema';

export const ProductManagerTemplate: React.FC<UniversalTemplateProps> = ({ data }) => {
  const hasExperience = data.experience && data.experience.length > 0;
  const hasEducation = data.education && data.education.length > 0;
  const hasCertifications = data.certifications && data.certifications.length > 0;
  const hasLanguages = data.languages && data.languages.length > 0;

  return (
    <div style={styles.cvContainer}>
      <div style={styles.leftDecorativeBar} aria-hidden="true">
        <img
          src="https://app.grapesjs.com/api/assets/random-image?query=%22realistic%20tropical%20leaf%20dark%20green%20close-up%20vertical%22&w=45&h=1200"
          alt="Decorative tropical leaf accent"
          style={styles.leafImage}
        />
      </div>

      <section style={styles.mainContent}>
        <header style={styles.header}>
          <div style={styles.headerTextBlock}>
            <h1 style={styles.name}>{data.personal?.fullName || 'Your Name'}</h1>
            <p style={styles.professionalTitle}>{data.personal?.title || 'Professional Title'}</p>
            
            <ul style={styles.contactRow}>
              {data.personal?.email && (
                <li style={styles.contactItem}>
                  <img
                    alt="Email icon"
                    src="https://api.iconify.design/lucide-mail.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <a href={`mailto:${data.personal.email}`} style={styles.contactLink}>
                    {data.personal.email}
                  </a>
                </li>
              )}
              {data.personal?.phone && (
                <li style={styles.contactItem}>
                  <img
                    alt="Phone icon"
                    src="https://api.iconify.design/lucide-phone.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <a href={`tel:${data.personal.phone}`} style={styles.contactLink}>
                    {data.personal.phone}
                  </a>
                </li>
              )}
              {data.personal?.location && (
                <li style={styles.contactItem}>
                  <img
                    alt="Location icon"
                    src="https://api.iconify.design/lucide-map-pin.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <span>{data.personal.location}</span>
                </li>
              )}
              {data.personal?.website && (
                <li style={styles.contactItem}>
                  <img
                    alt="Website icon"
                    src="https://api.iconify.design/lucide-globe.svg?color=%23333333"
                    style={styles.contactIcon}
                  />
                  <a href={data.personal.website} style={styles.contactLink}>
                    {data.personal.website.replace('https://', '')}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {data.personal?.photo?.url && !data.personal.photo.effects?.hidden && (
            <div style={styles.photoWrapper}>
              <img
                src={data.personal.photo.url}
                alt="Profile photo"
                style={styles.profilePhoto}
              />
            </div>
          )}
        </header>

        {data.summary && (
          <section style={styles.profileSection}>
            <h2 style={styles.sectionTitle}>Profile</h2>
            <p style={styles.profileText}>{data.summary}</p>
          </section>
        )}

        {hasExperience && (
          <section>
            <h2 style={styles.sectionTitle}>Professional Experience</h2>
            <div style={styles.experienceList}>
              {data.experience!.map((exp, index) => (
                <article key={index} style={styles.experienceItem}>
                  <div style={styles.experienceLeft}>
                    <h3 style={styles.experienceCompany}>
                      {exp.company}
                      {exp.position && (
                        <span style={styles.experiencePosition}>{exp.position}</span>
                      )}
                    </h3>
                    {exp.description && (
                      <p style={styles.experienceDescription}>{exp.description}</p>
                    )}
                  </div>
                  <div style={styles.experienceRight}>
                    {(exp.startDate || exp.endDate) && (
                      <div style={styles.experienceDate}>
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </div>
                    )}
                    {exp.location && (
                      <div style={styles.experienceLocation}>{exp.location}</div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {hasEducation && (
          <section>
            <h2 style={styles.sectionTitle}>Education</h2>
            <div style={styles.educationList}>
              {data.education!.map((edu, index) => (
                <article key={index} style={styles.educationItem}>
                  <div style={styles.educationLeft}>
                    <h3 style={styles.educationUniversity}>
                      {edu.institution}
                      {edu.degree && (
                        <span style={styles.educationDegree}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</span>
                      )}
                    </h3>
                    {edu.honors && edu.honors.length > 0 && (
                      <p style={styles.educationDescription}>{edu.honors.join(', ')}</p>
                    )}
                  </div>
                  <div style={styles.educationRight}>
                    {(edu.startDate || edu.endDate) && (
                      <div style={styles.educationDate}>
                        {edu.startDate} — {edu.endDate || 'Present'}
                      </div>
                    )}
                    {edu.location && (
                      <div style={styles.educationLocation}>{edu.location}</div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {hasCertifications && (
          <section>
            <h2 style={styles.sectionTitle}>Certificates</h2>
            <div style={styles.certificatesList}>
              {data.certifications!.map((cert, index) => (
                <React.Fragment key={index}>
                  <span>{cert.name}</span>
                  {index < data.certifications!.length - 1 && (
                    <span style={styles.certificateBullet} aria-hidden="true">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {hasLanguages && (
          <section>
            <h2 style={styles.sectionTitle}>Languages</h2>
            <div style={styles.languagesList}>
              {data.languages!.map((lang, index) => (
                <React.Fragment key={index}>
                  <span style={styles.languageItem}>{lang.name}</span>
                  {lang.proficiency && (
                    <span style={styles.languageLevel}>({lang.proficiency})</span>
                  )}
                  {index < data.languages!.length - 1 && (
                    <span style={styles.languageBullet} aria-hidden="true">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>
        )}

        {data.skillCategories && data.skillCategories.length > 0 && (
          <section>
            <h2 style={styles.sectionTitle}>Skills</h2>
            <div style={styles.skillsGrid}>
              {data.skillCategories.map((skillCategory, index) => (
                <div key={index} style={styles.skillCategory}>
                  <h3 style={styles.skillCategoryTitle}>{skillCategory.category}</h3>
                  <ul style={styles.skillList}>
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} style={styles.skillItem}>
                        <span style={styles.skillDash}>-</span>
                        <span>{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer style={styles.footer}>
          <div style={styles.footerLeft}>
            <img
              alt="Link icon"
              src="https://api.iconify.design/lucide-link.svg?color=%23666666"
              style={styles.footerIcon}
            />
            {data.personal?.linkedIn ? (
              <a href={data.personal.linkedIn} style={styles.footerLink}>
                {data.personal.linkedIn.replace('https://', '')}
              </a>
            ) : (
              <span style={styles.footerLink}>linkedin.com/in/yourprofile</span>
            )}
          </div>
          <div style={styles.footerRight}>
            <span>References available upon request</span>
          </div>
        </footer>
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  cvContainer: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(229, 231, 235)',
    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  leftDecorativeBar: {
    position: 'absolute',
    left: '0',
    top: '0',
    height: '100%',
    width: '45px',
    background: 'linear-gradient(180deg, #1d3b35 0%, #1d3b35 40%, #2d5a4f 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
  },
  leafImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0',
    opacity: '0.9',
    display: 'block',
    mixBlendMode: 'multiply',
    filter: 'grayscale(100%) contrast(1.06) brightness(0.95)',
  },
  mainContent: {
    paddingTop: '30px',
    paddingBottom: '30px',
    paddingRight: '30px',
    paddingLeft: '85px',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
    borderBottom: '1px solid rgb(243, 244, 246)',
    paddingBottom: '1rem',
  },
  headerTextBlock: {
    flex: '1 1 0%',
  },
  name: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '32px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    lineHeight: '1.25',
    margin: '0',
  },
  professionalTitle: {
    marginTop: '0.25rem',
    fontSize: '18px',
    color: 'rgb(29, 59, 53)',
    fontWeight: 400,
    letterSpacing: '0.2px',
  },
  contactRow: {
    marginTop: '0.75rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.25rem',
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
    listStyle: 'none',
    padding: '0',
    margin: '0.75rem 0 0 0',
  },
  contactItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  contactIcon: {
    width: '1rem',
    height: '1rem',
    objectFit: 'contain',
  },
  contactLink: {
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none',
  },
  photoWrapper: {
    flexShrink: 0,
  },
  profilePhoto: {
    width: '100px',
    height: '120px',
    borderRadius: '4px',
    objectFit: 'cover',
  },
  profileSection: {
    marginTop: '1.5rem',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    borderBottom: '2px solid rgb(29, 59, 53)',
    paddingBottom: '6px',
    marginTop: '25px',
    marginBottom: '15px',
  },
  profileText: {
    color: 'rgb(51, 51, 51)',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0',
  },
  experienceList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  experienceItem: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  experienceLeft: {
    flexBasis: '75%',
  },
  experienceCompany: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    margin: '0',
  },
  experiencePosition: {
    marginLeft: '0.5rem',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '14px',
    color: 'rgb(29, 59, 53)',
  },
  experienceDescription: {
    marginTop: '0.25rem',
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    lineHeight: '1.5',
  },
  experienceRight: {
    flexBasis: '25%',
    textAlign: 'right',
  },
  experienceDate: {
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
  },
  experienceLocation: {
    fontSize: '12px',
    color: 'rgb(102, 102, 102)',
  },
  educationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  educationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  educationLeft: {
    flexBasis: '75%',
  },
  educationUniversity: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    margin: '0',
  },
  educationDegree: {
    marginLeft: '0.5rem',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '14px',
    color: 'rgb(29, 59, 53)',
  },
  educationDescription: {
    marginTop: '0.25rem',
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    lineHeight: '1.5',
  },
  educationRight: {
    flexBasis: '25%',
    textAlign: 'right',
  },
  educationDate: {
    fontSize: '12px',
    color: 'rgb(51, 51, 51)',
  },
  educationLocation: {
    fontSize: '12px',
    color: 'rgb(102, 102, 102)',
  },
  certificatesList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: '0.75rem',
    rowGap: '0.5rem',
    fontSize: '13px',
    color: 'rgb(51, 51, 51)',
  },
  certificateBullet: {
    fontSize: '18px',
    lineHeight: '1',
    color: 'rgb(29, 59, 53)',
  },
  languagesList: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: '0.75rem',
    rowGap: '0.25rem',
    fontSize: '13px',
  },
  languageItem: {
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
  },
  languageLevel: {
    color: 'rgb(102, 102, 102)',
  },
  languageBullet: {
    fontSize: '18px',
    lineHeight: '1',
    color: 'rgb(29, 59, 53)',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    columnGap: '2.5rem',
    rowGap: '1.5rem',
  },
  skillCategory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  skillCategoryTitle: {
    fontSize: '13px',
    fontWeight: 700,
    color: 'rgb(0, 0, 0)',
    margin: '0',
  },
  skillList: {
    fontSize: '12px',
    color: 'rgb(68, 68, 68)',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  skillItem: {
    display: 'inline-flex',
  },
  skillDash: {
    marginRight: '0.5rem',
    color: 'rgb(68, 68, 68)',
  },
  footer: {
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgb(243, 244, 246)',
    fontSize: '11px',
    color: 'rgb(102, 102, 102)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  footerIcon: {
    width: '0.875rem',
    height: '0.875rem',
    objectFit: 'contain',
  },
  footerLink: {
    color: 'inherit',
    textDecoration: 'none',
    outline: 'none',
  },
  footerRight: {
    textAlign: 'right',
  },
};
