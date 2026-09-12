# URSafe Volunteer Dashboard - Implementation Guide

## Overview

The Volunteer Dashboard is a comprehensive management system for volunteers managing disaster relief operations. It provides tools for camp setup, team coordination, grievance handling, community communication, and activity tracking.

**File Location:** `volunteer-dashboard.html`

---

## Features

### 1. 🏕️ Camp Setup Tab
Volunteers can enter and manage information about the camps they're setting up.

**What you can do:**
- Camp name and location
- Camp type (Medical Relief, Supplies, Shelter, Rescue, Food & Water, Communication Hub)
- Capacity planning
- Detailed descriptions of resources and services
- Contact phone number
- Status tracking (Active, Planning, Temporary, Closed)

**Data Storage:** Camp information is saved to browser's `localStorage` under `volunteer_camp` key

---

### 2. 👥 Connect Tab
Volunteers can discover and connect with other volunteers in the network.

**Features:**
- View all active volunteers with their specialties
- See which camp they're assigned to
- **Message Function:** Click "Message" button to open a chat window
  - Real-time chat interface pops up at bottom-right
  - Messages display in conversation view
  - Close button to dismiss
- **Call Function:** Click "Call" button
  - Confirmation modal appears asking "Are you sure you want to call [name] at [number]?"
  - Two options: "Call" (green) or "Cancel"
  - System logs the call activity

---

### 3. ⚠️ Grievances Tab
Citizens and community members can report emergencies and needs. Volunteers see these as priority alerts.

**Grievance Types:**
- 🔴 **Medical** - Health emergencies
- 🔴 **Emergency** - Critical situations (missing persons, etc.)
- 📦 **Supplies** - Resource needs (food, water, shelter)

**Features:**
- Grievances are highlighted with red border for visibility
- Shows sender name, message, and timestamp
- Priority indicators (Critical/High)
- Action buttons:
  - "View Location" - See where the person is (location-based feature)
  - "Respond" - Opens message window to contact the person

---

### 4. 💬 Community Tab
Open community feed where all users (citizens, volunteers, government) can share important information.

**Features:**
- **Post to Community** - Volunteers can share updates with visibility controls
- **Visibility Dropdown:**
  - 👥 **Everyone** - Citizens, Volunteers, Government Bodies (default)
  - 🤝 **Volunteers Only** - Only volunteer network sees this
  - 🏛️ **Government Bodies Only** - Only government officials see this
  - 👫 **Citizens Only** - Only general public sees this

**Community Interactions:**
- Like posts (👍)
- Reply to posts (💬)
- Share posts (🔖)

---

### 5. 📋 History Tab
Volunteer activity log showing all actions taken in the app.

**Tracked Activities:**
- Camp information updates
- Messages sent/received
- Community posts
- Calls made
- Tab switches/navigation

Each history entry shows:
- Icon representing the action type
- Description of what happened
- Timestamp of the action

---

### 6. 👤 Profile Tab
Volunteer profile and account management.

**Profile Information:**
- Avatar (auto-generated from first letter of name)
- Volunteer name
- Statistics:
  - Number of camps managed
  - Number of volunteer connections
  - Number of community posts

**Account Settings:**
- Edit Profile button
- Notification Preferences
- Privacy Settings
- Logout button (with confirmation)

---

## Navigation

### Top Tabs
Quick navigation between all major sections:
- 🏕️ Camp Setup
- 👥 Connect
- ⚠️ Grievances
- 💬 Community
- 📋 History
- 👤 Profile

### Bottom Navigation Bar
Fixed navigation for easy access on mobile:
- Same tabs accessible from bottom bar
- Active tab is highlighted in orange
- Always visible for quick switching

---

## How to Use Key Features

### Messaging Other Volunteers

1. Go to **Connect** tab
2. Find the volunteer you want to message
3. Click **💬 Message** button
4. A chat window opens at bottom-right of screen
5. Type your message in the input field
6. Click **📤** button or press Enter to send
7. Messages appear in the conversation
8. Click ✕ in the top-right of the chat window to close

**Note:** Messages are stored in the page session; refresh will clear them (for production, connect to a backend database)

---

### Making a Call

1. Go to **Connect** tab (or from Grievances when responding)
2. Click **📞 Call** button on a volunteer's card
3. A confirmation modal appears:
   ```
   Are you sure you want to call [Name] at [Phone Number]?
   ```
4. Click **Call** (green button) to proceed
5. System shows toast notification "📞 Calling [Name]..."
6. Activity is logged in History tab

**Note:** For production, integrate with actual calling API (Twilio, VoIP provider, etc.)

---

### Posting to Community

