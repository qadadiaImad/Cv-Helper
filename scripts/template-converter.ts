/**
 * Template Converter Utility
 * Helps convert HTML/CSS templates from CodePen to React components
 * 
 * Usage:
 * 1. Download template from CodePen (Export .zip)
 * 2. Extract files
 * 3. Run: npx tsx scripts/template-converter.ts <template-name> <html-file> <css-file>
 */

import fs from 'fs'
import path from 'path'

interface TemplateConfig {
  name: string
  htmlPath: string
  cssPath: string
  outputPath: string
}

class TemplateConverter {
  private config: TemplateConfig

  constructor(config: TemplateConfig) {
    this.config = config
  }

  /**
   * Read HTML file and extract structure
   */
  private readHTML(): string {
    const htmlPath = path.resolve(this.config.htmlPath)
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found: ${htmlPath}`)
    }
    return fs.readFileSync(htmlPath, 'utf-8')
  }

  /**
   * Read CSS file
   */
  private readCSS(): string {
    const cssPath = path.resolve(this.config.cssPath)
    if (!fs.existsSync(cssPath)) {
      throw new Error(`CSS file not found: ${cssPath}`)
    }
    return fs.readFileSync(cssPath, 'utf-8')
  }

  /**
   * Convert HTML class names to camelCase for React
   */
  private convertClassNames(html: string): string {
    // Convert class="..." to className="..."
    return html.replace(/class=/g, 'className=')
  }

  /**
   * Extract data placeholders from HTML
   */
  private extractDataFields(html: string): string[] {
    const fields: string[] = []
    
    // Common patterns to identify data fields
    const patterns = [
      /John\s+Anderson/gi,
      /j\.anderson@gmail\.com/gi,
      /\+\d+\s+\d+\s+\d+\s+\d+/g,
      /Company\s+name/gi,
      /Front\s+End\s+Developer/gi,
      /Lorem\s+ipsum/gi,
    ]

    patterns.forEach(pattern => {
      const matches = html.match(pattern)
      if (matches) {
        fields.push(...matches)
      }
    })

    return [...new Set(fields)]
  }

  /**
   * Generate React component template
   */
  private generateReactComponent(html: string, css: string): string {
    const componentName = this.config.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

    // Convert HTML to JSX
    const jsx = this.convertClassNames(html)

    // Extract CSS and convert to CSS module or inline styles
    const cssModule = this.generateCSSModule(css)

    const component = `import type { ResumeData } from '../react-templates'

export function ${componentName}({ data }: { data: ResumeData }) {
  return (
    <div className="${this.config.name}-wrapper">
      {/* TODO: Map data fields to component */}
      {/* Original HTML structure: */}
      ${jsx}
    </div>
  )
}

// CSS Module (convert to Tailwind or keep as CSS)
const styles = \`
${cssModule}
\`
`

    return component
  }

  /**
   * Generate CSS module from original CSS
   */
  private generateCSSModule(css: string): string {
    // Clean up CSS and prepare for React
    return css
      .replace(/@import\s+url\([^)]+\);/g, '') // Remove @import
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .trim()
  }

  /**
   * Generate data mapping guide
   */
  private generateMappingGuide(dataFields: string[]): string {
    return `
/**
 * Data Mapping Guide for ${this.config.name}
 * 
 * Identified placeholders to replace:
 * ${dataFields.map(field => `- "${field}"`).join('\n * ')}
 * 
 * CVData interface mapping:
 * - data.name → Full name
 * - data.email → Email address
 * - data.phone → Phone number
 * - data.location → Location/address
 * - data.summary → Professional summary
 * - data.experience → Array of work experience
 * - data.education → Array of education
 * - data.skills → Array of skills
 * - data.projects → Array of projects
 * - data.links → Social/web links
 */
`
  }

  /**
   * Main conversion process
   */
  public convert(): void {
    console.log(`🔄 Converting template: ${this.config.name}`)

    try {
      // Read files
      const html = this.readHTML()
      const css = this.readCSS()

      // Extract data fields
      const dataFields = this.extractDataFields(html)
      console.log(`📊 Found ${dataFields.length} data placeholders`)

      // Generate React component
      const component = this.generateReactComponent(html, css)
      const mappingGuide = this.generateMappingGuide(dataFields)

      // Write output files
      const outputDir = path.dirname(this.config.outputPath)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      fs.writeFileSync(this.config.outputPath, component)
      fs.writeFileSync(
        this.config.outputPath.replace('.tsx', '-mapping.md'),
        mappingGuide
      )

      console.log(`✅ Component created: ${this.config.outputPath}`)
      console.log(`📝 Mapping guide: ${this.config.outputPath.replace('.tsx', '-mapping.md')}`)
      console.log(`\n⚠️  Next steps:`)
      console.log(`1. Review the generated component`)
      console.log(`2. Map data fields using the mapping guide`)
      console.log(`3. Convert CSS to Tailwind classes`)
      console.log(`4. Test the component`)
      console.log(`5. Add to lib/react-templates.tsx`)

    } catch (error) {
      console.error(`❌ Error converting template:`, error)
      process.exit(1)
    }
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2)

  if (args.length < 3) {
    console.log(`
Template Converter Utility

Usage:
  npx tsx scripts/template-converter.ts <template-name> <html-file> <css-file>

Example:
  npx tsx scripts/template-converter.ts responsive-professional ./downloads/index.html ./downloads/style.css

Arguments:
  template-name  : Name for the template (kebab-case)
  html-file      : Path to HTML file
  css-file       : Path to CSS file

Output:
  - lib/templates/<template-name>.tsx
  - lib/templates/<template-name>-mapping.md
    `)
    process.exit(1)
  }

  const [templateName, htmlPath, cssPath] = args
  const outputPath = path.join(
    process.cwd(),
    'lib',
    'templates',
    `${templateName}.tsx`
  )

  const converter = new TemplateConverter({
    name: templateName,
    htmlPath,
    cssPath,
    outputPath,
  })

  converter.convert()
}

// Run if called directly
if (require.main === module) {
  main()
}

export { TemplateConverter }
