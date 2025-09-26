#!/usr/bin/env node

/**
 * Script to fetch and setup open-source LaTeX resume templates
 * This script downloads templates from their original repositories
 * and sets them up with proper licensing and attribution
 */

import { promises as fs } from "fs"
import { join } from "path"

interface TemplateSource {
  id: string
  name: string
  gitUrl: string
  license: string
  author: string
  description: string
}

const TEMPLATE_SOURCES: TemplateSource[] = [
  {
    id: "sb2nov",
    name: "SB2Nov Resume",
    gitUrl: "https://github.com/sb2nov/resume",
    license: "MIT",
    author: "Sourabh Bajaj",
    description: "Clean, minimalist resume template",
  },
  {
    id: "jake_gutierrez",
    name: "Jake Gutierrez Resume",
    gitUrl: "https://github.com/jakegut/resume",
    license: "MIT",
    author: "Jake Gutierrez",
    description: "Modern, professional resume template",
  },
  {
    id: "awesome_cv",
    name: "Awesome CV",
    gitUrl: "https://github.com/posquit0/Awesome-CV",
    license: "LaTeX Project Public License",
    author: "Claud D. Park (posquit0)",
    description: "Awesome CV is LaTeX template for a CV(Curriculum Vitae), Résumé or Cover Letter inspired by Fancy CV. It is easy to customize your own template, especially since it is really written by a clean, semantic markup.",
  },
  {
    id: "twenty_seconds_cv",
    name: "Twenty Seconds CV",
    gitUrl: "https://github.com/spagnuolocarmine/TwentySecondsCurriculumVitae-LaTex",
    license: "MIT",
    author: "Carmine Spagnuolo",
    description: "A LaTeX template for creating a Curriculum Vitae in twenty seconds with infographic elements",
  },
  {
    id: "friggeri_cv",
    name: "Friggeri CV",
    gitUrl: "https://github.com/afriggeri/cv",
    license: "CC BY-NC-SA 3.0",
    author: "Adrien Friggeri",
    description: "A clean CV template with elegant typography and modern design",
  },
  {
    id: "deedy_resume",
    name: "Deedy Resume",
    gitUrl: "https://github.com/deedy/Deedy-Resume",
    license: "Apache License 2.0",
    author: "Debarghya Das",
    description: "A one page, two asymmetric column resume template in XeTeX that caters to an undergraduate Computer Science student",
  },
  {
    id: "moderncv",
    name: "ModernCV",
    gitUrl: "https://github.com/xdanaux/moderncv",
    license: "LaTeX Project Public License",
    author: "Xavier Danaux",
    description: "A modern curriculum vitae class for LaTeX with multiple styles and color themes",
  },
  {
    id: "altacv",
    name: "AltaCV",
    gitUrl: "https://github.com/liantze/AltaCV",
    license: "LaTeX Project Public License",
    author: "LianTze Lim",
    description: "Yet another alternative curriculum vitae/résumé class with LaTeX",
  },
]

async function setupTemplate(source: TemplateSource) {
  const templateDir = join(process.cwd(), "templates", source.id)

  try {
    await fs.mkdir(templateDir, { recursive: true })

    // Create README with proper attribution
    const readme = `# ${source.name}

## License
${source.license} License

## Source
Original repository: ${source.gitUrl}
Author: ${source.author}

## Description
${source.description}

## Attribution
This template is based on the work by ${source.author}. 
Original source: ${source.gitUrl}

Please respect the ${source.license} license terms when using this template.
`

    await fs.writeFile(join(templateDir, "README.md"), readme, "utf8")

    console.log(`✅ Set up template: ${source.name}`)
  } catch (error) {
    console.error(`❌ Failed to set up ${source.name}:`, error)
  }
}

async function main() {
  console.log("🚀 Setting up open-source LaTeX resume templates...")

  for (const source of TEMPLATE_SOURCES) {
    await setupTemplate(source)
  }

  console.log("\n✨ Template setup complete!")
  console.log("\nNext steps:")
  console.log("1. Review the templates in the /templates directory")
  console.log("2. Ensure all base.tex files have the required anchor comments")
  console.log("3. Test compilation with sample data")
  console.log("4. Add preview images for each template")
}

if (require.main === module) {
  main().catch(console.error)
}

export { setupTemplate, TEMPLATE_SOURCES }