1. Go to **Community** tab
2. In the "Share an Update" box, type your message
3. Use the **visibility dropdown** to choose who sees it:
   - Everyone (default)
   - Volunteers Only
   - Government Bodies Only
   - Citizens Only
4. Click **📤 Post**
5. Your post appears at the top of the community feed
6. Shows your name, timestamp, and visibility level

---

### Managing Camp Setup

1. Go to **Camp Setup** tab
2. Fill in the form fields:
   - **Camp Name** (required) - e.g., "Medical Relief Camp - Downtown"
   - **Location/Address** (required)
   - **Capacity** (required) - Number of people
   - **Camp Type** (required) - Select from 6 types
   - **Description** - Details about what the camp offers
   - **Contact Phone** - How to reach the camp
   - **Status** - Current operational status
3. Click **💾 Save Camp Information**
4. Toast notification confirms save
5. Data is stored locally in browser

---

## Data Storage

### Browser LocalStorage Keys

- **ursafe_user** - User profile data (from main login)
- **volunteer_camp** - Camp information submitted through the dashboard

### Mock Data

The dashboard includes mock data for demonstration:
- 4 sample volunteers with different specialties
- 3 active grievances (medical, emergency, supplies)
- 2 community posts

Replace this with real data from your backend API.

---

## Integration with Main URSafe App

The volunteer dashboard is a standalone page, but integrates with the main app through:

1. **User Authentication** - Reads `ursafe_user` from localStorage
2. **Redirect from Login** - When user role is "volunteer", redirect to this page
3. **Shared Data** - Uses same localStorage structure

### To Link from Main App

In your main `complete.html` or wherever users login:

```javascript
// After successful volunteer login
if (currentUser.role === 'volunteer') {
  window.location.href = 'volunteer-dashboard.html';
}
```

---

## Customization

### Change Color Scheme
Edit CSS variables at the top of the `<style>` block:

```css
:root {
  --primary: #FF6B35;      /* Main accent color */
  --secondary: #004E89;    /* Secondary actions */
  --danger: #E74C3C;       /* Alerts/Grievances */
  --success: #27AE60;      /* Success messages */
  /* ... etc */
}
```

### Add More Grievance Types
In the `generateMockData()` method, expand the grievances array and add corresponding CSS styles.

### Integrate with Backend
Replace mock data generation with API calls:

```javascript
async generateMockData() {
  this.volunteers = await fetch('/api/volunteers').then(r => r.json());
  this.grievances = await fetch('/api/grievances').then(r => r.json());
  // ... etc
}
```

---

## Features for Production

To make this production-ready, you'll need to:

1. **Backend API Integration**
   - Endpoint for saving camp data
   - Endpoint for fetching volunteers
   - Endpoint for posting/retrieving community messages
   - Endpoint for grievance management

2. **Real Communication**
   - Integrate WebRTC or SIP for calls
   - Use WebSocket for real-time messaging
   - Store message history in database

3. **User Authentication**
   - Validate volunteer credentials
   - Use proper session management
   - Add two-factor authentication for sensitive operations

4. **Database**
   - Store volunteer profiles
   - Persist camp information
   - Archive grievances and community posts
   - Track activity history

5. **Notifications**
   - Push notifications for incoming grievances
   - Real-time updates for new community posts
   - Call notifications

6. **Location Services**
   - GPS tracking for volunteer locations
   - Map view of nearby volunteers
   - Distance calculations

7. **Media Handling**
   - Support image/video attachments in messages
   - Profile picture uploads
   - Grievance attachments (photos of damage, etc.)

---

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- Mobile browsers: Optimized responsive design

---

## Troubleshooting

### Messages not sending?
- Check browser console for errors
- Ensure localStorage is enabled
- Try refreshing the page

### Call confirmation not showing?
- Check if modals are being blocked
- Verify JavaScript is enabled
- Clear browser cache

### Data not persisting?
- Check if localStorage is enabled
- Verify sufficient storage space (usually 5-10MB per domain)
- Try private/incognito mode to test

---

## File Structure

```
URSafe/
├── volunteer-dashboard.html    ← Main dashboard file
├── complete.html               ← Main app (has calling features)
├── index.html                  ← Login page
├── js/
│   ├── app.js
│   ├── login.js
│   └── ... other scripts
├── css/
│   └── style.css
└── VOLUNTEER_DASHBOARD_GUIDE.md ← This file
```

---

## Support

For issues or feature requests, check the console for error messages and verify:
- All required form fields are filled
- User is logged in (check localStorage)
- Browser has localStorage enabled
- JavaScript is not blocked

---

**Dashboard Version:** 1.0  
**Last Updated:** September 2026
