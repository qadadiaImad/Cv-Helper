"""
Batch Template Extractor - CodePen to CV-Helper
Extracts HTML/CSS from CodePen templates using Playwright
"""

import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright
import json
from datetime import datetime

# Template URLs to scrape
TEMPLATES = [
    {
        "name": "responsive-professional",
        "url": "https://codepen.io/mariosmaselli/pen/CDcmb",
        "author": "Mario Maselli",
        "category": "Modern",
        "tier": 1
    },
    {
        "name": "simple-html-resume",
        "url": "https://codepen.io/sonjastrieder/pen/XpYByr",
        "author": "Sonja Strieder",
        "category": "Minimal",
        "tier": 1
    },
    {
        "name": "minimal-css-resume",
        "url": "https://codepen.io/mavrK/pen/PzGvdJ",
        "author": "mavrK",
        "category": "Minimal",
        "tier": 1
    },
    {
        "name": "bootstrap4-resume",
        "url": "https://codepen.io/vrbait1107/pen/zYxWLBZ",
        "author": "vrbait1107",
        "category": "Modern",
        "tier": 1
    },
    {
        "name": "profile-template",
        "url": "https://codepen.io/jewel998/pen/PgydGj",
        "author": "Jyotirmoy Barman",
        "category": "Profile",
        "tier": 1
    },
    {
        "name": "dark-theme-resume",
        "url": "https://codepen.io/Ayon95/pen/OJyxJQy",
        "author": "Ayon95",
        "category": "Creative",
        "tier": 2
    },
    {
        "name": "pure-css-hover",
        "url": "https://codepen.io/chandrikadeb7/pen/jOWzPNd",
        "author": "Chandrika Deb",
        "category": "Creative",
        "tier": 2
    },
    {
        "name": "rwd-resume",
        "url": "https://codepen.io/chih-hsi-chen/pen/KKpXLqR",
        "author": "Chih Hsi Chen",
        "category": "Modern",
        "tier": 2
    },
    {
        "name": "resume-concept",
        "url": "https://codepen.io/bphillips201/pen/xGcEI",
        "author": "bphillips201",
        "category": "Creative",
        "tier": 2
    },
    {
        "name": "education-timeline",
        "url": "https://codepen.io/eugene-robb/pen/xBxReQ",
        "author": "Eugene Robb",
        "category": "Timeline",
        "tier": 3
    },
    {
        "name": "thiago-braga-resume",
        "url": "https://codepen.io/thiagobraga/pen/areqqr",
        "author": "Thiago Braga",
        "category": "Modern",
        "tier": 3
    },
    {
        "name": "header-background",
        "url": "https://codepen.io/Gothburz/pen/YyLMVx",
        "author": "Gothburz",
        "category": "Creative",
        "tier": 3
    },
    {
        "name": "html-css-resume",
        "url": "https://codepen.io/astronaomical/pen/KexYgb",
        "author": "astronaomical",
        "category": "Classic",
        "tier": 3
    },
    {
        "name": "sample-resume",
        "url": "https://codepen.io/knaman2609/pen/Zbyjvv",
        "author": "knaman2609",
        "category": "Modern",
        "tier": 4
    },
    {
        "name": "html-resume-laighlin",
        "url": "https://codepen.io/Laighlin/pen/WgaYLw",
        "author": "Laighlin",
        "category": "Classic",
        "tier": 4
    },
    {
        "name": "cv-russian",
        "url": "https://codepen.io/twisterblog/pen/JjjRBKE",
        "author": "twisterblog",
        "category": "International",
        "tier": 4
    },
    {
        "name": "personal-portfolio",
        "url": "https://codepen.io/Pavan_Ramshetty/pen/KYLPzq",
        "author": "Pavan Ramshetty",
        "category": "Portfolio",
        "tier": 4
    }
]

