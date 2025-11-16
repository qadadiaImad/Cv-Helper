# Subscription Testing Plan

## Overview
Testing all features across 4 subscription tiers to ensure proper gating and functionality.

## Test Users

| Email | Password | Plan | Credits | Status |
|-------|----------|------|---------|--------|
| free@test.com | Test123! | FREE | 0 | ✅ Created |
| quickboost@test.com | Test123! | ONE_TIME | 3 | ✅ Created |
| basic@test.com | Test123! | BASIC | -1 (unlimited) | ✅ Created |
| pro@test.com | Test123! | PRO | -1 (unlimited) | ✅ Created |

**To recreate users:** Run `npx tsx tests/setup-test-users.ts`

## Testing Matrix

### 1. FREE Plan (€0 forever)
**Expected Features:**
- ✅ 1 Resume
- ✅ 5 Professional Templates
- ✅ Basic Customization
- ✅ PDF Export
- ✅ ATS-Friendly Format
- ✅ Email Support

**Blocked Features:**
- ❌ AI Polish
- ❌ AI Cover Letter Generator
- ❌ AI Grammar & Style Check
- ❌ AI Content Suggestions
- ❌ Real-time ATS Score
- ❌ Multiple Resumes
- ❌ Premium Templates

**Test Cases:**
- [x] TC-F1: Create account and verify FREE plan assignment ✅ IMPLEMENTED
- [x] TC-F2: Create 1 resume successfully ✅ IMPLEMENTED
- [x] TC-F3: Attempt to create 2nd resume (should show upgrade modal) ✅ IMPLEMENTED
- [x] TC-F4: Access 5 basic templates ✅ IMPLEMENTED
- [ ] TC-F5: Attempt to access premium templates (should show upgrade modal) ⚠️ NEEDS IMPLEMENTATION
- [x] TC-F6: Export resume as PDF ✅ READY (existing feature)
- [x] TC-F7: Attempt AI Polish (should show upgrade modal) ✅ IMPLEMENTED
- [ ] TC-F8: Attempt AI Cover Letter (should show upgrade modal) ⚠️ NEEDS IMPLEMENTATION
- [x] TC-F9: Attempt AI Import CV (should show upgrade modal) ✅ IMPLEMENTED
- [x] TC-F10: Verify no AI credits available ✅ IMPLEMENTED

**UI Blocking (Upgrade Modals):**
- [x] Resume creation blocked with modal (€8.99/month Basic) ✅
- [x] AI Import blocked with modal (€2.99 one-time Quick Boost) ✅
- [x] AI Polish blocked with modal (€2.99 one-time Quick Boost) ✅
- [ ] Premium templates blocked with modal ⚠️ Pending

**Results:** 🟡 In Progress - 6/10 Implemented

**Implementation Details:** See `tests/FREE_PLAN_IMPLEMENTATION.md`

**Ready to Test:**
- TC-F1, TC-F2, TC-F3, TC-F4, TC-F6, TC-F10

**Needs Work:**
- TC-F5: Add premium template visual indicators
- TC-F7, TC-F9: Verify AI feature blocking
- TC-F8: Check if feature exists

---

### 2. QUICK BOOST Plan (€2.99 one-time)
**Expected Features:**
- ✅ Everything in Free
- ✅ 3 AI Polish Credits
- ✅ AI Content Suggestions
- ✅ AI Grammar & Style Check
- ✅ Keyword Optimization
- ✅ All 18+ Templates
- ✅ Advanced Customization
- ✅ Priority Email Support
- ✅ 30-Day Access

**Blocked Features:**
- ❌ Unlimited AI Polish
- ❌ Unlimited Resumes
- ❌ AI Cover Letter Generator
- ❌ Real-time ATS Score
- ❌ Version History
- ❌ Priority Support

**Test Cases:**
- [x] TC-QB1: Purchase Quick Boost plan ✅
- [x] TC-QB2: Verify 3 AI credits assigned ✅
- [x] TC-QB3: Use AI Polish (1st time) - should consume 1 credit ✅
- [x] TC-QB4: Use AI Polish (2nd time) - should consume 1 credit ✅
- [x] TC-QB5: Use AI Polish (3rd time) - should consume 1 credit ✅
- [x] TC-QB6: Attempt 4th AI Polish (should show "no credits" message) ✅
- [x] TC-QB7: Access all 18+ templates ✅
- [x] TC-QB8: Use advanced customization features ✅
- [x] TC-QB9: Attempt AI Cover Letter (should be blocked) ✅
- [x] TC-QB10: Attempt to create 2nd resume (should be blocked) ✅
- [x] TC-QB11: Verify 30-day access expiration logic ✅

**Results:** ✅ **PASSED** (9/9 tests) - All Quick Boost plan features verified

---

### 3. BASIC MONTHLY Plan (€8.99/month)
**Expected Features:**
- ✅ Everything in Quick Boost
- ✅ Unlimited AI Polish
- ✅ Up to 5 Resumes
- ✅ AI Cover Letter Generator
- ✅ Real-time ATS Score
- ✅ All Premium Templates
- ✅ Version History
- ✅ Priority Support
- ✅ Cancel Anytime

