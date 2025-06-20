## Stack
- ReactJS (with TypeScript)
- Tailwind CSS
- Jest (for testing)


## 1. Clone the repository:
git clone https://github.com/Usamaiqbal12/google-calendar-app.git
cd google-calendar-app

## 2. Install dependencies:
npm install
or
yarn install
## 3. Start development server
npm run dev
or
yarn dev

## 4. Open in browser:
Visit http://localhost:5173 to view the app.

## 5. Run tests with Jest
npm run test
or
yarn test

## Architecture & Design Decisions
Modular Component Structure: Components are organized by feature (e.g., views, modals, UI controls) to ensure clarity, reusability, and scalability.

State Management (React Context): Chosen for its simplicity and efficiency, as the app has lightweight global state (e.g., current view, selected date, theme, and events). Context provides clean integration without the overhead of Redux.

Custom Hooks: Encapsulate reusable logic like responsive handling (useWindowWidth) to keep components focused and readable.

Tailwind CSS: Enables rapid, consistent styling and supports dark mode with minimal config. Ideal for layout-intensive UIs like calendars.

Responsive & Themed: Designed to adapt across screen sizes.

## Known Issues / Limitations
No backend/API integration.

## Bonus Features
Dark Mode Toggle included using Tailwind's dark mode support.

# Testing:
Implemented unit tests for the Event Creation Form component using Jest.