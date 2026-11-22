# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-22

First versioned release of the landing page.

### Added

- Landing page with Hero, Services, About, and Contact sections, header navigation, and footer.
- Services carousel with twelve services, built with Swiper.
- Contact form integrated with EmailJS.
- Smooth scrolling with Lenis, custom cursor, and page loader.
- Animations with reduced motion support.
- Portuguese and English versions, each on its own URL (`/` and `/en/`) with `hreflang`. The first visit follows the system language, and the choice is saved locally.
- SEO metadata, structured data, social sharing metadata, `robots.txt`, and `sitemap.xml`.
- Translation consistency tests with Vitest and fast-check.
- CI workflow for formatting, lint, types, tests, and build, plus automated deployment to GitHub Pages.
- Lighthouse CI audits and a pull request title check.
- OpenSSF Scorecard workflow and Dependabot updates.
- Security policy, contributing guide, code of conduct, issue and pull request templates, and CODEOWNERS.

### Changed

- Image assets optimized as WebP.
- README redesigned around the project visuals. English is now the default README, with the Portuguese version in `README.pt-BR.md`.
- The Node.js version is defined in `.nvmrc` and read by the workflows.

### Security

- Workflow actions pinned by commit hash, with restricted permissions.
- Dependencies updated with security fixes.

[1.0.0]: https://github.com/Plovatto/PetLand/releases/tag/v1.0.0