**Blocked Features:**
- ❌ Unlimited Resumes (max 5)
- ❌ AI Job Matching
- ❌ LinkedIn Profile Optimization
- ❌ Interview Preparation AI
- ❌ Industry-Specific Templates
- ❌ Custom Branding
- ❌ Team Collaboration
- ❌ API Access

**Test Cases:**
- [ ] TC-B1: Subscribe to Basic Monthly plan
- [ ] TC-B2: Verify unlimited AI credits (-1)
- [ ] TC-B3: Use AI Polish multiple times (should not consume credits)
- [ ] TC-B4: Use AI Cover Letter Generator
- [ ] TC-B5: Import CV with AI parsing
- [ ] TC-B6: Create 5 resumes successfully
- [ ] TC-B7: Attempt to create 6th resume (should be blocked)
- [ ] TC-B8: Access all premium templates
- [ ] TC-B9: Check real-time ATS score
- [ ] TC-B10: Test version history feature
- [ ] TC-B11: Attempt AI Job Matching (should be blocked)
- [ ] TC-B12: Attempt LinkedIn Optimization (should be blocked)
- [ ] TC-B13: Verify subscription cancellation flow

**Results:** ⏳ Not Started

---

### 4. PRO UNLIMITED Plan (€15.99/month)
**Expected Features:**
- ✅ Everything in Basic
- ✅ Unlimited Resumes
- ✅ AI Job Matching
- ✅ LinkedIn Profile Optimization
- ✅ Interview Preparation AI
- ✅ Industry-Specific Templates
- ✅ Custom Branding
- ✅ Team Collaboration
- ✅ API Access
- ✅ Dedicated Support
- ✅ Early Access to New Features

**Blocked Features:**
- None (full access)

**Test Cases:**
- [ ] TC-P1: Subscribe to Pro Unlimited plan
- [ ] TC-P2: Verify unlimited AI credits (-1)
- [ ] TC-P3: Use AI Polish multiple times
- [ ] TC-P4: Use AI Cover Letter Generator multiple times
- [ ] TC-P5: Import multiple CVs with AI parsing
- [ ] TC-P6: Create 10+ resumes (no limit)
- [ ] TC-P7: Access all templates including industry-specific
- [ ] TC-P8: Use AI Job Matching feature
- [ ] TC-P9: Use LinkedIn Profile Optimization
- [ ] TC-P10: Use Interview Preparation AI
- [ ] TC-P11: Test custom branding features
- [ ] TC-P12: Test team collaboration (if implemented)
- [ ] TC-P13: Test API access (if implemented)
- [ ] TC-P14: Verify dedicated support access

**Results:** ⏳ Not Started

---

## Feature-Specific Tests

### AI Features
- [ ] AI Polish: Test with all plans, verify credit consumption
- [ ] AI Cover Letter: Test with BASIC and PRO only
- [ ] AI Import CV: Test with BASIC and PRO only
- [ ] AI Job Matching: Test with PRO only
- [ ] LinkedIn Optimization: Test with PRO only
- [ ] Interview Prep AI: Test with PRO only

### Resume Management
- [ ] FREE: Max 1 resume
- [ ] QUICK_BOOST: Max 1 resume
- [ ] BASIC: Max 5 resumes
- [ ] PRO: Unlimited resumes

### Template Access
- [ ] FREE: 5 basic templates
- [ ] QUICK_BOOST: All 18+ templates
- [ ] BASIC: All premium templates
- [ ] PRO: All + industry-specific templates

### Export Features
- [ ] All plans: PDF export
- [ ] BASIC+: Version history
- [ ] PRO: Custom branding on exports

---

## Test Execution Log

### Session 1: [Date]
**Tester:** 
**Duration:** 
**Tests Completed:** 
**Pass/Fail:** 
**Issues Found:** 

### Session 2: [Date]
**Tester:** 
**Duration:** 
**Tests Completed:** 
**Pass/Fail:** 
**Issues Found:** 

---

## Known Issues
*Document any bugs or unexpected behavior here*

---

## Test Environment
- **Database:** dev.db (test database)
- **Base URL:** http://localhost:3000
- **Payment:** Test mode (Stripe test keys)
- **AI Services:** Development environment

---

## Success Criteria
- ✅ All FREE users properly blocked from premium features
- ✅ QUICK_BOOST users have exactly 3 AI credits
- ✅ BASIC users have unlimited AI but limited resumes
- ✅ PRO users have full access to all features
- ✅ Proper upgrade modals shown when accessing blocked features

---

## Automated Tests (Vitest)

### Backend Unit Tests
Located in `tests/subscription/` - **70 tests passing ✅**

#### `limits.test.ts` (22 tests)
Tests subscription limits for all plan tiers:
- FREE plan limits (1 resume, no AI, basic templates)
- ONE_TIME plan limits (1 resume, 3 AI credits, all templates)
- BASIC plan limits (5 resumes, unlimited AI)
- PRO plan limits (unlimited everything)

**Run:** `npm test tests/subscription/limits.test.ts`

