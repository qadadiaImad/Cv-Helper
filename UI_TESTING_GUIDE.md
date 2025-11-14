# 🧪 UI Testing Guide - AI Features

## ✅ Prerequisites

Before testing, ensure:
1. ✅ Dev server is running (`npm run dev`)
2. ✅ Database is set up (`npm run db:migrate`)
3. ⚠️ **API keys configured in `.env`** (CRITICAL!)

```env
# Add one of these to your .env file:
OPENAI_API_KEY=sk-your-key-here
# OR
OPENROUTER_KEY_ARBITRAGE=sk-your-key-here
```

---

## 🎯 Manual UI Testing Checklist

### **Step 1: Login**

1. Open browser: http://localhost:3000/login
2. Login with your test account:
   - Email: `test@example.com`
   - Password: Your test password
3. ✅ Should redirect to `/dashboard`

**Expected**: Session cookie set, user authenticated

---

### **Step 2: Navigate to CV Builder**

1. Go to: http://localhost:3000/dashboard/builder
2. Look for the **AI Tools** section in the left sidebar
3. Should see purple gradient box with:
   - ✨ AI Tools header
   - 📤 Import CV button
   - 💼 Adapt to Job button
   - ✨ AI Polish button

**Expected**: All three AI buttons visible

---

### **Step 3: Test Import CV Feature**

#### **3.1 Test File Upload**

1. Click **"Import CV"** button
2. Dialog should open with:
   - Title: "Import CV with AI"
   - Drag & drop zone
   - File input
   - Supported formats: PDF, DOCX, TXT

3. **Test with PDF:**
   - Upload a sample CV PDF
   - Should show loading spinner
   - Wait 5-10 seconds for AI processing
   - ✅ Success: CV data populates the form
   - ❌ Error: Check console for error message

4. **Test with invalid file:**
   - Try uploading an image (.jpg)
   - Should show error: "Invalid file type"

#### **3.2 Test Text Import**

1. Click **"Import CV"** button
2. Switch to "Text" tab
3. Paste plain text CV
4. Click "Import from Text"
5. Should process and populate CV data

**Expected Results:**
- ✅ Personal info filled (name, email, phone)
- ✅ Experience section populated
- ✅ Education section populated
- ✅ Skills added
- ✅ Dialog closes automatically
- ✅ CV preview updates

---

### **Step 4: Test Adapt to Job Feature**

1. Make sure you have a CV loaded
2. Click **"Adapt to Job"** button
3. Dialog opens with:
   - Title: "Adapt CV to Job Description"
   - Large textarea for job description
   - Checkbox: "Create a new adapted CV"

4. **Test adaptation:**
   - Paste a job description (e.g., from LinkedIn)
   - Check "Create a new adapted CV"
   - Click "Adapt CV"
   - Should show loading spinner
   - Wait 10-15 seconds

**Expected Results:**
- ✅ CV content updated to match job description
- ✅ Relevant skills highlighted
- ✅ Experience reordered/emphasized
- ✅ Keywords from job description added
- ✅ Dialog closes on success
- ✅ Toast notification: "CV adapted successfully!"

**Test Cases:**
- ✅ With "Create new" checked → Creates new CV
- ✅ With "Create new" unchecked → Updates current CV
- ❌ Empty job description → Shows error

---

### **Step 5: Test AI Polish Feature**

1. Make sure you have a CV loaded
2. Click **"AI Polish"** button
3. Dialog opens with:
   - Title: "Polish Your CV with AI"
   - Three radio options:
     - Professional
     - Concise
     - Impactful

4. **Test each mode:**

#### **Professional Mode:**
- Select "Professional"
- Click "Polish CV"
- Wait 10-15 seconds
- ✅ Grammar improved
- ✅ Professional tone
- ✅ Better clarity

#### **Concise Mode:**
- Select "Concise"
- Click "Polish CV"
- ✅ Shorter descriptions
- ✅ Redundancy removed
- ✅ More focused

#### **Impactful Mode:**
- Select "Impactful"
- Click "Polish CV"
- ✅ Strong action verbs
- ✅ Achievement-focused
- ✅ Quantified results

**Expected Results:**
- ✅ Text quality improved
- ✅ Facts preserved (no invention)
- ✅ Dates/companies unchanged
- ✅ Dialog closes on success
- ✅ Toast notification: "CV polished successfully!"

---

## 🔍 What to Check in Each Test

### **Visual Checks:**
- ✅ Dialogs open/close smoothly
- ✅ Loading spinners appear during processing
- ✅ Buttons disabled during loading
- ✅ Error messages display clearly
- ✅ Success toasts appear
- ✅ CV preview updates immediately

### **Functional Checks:**
- ✅ File upload works
- ✅ Text parsing works
- ✅ AI processing completes
- ✅ Data maps correctly to CV fields
- ✅ No data loss during conversion
- ✅ Dialogs close after success

### **Error Handling:**
- ❌ Invalid file type → Error message
- ❌ File too large (>5MB) → Error message
- ❌ Empty input → Validation error
- ❌ No API key → "AI service not configured"
- ❌ Network error → Retry option
- ❌ No subscription → "Upgrade required"

