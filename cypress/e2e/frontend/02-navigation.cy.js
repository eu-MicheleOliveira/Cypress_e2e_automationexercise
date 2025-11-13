/**
 * Testes de Navegação
 * 
 * Este arquivo testa a navegação entre as páginas do site
 */

describe('Navegação do Site', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  /**
   * Teste 1: Navegar para página de produtos
   */
  it('Deve navegar para a página de produtos', () => {
    // Clica no link "Products"
    cy.contains('a', 'Products').click();
    
    // Verifica se a URL mudou
    cy.url().should('include', '/products');
    
    // Verifica se o título da página está correto
    cy.get('.features_items h2').should('contain', 'All Products');
  });

  /**
   * Teste 2: Navegar para página de login
   */
  it('Deve navegar para a página de login/cadastro', () => {
    // Clica no link "Signup / Login"
    cy.contains('a', 'Signup / Login').click();
    
    // Verifica se a URL mudou
    cy.url().should('include', '/login');
    
    // Verifica se os formulários estão visíveis
    cy.contains('h2', 'Login to your account').should('be.visible');
    cy.contains('h2', 'New User Signup!').should('be.visible');
  });

  /**
   * Teste 3: Navegar para página de carrinho
   */
  it('Deve navegar para a página do carrinho', () => {
    // Clica no link "Cart"
    cy.contains('a', 'Cart').click();
    
    // Verifica se a URL mudou
    cy.url().should('include', '/view_cart');
  });

  /**
   * Teste 4: Navegar para página de contato
   */
  it('Deve navegar para a página de contato', () => {
    // Clica no link "Contact us"
    cy.contains('a', 'Contact us').click();
    
    // Verifica se a URL mudou
    cy.url().should('include', '/contact_us');
    
    // Verifica se o formulário está visível
    cy.get('.contact-form').should('be.visible');
  });

  /**
   * Teste 5: Voltar para home clicando no logo
   */
  it('Deve voltar para home ao clicar no logo', () => {
    // Navega para outra página primeiro
    cy.contains('a', 'Products').click();
    cy.url().should('include', '/products');
    
    // Clica no logo para voltar
    cy.get('img[alt="Website for automation practice"]').click();
    
    // Verifica se voltou para a home
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  /**
   * Teste 6: Navegação via menu dropdown de categorias
   */
  it('Deve navegar pelas categorias de produtos', () => {
    // Clica no link "Products"
    cy.contains('a', 'Products').click();
    
    // Verifica se o painel de categorias está visível
    cy.get('.left-sidebar').should('be.visible');
    
    // Clica para expandir categoria "Women"
    cy.get('.panel-group').within(() => {
      cy.contains('a', 'Women').click();
    });
    
    // Verifica se as subcategorias aparecem
    cy.get('#Women').should('be.visible');
    cy.get('#Women').within(() => {
      cy.contains('Dress').should('be.visible');
      cy.contains('Tops').should('be.visible');
    });
  });

  /**
   * Teste 7: Navegação breadcrumb
   */
  it('Deve exibir e usar navegação breadcrumb', () => {
    // Clica no link "Products"
    cy.contains('a', 'Products').click();
    
    // Clica em um produto específico
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('View Product').click();
    });
    
    // Verifica se está na página de detalhes
    cy.url().should('include', '/product_details');
  });
});

