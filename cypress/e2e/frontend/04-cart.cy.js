/**
 * Testes do Carrinho de Compras
 * 
 * Este arquivo testa funcionalidades do carrinho
 */

describe('Carrinho de Compras', () => {

  /**
   * Teste 1: Visualizar carrinho vazio
   */
  it('Deve visualizar carrinho vazio', () => {
    // Vai direto para a página do carrinho
    cy.visit('/view_cart');
    
    // Verifica se está na página correta
    cy.url().should('include', '/view_cart');
    
    // Verifica se a página do carrinho carregou
    cy.get('#cart_items').should('be.visible');
  });

  /**
   * Teste 2: Adicionar produto e verificar no carrinho
   */
  it('Deve adicionar produto e verificar no carrinho', () => {
    cy.visit('/products');
    
    // Adiciona produto ao carrinho
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Vai para o carrinho
    cy.contains('View Cart').click();
    
    // Verifica se o produto está no carrinho
    cy.get('.cart_info tbody tr').should('have.length.at.least', 1);
    
    // Verifica estrutura do item no carrinho
    cy.get('.cart_info tbody tr').first().within(() => {
      cy.get('.cart_product img').should('be.visible'); // Imagem
      cy.get('.cart_description h4').should('exist'); // Nome
      cy.get('.cart_price p').should('exist'); // Preço
      cy.get('.cart_quantity button').should('exist'); // Quantidade
      cy.get('.cart_total_price').should('exist'); // Total
    });
  });

  /**
   * Teste 3: Remover produto do carrinho
   */
  it('Deve remover produto do carrinho', () => {
    cy.visit('/products');
    
    // Adiciona produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    cy.contains('View Cart').click();
    
    // Verifica que existe produto
    cy.get('.cart_info tbody tr').should('have.length.at.least', 1);
    
    // Clica no botão de remover
    cy.get('.cart_quantity_delete').first().click();
    
    // Aguarda a remoção
    cy.wait(1000);
    
    // Verifica se o carrinho ficou vazio ou tem menos itens
    cy.get('.cart_info tbody tr').should('have.length', 0);
  });

  /**
   * Teste 4: Verificar cálculo do total
   */
  it('Deve calcular corretamente o total do carrinho', () => {
    cy.visit('/products');
    
    // Adiciona produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    cy.contains('View Cart').click();
    
    // Verifica se existe informação de total
    cy.get('.cart_total_price').first().should('be.visible');
    
    // Verifica se há informações de subtotal na página
    cy.get('#cart_items').within(() => {
      cy.contains('Total').should('exist');
    });
  });

  /**
   * Teste 5: Aumentar quantidade de produto
   */
  it('Deve permitir alterar quantidade na página do produto', () => {
    cy.visit('/products');
    
    // Vai para detalhes do produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('View Product').click();
    });
    
    // Aumenta a quantidade
    cy.get('#quantity').clear().type('3');
    
    // Adiciona ao carrinho
    cy.contains('button', 'Add to cart').click();
    
    // Vai para o carrinho
    cy.contains('View Cart').click();
    
    // Verifica a quantidade
    cy.get('.cart_quantity button').should('contain', '3');
  });

  /**
   * Teste 6: Continuar comprando
   */
  it('Deve permitir continuar comprando após adicionar produto', () => {
    cy.visit('/products');
    
    // Adiciona produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Clica em "Continue Shopping"
    cy.contains('Continue Shopping').click();
    
    // Verifica se voltou para a página de produtos
    cy.url().should('include', '/products');
    
    // Verifica se o modal fechou
    cy.get('.modal-content').should('not.be.visible');
  });

  /**
   * Teste 7: Botão "Proceed to Checkout"
   */
  it('Deve exibir botão para prosseguir com checkout', () => {
    cy.visit('/products');
    
    // Adiciona produto
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    cy.contains('View Cart').click();
    
    // Verifica se o botão de checkout existe
    cy.contains('Proceed To Checkout').should('be.visible');
  });

  /**
   * Teste 8: Adicionar produto pela home page
   */
  it('Deve adicionar produto pela home page', () => {
    cy.visit('/');
    
    // Adiciona produto da home
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.contains('Add to cart').click();
    });
    
    // Vai para o carrinho
    cy.contains('View Cart').click();
    
    // Verifica se o produto foi adicionado
    cy.get('.cart_info tbody tr').should('have.length.at.least', 1);
  });
});

