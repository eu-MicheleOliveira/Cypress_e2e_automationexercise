// ***********************************************************
// Este arquivo é carregado antes de todos os testes
// Aqui você pode adicionar comportamentos globais
// ***********************************************************

// Importa comandos customizados
import './commands';

// Configuração para ignorar exceções não capturadas
// (útil para sites com scripts de terceiros)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna false para evitar que o Cypress falhe o teste
  // em exceções JavaScript não relacionadas ao teste
  return false;
});

// Hook que executa antes de cada teste
beforeEach(() => {
  // Limpar cookies antes de cada teste
  cy.clearCookies();
  
  // Limpar localStorage antes de cada teste
  cy.clearLocalStorage();
});

// Hook que executa após cada teste
afterEach(function() {
  // Captura screenshot se o teste falhar
  if (this.currentTest.state === 'failed') {
    cy.screenshot(`${this.currentTest.title} - FALHOU`);
  }
});

