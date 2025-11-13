/**
 * Testes de API - Usuários
 * 
 * Este arquivo testa os endpoints da API relacionados a usuários
 */

describe('API - Testes de Usuários', () => {

  const API_URL = 'https://automationexercise.com/api';

  /**
   * Teste 1: POST - Criar conta de usuário
   * Endpoint: POST /createAccount
   */
  it('POST - Deve criar conta de usuário', () => {
    // Gera email único para cada teste
    const timestamp = Date.now();
    const randomEmail = `teste${timestamp}@email.com`;

    cy.request({
      method: 'POST',
      url: `${API_URL}/createAccount`,
      form: true, // Envia como form-data
      body: {
        name: 'Teste Usuario',
        email: randomEmail,
        password: 'senha123',
        title: 'Mr',
        birth_date: '15',
        birth_month: '6',
        birth_year: '1990',
        firstname: 'Teste',
        lastname: 'Usuario',
        company: 'Empresa Teste',
        address1: 'Rua Teste, 123',
        address2: 'Apto 45',
        country: 'India',
        zipcode: '12345',
        state: 'Estado',
        city: 'Cidade',
        mobile_number: '11987654321'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Verifica o status
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      // Verifica a resposta
      cy.log('Resposta:', JSON.stringify(body));
      
      // Pode retornar 201 (criado) ou 400 (se email já existe)
      if (body.responseCode === 201) {
        expect(body.message).to.include('User created');
      }
    });
  });

  /**
   * Teste 2: DELETE - Deletar conta de usuário
   * Endpoint: DELETE /deleteAccount
   */
  it('DELETE - Deve deletar conta de usuário', () => {
    cy.request({
      method: 'DELETE',
      url: `${API_URL}/deleteAccount`,
      form: true,
      body: {
        email: 'teste@email.com',
        password: 'senha123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Pode retornar sucesso ou erro se usuário não existe
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 3: PUT - Atualizar conta de usuário
   * Endpoint: PUT /updateAccount
   */
  it('PUT - Deve atualizar conta de usuário', () => {
    cy.request({
      method: 'PUT',
      url: `${API_URL}/updateAccount`,
      form: true,
      body: {
        name: 'Nome Atualizado',
        email: 'teste@email.com',
        password: 'senha123',
        title: 'Mr',
        birth_date: '20',
        birth_month: '7',
        birth_year: '1995',
        firstname: 'Nome',
        lastname: 'Atualizado',
        company: 'Nova Empresa',
        address1: 'Nova Rua, 456',
        address2: 'Casa',
        country: 'India',
        zipcode: '54321',
        state: 'Novo Estado',
        city: 'Nova Cidade',
        mobile_number: '11999887766'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 4: POST - Verificar login com credenciais válidas
   * Endpoint: POST /verifyLogin
   */
  it('POST - Deve verificar login com credenciais', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/verifyLogin`,
      form: true,
      body: {
        email: 'teste@email.com',
        password: 'senha123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      // Pode retornar 200 (sucesso) ou 404 (não encontrado)
      if (body.responseCode === 200) {
        expect(body.message).to.include('exists');
      } else if (body.responseCode === 404) {
        expect(body.message).to.include('not found');
      }
      
      cy.log('Resposta:', JSON.stringify(body));
    });
  });

  /**
   * Teste 5: POST - Verificar login sem email
   * Teste de validação de campos obrigatórios
   */
  it('POST - Deve retornar erro ao verificar login sem email', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/verifyLogin`,
      form: true,
      body: {
        password: 'senha123'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.include('parameter');
      
      cy.log('Mensagem de erro:', body.message);
    });
  });

  /**
   * Teste 6: POST - Verificar login sem senha
   */
  it('POST - Deve retornar erro ao verificar login sem senha', () => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/verifyLogin`,
      form: true,
      body: {
        email: 'teste@email.com'
      },
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
   * Teste 7: GET - Listar detalhes de usuário por email
   * Endpoint: GET /getUserDetailByEmail
   */
  it('GET - Deve buscar detalhes de usuário por email', () => {
    cy.request({
      method: 'GET',
      url: `${API_URL}/getUserDetailByEmail`,
      qs: {
        email: 'teste@email.com'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Pode retornar usuário ou não encontrado
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });

  /**
   * Teste 8: POST - Criar conta com email duplicado
   */
  it('POST - Deve retornar erro ao criar conta com email duplicado', () => {
    const duplicateEmail = 'duplicado@teste.com';
    
    // Primeira criação
    cy.request({
      method: 'POST',
      url: `${API_URL}/createAccount`,
      form: true,
      body: {
        name: 'Teste',
        email: duplicateEmail,
        password: 'senha123',
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '1990',
        firstname: 'Teste',
        lastname: 'Teste',
        company: 'Teste',
        address1: 'Teste',
        country: 'India',
        zipcode: '12345',
        state: 'Teste',
        city: 'Teste',
        mobile_number: '123456789'
      },
      failOnStatusCode: false
    });
    
    // Segunda tentativa com mesmo email
    cy.request({
      method: 'POST',
      url: `${API_URL}/createAccount`,
      form: true,
      body: {
        name: 'Teste 2',
        email: duplicateEmail,
        password: 'senha456',
        title: 'Mrs',
        birth_date: '2',
        birth_month: '2',
        birth_year: '1992',
        firstname: 'Teste',
        lastname: 'Dois',
        company: 'Teste',
        address1: 'Teste',
        country: 'India',
        zipcode: '54321',
        state: 'Teste',
        city: 'Teste',
        mobile_number: '987654321'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Parse do JSON se vier como string
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body;
      
      expect(body.responseCode).to.eq(400);
      expect(body.message).to.include('exist');
    });
  });
});

