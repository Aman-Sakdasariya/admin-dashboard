# Mini Admin Dashboard

A responsive, frontend-only user management dashboard built with React and Tailwind CSS. This application fetches user data from a public API and allows administrators to search, add, edit, and delete users seamlessly.

## 🚀 Live Demo
[Insert your Vercel/Netlify link here]

## 🛠️ Tech Stack & Tools Used
* **Frontend Framework:** React.js (Functional Components & Hooks)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM v6
* **Build Tool:** Vite
* **State Management:** React Hooks (`useState`, `useEffect`, `useRef`) + Custom Hooks (`useUsers`, `useDebounce`)

## ⚙️ Setup & Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone [Insert your repo link here]
   \`\`\`
2. **Navigate to the project directory:**
   \`\`\`bash
   cd [your-folder-name]
   \`\`\`
3. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
4. **Start the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
5. **Open your browser:** Navigate to `http://localhost:5173`

*Note: The application includes a mock authentication layer. Use the username **`admin`** and password **`admin123`** to access the dashboard.*

## 🧠 Assumptions & Design Decisions

* **Data Persistence:** The assignment specified adding/deleting users to "local state (no backend needed)". To provide a better user experience and simulate a real application, I implemented `localStorage` sync within my custom `useUsers` hook. This ensures added or edited users survive page refreshes.
* **Edit Functionality:** While the requirements explicitly asked for "Add" and "Delete", the UI called for "Action buttons". I assumed a standard admin dashboard requires full CRUD, so I implemented an "Edit User" feature that shares the same form component as "Add User".
* **Routing Architecture:** To prevent the `App.jsx` file from becoming a monolithic "God File," I introduced `react-router-dom`. This allowed me to break the app into distinct pages (`/login`, `/`, `/add`, `/edit`) and implement a Protected Dashboard Layout, demonstrating scalable SPA architecture.
* **API Data Structure:** The JSONPlaceholder API returns nested objects for `address.city` and `company.name`. I designed the user form state to output data in this exact same nested structure so the table rendering logic remains clean and consistent.

## 🚧 Challenges Faced & Solutions

* **Real-time Search Performance:** Searching a list on every keystroke can cause performance bottlenecks. 
  * *Solution:* I created a custom `useDebounce` hook that waits 300ms after the user stops typing before recalculating the filtered array.
* **Pagination & Search Synchronization:** A bug can occur if a user is on Page 3 and searches for a term that only has 2 results, resulting in a blank screen.
  * *Solution:* I implemented a `useEffect` dependency that automatically resets the `currentPage` state back to 1 whenever the debounced search query changes.
* **Mobile Responsiveness on Tables & Pagination:** Standard tables and pagination button groups often break UI boundaries on small mobile screens.
  * *Solution:* I wrapped the table in a container with `overflow-x-auto` to allow horizontal swiping. I applied the same overflow strategy to the pagination component and converted static header buttons into a tap-friendly profile dropdown menu.

## ✨ Bonus Features Implemented
* Loading Skeleton UI
* Custom Hooks (`useFetch`/`useUsers`, `useDebounce`)
* Pagination (5 users per page)
* Global Error Handling
* Protected Routes (Mock Auth Flow)
* Toast Notifications for CRUD actions