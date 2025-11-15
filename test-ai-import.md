# AI Import Test Plan

## Test 1: Verify Parsing Works
1. Start dev server: `npm run dev`
2. Navigate to builder page
3. Click "Import Existing CV"
4. Upload a text file with CV content
5. Click "Fill Template with AI"
6. Check browser console for logs:
   - `[aiParseCvWithService] Raw result keys:` - should show `clean_cv`, `usage`, `cost`
   - `[aiParseCvWithService] clean_cv exists:` - should be `true`
   - `[AI Parse] Returning clean_cv:` - should show JSON data
   - `[AI Parse] clean_cv keys:` - should show CV fields like `personal`, `experience`, etc.

## Test 2: Verify Filling Works
1. After parsing succeeds, check console for:
   - `[Import] API Response:` - should show full response with `clean_cv`
   - `[Import] clean_cv exists:` - should be `true`
   - `[Import] clean_cv content:` - should show the parsed CV data
   - `[Import] Calling handleDataChange with:` - should show the data being applied
   - `[Import] Data change completed` - confirms data was set

2. Check the UI:
   - Template should be filled with parsed data
   - Personal info should appear in the CV
   - Experience, education, skills should be populated
   - Progress bar should update

## Expected Flow
```
User uploads file
  → handleImportCV reads file text
  → POST /api/ai/parse with cv_text
  → aiParseCvWithService calls parseCV
  → POST /api/adapt with only_clean=true
  → Returns { clean_cv: {...} }
  → aiParseCvWithService returns { clean: clean_cv, usage }
  → API returns { clean_cv: result.clean, ... }
  → Frontend receives data.clean_cv
  → handleDataChange(data.clean_cv) updates state
  → Template re-renders with new data
```

## Common Issues to Check
1. **Parsing fails**: Check `/api/adapt` logs for errors
2. **Data not returned**: Check if `clean_cv` is in API response
3. **Data not applied**: Check if `handleDataChange` is called
4. **UI not updating**: Check if `localCVData` state is updated

## Sample CV Text for Testing
```
John Doe
john.doe@email.com
+1 234 567 8900

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years in full-stack development.

EXPERIENCE
Senior Software Engineer
Tech Company Inc. | 2020 - Present
- Led development of microservices architecture
- Improved system performance by 40%
- Mentored junior developers

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019

SKILLS
JavaScript, TypeScript, React, Node.js, Python, AWS
```
