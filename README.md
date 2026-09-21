# S07_NP1 - Suíte de Testes Automatizados no Portifólio 'Dev Juliano Aleixo'

![CI Status](https://github.com/JulianoAleixo/S07_NP1/actions/workflows/cicd.yaml/badge.svg)
![Typescript Version](https://img.shields.io/badge/typescript-5.6.3%2B-blue?logo=typescript&logoColor=white)
![Repo Size](https://img.shields.io/github/repo-size/JulianoAleixo/S07_NP1)

---

## Integrantes

| Nome              | GitHub                                            |
| ----------------- | ------------------------------------------------- |
| Eduardo Andrade   | [EduDAndrade](https://github.com/EduDAndrade)     |
| João Victor Godoy | [joaovictorgs](https://github.com/joaovictorgs)   |
| Juliano Aleixo    | [JulianoAleixo](https://github.com/JulianoAleixo) |

---

## Sobre o projeto

Este repositório reúne a suíte de testes automatizados desenvolvida para a disciplina de Qualidade de Software do INATEL, com o objetivo de exercitar o Quality-Driven Development (QDD) através de testes de interface (E2E) no padrão BDD.

O sistema sob teste é o portfólio pessoal de Juliano Aleixo ([julianoaleixo.dev](https://www.julianoaleixo.dev)), uma landing page construída com Astro e TailwindCSS, hospedada na Vercel, com backend Firestore (Google Firebase).

Os testes são executados em produção, sob uma abordagem estritamente caixa-preta, cobrindo cenários de navegação, formulário de contato, listagem de projetos e o contador de curtidas ("Likes"), com casos de dados válidos e inválidos e execução cross-browser.

---

## Instalação

### Pré-requisitos

- [NodeJS](https://nodejs.org/en/download)
- [Git](https://git-scm.com/)

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/JulianoAleixo/S07_NP1.git
cd S07_NP1
```

**2. Instale as dependências**

```bash
npm install
```

### Testando

Para rodar a suíte de testes completa, basta rodar os comandos:

```bash
npm run cy:run
```

---

## Testes de Performance (bônus)

Além da suíte funcional (Cypress), o repositório inclui testes de carga e estresse usando **k6**, na pasta `Performance/`. São testes separados: ferramenta diferente, propósito diferente (bônus, não faz parte dos 20 casos obrigatórios), sem dependência do Node/npm do projeto principal.

### Pré-requisitos

- [k6](https://k6.io) instalado (v0.57 ou superior — necessário para rodar `.ts` nativamente, sem build step).

```bash
# Windows
winget install k6 --source winget

# macOS
brew install k6

# Linux — ver instruções completas em https://k6.io/docs/get-started/installation/
```

Não é necessário `npm install` para rodar os scripts de performance — o k6 transpila o TypeScript nativamente (remove a tipagem via esbuild interno, sem checagem de tipos). O `.ts` dos scripts é só sintaxe, não passa pelo `tsconfig.json` do projeto Cypress.

### Testes incluídos

| Script                                        | Tipo              | O que verifica                                                                                                     |
| --------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Performance/scripts/homepage-load.test.ts`   | Carga (load)      | Site aguenta até 20 usuários simultâneos por ~1min, sem erro e com resposta rápida                                 |
| `Performance/scripts/homepage-stress.test.ts` | Estresse (stress) | Aumenta a concorrência gradualmente até 150 usuários simultâneos, para identificar o ponto onde a resposta degrada |
| `Performance/scripts/homepage-spike.test.ts`  | Pico (spike)      | Testa um pico repentino de tráfego (0 → 200 usuários em 10s), simulando um cenário de viralização súbita           |

### Como rodar

```bash
k6 run Performance/scripts/homepage-load.test.ts
k6 run Performance/scripts/homepage-stress.test.ts
k6 run Performance/scripts/homepage-spike.test.ts
```

### Relatórios

Cada execução gera, em `Performance/reports/`, um relatório **HTML** navegável e um **JSON** bruto (não versionados no Git — são artefatos de execução, regeráveis a qualquer momento).

### Atenção

Estes testes geram tráfego real contra o domínio de produção (`julianoaleixo.dev`). Rodar com moderação.

---

## Tecnologias Utilizadas

### Core

- **Framework de Testes E2E:** [Cypress 15.21.1](https://www.cypress.io/)
- **BDD/Gherkin:** [@badeball/cypress-cucumber-preprocessor 28.0.0](https://github.com/badeball/cypress-cucumber-preprocessor)
- **Linguagem:** [TypeScript 5.6.3](https://www.typescriptlang.org/)
- **Bundler:** [esbuild 0.23.1](https://esbuild.github.io/) (via [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor))

### Ambiente de Execução

- **Navegadores suportados:** Google Chrome, Microsoft Edge
- **Runner padrão:** Electron (headless, embutido no Cypress)

### Testes e Relatórios

- **Suíte de Testes:** Cypress (E2E) + Cucumber (BDD/Gherkin)
- **Dados de Teste:** Fixtures JSON (`cypress/fixtures/`), separadas do código dos testes
- **Relatórios Visuais:** Cypress Mochawesome Reporter

---

## Estrutura do Projeto

```bash
.
│   .gitignore
│   cypress.config.ts      # Configuração do Cypress
│   package.json           # Dependências e scripts de execução
│   README.md
│   tsconfig.json          # Configuração do TypeScript usada pelos steps e Page Objects
│
├───.github
│   └───workflows
│           cicd.yaml      # Arquivo de workflow da pipeline do github actions
│
├───Performance            # Scripts de performance 'k6'
│   ├───config
│   └───scripts
│
└───cypress
    ├───e2e                # Testes organizados por funcionalidade (feature + steps)
    │   ├───contact
    │   ├───likes
    │   ├───navigation
    │   └───projects
    │
    ├───fixtures           # Dados de teste
    │       contact.json   # Dados do formulário de contato (válidos e inválidos)
    │       projects.json  # Lista esperada de projetos exibidos no portfólio
    │
    ├───pages
    │       MainPage.ts    # Page Object único: encapsula seletores e ações da landing page
    │
    ├───screenshots        # Capturas automáticas geradas pelo Cypress em cenários que falham
    └───support
            commands.ts    # Comandos customizados do Cypress
            e2e.ts         # Ponto de entrada de configuração global do Cypress para specs e2e
```

---

## Tabela Casos de Teste

| ID     | Feature        | Cenário                                                                       | Tipo     |
| ------ | -------------- | ----------------------------------------------------------------------------- | -------- |
| TC-001 | navigation     | Viewing the main heading                                                      | Válido   |
| TC-002 | navigation     | Viewing the menu links                                                        | Válido   |
| TC-003 | navigation     | Viewing the social links in the hero section                                  | Válido   |
| TC-004 | navigation     | Navigating to the Projects section                                            | Válido   |
| TC-005 | contact        | Displaying the contact form                                                   | Válido   |
| TC-006 | contact        | Displaying the location                                                       | Válido   |
| TC-007 | contact        | Validating required fields on empty submission                                | Inválido |
| TC-008 | contact        | Rejecting submission with empty name                                          | Inválido |
| TC-009 | contact        | Rejecting submission without email                                            | Inválido |
| TC-010 | contact        | Rejecting submission with email missing "@"                                   | Inválido |
| TC-011 | contact        | Rejecting submission with email missing domain                                | Inválido |
| TC-012 | contact        | Rejecting submission with email missing TLD                                   | Inválido |
| TC-013 | contact        | Rejecting submission with empty message                                       | Inválido |
| TC-014 | projects       | Listing the expected projects                                                 | Válido   |
| TC-015 | projects       | Each project card displays an image                                           | Válido   |
| TC-016 | projects       | Accessing more projects on Github                                             | Válido   |
| TC-017 | projects       | Displaying a project without a repository link                                | Válido   |
| TC-018 | likes          | Viewing the initial like state                                                | Válido   |
| TC-019 | likes          | Liking the page                                                               | Válido   |
| TC-020 | likes          | Unliking the page¹                                                            | Inválido |
| TC-021 | navigation     | Not showing a non-existent menu item "Blog"                                   | Válido   |
| TC-022 | navigation     | Not showing a non-existent menu item "Shop"                                   | Válido   |
| TC-023 | navigation     | Social links should not point to wrong domains                                | Válido   |
| TC-024 | contact        | Not showing success message when form is submitted empty                      | Inválido |
| TC-025 | contact        | Rejecting submission with whitespace-only name                                | Inválido |
| TC-026 | contact        | Rejecting submission with whitespace-only message                             | Inválido |
| TC-027 | responsiveness | Hero section is visible on mobile viewport                                    | Válido   |
| TC-028 | responsiveness | Hero section is visible on tablet viewport                                    | Válido   |
| TC-029 | responsiveness | Contact form is usable on mobile viewport                                     | Válido   |
| TC-030 | responsiveness | Projects section is visible on mobile viewport                                | Válido   |
| TC-031 | responsiveness | Navigation is accessible on mobile                                            | Válido   |
| TC-032 | responsiveness | Like button is visible on mobile viewport                                     | Válido   |
| PT-001 | Load           | Sustains 20 concurrent users without errors or degraded response time         | Válido   |
| PT-002 | stress         | Handles increasing concurrency up to 150 users, identifying degradation point | Válido   |
| PT-003 | spike          | Recovers from sudden traffic burst (0 -> 200 users in 10s)                    | Válido   |

**Total:** 35 casos — 21 válidos / 11 inválidos / 3 Performance

¹ Cenário de falha esperada e documentada: defeito de produto no botão de like, que não implementa a ação de "descurtir". Ver seção de Riscos e Limitações no Plano de Testes.

## Prompts Utilizados

Ao longo do desenvolvimento do projeto, foi utilizado o uso de IA para pesquisa e guias em itens específicos, incluindo:

- Guia para montar a arquitetura correta de BDD com Cypress e Gherkin no início do desenvolvimento.
- Revisão de sintaxe Gherkin e discussão de particionamento de equivalência/análise de valor limite para os cenários negativos do formulário de contato.
- Implementação dos steps, Page Object e fixtures em TypeScript, seguindo o padrão do projeto.
- Investigação de comportamentos inesperados do navegador (validação de e-mail via HTML5, filtragem de espaço em `input[type=email]`), levando à documentação de uma limitação real de validação do produto.
- Configuração e depuração do reporter de execução (Cypress + Cucumber via `cypress-mochawesome-reporter`).
- Criação e organização da suíte de testes de performance (k6), incluindo os testes de carga, estresse e pico, e a investigação do bloqueio de tráfego (HTTP 403) identificado sob alta concorrência.
- Validação do escopo do projeto se a suíte atende todos os requisitos solicitados.
- Troubleshootings ao longo do desenvolvimento.

Toda decisão em torno do código, dos critérios de aceite e do escopo final de cada cenário foi tomada pelo grupo.
