# ![Pawfect Match Banner](public/favicon-32x32.png) Pawfect Match

A modern dog adoption platform designed to connect potential pet owners with their ideal canine companions. Pawfect Match provides an intuitive, responsive interface for browsing, filtering, and matching with dogs available for adoption.

- [✨ Features](#-features)
- [🛠️ Tech Stack](#%EF%B8%8F-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [🌐 Browser Compatibility](#-browser-compatibility)
- [License](#license)

## ✨ Features

- **Advanced Search & Filtering**: Find dogs by breed, age range, and location with real-time results
- **Favorites System**: Save and compare potential matches in a dedicated sidebar
- **Match Generation**: "Find Your Fur-ever Friend" feature suggests ideal matches based on favorited dogs
- **Interactive Dog Details**: Detailed view with swipe navigation for browsing available dogs
- **Responsive Design**: Seamless experience across mobile devices, tablets, and desktops
- **Location-based Search**: Find dogs near your preferred area
- **Dark Mode Support**: Automatic detection of system preferences with toggle option

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) with [React 18](https://react.dev/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom color scheme
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth, physics-based animations
- **State Management**: React hooks and context API
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) for improved developer experience

### DevOps & Deployment
- **CI/CD**: GitHub Actions for automated build and deployment
- **Hosting**: GitHub Pages with custom configuration
- **Build Output**: Static export with Next.js

### Performance Optimizations
- Code splitting and lazy loading
- Memoization techniques
- Optimized image loading
- Debounced API calls

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itsshuchimehta/Pawfect-Match.git
   cd pawfect-match
   ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open http://localhost:3000 in your browser to see the application.



## 🌐 Browser Compatibility
If you encounter authentication issues, please ensure that cross-site tracking is not being blocked. Go to Browser's Settings > Privacy & Security and disable “Prevent Cross-Site Tracking.”

## License

Copyright (c) 2025 Shuchi Mehta. All rights reserved.

This code is provided for viewing and reference purposes only. No permission is granted for modification or redistribution.