# 📁 Styled Templates Collection

**Purpose:** Manual paste destination for HTML/CSS/JS from CodePen templates

**Total Templates:** 18

---

## 📋 Template List

### **Tier 1: Professional (5 templates)**

1. **01-responsive-professional**
   - Source: https://codepen.io/mariosmaselli/pen/CDcmb
   - Author: Mario Maselli
   - Category: Modern

2. **02-simple-html-resume**
   - Source: https://codepen.io/sonjastrieder/pen/XpYByr
   - Author: Sonja Strieder
   - Category: Minimal

3. **03-draco-github**
   - Source: https://github.com/afnizarnur/draco
   - Author: Afnizar Nur Ghifari
   - Category: Modern
   - Note: GitHub repo, not CodePen

4. **04-minimal-css-resume**
   - Source: https://codepen.io/mavrK/pen/PzGvdJ
   - Author: mavrK
   - Category: Minimal

5. **05-bootstrap4-resume**
   - Source: https://codepen.io/vrbait1107/pen/zYxWLBZ
   - Author: vrbait1107
   - Category: Modern

### **Tier 2: Creative (4 templates)**

6. **06-dark-theme-resume**
   - Source: https://codepen.io/Ayon95/pen/OJyxJQy
   - Author: Ayon95
   - Category: Creative

7. **07-resume-concept**
   - Source: https://codepen.io/bphillips201/pen/xGcEI
   - Author: bphillips201
   - Category: Creative

8. **08-header-background**
   - Source: https://codepen.io/Gothburz/pen/YyLMVx
   - Author: Gothburz
   - Category: Creative

9. **09-pure-css-hover**
   - Source: https://codepen.io/chandrikadeb7/pen/jOWzPNd
   - Author: Chandrika Deb
   - Category: Creative

### **Tier 3: Specialized (4 templates)**

10. **10-rwd-resume**
    - Source: https://codepen.io/chih-hsi-chen/pen/KKpXLqR
    - Author: Chih Hsi Chen
    - Category: Modern

11. **11-education-timeline**
    - Source: https://codepen.io/eugene-robb/pen/xBxReQ
    - Author: Eugene Robb
    - Category: Timeline

12. **12-thiago-braga-resume**
    - Source: https://codepen.io/thiagobraga/pen/areqqr
    - Author: Thiago Braga
    - Category: Modern

13. **13-html-css-resume**
    - Source: https://codepen.io/astronaomical/pen/KexYgb
    - Author: astronaomical
    - Category: Classic

### **Tier 4: Additional (5 templates)**

14. **14-sample-resume**
    - Source: https://codepen.io/knaman2609/pen/Zbyjvv
    - Author: knaman2609
    - Category: Modern

15. **15-html-resume-laighlin**
    - Source: https://codepen.io/Laighlin/pen/WgaYLw
    - Author: Laighlin
    - Category: Classic

16. **16-cv-russian**
    - Source: https://codepen.io/twisterblog/pen/JjjRBKE
    - Author: twisterblog
    - Category: International

17. **17-personal-portfolio**
    - Source: https://codepen.io/Pavan_Ramshetty/pen/KYLPzq
    - Author: Pavan Ramshetty
    - Category: Portfolio

18. **18-profile-template**
    - Source: https://codepen.io/jewel998/pen/PgydGj
    - Author: Jyotirmoy Barman
    - Category: Profile
    - Note: Already extracted in `scraped-templates/`

---

## 📝 How to Use

### **Step 1: Open CodePen URL**
Visit the CodePen link for each template

### **Step 2: Copy Code**
- Click on HTML editor → Ctrl+A → Ctrl+C
- Click on CSS editor → Ctrl+A → Ctrl+C
- Click on JS editor → Ctrl+A → Ctrl+C (if exists)

### **Step 3: Paste into Files**
Paste into corresponding files in each folder:
- `index.html` - HTML code
- `style.css` - CSS code
- `script.js` - JavaScript code

### **Step 4: Integration**
After pasting all templates, use the converter:
```bash
npx tsx scripts/template-converter.ts template-name ./StyledTemplates/XX-template-name/
```

---

## 📁 Folder Structure

```
StyledTemplates/
├── 01-responsive-professional/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── 02-simple-html-resume/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── ... (16 more folders)
└── README.md (this file)
```

---

## ✅ Checklist

Track your progress:

- [ ] 01-responsive-professional
- [ ] 02-simple-html-resume
- [ ] 03-draco-github
- [ ] 04-minimal-css-resume
- [ ] 05-bootstrap4-resume
- [ ] 06-dark-theme-resume
- [ ] 07-resume-concept
- [ ] 08-header-background
- [ ] 09-pure-css-hover
- [ ] 10-rwd-resume
- [ ] 11-education-timeline
- [ ] 12-thiago-braga-resume
- [ ] 13-html-css-resume
- [ ] 14-sample-resume
- [ ] 15-html-resume-laighlin
- [ ] 16-cv-russian
- [ ] 17-personal-portfolio
- [x] 18-profile-template (Already done!)

---

## 🔄 Next Steps

After pasting all templates:

1. Review each template in browser
2. Convert to React components
3. Add to `lib/html-templates.ts`
4. Test in template gallery
5. Deploy!

---

**Happy Pasting! 📋✨**
