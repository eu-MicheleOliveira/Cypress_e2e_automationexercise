# 🚀 Guia Rápido - Primeiros Passos

Este é um guia simplificado para começar rapidamente com o projeto.

## 📋 Checklist de Instalação

- [ ] Node.js instalado (v16+)
- [ ] Git instalado
- [ ] Editor de código instalado (VS Code recomendado)

## ⚡ Início Rápido (5 minutos)

### 1. Clone o projeto
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute os testes
```bash
# Modo interativo (recomendado para aprender)
npm run cypress:open

# Modo terminal (mais rápido)
npm run cypress:run
```

## 🎯 Seus Primeiros Testes

### Teste 1: Execute um teste de frontend
```bash
npx cypress run --spec "cypress/e2e/frontend/01-home-page.cy.js"
```

### Teste 2: Execute um teste de API
```bash
npx cypress run --spec "cypress/e2e/backend/01-api-products.cy.js"
```

### Teste 3: Abra o Cypress e escolha um teste
```bash
npm run cypress:open
```
Depois, selecione qualquer arquivo `.cy.js` para executar.

## 📁 Estrutura Básica

```
cypress/
├── e2e/
│   ├── frontend/     ← Testes de UI (interface)
│   └── backend/      ← Testes de API
├── fixtures/         ← Dados de teste (JSON)
└── support/          ← Comandos customizados
```

## 🎓 Aprendendo Cypress

### Conceitos Básicos

1. **describe()** - Agrupa testes relacionados
2. **it()** - Define um teste individual
3. **cy.visit()** - Visita uma página
4. **cy.get()** - Seleciona um elemento
5. **should()** - Faz verificações

### Exemplo Simples

```javascript
describe('Meu Primeiro Teste', () => {
  it('Deve visitar a página inicial', () => {
    // Visita a página
    cy.visit('/');
    
    // Verifica se carregou
    cy.url().should('include', 'automationexercise.com');
  });
});
```

## 🎮 Comandos Mais Usados

```bash
# Abrir Cypress
npm run cypress:open

# Executar todos os testes
npm run test:all

# Executar só frontend
npm run test:frontend

# Executar só backend
npm run test:backend
```

## ❓ Problemas Comuns

### Erro: "cypress: command not found"
**Solução**: Execute `npm install` novamente

### Erro: "baseUrl is not set"
**Solução**: Verifique o arquivo `cypress.config.js`

### Testes falhando
**Solução**: 
1. Verifique sua conexão com internet
2. O site pode estar fora do ar temporariamente
3. Execute novamente

## 📚 Próximos Passos

1. ✅ Execute todos os testes de exemplo
2. ✅ Leia os comentários dentro dos arquivos de teste
3. ✅ Tente modificar um teste existente
4. ✅ Crie seu próprio teste simples
5. ✅ Leia o README.md completo

## 🔗 Links Importantes

- [README Completo](README.md)
- [Documentação Cypress](https://docs.cypress.io/)
- [Site de Teste](https://automationexercise.com/)

## 💡 Dicas

- **Use o modo interativo** para aprender (é visual!)
- **Leia os comentários** nos arquivos de teste
- **Experimente modificar** os testes existentes
- **Não tenha medo de errar** - os testes podem ser executados infinitas vezes

---

**Pronto para começar? Execute: `npm run cypress:open` 🚀**

