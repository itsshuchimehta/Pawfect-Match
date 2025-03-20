# 🐾 Pawfect Match

![Pawfect Match Banner](public/pawfect-match-banner.png)

A modern dog adoption platform designed to connect potential pet owners with their ideal canine companions. Pawfect Match provides an intuitive, responsive interface for browsing, filtering, and matching with dogs available for adoption.

## ✨ Features

- **Advanced Search & Filtering**: Find dogs by breed, age range, and location with real-time results
- **Favorites System**: Save and compare potential matches in a dedicated sidebar
- **Match Generation**: "Find Your Fur-ever Friend" feature suggests ideal matches based on favorited dogs
- **Interactive Dog Details**: Detailed view with swipe navigation for browsing available dogs
- **Responsive Design**: Seamless experience across mobile devices, tablets, and desktops
- **Location-based Search**: Find dogs near your preferred area
- **Dark Mode Support**: Automatic detection of system preferences with toggle option
- **Accessibility Features**: Keyboard navigation, screen reader support, and proper contrast ratios

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) with React 18 (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom color scheme
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible components
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth, physics-based animations
- **State Management**: React hooks and context API
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) for improved developer experience

### Performance Optimizations
- Code splitting and lazy loading
- Memoization techniques
- Optimized image loading
- Debounced API calls

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pawfect-match.git
   cd pawfect-match
   ```
2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
4. Open http://localhost:3000 in your browser to see the application.

## 🔍 Key Components

- **DogCard**: Displays individual dog information with favorite toggle
- **DogDetailPopup**: Interactive detailed view with swipe navigation
- **FilterManager**: Handles search filters and location selection
- **FavoritesSidebar**: Manages saved favorites and match generation
- **Search**: Main search interface with filtering and pagination


## 🧩 API Integration

The application integrates with a dog adoption API that provides:

- Dog search with filtering
- Location-based search
- Breed listings
- Match generation
- Authentication


## 🔐 Authentication

The application uses a simple email/name-based authentication system with:

- Cookie-based session management
- Automatic token refresh
- Secure storage of user preferences
