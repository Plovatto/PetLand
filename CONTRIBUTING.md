# Como contribuir

## Reportando problemas

Abra uma [issue](https://github.com/Plovatto/PetLand/issues) descrevendo o problema, os passos para reproduzir e o comportamento esperado. Falhas de segurança devem ser reportadas pela [política de segurança](SECURITY.md).

## Enviando alterações

1. Crie uma branch a partir da `main` com o prefixo do tipo da alteração: `feat/`, `fix/`, `perf/`, `chore/` ou `docs/`.
2. Use commits no padrão [gitmoji](https://gitmoji.dev/) com [Conventional Commits](https://www.conventionalcommits.org/), por exemplo `:sparkles: feat: add services section`.
3. Funcionalidades novas e correções devem vir acompanhadas de testes.
4. Antes de abrir o pull request, rode `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test` e `npm run build`.
5. Abra o pull request para a `main` descrevendo o que foi feito, os detalhes e como foi testado.
