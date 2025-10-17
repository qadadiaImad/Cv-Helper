import React from "react";

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  links: { label: string; url: string }[];
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; role: string; period: string; details: string[] }[];
  projects: { title: string; description: string; link?: string }[];
  skills: string[];
};

interface Props {
  data: ResumeData;
}

/* 1. Classic Minimal - PDF Compatible Styles */
export const ClassicMinimal: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontFamily: 'serif',
    padding: '32px',
    maxWidth: '800px',
    margin: '0 auto',
    fontSize: '12px',
    lineHeight: '1.4'
  }}>
    <header style={{borderBottom: '1px solid #cccccc', paddingBottom: '16px', marginBottom: '24px'}}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '8px'}}>{data.name}</h1>
      <p style={{fontSize: '12px', marginBottom: '4px'}}>{data.email} | {data.phone}</p>
      <div style={{display: 'flex', gap: '16px', fontSize: '12px', color: '#2563eb'}}>
        {data.links.map((link, idx) => (
          <a key={idx} href={link.url} style={{textDecoration: 'underline'}}>{link.label}</a>
        ))}
      </div>
    </header>
    <main style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px'}}>
      <aside style={{borderRight: '1px solid #cccccc', paddingRight: '16px'}}>
        <h2 style={{fontWeight: 'bold', marginBottom: '8px'}}>Compétences</h2>
        <ul style={{listStyleType: 'disc', marginLeft: '16px', fontSize: '12px'}}>{data.skills.map((s,i)=><li key={i}>{s}</li>)}</ul>
        <h2 style={{fontWeight: 'bold', marginTop: '24px', marginBottom: '8px'}}>Éducation</h2>
        {data.education.map((edu,i)=>(
          <div key={i} style={{marginBottom: '8px', fontSize: '12px'}}>
            <p style={{fontWeight: '600'}}>{edu.degree}</p>
            <p>{edu.school} — {edu.year}</p>
          </div>
        ))}
      </aside>
      <section style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div>
          <h2 style={{fontWeight: 'bold', marginBottom: '8px'}}>Expériences</h2>
          {data.experience.map((exp,i)=>(
            <div key={i} style={{marginBottom: '16px'}}>
              <p style={{fontWeight: '600'}}>{exp.role} — {exp.company}</p>
              <p style={{fontSize: '12px', color: '#666666'}}>{exp.period}</p>
              <ul style={{listStyleType: 'disc', marginLeft: '20px', fontSize: '12px'}}>{exp.details.map((d,j)=><li key={j}>{d}</li>)}</ul>
            </div>
          ))}
        </div>
        <div>
          <h2 style={{fontWeight: 'bold', marginBottom: '8px'}}>Projets</h2>
          {data.projects.map((proj,i)=>(
            <div key={i} style={{marginBottom: '12px'}}>
              <p style={{fontWeight: '600'}}>{proj.title}</p>
              <p style={{fontSize: '12px'}}>{proj.description}</p>
              {proj.link && <a href={proj.link} style={{color: '#2563eb', fontSize: '12px', textDecoration: 'underline'}}>{proj.link}</a>}
            </div>
          ))}
        </div>
      </section>
    </main>
  </div>
);

