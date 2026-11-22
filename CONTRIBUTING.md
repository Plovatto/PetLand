# Contributing

## Reporting issues

Open an [issue](https://github.com/Plovatto/PetLand/issues) describing the problem, the steps to reproduce it, and the expected behavior. Security issues must be reported through the [security policy](SECURITY.md).

## Submitting changes

1. Create a branch from `main` prefixed with the type of change: `feat/`, `fix/`, `perf/`, `chore/`, or `docs/`.
2. Write commits using [gitmoji](https://gitmoji.dev/) with [Conventional Commits](https://www.conventionalcommits.org/), for example `:sparkles: feat: add services section`.
3. New features and fixes must include tests.
4. Before opening the pull request, run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
5. Open the pull request against `main`, describing what was done, the details, and how it was tested.
