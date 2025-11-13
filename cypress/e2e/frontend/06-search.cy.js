/**
 * Testes de Busca
 * 
 * Este arquivo testa a funcionalidade de busca de produtos
 */

describe('Funcionalidade de Busca', () => {

  beforeEach(() => {
    cy.visit('/products');
  });

  /**
   * Teste 1: Verificar elementos de busca
   */
  it('Deve exibir campo de busca na página de produtos', () => {
    // Verifica se o campo de busca existe
    cy.get('#search_product').should('be.visible');
    
    // Verifica se o botão de busca existe
    cy.get('#submit_search').should('be.visible');
    
    // Verifica o ícone de busca
    cy.get('#submit_search i').should('have.class', 'fa-search');
  });

  /**
   * Teste 2: Buscar produto existente
   */
  it('Deve buscar e encontrar produtos existentes', () => {
    // Carrega dados do fixture
    cy.fixture('products').then((products) => {
      // Digite o termo de busca
      cy.get('#search_product').type(products.searchTerms.valid);
      
      // Clica no botão de busca
      cy.get('#submit_search').click();
      
      // Verifica o título dos resultados
      cy.get('.features_items h2').should('contain', 'Searched Products');
      
      // Verifica se há produtos nos resultados
      cy.get('.features_items .product-image-wrapper').should('have.length.at.least', 1);
      
      // Verifica se o nome do produto aparece nos resultados
      cy.get('.features_items').should('contain', products.searchTerms.valid);
    });
  });

  /**
   * Teste 3: Buscar produto inexistente
   */
  it('Deve buscar produto inexistente', () => {
    cy.fixture('products').then((products) => {
      // Digite termo que não existe
      cy.get('#search_product').type(products.searchTerms.invalid);
      
      // Clica no botão de busca
      cy.get('#submit_search').click();
      
      // Verifica o título dos resultados
      cy.get('.features_items h2').should('contain', 'Searched Products');
      
      // Verifica que não há produtos
      cy.get('.features_items .product-image-wrapper').should('have.length', 0);
    });
  });

  /**
   * Teste 4: Buscar com campo vazio
   */
  it('Deve buscar com campo vazio e retornar todos os produtos', () => {
    // Deixa o campo vazio e clica em buscar
    cy.get('#submit_search').click();
    
    // Verifica o título (pode ser "Searched Products" ou "All Products")
    cy.get('.features_items h2').then(($title) => {
      const text = $title.text();
      expect(text).to.match(/Searched Products|All Products/);
    });
    
    // Verifica se há produtos (deve retornar todos)
    cy.get('.features_items .product-image-wrapper').should('have.length.at.least', 1);
  });

  /**
   * Teste 5: Buscar com termo parcial
   */
  it('Deve buscar produtos com termo parcial', () => {
    // Busca apenas "Top"
    cy.get('#search_product').type('Top');
    cy.get('#submit_search').click();
    
    // Verifica resultados
    cy.get('.features_items h2').should('contain', 'Searched Products');
    cy.get('.features_items .product-image-wrapper').should('exist');
  });

  /**
   * Teste 6: Buscar com letras maiúsculas e minúsculas
   */
  it('Deve buscar independente de maiúsculas/minúsculas', () => {
    // Busca com maiúsculas
    cy.get('#search_product').type('BLUE TOP');
    cy.get('#submit_search').click();
    
    // Verifica se encontrou resultados
    cy.get('.features_items h2').should('contain', 'Searched Products');
  });

  /**
   * Teste 7: Adicionar produto ao carrinho a partir da busca
   */
  it('Deve adicionar produto ao carrinho a partir da busca', () => {
    // Busca produto
    cy.get('#search_product').type('Top');
    cy.get('#submit_search').click();
    
    // Adiciona o primeiro resultado ao carrinho
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Verifica modal de confirmação
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body p').should('contain', 'added to cart');
  });

  /**
   * Teste 8: Visualizar detalhes do produto a partir da busca
   */
  it('Deve visualizar detalhes do produto a partir da busca', () => {
    // Busca produto
    cy.get('#search_product').type('Dress');
    cy.get('#submit_search').click();
    
    // Clica em "View Product" do primeiro resultado
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('View Product').click();
    });
    
    // Verifica se está na página de detalhes
    cy.url().should('include', '/product_details');
    cy.get('.product-information').should('be.visible');
  });
});