/* 2. Modern Blue - PDF Compatible Styles */
export const ModernBlue: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    backgroundColor: '#f9fafb',
    color: '#111827',
    fontFamily: 'sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }}>
    <header style={{
      backgroundColor: '#1d4ed8',
      color: '#ffffff',
      padding: '24px'
    }}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold'}}>{data.name}</h1>
      <p style={{marginTop: '8px'}}>{data.email} | {data.phone}</p>
    </header>
    <main style={{padding: '24px'}}>
      <section style={{marginBottom: '24px'}}>
        <h2 style={{color: '#1d4ed8', fontWeight: 'bold', marginBottom: '16px'}}>Expériences</h2>
        {data.experience.map((exp,i)=>(
          <div key={i} style={{marginBottom: '16px'}}>
            <p style={{fontWeight: '600'}}>{exp.role} — {exp.company}</p>
            <p style={{fontSize: '12px', color: '#6b7280'}}>{exp.period}</p>
            <ul style={{listStyleType: 'disc', marginLeft: '20px', fontSize: '12px'}}>
              {exp.details.map((d,j)=><li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h2 style={{color: '#1d4ed8', fontWeight: 'bold', marginBottom: '16px'}}>Projets</h2>
        {data.projects.map((proj,i)=>(
          <div key={i} style={{marginBottom: '12px'}}>
            <p style={{fontWeight: '600'}}>{proj.title}</p>
            <p style={{fontSize: '12px'}}>{proj.description}</p>
          </div>
        ))}
      </section>
    </main>
  </div>
);

/* 3. Creative Gradient - PDF Compatible Styles */
export const CreativeGradient: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: '#ffffff',
    padding: '32px',
    maxWidth: '800px',
    margin: '0 auto'
  }}>
    <header style={{marginBottom: '24px'}}>
      <h1 style={{fontSize: '32px', fontWeight: 'bold'}}>{data.name}</h1>
      <p style={{fontSize: '12px', marginTop: '8px'}}>{data.email} | {data.phone}</p>
    </header>
    <section>
      <h2 style={{fontWeight: 'bold', fontSize: '18px', marginBottom: '16px'}}>Timeline Expériences</h2>
      <ul style={{
        borderLeft: '1px solid #ffffff',
        paddingLeft: '16px',
        listStyle: 'none',
        margin: 0
      }}>
        {data.experience.map((exp,i)=>(
          <li key={i} style={{marginBottom: '16px'}}>
            <p style={{fontWeight: '600'}}>{exp.role}</p>
            <p style={{fontSize: '12px'}}>{exp.company} ({exp.period})</p>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

/* 4. Elegant Black - PDF Compatible Styles */
export const ElegantBlack: React.FC<Props> = ({ data }) => (
  <div style={{
    backgroundColor: '#171717',
    color: '#ffffff',
    padding: '32px',
    maxWidth: '800px',
    margin: '0 auto'
  }}>
    <header style={{
      borderBottom: '1px solid #404040',
      paddingBottom: '16px',
      marginBottom: '24px'
    }}>
      <h1 style={{fontSize: '28px', fontWeight: 'bold'}}>{data.name}</h1>
      <p style={{marginTop: '4px'}}>{data.email} | {data.phone}</p>
    </header>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
      <aside>
        <h2 style={{fontWeight: 'bold', marginBottom: '12px'}}>Compétences</h2>
        <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
          {data.skills.map((s,i)=>(
            <li key={i} style={{marginBottom: '4px'}}>• {s}</li>
          ))}
        </ul>
      </aside>
      <main>
        {data.experience.map((exp,i)=>(
          <div key={i} style={{marginBottom: '16px'}}>
            <p style={{fontWeight: '600'}}>{exp.role} — {exp.company}</p>
            <p style={{fontSize: '12px'}}>{exp.period}</p>
          </div>
        ))}
      </main>
    </div>
  </div>
);

/* 5. Compact Cards */
export const CompactCards: React.FC<Props> = ({ data }) => (
  <div className="bg-gray-100 p-6 grid gap-4 md:grid-cols-2">
    {data.experience.map((exp,i)=>(
      <div key={i} className="bg-white p-4 rounded shadow">
        <p className="font-semibold">{exp.role} — {exp.company}</p>
        <p className="text-sm text-gray-600">{exp.period}</p>
      </div>
    ))}
    {data.projects.map((proj,i)=>(
      <div key={i} className="bg-white p-4 rounded shadow">
        <p className="font-semibold">{proj.title}</p>
        <p className="text-sm">{proj.description}</p>
      </div>
    ))}
  </div>
);

/* 6. Timeline Modern */
export const TimelineModern: React.FC<Props> = ({ data }) => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">{data.name}</h1>
    <div className="flex overflow-x-auto space-x-8">
      {data.experience.map((exp,i)=>(
        <div key={i} className="min-w-[200px] border-t-4 border-blue-500 pt-2">
          <p className="font-semibold">{exp.role}</p>
          <p className="text-sm">{exp.company}</p>
        </div>
      ))}
    </div>
  </div>
);

/* 7. Corporate Clean */
export const CorporateClean: React.FC<Props> = ({ data }) => (
  <div className="bg-white border p-8 max-w-4xl mx-auto">
    <header className="border-b pb-4 mb-4">
      <h1 className="text-2xl font-bold text-blue-900">{data.name}</h1>
      <p>{data.email} | {data.phone}</p>
    </header>
    <main className="space-y-4">
      {data.experience.map((exp,i)=>(
        <div key={i}>
          <p className="font-semibold">{exp.role} — {exp.company}</p>
          <p className="text-sm">{exp.period}</p>
        </div>
      ))}
    </main>
  </div>
);

/* 8. Lofi Minimal */
export const LofiMinimal: React.FC<Props> = ({ data }) => (
  <div className="bg-white text-black font-mono p-8 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
    <section className="mb-6">
      <h2 className="text-lg font-bold">Compétences</h2>
      <p className="text-sm">{data.skills.join(", ")}</p>
    </section>
    <section>
      <h2 className="text-lg font-bold">Expériences</h2>
      {data.experience.map((exp,i)=>(
        <p key={i} className="text-sm">{exp.role} @ {exp.company} ({exp.period})</p>
      ))}
    </section>
  </div>
);

/* 9. Color Blocks */
export const ColorBlocks: React.FC<Props> = ({ data }) => (
  <div className="max-w-4xl mx-auto">
    <header className="bg-red-500 text-white p-4">
      <h1 className="text-2xl font-bold">{data.name}</h1>
    </header>
    <section className="bg-green-500 text-white p-4">
      <h2 className="font-bold">Compétences</h2>
      <p>{data.skills.join(", ")}</p>
    </section>
    <section className="bg-blue-500 text-white p-4">
      <h2 className="font-bold">Projets</h2>
      {data.projects.map((proj,i)=>(
        <p key={i}>{proj.title} — {proj.description}</p>
      ))}
    </section>
  </div>
);

/* 10. European Standard */
export const EuropeanStandard: React.FC<Props> = ({ data }) => (
  <div className="border max-w-4xl mx-auto p-6 font-sans">
    <header className="flex gap-6 mb-6">
      <div className="w-24 h-24 bg-gray-300" />
      <div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <p>{data.email} | {data.phone}</p>
      </div>
    </header>
    <section>
      <h2 className="font-bold border-b mb-2">Expériences</h2>
      {data.experience.map((exp,i)=>(
        <div key={i} className="mb-2">
          <p className="font-semibold">{exp.role} — {exp.company}</p>
          <p className="text-sm">{exp.period}</p>
        </div>
      ))}
    </section>
  </div>
);

/* 11. Responsive Professional */
export const ResponsiveProfessional: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    backgroundColor: '#ffffff',
    fontFamily: 'Raleway, sans-serif',
    display: 'flex',
    minHeight: '100vh'
  }}>
    <div style={{
      width: '40%',
      backgroundColor: '#fff',
      padding: '60px 40px',
      color: '#9099a0'
    }}>
      <div style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        backgroundColor: '#4a4e51',
        margin: '0 auto 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: '#fff', fontSize: '48px', fontWeight: 'bold' }}>
          {data.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <h1 style={{
        fontSize: '2.5em',
        fontFamily: 'Montserrat, sans-serif',
        color: '#4a4e51',
        fontWeight: 700,
        textTransform: 'uppercase',
        marginBottom: '20px'
      }}>{data.name}</h1>
      <div style={{ marginTop: '40px' }}>
        <p style={{ marginBottom: '8px' }}><strong>Email:</strong> {data.email}</p>
        <p style={{ marginBottom: '8px' }}><strong>Phone:</strong> {data.phone}</p>
      </div>
    </div>
    <div style={{
      width: '60%',
      backgroundColor: '#3d3e42',
      padding: '60px 40px',
      color: '#9099a0'
    }}>
      <h2 style={{ color: 'white', marginBottom: '20px', fontSize: '1.8em' }}>Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '30px', borderBottom: '1px solid #525252', paddingBottom: '30px' }}>
          <h3 style={{ color: 'white', marginBottom: '8px' }}>{exp.role}</h3>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>{exp.company} | {exp.period}</p>
          <ul style={{ listStyle: 'disc', marginLeft: '20px', fontSize: '14px' }}>
            {exp.details.map((d, j) => <li key={j}>{d}</li>)}
          </ul>
        </div>
      ))}
      <h2 style={{ color: 'white', marginTop: '40px', marginBottom: '20px', fontSize: '1.8em' }}>Skills</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {data.skills.map((skill, i) => (
          <span key={i} style={{
            backgroundColor: '#525252',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px'
          }}>{skill}</span>
        ))}
      </div>
    </div>
  </div>
);

