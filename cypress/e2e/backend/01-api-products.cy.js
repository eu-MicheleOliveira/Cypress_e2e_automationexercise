/**
 * Testes de API - Produtos
 * 
 * Este arquivo testa os endpoints da API relacionados a produtos
 * 
 * Documentação da API: https://automationexercise.com/api_list
 */

describe('API - Testes de Produtos', () => {

  // URL base da API
  const API_URL = 'https://automationexercise.com/api';

  /**
   * Teste 1: GET - Listar todos os produtos
   * Endpoint: GET /productsList
   */
  it('GET - Deve retornar lista de produtos', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/productsList`,
      failOnStatusCode: false // Permite testar mesmo se retornar erro
    }).then((response) => {
      // Verifica o status code
      expect(response.status).to.eq(200);
      
      // Verifica se o corpo da resposta existe
      expect(response.body).to.exist;
      
      // Log para visualização
      cy.log('Resposta da API:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 2: POST - Listar todos os produtos (método não permitido)
   * Endpoint: POST /productsList
   * Espera-se erro pois o endpoint aceita apenas GET
   */
  it('POST - Deve retornar erro ao tentar POST em productsList', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/productsList`,
      failOnStatusCode: false
    }).then((response) => {
      // Verifica que retorna 200 mesmo com erro
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      // Verifica a mensagem de erro no corpo
      expect(body).to.have.property('responseCode', 405);
      expect(body).to.have.property('message');
    });
  });

  /**
   * Teste 3: GET - Buscar todos as marcas (brands)
   * Endpoint: GET /brandsList
   */
  it('GET - Deve retornar lista de marcas', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/brandsList`
    }).then((response) => {
      // Verifica o status
      expect(response.status).to.eq(200);
      
      // Verifica se tem dados
      expect(response.body).to.exist;
      
      cy.log('Marcas retornadas:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 4: PUT - Listar produtos (método não permitido)
   * Endpoint: PUT /productsList
   */
  it('PUT - Deve retornar erro 405 para método não suportado', () => {
    cy.request({
      method: 'PUT',
      url: `${API_URL}/productsList`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body).to.have.property('responseCode', 405);
      expect(body.message).to.include('not supported');
    });
  });

  /**
   * Teste 5: Validar estrutura de resposta da lista de produtos
   */
  it('GET - Deve validar estrutura da resposta de produtos', () => {
    cy.request('GET', `${API_URL}/productsList`).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body).to.have.property('responseCode');
      
      // Se a resposta for bem-sucedida, valida estrutura
      if (body.responseCode === 200) {
        expect(body).to.have.property('products');
      }
    });
  });

  /**
   * Teste 6: Validar tempo de resposta da API
   */
  it('GET - Deve responder em tempo aceitável', () => {
    const startTime = Date.now();
    
    cy.request('GET', `${API_URL}/productsList`).then((response) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Verifica que respondeu em menos de 3 segundos
      expect(responseTime).to.be.lessThan(3000);
      
      cy.log(`Tempo de resposta: ${responseTime}ms`);
    });
  });

  /**
   * Teste 7: Validar headers da resposta
   */
  it('GET - Deve retornar headers corretos', () => {
    cy.request('GET', `${API_URL}/productsList`).then((response) => {
      // Verifica headers importantes
      expect(response.headers).to.have.property('content-type');
      
      // Log dos headers
      cy.log('Headers:', JSON.stringify(response.headers));
    });
  });

  /**
   * Teste 8: Testar endpoint inválido
   */
  it('GET - Deve retornar erro para endpoint inexistente', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/endpointInexistente`,
      failOnStatusCode: false
    }).then((response) => {
      // Verifica que não retorna 200 OK
      expect(response.status).to.not.eq(200);
    });
  });
});

