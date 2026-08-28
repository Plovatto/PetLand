# PetLand

[Português](README.md) | [English](README.en.md)

Responsive landing page developed for a fictional pet shop, focused on a modern, pleasant, accessible, and intuitive experience.

This project was created as part of my personal portfolio to practice front-end development, responsiveness, component organization, internationalization, and React application deployment.

> **Note:** This is a fictional project and does not represent a real company.

## Demo

The project can be published with GitHub Pages at:

```text
https://plovatto.github.io/PetLand/
```

## Features

- Responsive layout for different screen sizes
- Smooth navigation between sections
- Animations and microinteractions with reduced motion support
- Smooth scroll with Lenis
- Custom cursor
- Page loader
- Hero section
- Services section with carousel
- About section
- Contact section with EmailJS form integration
- Footer with brand identity
- Internationalization in Portuguese and English
- Language switcher with local persistence
- Optimized WebP assets
- Automated deployment with GitHub Actions and GitHub Pages

## Technologies

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://motion.dev/) - animations and transitions
- [Lenis](https://lenis.darkroom.engineering/) - smooth scroll
- [EmailJS](https://www.emailjs.com/) - contact form delivery
- [Swiper](https://swiperjs.com/) - services carousel
- [i18next](https://www.i18next.com/) - internationalization
- [react-i18next](https://react.i18next.com/) - i18n integration with React
- ESLint - code analysis and standardization
- Prettier - code formatting
- GitHub Actions - automated deployment
- GitHub Pages - hosting

## Running Locally

### Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Plovatto/PetLand.git
```

Open the project folder:

```bash
cd PetLand
```

Install dependencies:

```bash
npm install
```

Create the environment variables file:

```bash
cp .env.example .env.local
```

Fill in your EmailJS credentials in `.env.local` and run:

```bash
npm run dev
```

The project will be available at:

```text
http://localhost:5173
```

## Environment Variables

Environment variables are defined in `.env.local`, which should not be committed.

Use `.env.example` as a reference:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

## Scripts

| Command                | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Starts the development server                    |
| `npm run build`        | Runs type checking and generates production code |
| `npm run preview`      | Serves the production build locally              |
| `npm run lint`         | Runs ESLint code analysis                        |
| `npm run format`       | Formats code with Prettier                       |
| `npm run format:check` | Checks formatting without changing files         |

## Project Structure

```text
src/
├── assets/                 # Images and SVGs used by components
├── components/
│   ├── layout/             # Structural components, such as Header, Footer, and PageLoader
│   ├── sections/           # Page sections, such as Hero, Services, About, and Contact
│   └── ui/                 # Reusable components, such as AnimatedText and LanguageToggle
├── constants/              # Static data, links, and section configuration
├── context/                # Global application contexts
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions
├── locales/                # Translation files
│   ├── en/
│   └── pt/
├── styles/
│   └── index.css           # Global styles and Tailwind CSS configuration
├── App.tsx
├── i18n.ts
└── main.tsx
```

## Deploy

Deployment is handled by GitHub Actions and GitHub Pages.

The workflow is located at:

```text
.github/workflows/deploy.yml
```

Vite uses `base: '/PetLand/'` to generate the correct asset paths for GitHub Pages.

To publish, configure GitHub:

```text
Settings > Pages > Build and deployment > Source: GitHub Actions
```

Every push to the `main` branch runs the workflow, builds the project, and publishes the `dist` folder.

## Project Goals

PetLand was developed to practice and demonstrate knowledge in:

- Building interfaces with React and TypeScript
- Creating responsive layouts
- Componentization and code reuse
- Front-end project organization
- Animations and microinteractions
- Accessibility and motion preferences
- Interface internationalization
- External service integration
- Automated deployment
- Git and GitHub best practices

## License

This project was developed for study and portfolio purposes.
