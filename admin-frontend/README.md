# FAQ Admin Frontend

Modern, minimal admin panel for FAQ management built with Vue.js 3 and Vite.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at: http://localhost:5173

## Build for Production

```bash
npm run build
```

## Configuration

If Backend API runs on a different port, update `API_URL` in `src/App.vue`:

```javascript
const API_URL = 'http://localhost:3000/api';
```

## Features

- Create, Read, Update, Delete FAQs
- Category management
- Modern, minimal UI design
- Responsive layout
- Real-time data updates
- Form validation
- Error handling

## Tech Stack

- Vue.js 3 (Composition API)
- Vite (Build tool)
- Axios (HTTP client)
- Native CSS (No framework)

## UI Design Principles

- Minimal color palette (black, white, gray)
- Clean typography
- Subtle shadows and borders
- Smooth transitions
- Mobile-responsive

## Project Structure

```
admin-frontend/
├── src/
│   ├── App.vue          # Main component
│   └── main.js          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Usage

1. Ensure Backend API is running at http://localhost:3000
2. Start the dev server: `npm run dev`
3. Open http://localhost:5173
4. Add/Edit/Delete FAQs through the interface

## Screenshots

The admin panel features:
- Clean header with title
- Form section for adding/editing FAQs
- Table view with all FAQs
- Edit and Delete actions per row
- Category dropdown selection
- Keywords input for search optimization