---

## 🐛 Common Issues & Solutions

### **Issue 1: "AI service not configured"**
**Cause**: Missing API keys  
**Solution**: Add `OPENAI_API_KEY` or `OPENROUTER_KEY_ARBITRAGE` to `.env`

### **Issue 2: "Unauthorized" error**
**Cause**: Not logged in or session expired  
**Solution**: Login again at `/login`

### **Issue 3: "Upgrade required"**
**Cause**: FREE user trying to use AI features  
**Solution**: 
- Upgrade to PRO or ONE_TIME plan
- Or manually update user in database:
```sql
UPDATE User SET subscriptionStatus = 'PRO' WHERE email = 'test@example.com';
```

### **Issue 4: "No AI credits remaining"**
**Cause**: ONE_TIME user ran out of credits  
**Solution**: Add credits in database:
```sql
UPDATE Subscription SET aiCreditsRemaining = 10 WHERE userId = 'user-id';
```

### **Issue 5: File upload fails**
**Cause**: File too large or wrong format  
**Solution**: 
- Max size: 5MB
- Formats: PDF, DOCX, TXT only

### **Issue 6: AI processing takes too long**
**Cause**: OpenAI API slow or rate limited  
**Solution**: 
- Wait up to 30 seconds
- Check OpenAI status page
- Try again later

---

## 📊 Test Results Checklist

Use this to track your testing:

### **Import CV Feature**
- [ ] PDF upload works
- [ ] DOCX upload works
- [ ] TXT upload works
- [ ] Text paste works
- [ ] Invalid file rejected
- [ ] Large file rejected
- [ ] Data maps correctly
- [ ] Preview updates

### **Adapt to Job Feature**
- [ ] Dialog opens
- [ ] Job description accepted
- [ ] "Create new" option works
- [ ] "Update existing" works
- [ ] CV content adapted
- [ ] Keywords added
- [ ] Relevant skills highlighted
- [ ] Toast notification shows

### **AI Polish Feature**
- [ ] Dialog opens
- [ ] Professional mode works
- [ ] Concise mode works
- [ ] Impactful mode works
- [ ] Text quality improved
- [ ] Facts preserved
- [ ] Toast notification shows

### **Error Handling**
- [ ] Invalid file type error
- [ ] Empty input error
- [ ] No API key error
- [ ] Unauthorized error
- [ ] No credits error
- [ ] Network error handled

### **UI/UX**
- [ ] Buttons styled correctly
- [ ] Loading states work
- [ ] Dialogs responsive
- [ ] Mobile friendly
- [ ] Keyboard accessible
- [ ] Screen reader friendly

---

## 🚀 Advanced Testing

### **Test with Browser DevTools**

1. Open DevTools (F12)
2. Go to **Network** tab
3. Test a feature
4. Check:
   - ✅ POST request to `/api/ai/import` (or adapt/polish)
   - ✅ Status: 200 OK
   - ✅ Response contains CV data
   - ✅ No CORS errors
   - ✅ Request time < 30s

### **Test with Console**

1. Open DevTools Console
2. Test a feature
3. Check for:
   - ❌ No errors in console
   - ❌ No warnings
   - ✅ Success logs (if any)

### **Test Authentication**

1. Open DevTools → Application → Cookies
2. Check for `session` cookie
3. Should have:
   - ✅ HttpOnly: true
   - ✅ Secure: true (in production)
   - ✅ SameSite: Lax
   - ✅ Valid JWT token

---

## 📸 Screenshots to Take

For documentation, capture:
1. AI Tools section in sidebar
2. Import CV dialog (file upload)
3. Import CV dialog (text input)
4. Adapt to Job dialog
5. AI Polish dialog with modes
6. Loading state
7. Success toast
8. Error message
9. Updated CV preview

---

## 🎬 Video Testing

Record a screen capture showing:
1. Login
2. Navigate to builder
3. Import a CV
4. Adapt to job
5. Polish CV
6. Show final result

This helps document the full user flow!

---

## ✅ Final Checklist

Before marking as complete:

- [ ] All 3 AI features tested
- [ ] All error cases tested
- [ ] UI looks good on desktop
- [ ] UI looks good on mobile
- [ ] No console errors
- [ ] API calls successful
- [ ] Data persists correctly
- [ ] Performance acceptable (<30s)
- [ ] User experience smooth
- [ ] Documentation updated

---

## 🎉 Success Criteria

Your AI features are working if:

1. ✅ Can import CV from PDF
2. ✅ Can adapt CV to job description
3. ✅ Can polish CV in all 3 modes
4. ✅ CV data updates correctly
5. ✅ No errors in console
6. ✅ Loading states work
7. ✅ Error handling works
8. ✅ Toast notifications appear
9. ✅ Dialogs open/close smoothly
10. ✅ User experience is intuitive

---

## 📞 Need Help?

If something doesn't work:

1. Check `.env` has API keys
2. Check console for errors
3. Check Network tab for failed requests
4. Check database for user subscription
5. Restart dev server
6. Clear browser cache
7. Try incognito mode

---

**Happy Testing! 🚀**
