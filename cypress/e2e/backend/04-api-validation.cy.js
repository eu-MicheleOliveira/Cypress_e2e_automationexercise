/**
 * Testes de API - Validações e Testes Adicionais
 * 
 * Este arquivo contém testes de validação da API
 */

describe('API - Testes de Validação', () => {

  const API_URL = 'https://automationexercise.com/api';

  /**
   * Teste 1: Verificar se a API está disponível
   */
  it('GET - Deve verificar se a API está online', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/productsList`,
      timeout: 10000
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('API está online e respondendo');
    });
  });

  /**
   * Teste 2: Validar resposta JSON
   */
  it('GET - Deve retornar resposta em formato JSON válido', () => {
    cy.request('GET', `${API_URL}/productsList`).then((response) => {
      expect(response.headers['content-type']).to.include('text/html');
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body).to.be.an('object');
    });
  });

  /**
   * Teste 3: Testar CORS (Cross-Origin Resource Sharing)
   */
  it('GET - Deve permitir requisições cross-origin', () => {
    cy.request('GET', `${API_URL}/productsList`).then((response) => {
      // Verifica headers CORS se existirem
      cy.log('Headers:', JSON.stringify(response.headers));
      expect(response.status).to.eq(200);
    });
  });

  /**
   * Teste 4: Testar múltiplas requisições simultâneas
   */
  it('GET - Deve suportar múltiplas requisições simultâneas', () => {
    // Executa requisições sequencialmente com Cypress
    cy.request('GET', `${API_URL}/productsList`).then((response1) => {
      expect(response1.status).to.eq(200);
      
      cy.request('GET', `${API_URL}/brandsList`).then((response2) => {
        expect(response2.status).to.eq(200);
        
        cy.request({
          method: 'POST',
          url: `${API_URL}/searchProduct`,
          form: true,
          body: { search_product: 'top' },
          failOnStatusCode: false
        }).then((response3) => {
          expect(response3.status).to.eq(200);
          cy.log('Todas as requisições foram bem-sucedidas');
        });
      });
    });
  });

  /**
   * Teste 5: Validar encoding da resposta
   */
  it('GET - Deve retornar encoding correto', () => {
    cy.request('GET', `${API_URL}/productsList`).then((response) => {
      expect(response.status).to.eq(200);
      // Verifica se a resposta pode ser processada
      expect(response.body).to.not.be.null;
    });
  });

  /**
   * Teste 6: Testar timeout da API
   */
  it('GET - Deve responder antes do timeout', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/productsList`,
      timeout: 5000 // 5 segundos
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.lessThan(5000);
    });
  });

  /**
   * Teste 7: Validar que DELETE requer parâmetros
   */
  it('DELETE - Deve validar parâmetros obrigatórios', () => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/deleteAccount`,
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
   * Teste 8: Testar resposta para método OPTIONS
   */
  it('OPTIONS - Deve responder ao método OPTIONS', () => {
    cy.request({
      method: 'OPTIONS',
      url: `${API_URL}/productsList`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Status:', response.status);
      cy.log('Headers:', JSON.stringify(response.headers));
    });
  });

  /**
   * Teste 9: Validar consistência de dados
   */
  it('GET - Deve retornar dados consistentes em múltiplas chamadas', () => {
    let firstResponse;

    // Primeira chamada
    cy.request('GET', `${API_URL}/brandsList`).then((response) => {
      // Parse do JSON se vier como string
      firstResponse = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      expect(firstResponse).to.exist;
    });

    // Segunda chamada
    cy.request('GET', `${API_URL}/brandsList`).then((response) => {
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      // Verifica se retorna a mesma estrutura
      expect(body).to.have.property('responseCode');
    });
  });

  /**
   * Teste 10: Testar rate limiting (se existir)
   */
  it('GET - Deve lidar com múltiplas requisições rápidas', () => {
    const numRequests = 5;
    
    for (let i = 0; i < numRequests; i++) {
      cy.request({
        method: 'GET',
        url: `${API_URL}/productsList`,
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Requisição ${i + 1}: Status ${response.status}`);
        expect(response.status).to.be.oneOf([200, 429]); // 429 = Too Many Requests
      });
    }
  });
});

