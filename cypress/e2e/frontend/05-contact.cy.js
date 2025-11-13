/**
 * Testes de Contato
 * 
 * Este arquivo testa o formulário de contato
 */

describe('Formulário de Contato', () => {

  beforeEach(() => {
    cy.visit('/contact_us');
  });

  /**
   * Teste 1: Verificar elementos do formulário
   */
  it('Deve exibir todos os elementos do formulário de contato', () => {
    // Verifica título
    cy.get('.contact-form h2').should('contain', 'Get In Touch');
    
    // Verifica campos do formulário
    cy.get('[data-qa="name"]').should('be.visible');
    cy.get('[data-qa="email"]').should('be.visible');
    cy.get('[data-qa="subject"]').should('be.visible');
    cy.get('[data-qa="message"]').should('be.visible');
    
    // Verifica botão de envio
    cy.get('[data-qa="submit-button"]').should('be.visible');
  });

  /**
   * Teste 2: Validar campos obrigatórios
   */
  it('Deve validar campos obrigatórios', () => {
    // Tenta enviar formulário vazio
    cy.get('[data-qa="submit-button"]').click();
    
    // Verifica se os campos têm validação HTML5
    cy.get('[data-qa="name"]').then($input => {
      expect($input[0].validationMessage).to.exist;
    });
  });

  /**
   * Teste 3: Preencher e enviar formulário
   */
  it('Deve preencher e enviar o formulário de contato', () => {
    // Preenche os campos
    cy.get('[data-qa="name"]').type('João Silva');
    cy.get('[data-qa="email"]').type('joao@teste.com');
    cy.get('[data-qa="subject"]').type('Dúvida sobre produto');
    cy.get('[data-qa="message"]').type('Gostaria de saber mais informações sobre o produto X.');
    
    // Envia o formulário
    cy.get('[data-qa="submit-button"]').click();
    
    // Aguarda e aceita o alert do navegador
    cy.on('window:alert', (text) => {
      expect(text).to.contains('OK');
    });
  });

  /**
   * Teste 4: Validar formato de email
   */
  it('Deve validar formato de email', () => {
    // Preenche com email inválido
    cy.get('[data-qa="name"]').type('João Silva');
    cy.get('[data-qa="email"]').type('email-invalido');
    cy.get('[data-qa="subject"]').type('Assunto');
    cy.get('[data-qa="message"]').type('Mensagem');
    
    // Tenta enviar
    cy.get('[data-qa="submit-button"]').click();
    
    // Verifica validação do email
    cy.get('[data-qa="email"]').then($input => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  /**
   * Teste 5: Verificar informações de contato na página
   */
  it('Deve exibir informações de contato', () => {
    // Verifica se há informações de endereço/contato
    cy.get('.contact-info').should('be.visible');
  });

  /**
   * Teste 6: Limpar formulário após preencher
   */
  it('Deve permitir limpar campos do formulário', () => {
    // Preenche os campos
    cy.get('[data-qa="name"]').type('Teste Nome');
    cy.get('[data-qa="email"]').type('teste@email.com');
    
    // Limpa os campos
    cy.get('[data-qa="name"]').clear();
    cy.get('[data-qa="email"]').clear();
    
    // Verifica se os campos estão vazios
    cy.get('[data-qa="name"]').should('have.value', '');
    cy.get('[data-qa="email"]').should('have.value', '');
  });
});