class TemplateExtractor:
    def __init__(self, output_dir="scraped-templates"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.results = []
        
    async def extract_code_from_codepen(self, page, url):
        """Extract HTML and CSS code from CodePen"""
        try:
            # Navigate to CodePen URL
            await page.goto(url, wait_until="networkidle", timeout=30000)
            await asyncio.sleep(2)  # Wait for editors to load
            
            # Extract HTML
            html_code = ""
            try:
                # Click on first HTML line to focus
                await page.locator(".CodeMirror-line").first.click(timeout=5000)
                await asyncio.sleep(0.5)
                
                # Select all HTML code
                await page.keyboard.press("Control+a")
                await asyncio.sleep(0.5)
                
                # Extract HTML from textarea
                html_code = await page.evaluate("""
                    () => {
                        const htmlEditor = document.querySelector('textarea[aria-label="HTML Code Editor"]');
                        return htmlEditor ? htmlEditor.value : '';
                    }
                """)
            except Exception as e:
                print(f"  ⚠️  HTML extraction failed: {str(e)}")
            
            # Extract CSS
            css_code = ""
            try:
                # Click on first CSS line to focus
                css_selectors = [
                    'text=/^\\d+.*{/',  # Line starting with number and containing {
                    '.editor-resizer-css .CodeMirror-line'
                ]
                
                for selector in css_selectors:
                    try:
                        await page.locator(selector).first.click(timeout=3000)
                        break
                    except:
                        continue
                
                await asyncio.sleep(0.5)
                
                # Select all CSS code
                await page.keyboard.press("Control+a")
                await asyncio.sleep(0.5)
                
                # Extract CSS from textarea
                css_code = await page.evaluate("""
                    () => {
                        const cssEditor = document.querySelector('textarea[aria-label="CSS Code Editor"]');
                        return cssEditor ? cssEditor.value : '';
                    }
                """)
            except Exception as e:
                print(f"  ⚠️  CSS extraction failed: {str(e)}")
            
            return {
                "html": html_code.strip(),
                "css": css_code.strip(),
                "success": bool(html_code or css_code)
            }
            
        except Exception as e:
            print(f"  ❌ Error extracting from {url}: {str(e)}")
            return {"html": "", "css": "", "success": False, "error": str(e)}
    
    def save_template(self, template_info, code_data):
        """Save extracted template to markdown file"""
        filename = f"{template_info['name']}-complete.md"
        filepath = self.output_dir / filename
        
        content = f"""# {template_info['name'].replace('-', ' ').title()}

**Source:** {template_info['url']}  
**Author:** {template_info['author']}  
**Category:** {template_info['category']}  
**Tier:** {template_info['tier']}  
**Extraction Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}  
**Status:** {'✅ Successfully Extracted' if code_data['success'] else '❌ Extraction Failed'}

---

## ✅ HTML Code

```html
{code_data['html']}
```

---

## ✅ CSS Code

```css
{code_data['css']}
```

---

## 📊 Extraction Stats

- **HTML Lines:** {len(code_data['html'].split(chr(10))) if code_data['html'] else 0}
- **CSS Lines:** {len(code_data['css'].split(chr(10))) if code_data['css'] else 0}
- **Total Characters:** {len(code_data['html']) + len(code_data['css'])}

---

## 🔄 Next Steps

1. Convert HTML to React component
2. Map data fields to CVData interface
3. Convert CSS to Tailwind classes
4. Add to template library
5. Test and deploy
"""
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return filepath
    
    async def extract_all(self, headless=True, max_concurrent=3):
        """Extract all templates with concurrency control"""
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=headless)
            context = await browser.new_context()
            
            print(f"🚀 Starting extraction of {len(TEMPLATES)} templates...")
            print(f"📁 Output directory: {self.output_dir.absolute()}\n")
            
            # Process templates in batches to avoid overwhelming the browser
            for i in range(0, len(TEMPLATES), max_concurrent):
                batch = TEMPLATES[i:i + max_concurrent]
                tasks = []
                
                for template in batch:
                    page = await context.new_page()
                    tasks.append(self.process_template(page, template))
                
                # Wait for batch to complete
                await asyncio.gather(*tasks)
            
            await browser.close()
            
            # Print summary
            self.print_summary()
    
    async def process_template(self, page, template):
        """Process a single template"""
        print(f"📥 Extracting: {template['name']}")
        print(f"   URL: {template['url']}")
        
        try:
            code_data = await self.extract_code_from_codepen(page, template['url'])
            
            if code_data['success']:
                filepath = self.save_template(template, code_data)
                print(f"   ✅ Saved to: {filepath.name}")
                
                self.results.append({
                    "template": template['name'],
                    "status": "success",
                    "html_lines": len(code_data['html'].split('\n')) if code_data['html'] else 0,
                    "css_lines": len(code_data['css'].split('\n')) if code_data['css'] else 0
                })
            else:
                print(f"   ❌ Extraction failed")
                self.results.append({
                    "template": template['name'],
                    "status": "failed",
                    "error": code_data.get('error', 'Unknown error')
                })
        
        except Exception as e:
            print(f"   ❌ Error: {str(e)}")
            self.results.append({
                "template": template['name'],
                "status": "error",
                "error": str(e)
            })
        
        finally:
            await page.close()
        
        print()  # Empty line for readability
    
    def print_summary(self):
        """Print extraction summary"""
        print("\n" + "="*60)
        print("📊 EXTRACTION SUMMARY")
        print("="*60)
        
        successful = [r for r in self.results if r['status'] == 'success']
        failed = [r for r in self.results if r['status'] != 'success']
        
        print(f"\n✅ Successful: {len(successful)}/{len(TEMPLATES)}")
        print(f"❌ Failed: {len(failed)}/{len(TEMPLATES)}")
        
        if successful:
            print("\n✅ Successfully Extracted:")
            for result in successful:
                print(f"   • {result['template']}: {result['html_lines']} HTML lines, {result['css_lines']} CSS lines")
        
        if failed:
            print("\n❌ Failed Extractions:")
            for result in failed:
                error_msg = result.get('error', 'Unknown error')
                print(f"   • {result['template']}: {error_msg}")
        
        # Save results to JSON
        results_file = self.output_dir / "extraction_results.json"
        with open(results_file, 'w', encoding='utf-8') as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "total": len(TEMPLATES),
                "successful": len(successful),
                "failed": len(failed),
                "results": self.results
            }, f, indent=2)
        
        print(f"\n📄 Results saved to: {results_file}")
        print("\n" + "="*60)

async def main():
    """Main execution function"""
    extractor = TemplateExtractor(output_dir="scraped-templates")
    
    # Run extraction (headless=False to see browser, True for background)
    await extractor.extract_all(headless=False, max_concurrent=2)

if __name__ == "__main__":
    print("""
╔══════════════════════════════════════════════════════════╗
║   CodePen Template Batch Extractor for CV-Helper        ║
║   Powered by Playwright                                  ║
╚══════════════════════════════════════════════════════════╝
    """)
    
    asyncio.run(main())
