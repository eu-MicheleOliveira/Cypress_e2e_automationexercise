/**
 * Testes de API - Busca
 * 
 * Este arquivo testa os endpoints da API relacionados a busca de produtos
 */

describe('API - Testes de Busca', () => {

  const API_URL = 'https://automationexercise.com/api';

  /**
   * Teste 1: POST - Buscar produto
   * Endpoint: POST /searchProduct
   */
  it('POST - Deve buscar produtos por termo', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: 'top'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Verifica status
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      // Verifica resposta
      expect(body).to.have.property('responseCode');
      
      // Se encontrou produtos
      if (body.responseCode === 200) {
        expect(body).to.have.property('products');
        cy.log('Produtos encontrados:', JSON.stringify(body));
      }
    });
  });

  /**
   * Teste 2: POST - Buscar produto sem parâmetro de busca
   */
  it('POST - Deve retornar erro ao buscar sem parâmetro', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.include('parameter');
    });
  });

  /**
   * Teste 3: POST - Buscar produto com termo vazio
   */
  it('POST - Deve buscar com termo vazio', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: ''
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 4: POST - Buscar produto inexistente
   */
  it('POST - Deve buscar produto inexistente', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: 'ProdutoQueNaoExiste123456789'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Verifica se retorna array vazio ou mensagem específica
      if (response.body.responseCode === 200) {
        if (response.body.products) {
          expect(response.body.products).to.be.an('array');
        }
      }
      
      cy.log('Resposta para produto inexistente:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 5: POST - Buscar com caracteres especiais
   */
  it('POST - Deve buscar com caracteres especiais', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: '@#$%'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 6: POST - Buscar com números
   */
  it('POST - Deve buscar com números', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: '123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body).to.have.property('responseCode');
    });
  });

  /**
   * Teste 7: POST - Buscar com termo muito longo
   */
  it('POST - Deve buscar com termo muito longo', () => {
    const longTerm = 'a'.repeat(1000);
    
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: longTerm
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 8: GET - Buscar produto (método não permitido)
   */
  it('GET - Deve retornar erro para método não suportado', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/searchProduct`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body.responseCode).to.eq(405);
      expect(body.message).to.include('not supported');
    });
  });

  /**
   * Teste 9: POST - Buscar e validar estrutura da resposta
   */
  it('POST - Deve validar estrutura da resposta de busca', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/searchProduct`,
      form: true,
      body: {
        search_product: 'dress'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body).to.have.property('responseCode');
      
      // Se encontrou produtos, valida estrutura
      if (body.responseCode === 200 && body.products) {
        expect(body.products).to.be.an('array');
        
        // Valida estrutura do primeiro produto se existir
        if (body.products.length > 0) {
          const firstProduct = body.products[0];
          expect(firstProduct).to.have.property('id');
          expect(firstProduct).to.have.property('name');
          
          cy.log('Estrutura do produto:', JSON.stringify(firstProduct));
        }
      }
    });
  });
});

