/**
 * Testes de Produtos
 * 
 * Este arquivo testa funcionalidades relacionadas aos produtos
 */

describe('Funcionalidades de Produtos', () => {

  /**
   * Teste 1: Visualizar lista de produtos
   */
  it('Deve exibir a lista de todos os produtos', () => {
    // Navega para a página de produtos
    cy.visit('/products');
    
    // Verifica o título
    cy.get('.features_items h2').should('contain', 'All Products');
    
    // Verifica se existem produtos na lista
    cy.get('.features_items .product-image-wrapper').should('have.length.at.least', 5);
    
    // Verifica estrutura de um produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.get('img').should('be.visible'); // Imagem
      cy.get('p').should('exist'); // Nome
      cy.get('h2').should('exist'); // Preço
      cy.contains('View Product').should('be.visible'); // Link
    });
  });

  /**
   * Teste 2: Visualizar detalhes de um produto
   */
  it('Deve exibir detalhes de um produto específico', () => {
    cy.visit('/products');
    
    // Clica no primeiro produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('View Product').click();
    });
    
    // Verifica se está na página de detalhes
    cy.url().should('include', '/product_details');
    
    // Verifica se as informações estão visíveis
    cy.get('.product-information').should('be.visible');
    cy.get('.product-information h2').should('exist'); // Nome
    cy.get('.product-information p').should('contain', 'Category'); // Categoria
    cy.get('.product-information span span').should('exist'); // Preço
    cy.get('.product-information p').should('contain', 'Availability'); // Disponibilidade
  });

  /**
   * Teste 3: Buscar produtos
   */
  it('Deve buscar produtos pelo nome', () => {
    cy.visit('/products');
    
    // Digita no campo de busca
    cy.get('#search_product').type('Top');
    
    // Clica no botão de busca
    cy.get('#submit_search').click();
    
    // Verifica o título
    cy.get('.features_items h2').should('contain', 'Searched Products');
    
    // Verifica se os resultados contêm o termo buscado
    cy.get('.features_items .product-image-wrapper').should('exist');
  });

  /**
   * Teste 4: Adicionar produto ao carrinho
   */
  it('Deve adicionar produto ao carrinho', () => {
    cy.visit('/products');
    
    // Adiciona o primeiro produto ao carrinho
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Verifica se aparece o modal de confirmação
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-body p').should('contain', 'Your product has been added to cart');
    
    // Verifica botões do modal
    cy.contains('Continue Shopping').should('be.visible');
    cy.contains('View Cart').should('be.visible');
  });

  /**
   * Teste 5: Adicionar múltiplos produtos ao carrinho
   */
  it('Deve adicionar múltiplos produtos ao carrinho', () => {
    cy.visit('/products');
    
    // Adiciona primeiro produto
    cy.get('.features_items .product-image-wrapper').eq(0).within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Clica em "Continue Shopping"
    cy.contains('Continue Shopping').click();
    
    // Adiciona segundo produto
    cy.get('.features_items .product-image-wrapper').eq(1).within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Vai para o carrinho
    cy.contains('View Cart').click();
    
    // Verifica se está na página do carrinho
    cy.url().should('include', '/view_cart');
    
    // Verifica se existem 2 produtos no carrinho
    cy.get('.cart_info tbody tr').should('have.length.at.least', 2);
  });

  /**
   * Teste 6: Filtrar produtos por categoria
   */
  it('Deve filtrar produtos por categoria', () => {
    cy.visit('/products');
    
    // Clica na categoria "Women"
    cy.get('.panel-group').within(() => {
      cy.contains('a', 'Women').click();
    });
    
    // Clica na subcategoria "Dress"
    cy.get('#Women').within(() => {
      cy.contains('Dress').click();
    });
    
    // Verifica se a URL mudou
    cy.url().should('include', '/category_products');
    
    // Verifica o título
    cy.get('.features_items h2').should('be.visible');
  });

  /**
   * Teste 7: Filtrar produtos por marca (brand)
   */
  it('Deve filtrar produtos por marca', () => {
    cy.visit('/products');
    
    // Clica em uma marca
    cy.get('.brands-name').within(() => {
      cy.get('a').first().click();
    });
    
    // Verifica se a URL mudou
    cy.url().should('include', '/brand_products');
    
    // Verifica se existem produtos
    cy.get('.features_items .product-image-wrapper').should('exist');
  });

  /**
   * Teste 8: Verificar quantidade e preço no carrinho
   */
  it('Deve exibir quantidade e preço corretos no carrinho', () => {
    cy.visit('/products');
    
    // Adiciona produto ao carrinho
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Vai para o carrinho
    cy.contains('View Cart').click();
    
    // Verifica se as informações estão corretas
    cy.get('.cart_info tbody tr').first().within(() => {
      cy.get('.cart_price').should('be.visible'); // Preço unitário
      cy.get('.cart_quantity').should('be.visible'); // Quantidade
      cy.get('.cart_total_price').should('be.visible'); // Preço total
    });
  });
});

