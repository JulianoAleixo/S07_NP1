# S07_NP1 - Suíte de Testes Automatizados no Portifólio 'Dev Juliano Aleixo'

<!-- ![CI Status](https://github.com/JulianoAleixo/S07_NP1/actions/workflows/cicd.yaml/badge.svg) -->
![Python Version](https://img.shields.io/badge/typescript-5.6.3%2B-blue?logo=typescript&logoColor=white)
![Repo Size](https://img.shields.io/github/repo-size/JulianoAleixo/S07_NP1)

---

## Integrantes

| Nome              | GitHub                                                  |
|-------------------|---------------------------------------------------------|
| Eduardo Andrade   | [EduDAndrade](https://github.com/EduDAndrade) |
| João Victor Godoy | [joaovictorgs](https://github.com/joaovictorgs) |
| Juliano Aleixo    | [JulianoAleixo](https://github.com/JulianoAleixo)       |

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

## Tecnologias Utilizadas

### Core
* **Framework de Testes E2E:** [Cypress 15.21.1](https://www.cypress.io/)
* **BDD/Gherkin:** [@badeball/cypress-cucumber-preprocessor 28.0.0](https://github.com/badeball/cypress-cucumber-preprocessor)
* **Linguagem:** [TypeScript 5.6.3](https://www.typescriptlang.org/)
* **Bundler:** [esbuild 0.23.1](https://esbuild.github.io/) (via [@bahmutov/cypress-esbuild-preprocessor](https://github.com/bahmutov/cypress-esbuild-preprocessor))

### Ambiente de Execução
* **Navegadores suportados:** Google Chrome, Microsoft Edge
* **Runner padrão:** Electron (headless, embutido no Cypress)

### Testes e Relatórios
* **Suíte de Testes:** Cypress (E2E) + Cucumber (BDD/Gherkin)
* **Dados de Teste:** Fixtures JSON (`cypress/fixtures/`), separadas do código dos testes
* **Relatórios Visuais:**  <!-- TODO -->

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

## Tabela Casos de Teste

| ID     | Feature    | Cenário                                                      | Tipo      |
|--------|------------|--------------------------------------------------------------|-----------|
| TC-001 | navigation | Viewing the main heading                                     | Válido    |
| TC-002 | navigation | Viewing the menu links                                       | Válido    |
| TC-003 | navigation | Viewing the social links in the hero section                 | Válido    |
| TC-004 | navigation | Navigating to the Projects section                           | Válido    |
| TC-005 | contact    | Displaying the contact form                                  | Válido    |
| TC-006 | contact    | Displaying the location                                      | Válido    |
| TC-007 | contact    | Validating required fields on empty submission               | Inválido  |
| TC-008 | contact    | Rejecting submission with empty name                         | Inválido  |
| TC-009 | contact    | Rejecting submission without email                           | Inválido  |
| TC-010 | contact    | Rejecting submission with email missing "@"                  | Inválido  |
| TC-011 | contact    | Rejecting submission with email missing domain               | Inválido  |
| TC-012 | contact    | Rejecting submission with a trailing dot in the email domain | Inválido  |
| TC-013 | contact    | Rejecting submission with email containing space             | Inválido  |
| TC-014 | contact    | Rejecting submission with empty message                      | Inválido  |
| TC-015 | projects   | Listing the expected projects                                | Válido    |
| TC-016 | projects   | Each project card displays an image                          | Válido    |
| TC-017 | projects   | Accessing more projects on Github                            | Válido    |
| TC-018 | projects   | Displaying a project without a repository link               | Inválido  |
| TC-019 | likes      | Viewing the initial like state                               | Válido    |
| TC-020 | likes      | Liking the page                                              | Válido    |
| TC-021 | likes      | Unliking the page¹                                           | Inválido  |

**Total:** 21 casos — 11 válidos / 10 inválidos

¹ Falha esperada e documentada: defeito de produto (botão de Like sem função de "descurtir"). Ver seção de Riscos e Limitações no Plano de Testes.

## Prompts Utilizados

Ao longo do desenvolvimento do projeto, foi utilizado o uso de IA para pesquisa e guias em itens específicos. Todo o resumo de histórico de prompts pode ser acessado no arquivo `PROMPTS.md`.