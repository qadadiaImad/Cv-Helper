/**
 * TEMPLATE 19: DOUBLE COLUMN
 * Smart hybrid generation: extracted styles + proper data binding
 * Layout: two-column-asymmetric
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'

export const DoubleColumnTemplate: React.FC<UniversalTemplateProps> = ({ data }) => (
  <div style={{
    width: '850px',
    minHeight: '1200px',
    background: 'linear-gradient(135deg, #E8F4F8 0%, #B8D4E8 100%)',
    padding: '60px',
    display: 'flex',
    gap: '30px',
  }}>
    {/* Left Column */}
    <div style={{ 
      flex: '60%',
      background: 'transparent',
      padding: '0',
    }}>
      {/* Header */}
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '34px',
          fontWeight: '500',
          fontFamily: 'Rubik, Arial, sans-serif',
          textTransform: 'uppercase',
          color: '#000000',
          marginBottom: '8px',
        }}>
          {data.personal.fullName}
        </h1>
        {data.personal.title && (
          <h2 style={{
            fontSize: '17px',
            fontWeight: '500',
            fontFamily: 'Rubik, Arial, sans-serif',
            color: '#1E90FF',
            marginBottom: '16px',
          }}>
            {data.personal.title}
          </h2>
        )}
        <div style={{ fontSize: '12px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.personal.email && <span>📧 {data.personal.email}</span>}
          {data.personal.linkedIn && <span>🔗 {data.personal.linkedIn}</span>}
          {data.personal.location && <span>📍 {data.personal.location}</span>}
        </div>
      </header>

      
      {/* Summary */}
      {data.summary && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: 'Rubik, Arial, sans-serif',
            textTransform: 'uppercase',
            borderBottom: '3px solid #000',
            paddingBottom: '6px',
            marginBottom: '12px',
          }}>
            Summary
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333' }}>
            {data.summary}
          </p>
        </section>
      )}
      

      
      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: 'Rubik, Arial, sans-serif',
            textTransform: 'uppercase',
            borderBottom: '3px solid #000',
            paddingBottom: '6px',
            marginBottom: '12px',
          }}>
            Experience
          </h3>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                {exp.position}
              </div>
              <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                {exp.company}
              </div>
              {exp.description && (
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#555', marginTop: '4px' }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      

      
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: 'Rubik, Arial, sans-serif',
            textTransform: 'uppercase',
            borderBottom: '3px solid #000',
            paddingBottom: '6px',
            marginBottom: '12px',
          }}>
            Education
          </h3>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: '#000' }}>
                {edu.degree}
              </div>
              <div style={{ fontSize: '14px', color: '#1E90FF' }}>
                {edu.institution}
              </div>
            </div>
          ))}
        </section>
      )}
      
    </div>

    {/* Right Column */}
    <div style={{ 
      flex: '40%',
      background: 'transparent',
      padding: '0',
      color: '#000000',
    }}>
      
      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: 'Rubik, Arial, sans-serif',
            textTransform: 'uppercase',
            borderBottom: '3px solid currentColor',
            paddingBottom: '6px',
            marginBottom: '12px',
          }}>
            Skills
          </h3>
          <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
            {data.skills.join(' • ')}
          </div>
        </section>
      )}
      

      
      {/* Key Achievements */}
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '500',
          fontFamily: 'Rubik, Arial, sans-serif',
          textTransform: 'uppercase',
          borderBottom: '3px solid currentColor',
          paddingBottom: '6px',
          marginBottom: '12px',
        }}>
          Key Achievements
        </h3>
        <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
          <p>• Achievement 1</p>
          <p>• Achievement 2</p>
        </div>
      </section>
      

      
      {/* Languages */}
      <section style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '500',
          fontFamily: 'Rubik, Arial, sans-serif',
          textTransform: 'uppercase',
          borderBottom: '3px solid currentColor',
          paddingBottom: '6px',
          marginBottom: '12px',
        }}>
          Languages
        </h3>
        <div style={{ fontSize: '13px' }}>
          <div>English - Advanced</div>
          <div>Spanish - Intermediate</div>
        </div>
      </section>
      
    </div>
  </div>
)
