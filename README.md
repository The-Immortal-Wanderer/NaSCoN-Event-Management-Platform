# 🏫 NaSCoN Event Management Platform 🎊

A modern, full-featured platform for managing large-scale events such as NaSCoN, built with advanced visual design, robust backend integration, and a focus on accessibility and user experience.

---

## 🚀 Key Features

- **Event Management:** Create, schedule, and manage multi-round events and competitions.
- **Role-based Dashboards:** Tailored interfaces for students, organizers, admins, judges, and sponsors.
- **Modern Theming:** Dual light/dark mode with color palettes inspired by Pakistani cultural motifs.
- **Advanced Animations:** GSAP and Framer Motion-powered transitions, glass-morphic UI, animated 3D countdowns, and more.
- **Dynamic Gallery & Stats:** Interactive event galleries, live statistics, and data-driven SVG visualizations.
- **Secure Authentication:** Token-based login, role-based access control, and route protection.
- **Performance Optimized:** Code splitting, lazy loading, animation throttling, and responsive layouts.
- **API Integration:** RESTful backend for all CRUD operations and event data.

---

## 🖥️ Project Structure

```
NaSCoN-Event-Management-Platform/
├── Backend/
│   ├── Node/              # Backend source code (Node.js/Express)
│   ├── nascon (2).sql     # Database schema (MySQL/PostgreSQL)
│   ├── package-lock.json  # Backend dependency lock file
│   └── .gitignore
├── Frontend/
│   ├── src/               # React source code (components, pages, assets)
│   ├── imgs/              # Image assets
│   ├── index.html         # Entry point
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # TailwindCSS configuration
│   ├── vite.config.js     # Vite configuration
│   ├── ReadMe.md          # Design & Theming Report
│   └── ...
└── ...
```

---

## 🌟 Design & UX Highlights

- **Digital Elegance with Cultural Roots:** Fuses Pakistani geometric art with modern UI for a unique, memorable experience.
- **Dual Theme Support:** Accessible, visually consistent light/dark modes, switchable on demand.
- **Glass Morphism:** Advanced card and dashboard components with blur, transparency, and depth.
- **3D & Animated Elements:** Interactive logo, parallax icons, animated countdowns, particle systems.
- **Responsive & Adaptive:** Layouts, typography, and controls adjust seamlessly for all devices.

See [Frontend/ReadMe.md](./Frontend/ReadMe.md) for a deep dive into the design, theming, and implementation details.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS, Framer Motion, GSAP, Three.js
- **Backend:** Node.js (Express), SQL database
- **Routing:** React Router
- **State Management:** React Context API
- **API:** RESTful endpoints for data and authentication

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Setup

**Clone the repository:**
```bash
git clone https://github.com/The-Immortal-Wanderer/NaSCoN-Event-Management-Platform.git
cd NaSCoN-Event-Management-Platform
```

**Install Frontend dependencies:**
```bash
cd Frontend
npm install
npm run dev
```

**Install Backend dependencies and run server:**
```bash
cd Backend
cd Node
node index.js
```

**Database setup:**
- Import `nascon (2).sql` into your MySQL/PostgreSQL server.
- Configure connection parameters as needed in your backend code.

---

## 🔑 Authentication & Roles

- **Token-based authentication** with secure storage.
- **Role-based access:** Students, Organizers, Admins, Judges, Sponsors.
- **Protected routes** for sensitive operations.

---

## 📅 Roadmap

1. Design system setup & tokens
2. Core component library (cards, forms, buttons, etc.)
3. Dashboard & event management flows
4. Gallery, stats, and countdown features
5. Advanced visual effects (3D, particles)
6. Full accessibility & performance optimization
7. End-to-end testing and user feedback integration

---


## 🙏 Acknowledgements

- Inspired by the vision of NaSCoN and the vibrant culture of Pakistan.
- Thanks to all contributors, designers, and organizers who made this possible.
- Made with backend and connection help from [@AbdulRafayCoder](https://github.com/AbdulRafayCoder) and [@AbuzarMeh](https://github.com/AbuzarMeh)

---

## 🖼️ Screenshots



---
