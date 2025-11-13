/**
 * Testes da Página Inicial (Home Page)
 * 
 * Este arquivo contém testes básicos para verificar
 * se a página inicial está funcionando corretamente
 */

describe('Página Inicial - Home Page', () => {
  
  /**
   * beforeEach: Executa antes de cada teste
   * Útil para preparar o ambiente de teste
   */
  beforeEach(() => {
    // Visita a página inicial do site
    cy.visit('/');
  });

  /**
   * Teste 1: Verificar se a página carrega corretamente
   */
  it('Deve carregar a página inicial com sucesso', () => {
    // Verifica se a URL está correta
    cy.url().should('include', 'automationexercise.com');
    
    // Verifica se o título da página contém "Automation Exercise"
    cy.title().should('include', 'Automation Exercise');
  });

  /**
   * Teste 2: Verificar elementos visíveis na página
   */
  it('Deve exibir os elementos principais da página', () => {
    // Verifica se o logo está visível
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
    
    // Verifica se o menu de navegação está visível
    cy.get('.navbar-nav').should('be.visible');
    
    // Verifica se existe link para "Home"
    cy.contains('a', 'Home').should('be.visible');
    
    // Verifica se existe link para "Products"
    cy.contains('a', 'Products').should('be.visible');
  });

  /**
   * Teste 3: Verificar slider/carrossel da página inicial
   */
  it('Deve exibir o carrossel de imagens', () => {
    // Verifica se o carrossel existe
    cy.get('#slider-carousel').should('be.visible');
    
    // Verifica se contém imagens
    cy.get('#slider-carousel .item').should('exist');
  });

  /**
   * Teste 4: Verificar seção de produtos em destaque
   */
  it('Deve exibir produtos em destaque', () => {
    // Verifica o título "Features Items"
    cy.get('.features_items h2').should('contain', 'Features Items');
    
    // Verifica se existem produtos listados
    cy.get('.features_items .product-image-wrapper').should('have.length.at.least', 1);
    
    // Verifica se o primeiro produto tem nome e preço
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.get('p').should('exist'); // Nome do produto
      cy.get('h2').should('exist'); // Preço do produto
    });
  });

  /**
   * Teste 5: Verificar rodapé da página
   */
  it('Deve exibir o rodapé com informações', () => {
    // Rola até o final da página
    cy.scrollTo('bottom');
    
    // Verifica se o rodapé existe
    cy.get('footer').should('be.visible');
    
    // Verifica se contém o texto de copyright
    cy.get('footer').should('contain', 'Copyright');
  });

  /**
   * Teste 6: Verificar formulário de newsletter
   */
  it('Deve exibir formulário de inscrição na newsletter', () => {
    // Rola até a seção de subscription
    cy.get('#footer').scrollIntoView();
    
    // Verifica se o título está correto
    cy.get('.single-widget h2').should('contain', 'Subscription');
    
    // Verifica se o campo de email existe
    cy.get('#susbscribe_email').should('be.visible');
    
    // Verifica se o botão de envio existe
    cy.get('#subscribe').should('be.visible');
  });
});

