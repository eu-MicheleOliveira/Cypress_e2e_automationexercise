const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // URL base do site a ser testado
    baseUrl: 'https://automationexercise.com',
    
    // Configurações de viewport (tamanho da tela)
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Tempo máximo de espera para comandos
    defaultCommandTimeout: 10000,
    
    // Tempo máximo para carregamento de página
    pageLoadTimeout: 60000,
    
    // Configuração para vídeos e screenshots
    video: true,
    screenshotOnRunFailure: true,
    
    // Pasta onde ficam os testes
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Configuração adicional
    setupNodeEvents(on, config) {
      // Aqui podem ser adicionados plugins
      return config;
    },
  },
  
  // Configurações para testes de API
  env: {
    apiUrl: 'https://automationexercise.com/api'
  }
});