/* 12. Simple Elegant */
export const SimpleElegant: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '60px 80px',
    fontFamily: 'Lato, sans-serif'
  }}>
    <header style={{
      marginBottom: '60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }}>
      <div>
        <h1 style={{
          fontSize: '4.2rem',
          fontWeight: 900,
          textTransform: 'uppercase',
          textShadow: '4px 4px 0 #6fd1bd',
          marginBottom: '20px'
        }}>{data.name}</h1>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p>{data.email}</p>
        <p>{data.phone}</p>
      </div>
    </header>
    
    <section style={{
      marginTop: '60px',
      borderTop: '1px solid #ddd',
      paddingTop: '40px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: 0,
        borderTop: '5px solid #333',
        width: '50px'
      }} />
      <h2 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: '20px' }}>Experience</h2>
      {data.experience.map((exp, i) => (
        <div key={i} style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 600 }}>{exp.role}</h3>
          <p style={{ color: '#666', marginBottom: '8px' }}>{exp.company} | {exp.period}</p>
          <ul style={{ listStyle: 'disc', marginLeft: '20px' }}>
            {exp.details.map((d, j) => <li key={j}>{d}</li>)}
          </ul>
        </div>
      ))}
    </section>
    
    <section style={{
      marginTop: '60px',
      borderTop: '1px solid #ddd',
      paddingTop: '40px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: 0,
        borderTop: '5px solid #333',
        width: '50px'
      }} />
      <h2 style={{ fontWeight: 900, fontSize: '2rem', marginBottom: '20px' }}>Skills</h2>
      <p>{data.skills.join(' • ')}</p>
    </section>
  </div>
);

