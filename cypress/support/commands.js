// ***********************************************
// Comandos customizados do Cypress
// ***********************************************

/**
 * Comando para fazer login no site
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * 
 * Exemplo de uso:
 * cy.login('teste@email.com', 'senha123')
 */
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

/**
 * Comando para fazer cadastro no site
 * @param {object} userData - Dados do usuário
 * 
 * Exemplo de uso:
 * cy.signup({ name: 'João', email: 'joao@email.com', password: 'senha123' })
 */
Cypress.Commands.add('signup', (userData) => {
  cy.visit('/login');
  cy.get('[data-qa="signup-name"]').type(userData.name);
  cy.get('[data-qa="signup-email"]').type(userData.email);
  cy.get('[data-qa="signup-button"]').click();
});

/**
 * Comando para adicionar produto ao carrinho
 * @param {number} productIndex - Índice do produto (começa em 0)
 * 
 * Exemplo de uso:
 * cy.addToCart(0)
 */
Cypress.Commands.add('addToCart', (productIndex) => {
  cy.get('.features_items .product-image-wrapper')
    .eq(productIndex)
    .within(() => {
      cy.contains('Add to cart').click();
    });
});

/**
 * Comando para verificar se está logado
 * 
 * Exemplo de uso:
 * cy.checkLoggedIn()
 */
Cypress.Commands.add('checkLoggedIn', () => {
  cy.get('a').contains('Logout').should('be.visible');
});

/**
 * Comando para fazer requisição API com log
 * @param {object} options - Opções da requisição
 * 
 * Exemplo de uso:
 * cy.apiRequest({ method: 'GET', url: '/productsList' })
 */
Cypress.Commands.add('apiRequest', (options) => {
  cy.log(`API Request: ${options.method} ${options.url}`);
  return cy.request(options).then((response) => {
    cy.log(`Response Status: ${response.status}`);
    
    // Parse automaticamente se vier como string
    if (typeof response.body === 'string') {
      try {
        response.body = JSON.parse(response.body);
      } catch (e) {
        cy.log('Resposta não é JSON válido');
      }
    }
    
    return response;
  });
});

/**
 * Função auxiliar para fazer parse de resposta JSON
 * @param {any} body - Corpo da resposta
 * @returns {object} - Objeto JSON parseado
 * 
 * Uso interno nos testes de API
 */
Cypress.Commands.add('parseApiResponse', (body) => {
  return typeof body === 'string' ? JSON.parse(body) : body;
});