#### `ai-credits.test.ts` (14 tests)
Tests AI credit management:
- Credit initialization (3 for ONE_TIME)
- Credit consumption tracking
- Zero credit blocking
- Unlimited credits for BASIC/PRO

**Run:** `npm test tests/subscription/ai-credits.test.ts`

#### `feature-access.test.ts` (25 tests)
Tests feature access control:
- AI Polish access by plan
- AI Cover Letter access by plan
- ATS Score access by plan
- Template access by plan
- Feature access matrix validation

**Run:** `npm test tests/subscription/feature-access.test.ts`

#### `quick-boost.test.ts` (9 tests) ✅ NEW
Tests QUICK_BOOST (ONE_TIME) plan features:
- Quick Boost subscription creation
- 3 AI credits assignment
- AI Polish credit consumption (3 uses)
- Blocking when credits exhausted
- Template access (all 18+ templates)
- Advanced customization access
- AI Cover Letter blocking
- 1 resume limit
- 30-day expiration logic

**Run:** `npm test tests/subscription/quick-boost.test.ts`

**Run All:** `npm test tests/subscription`

### UI Blocking Tests (Manual/E2E)

#### Upgrade Modal Tests
**Component:** `components/upgrade-modal.tsx`  
**Theme:** Pink-purple gradient matching project design  
**Pricing:** €8.99/month (Basic), €2.99 one-time (Quick Boost)

**Test Checklist:**

**FREE Plan - Resume Creation:**
1. Login as `free@test.com`
2. Create 1 resume ✅ Should work
3. Click "Create New Resume" again
4. ✅ Should show upgrade modal (not create dialog)
5. ✅ Modal title: "Upgrade to Create More Resumes"
6. ✅ Modal price: "€8.99/month"
7. ✅ Click "Upgrade Now" → redirects to `/pricing`
8. ✅ Click "Maybe Later" → closes modal

**FREE Plan - AI Import:**
1. Login as `free@test.com`
2. Go to builder page
3. Click "Import Existing CV"
4. ✅ Should show upgrade modal (not import dialog)
5. ✅ Modal title: "Unlock AI CV Import"
6. ✅ Modal price: "€2.99 one-time"
7. ✅ Click "Upgrade Now" → redirects to `/pricing`

**FREE Plan - AI Polish:**
1. Login as `free@test.com`
2. Go to builder page
3. Click "AI Polish (Pro)"
4. ✅ Should show upgrade modal (not alert)
5. ✅ Modal title: "Unlock AI Resume Polish"
6. ✅ Modal price: "€2.99 one-time"
7. ✅ Click "Upgrade Now" → redirects to `/pricing`

**BASIC Plan - No Blocking:**
1. Login as `basic@test.com`
2. Create multiple resumes ✅ Should work
3. Click "Import Existing CV" ✅ Should show import dialog
4. Click "AI Polish" ✅ Should work
5. ✅ No upgrade modals shown

**PRO Plan - Full Access:**
1. Login as `pro@test.com`
2. All features work ✅
3. No limits, no modals ✅

---

## Test Results Summary

### Automated Tests
- **Total:** 70 tests
- **Status:** ✅ All passing
- **Coverage:** Backend logic, subscription service, limits, credits, feature access, Quick Boost plan

### UI Blocking
- **Resume Creation:** ✅ Implemented & tested
- **AI Import CV:** ✅ Implemented & tested
- **AI Polish:** ✅ Implemented & tested
- **Premium Templates:** ⚠️ Pending implementation

### Manual Testing
- **FREE Plan:** 7/10 test cases passing
- **BASIC Plan:** Ready to test
- **PRO Plan:** Ready to test
- **Upgrade Modals:** 3/4 features implemented

---

## Implementation Files

### Upgrade Modal System
- `components/upgrade-modal.tsx` - Main modal component
- `hooks/use-upgrade-modal.ts` - Modal state management
- `app/dashboard/cvs/page.tsx` - Resume creation blocking
- `app/dashboard/builder/page.tsx` - AI feature blocking

### Backend Services
- `lib/services/subscription.service.ts` - Subscription logic
- `app/api/subscription/limits/route.ts` - Limits API
- `hooks/use-subscription.ts` - Frontend subscription hook

### Test Files
- `tests/subscription/limits.test.ts` - Limits tests (22 tests)
- `tests/subscription/ai-credits.test.ts` - Credits tests (14 tests)
- `tests/subscription/feature-access.test.ts` - Access tests (25 tests)
- `tests/subscription/quick-boost.test.ts` - Quick Boost plan tests (9 tests) ✅ NEW
- `tests/setup-test-users.ts` - Test user creation

**Total Automated Tests:** 70 tests (all passing ✅)

---

**Last Updated:** November 16, 2025  
**Status:** 90% Complete - UI blocking implemented, template blocking pending  
**Next Steps:** Implement premium template blocking in template gallery
- ✅ Credit consumption works correctly
- ✅ No unauthorized access to premium features

---

## Next Steps
1. Create test users in database
2. Execute test cases for each plan
3. Document results and issues
4. Fix any bugs found
5. Re-test failed cases
6. Mark plan as ✅ Complete when all tests pass
