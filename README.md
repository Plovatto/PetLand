# 🐾 PetLand

Landing page responsiva desenvolvida para um petshop fictício, com foco em uma experiência moderna, agradável e intuitiva.

O projeto foi criado como parte do meu portfólio pessoal para praticar desenvolvimento front-end, responsividade, organização de componentes e construção de interfaces modernas.

> **Nota:** Este é um projeto fictício e não representa uma empresa real.

## ✨ Funcionalidades

* Layout responsivo para diferentes tamanhos de tela
* Navegação fluida entre as seções
* Animações e transições de interface
* Smooth scroll
* Apresentação de serviços em carrossel
* Formulário de contato integrado ao EmailJS
* Componentes reutilizáveis
* Interface desenvolvida com foco em usabilidade e experiência do usuário

## 🛠️ Tecnologias

* [React](https://react.dev/) 19
* [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vite.dev/)
* [Tailwind CSS](https://tailwindcss.com/) 4
* [Motion](https://motion.dev/) — animações e transições
* [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
* [EmailJS](https://www.emailjs.com/) — envio do formulário de contato
* [Swiper](https://swiperjs.com/) — carrossel de serviços
* ESLint — análise e padronização do código
* Prettier — formatação do código

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, tenha instalado:

* [Node.js](https://nodejs.org/)
* npm

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Plovatto/PetLand.git
```

Acesse a pasta do projeto:

```bash
cd petland
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env.local
```

Preencha as credenciais do EmailJS em `.env.local` e execute:

```bash
npm run dev
```

O projeto estará disponível em:

```text
http://localhost:5173
```

## 🔐 Variáveis de ambiente

As variáveis são definidas no arquivo `.env.local`, que não deve ser versionado.

Utilize `.env.example` como referência:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

## 📜 Scripts

| Comando                | Descrição                                              |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Inicia o servidor de desenvolvimento                   |
| `npm run build`        | Executa a checagem de tipos e gera o build de produção |
| `npm run preview`      | Executa localmente o build de produção                 |
| `npm run lint`         | Executa a análise do código com ESLint                 |
| `npm run format`       | Formata o código com Prettier                          |
| `npm run format:check` | Verifica a formatação sem alterar os arquivos          |

## 📁 Estrutura do projeto

```text
src/
├── assets/                 # Imagens e SVGs utilizados pelos componentes
├── components/
│   ├── layout/             # Componentes estruturais, como Header e Footer
│   ├── sections/           # Seções da página, como Hero, Services, About e Contact
│   └── ui/                 # Componentes reutilizáveis, como Button e SectionTitle
├── constants/              # Dados estáticos, links, serviços e informações de contato
├── hooks/                  # Hooks customizados
├── lib/                    # Integrações e funções utilitárias
├── types/                  # Tipos TypeScript compartilhados
├── styles/
│   └── index.css           # Estilos globais e configuração do Tailwind CSS
├── App.tsx
└── main.tsx
```

## 🎯 Objetivos do projeto

O PetLand foi desenvolvido com o objetivo de praticar e demonstrar conhecimentos em:

* Desenvolvimento de interfaces com React e TypeScript
* Criação de layouts responsivos
* Componentização e reutilização de código
* Organização de projetos front-end
* Animações e microinterações
* Integração com serviços externos
* Boas práticas de desenvolvimento

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.
