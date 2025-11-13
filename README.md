# 🧪 Projeto de Testes Automatizados - AutomationExercise

[![Cypress Tests](https://github.com/seu-usuario/seu-repositorio/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/seu-usuario/seu-repositorio/actions/workflows/cypress-tests.yml)

Projeto de testes automatizados desenvolvido com **Cypress** para o site de prática [AutomationExercise](https://automationexercise.com/). Este projeto foi criado como material acadêmico para alunos de graduação aprenderem sobre automação de testes.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando os Testes](#executando-os-testes)
- [Tipos de Testes](#tipos-de-testes)
- [Pipeline CI/CD](#pipeline-cicd)
- [Comandos Úteis](#comandos-úteis)
- [Boas Práticas](#boas-práticas)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este projeto contém testes automatizados divididos em duas categorias:

- **Testes de Frontend (UI)**: Testam a interface do usuário e interações do site
- **Testes de Backend (API)**: Testam os endpoints da API REST

O objetivo é fornecer exemplos práticos e didáticos de como criar, organizar e executar testes automatizados utilizando o framework Cypress.

## 🚀 Tecnologias Utilizadas

- **[Cypress](https://www.cypress.io/)** - Framework de testes E2E
- **JavaScript** - Linguagem de programação
- **Node.js** - Ambiente de execução
- **GitHub Actions** - Pipeline CI/CD
- **npm** - Gerenciador de pacotes

## 📁 Estrutura do Projeto

```
projeto-cypress/
├── .github/
│   └── workflows/
│       └── cypress-tests.yml          # Pipeline CI/CD
├── cypress/
│   ├── e2e/
│   │   ├── frontend/                  # Testes de UI
│   │   │   ├── 01-home-page.cy.js
│   │   │   ├── 02-navigation.cy.js
│   │   │   ├── 03-products.cy.js
│   │   │   ├── 04-cart.cy.js
│   │   │   ├── 05-contact.cy.js
│   │   │   └── 06-search.cy.js
│   │   └── backend/                   # Testes de API
│   │       ├── 01-api-products.cy.js
│   │       ├── 02-api-user.cy.js
│   │       ├── 03-api-search.cy.js
│   │       └── 04-api-validation.cy.js
│   ├── fixtures/                      # Dados de teste
│   │   ├── users.json
│   │   └── products.json
│   ├── support/
│   │   ├── commands.js               # Comandos customizados
│   │   └── e2e.js                    # Configurações globais
├── cypress.config.js                 # Configuração do Cypress
├── package.json                      # Dependências do projeto
├── .gitignore                        # Arquivos ignorados pelo Git
└── README.md                         # Documentação (este arquivo)
```

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior) - [Download](https://nodejs.org/)
- **npm** (geralmente vem com o Node.js)
- **Git** - [Download](https://git-scm.com/)
- Um editor de código (recomendado: [VS Code](https://code.visualstudio.com/))

### Verificar instalação:

```bash
node --version
npm --version
git --version
```

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

Isso irá instalar o Cypress e todas as dependências necessárias.

## 🎮 Executando os Testes

### Modo Interativo (Recomendado para Desenvolvimento)

Abre a interface gráfica do Cypress onde você pode selecionar e executar testes individualmente:

```bash
npm run cypress:open
```

### Modo Headless (Execução em Terminal)

Executa todos os testes em modo headless (sem interface gráfica):

```bash
npm run cypress:run
```

### Executar apenas testes de Frontend

```bash
npm run test:frontend
```

### Executar apenas testes de Backend (API)

```bash
npm run test:backend
```

### Executar todos os testes

```bash
npm run test:all
```

### Executar em navegadores específicos

```bash
# Chrome
npm run test:chrome

# Firefox
npm run test:firefox

# Com interface gráfica
npm run test:headed
```

## 🧪 Tipos de Testes

### 1. Testes de Frontend (UI)

Testam a interface do usuário e as interações:

- **01-home-page.cy.js**: Testes da página inicial
  - Carregamento da página
  - Elementos visíveis
  - Carrossel de imagens
  - Produtos em destaque
  - Rodapé e newsletter

- **02-navigation.cy.js**: Testes de navegação
  - Links do menu
  - Navegação entre páginas
  - Breadcrumbs
  - Categorias de produtos

- **03-products.cy.js**: Testes de produtos
  - Listagem de produtos
  - Detalhes do produto
  - Busca de produtos
  - Adicionar ao carrinho
  - Filtros por categoria e marca

- **04-cart.cy.js**: Testes do carrinho
  - Visualizar carrinho
  - Adicionar produtos
  - Remover produtos
  - Cálculo de totais
  - Alterar quantidades

- **05-contact.cy.js**: Testes de contato
  - Formulário de contato
  - Validações de campos
  - Envio de mensagem

- **06-search.cy.js**: Testes de busca
  - Buscar produtos existentes
  - Buscar produtos inexistentes
  - Validações de busca

### 2. Testes de Backend (API)

Testam os endpoints da API REST:

- **01-api-products.cy.js**: Testes de produtos via API
  - GET /productsList
  - GET /brandsList
  - Validações de métodos HTTP
  - Tempo de resposta

- **02-api-user.cy.js**: Testes de usuários via API
  - POST /createAccount
  - DELETE /deleteAccount
  - PUT /updateAccount
  - POST /verifyLogin
  - Validações de campos obrigatórios

- **03-api-search.cy.js**: Testes de busca via API
  - POST /searchProduct
  - Validações de parâmetros
  - Testes com diferentes tipos de entrada

- **04-api-validation.cy.js**: Testes de validação da API
  - Disponibilidade da API
  - Formato de resposta
  - CORS
  - Timeout
  - Rate limiting

## 🔄 Pipeline CI/CD

O projeto utiliza **GitHub Actions** para executar os testes automaticamente.

### Quando a Pipeline é Executada

- ✅ Quando há **push** para as branches `main` ou `master`
- ✅ Quando há **pull request** para `main` ou `master`
- ✅ Manualmente pela interface do GitHub (workflow_dispatch)

### Jobs da Pipeline

1. **frontend-tests**: Executa testes de UI em Chrome, Firefox e Edge
2. **backend-tests**: Executa testes de API
3. **all-tests**: Executa todos os testes (após os anteriores passarem)

### Artefatos Gerados

- 📹 Vídeos dos testes (salvos por 30 dias)
- 📸 Screenshots de falhas (salvos por 30 dias)

### Visualizar Resultados

1. Acesse seu repositório no GitHub
2. Vá em **Actions**
3. Clique no workflow mais recente
4. Veja os resultados de cada job
5. Baixe os artefatos se necessário

## 💻 Comandos Úteis

### NPM Scripts

```bash
# Abrir Cypress em modo interativo
npm run cypress:open

# Executar testes em modo headless
npm run cypress:run

# Executar testes de frontend
npm run test:frontend

# Executar testes de backend
npm run test:backend

# Executar todos os testes
npm run test:all

# Executar no Chrome
npm run test:chrome

# Executar no Firefox
npm run test:firefox

# Executar com interface gráfica
npm run test:headed
```

### Comandos Cypress

```bash
# Executar arquivo específico
npx cypress run --spec "cypress/e2e/frontend/01-home-page.cy.js"

# Executar em navegador específico
npx cypress run --browser chrome

# Executar com configuração customizada
npx cypress run --config viewportWidth=1920,viewportHeight=1080

# Limpar cache do Cypress
npx cypress cache clear
```

## 📚 Comandos Customizados

O projeto inclui comandos customizados do Cypress definidos em `cypress/support/commands.js`:

### cy.login(email, password)
Faz login no site.

```javascript
cy.login('usuario@email.com', 'senha123');
```

### cy.signup(userData)
Faz cadastro de novo usuário.

```javascript
cy.signup({
  name: 'João Silva',
  email: 'joao@email.com',
  password: 'senha123'
});
```

### cy.addToCart(productIndex)
Adiciona produto ao carrinho pelo índice.

```javascript
cy.addToCart(0); // Adiciona o primeiro produto
```

### cy.checkLoggedIn()
Verifica se o usuário está logado.

```javascript
cy.checkLoggedIn();
```

### cy.apiRequest(options)
Faz requisição API com log automático.

```javascript
cy.apiRequest({
  method: 'GET',
  url: '/productsList'
});
```

## 🎓 Conceitos Importantes

### 1. Seletores

O Cypress suporta vários tipos de seletores:

```javascript
// Por atributo data-qa (melhor prática)
cy.get('[data-qa="login-button"]')

// Por classe CSS
cy.get('.product-image-wrapper')

// Por ID
cy.get('#search_product')

// Por texto
cy.contains('Add to cart')
```

### 2. Assertions (Verificações)

```javascript
// Verificar existência
cy.get('.logo').should('exist')

// Verificar visibilidade
cy.get('.menu').should('be.visible')

// Verificar texto
cy.get('h1').should('contain', 'Welcome')

// Verificar valor
cy.get('input').should('have.value', 'teste')

// Múltiplas verificações
cy.get('button')
  .should('be.visible')
  .and('be.enabled')
  .and('contain', 'Submit')
```

### 3. Interações

```javascript
// Clicar
cy.get('button').click()

// Digitar
cy.get('input').type('texto')

// Limpar
cy.get('input').clear()

// Selecionar dropdown
cy.get('select').select('option1')

// Checkbox
cy.get('input[type="checkbox"]').check()
```

### 4. Esperas

```javascript
// Espera implícita (automática)
cy.get('.element') // Espera até 4 segundos por padrão

// Espera explícita
cy.wait(1000) // Espera 1 segundo

// Espera por requisição
cy.intercept('GET', '/api/products').as('getProducts')
cy.wait('@getProducts')
```

## 🎯 Boas Práticas

### ✅ Faça

- Use seletores `data-qa` quando possível
- Escreva testes independentes e isolados
- Use fixtures para dados de teste
- Crie comandos customizados para ações repetitivas
- Adicione comentários explicativos nos testes
- Organize testes em describes e its lógicos
- Use beforeEach para preparar o ambiente
- Verifique múltiplas asserções quando relevante

### ❌ Evite

- Testes que dependem de outros testes
- Esperas fixas (cy.wait(5000))
- Seletores frágeis que podem quebrar facilmente
- Testar a mesma coisa em múltiplos lugares
- Testes muito longos (quebre em testes menores)
- Dados hardcoded (use fixtures)

## 🔧 Configuração do Cypress

Principais configurações em `cypress.config.js`:

```javascript
{
  baseUrl: 'https://automationexercise.com',  // URL base
  viewportWidth: 1280,                         // Largura da tela
  viewportHeight: 720,                         // Altura da tela
  defaultCommandTimeout: 10000,                // Timeout padrão
  pageLoadTimeout: 60000,                      // Timeout de página
  video: true,                                 // Gravar vídeos
  screenshotOnRunFailure: true                 // Screenshot em falhas
}
```

## 🐛 Depuração (Debug)

### Modo Interativo

1. Execute `npm run cypress:open`
2. Clique no teste desejado
3. Use o Time Travel do Cypress para ver cada passo
4. Clique em comandos para ver detalhes
5. Use o DevTools do navegador

### Comandos de Debug

```javascript
// Pausar execução
cy.pause()

// Debug de elemento
cy.get('.element').debug()

// Log no console
cy.log('Mensagem de debug')

// Ver valor de variável
cy.wrap(variavel).then(console.log)
```

## 📊 Relatórios

Os vídeos e screenshots são gerados automaticamente:

- **Vídeos**: `cypress/videos/`
- **Screenshots**: `cypress/screenshots/`

## 🔗 Links Úteis

- [Documentação Oficial do Cypress](https://docs.cypress.io/)
- [Site de Teste - AutomationExercise](https://automationexercise.com/)
- [API Documentation](https://automationexercise.com/api_list)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Material Acadêmico** - Projeto educacional para graduação

## 🙏 Agradecimentos

- [AutomationExercise](https://automationexercise.com/) por fornecer o site de prática
- [Cypress.io](https://www.cypress.io/) pelo excelente framework de testes
- Comunidade de QA e desenvolvedores

---

## 📞 Suporte

Se você tiver dúvidas ou problemas:

1. Verifique a [documentação do Cypress](https://docs.cypress.io/)
2. Procure por issues similares no repositório
3. Abra uma nova issue descrevendo o problema

---

**Bons testes! 🚀**