/* 13. RWD Modern */
export const RWDModern: React.FC<Props> = ({ data }) => (
  <div style={{
    width: '100%',
    maxWidth: '1000px',
    margin: '40px auto',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'Roboto, sans-serif'
  }}>
    <div style={{
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: '#ffffff',
      padding: '60px 40px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '120px',
        height: '120px',
        margin: '0 auto 20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        fontWeight: 'bold'
      }}>
        {data.name.split(' ').map(n => n[0]).join('')}
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '8px' }}>{data.name}</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', flexWrap: 'wrap' }}>
        <span>📧 {data.email}</span>
        <span>📱 {data.phone}</span>
      </div>
    </div>
    
    <div style={{ padding: '40px' }}>
      <section style={{ marginBottom: '40px' }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#3b82f6',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '2px solid #3b82f6'
        }}>Experience</h3>
        {data.experience.map((exp, i) => (
          <div key={i} style={{
            marginBottom: '25px',
            paddingLeft: '20px',
            borderLeft: '2px solid #e5e7eb',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: '-6px',
              top: '5px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6'
            }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '5px' }}>{exp.role}</h4>
            <p style={{ color: '#6b7280', marginBottom: '10px' }}>{exp.company} | {exp.period}</p>
          </div>
        ))}
      </section>
      
      <section>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#3b82f6',
          marginBottom: '20px',
          paddingBottom: '10px',
          borderBottom: '2px solid #3b82f6'
        }}>Skills</h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          {data.skills.map((skill, i) => (
            <div key={i}>
              <div style={{ fontWeight: 500, marginBottom: '8px' }}>{skill}</div>
              <div style={{
                height: '8px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${90 - i * 5}%`,
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

// Export template registry
export const REACT_TEMPLATES = {
  classic_minimal: ClassicMinimal,
  modern_blue: ModernBlue,
  creative_gradient: CreativeGradient,
  elegant_black: ElegantBlack,
  compact_cards: CompactCards,
  timeline_modern: TimelineModern,
  corporate_clean: CorporateClean,
  lofi_minimal: LofiMinimal,
  color_blocks: ColorBlocks,
  european_standard: EuropeanStandard,
  responsive_professional: ResponsiveProfessional,
  simple_elegant: SimpleElegant,
  rwd_modern: RWDModern,
};

export type TemplateId = keyof typeof REACT_TEMPLATES;
export type { ResumeData };
