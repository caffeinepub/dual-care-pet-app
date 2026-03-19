# Dual Care – Dog & Cat Care

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Full mobile-first React + TypeScript pet care app (max-width ~430px, centered on desktop)
- Chat-style onboarding flow (pet name, type, age, energy level) persisted in localStorage
- Bottom tab navigation with 5 tabs: Home, Gallery, Add Post (+), AI Chatbot, Profile
- **Home screen**: greeting with pet name, animated pet illustration, 2x3 feature grid, daily tip card, reminder summary, pet products section
- **Gallery screen**: 3-column Instagram-style grid, tap to full view, like/comment system (session-based), upload flow with caption
- **Add Post modal**: file input with image preview, caption field, submit to gallery
- **AI Chatbot screen**: bubble chat UI with timestamps, typing indicator, smart keyword responses for dog/cat questions, quick suggestion chips
- **Profile screen**: pet profile card, weight log with SVG line chart, vaccination history, medical notes, text report export, reminder management (toggle/time/mark done/overdue detection), edit pet profile
- **Pet Products section**: category filter tabs, product cards with image/name/price/buy button
- React Context for app-wide state (pet profile, gallery posts, reminders)
- localStorage persistence for profile, reminders, onboarding
- Cute inline SVG dog and cat illustrations throughout
- Smooth tab transitions
- Empty states with illustrations

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: minimal Motoko actor (app is primarily frontend-driven with localStorage)
2. Frontend app context with pet profile, gallery posts, reminders state
3. Onboarding component (chat-style multi-step)
4. Bottom tab navigation shell
5. HomeScreen with grid, tips, reminders summary
6. GalleryScreen with grid, full view modal, like/comment, upload
7. AddPostModal triggered by center + button
8. ChatbotScreen with bubble UI, smart responses, typing indicator, suggestions
9. ProfileScreen with health tracking, reminders, export
10. ProductsSection component (shared)
11. SVG illustrations and icons inline
12. localStorage sync hooks
13. CSS animations (tab transitions, typing indicator, pet bounce)
