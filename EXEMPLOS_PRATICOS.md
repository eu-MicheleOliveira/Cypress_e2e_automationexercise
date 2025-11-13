# 📝 Exemplos Práticos de Testes

Este guia contém exemplos práticos e comentados para você aprender a criar seus próprios testes.

## 📑 Índice

1. [Teste Básico de Página](#teste-básico-de-página)
2. [Teste com Interações](#teste-com-interações)
3. [Teste de Formulário](#teste-de-formulário)
4. [Teste de API](#teste-de-api)
5. [Teste com Fixtures](#teste-com-fixtures)
6. [Teste com Comandos Customizados](#teste-com-comandos-customizados)
7. [Exercícios Práticos](#exercícios-práticos)

---

## 1. Teste Básico de Página

### Exemplo Completo

```javascript
// Arquivo: cypress/e2e/meu-primeiro-teste.cy.js

/**
 * EXPLICAÇÃO:
 * - describe() agrupa testes relacionados
 * - it() define um teste individual
 * - cy.visit() navega para uma página
 * - should() faz verificações
 */

describe('Meu Primeiro Teste', () => {
  
  it('Deve abrir a página inicial', () => {
    // 1. VISITAR a página
    cy.visit('/');
    
    // 2. VERIFICAR se a URL está correta
    cy.url().should('include', 'automationexercise.com');
    
    // 3. VERIFICAR se o título está correto
    cy.title().should('include', 'Automation Exercise');
  });
  
});
```

### O que cada linha faz?

```javascript
describe('Meu Primeiro Teste', () => {
  // 👆 Cria um grupo de testes com nome "Meu Primeiro Teste"
  
  it('Deve abrir a página inicial', () => {
    // 👆 Define UM teste com descrição "Deve abrir a página inicial"
    
    cy.visit('/');
    // 👆 Visita a URL base (definida em cypress.config.js)
    
    cy.url().should('include', 'automationexercise.com');
    // 👆 Pega a URL atual e verifica se contém o texto
    
    cy.title().should('include', 'Automation Exercise');
    // 👆 Pega o título da página e verifica se contém o texto
  });
});
```

---

## 2. Teste com Interações

### Exemplo: Clicar em Botão

```javascript
describe('Testes de Interação', () => {
  
  it('Deve clicar em um botão', () => {
    // Visita a página
    cy.visit('/products');
    
    // ENCONTRA o botão "Add to cart" e CLICA
    cy.contains('Add to cart').first().click();
    
    // VERIFICA se apareceu o modal
    cy.get('.modal-content').should('be.visible');
  });
  
});
```

### Exemplo: Preencher Campo de Texto

```javascript
it('Deve digitar no campo de busca', () => {
  cy.visit('/products');
  
  // ENCONTRA o campo de busca
  cy.get('#search_product')
    .type('Blue Top')        // DIGITA no campo
    .should('have.value', 'Blue Top');  // VERIFICA o valor
    
  // CLICA no botão de buscar
  cy.get('#submit_search').click();
  
  // VERIFICA os resultados
  cy.get('.features_items').should('contain', 'Blue Top');
});
```

---

## 3. Teste de Formulário

### Exemplo Completo

```javascript
describe('Teste de Formulário', () => {
  
  it('Deve preencher o formulário de contato', () => {
    // 1. Visitar a página
    cy.visit('/contact_us');
    
    // 2. Preencher cada campo
    cy.get('[data-qa="name"]').type('João Silva');
    cy.get('[data-qa="email"]').type('joao@email.com');
    cy.get('[data-qa="subject"]').type('Assunto do email');
    cy.get('[data-qa="message"]').type('Esta é a mensagem');
    
    // 3. Enviar o formulário
    cy.get('[data-qa="submit-button"]').click();
    
    // 4. Verificar sucesso (se houver mensagem de confirmação)
  });
  
});
```

### Dicas para Formulários

```javascript
// Limpar campo antes de digitar
cy.get('#campo').clear().type('novo texto');

// Verificar se campo está vazio
cy.get('#campo').should('have.value', '');

// Verificar se campo tem valor específico
cy.get('#campo').should('have.value', 'esperado');

// Marcar checkbox
cy.get('input[type="checkbox"]').check();

// Desmarcar checkbox
cy.get('input[type="checkbox"]').uncheck();

// Selecionar em dropdown
cy.get('select').select('Opção 1');
```

---

## 4. Teste de API

### Exemplo: GET Request

```javascript
describe('Teste de API - GET', () => {
  
  it('Deve buscar lista de produtos', () => {
    // Fazer requisição GET
    cy.request({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList'
    }).then((response) => {
      // Verificar status code
      expect(response.status).to.eq(200);
      
      // Verificar que tem corpo na resposta
      expect(response.body).to.exist;
      
      // Log para debug
      cy.log('Resposta:', JSON.stringify(response.body));
    });
  });
  
});
```

### Exemplo: POST Request

```javascript
it('Deve fazer busca via API', () => {
  cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/searchProduct',
    form: true,  // Importante para form-data
    body: {
      search_product: 'top'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    
    // Verificar estrutura da resposta
    expect(response.body).to.have.property('responseCode');
  });
});
```

---

## 5. Teste com Fixtures

### Passo 1: Criar arquivo de dados

Crie `cypress/fixtures/meus-dados.json`:

```json
{
  "usuario": {
    "nome": "João Silva",
    "email": "joao@teste.com",
    "senha": "senha123"
  },
  "produto": {
    "nome": "Blue Top",
    "preco": "Rs. 500"
  }
}
```

### Passo 2: Usar no teste

```javascript
describe('Teste com Fixtures', () => {
  
  it('Deve usar dados do fixture', () => {
    // Carregar o arquivo
    cy.fixture('meus-dados').then((dados) => {
      
      // Usar os dados no teste
      cy.visit('/login');
      cy.get('[data-qa="login-email"]').type(dados.usuario.email);
      cy.get('[data-qa="login-password"]').type(dados.usuario.senha);
      cy.get('[data-qa="login-button"]').click();
      
    });
  });
  
});
```

---

## 6. Teste com Comandos Customizados

Os comandos customizados ficam em `cypress/support/commands.js`.

### Usando comando existente

```javascript
describe('Teste com Comando Customizado', () => {
  
  it('Deve adicionar produto ao carrinho', () => {
    cy.visit('/products');
    
    // Usar o comando customizado addToCart
    cy.addToCart(0);  // Adiciona primeiro produto
    
    // Verificar
    cy.contains('added to cart').should('be.visible');
  });
  
});
```

### Criar seu próprio comando

Em `cypress/support/commands.js`, adicione:

```javascript
Cypress.Commands.add('procurarProduto', (nomeProduto) => {
  cy.get('#search_product').type(nomeProduto);
  cy.get('#submit_search').click();
});
```

Usar no teste:

```javascript
it('Deve buscar produto', () => {
  cy.visit('/products');
  cy.procurarProduto('Blue Top');
  cy.get('.features_items').should('contain', 'Blue Top');
});
```

---

## 7. Exercícios Práticos

### Exercício 1: Básico
**Objetivo**: Criar um teste que verifica se o logo está visível

```javascript
// Sua solução aqui
describe('Exercício 1', () => {
  it('Deve verificar logo', () => {
    // DICA: use cy.visit('/') e cy.get('img[alt="Website for automation practice"]')
  });
});
```

<details>
<summary>Ver Solução</summary>

```javascript
describe('Exercício 1', () => {
  it('Deve verificar logo', () => {
    cy.visit('/');
    cy.get('img[alt="Website for automation practice"]')
      .should('be.visible');
  });
});
```
</details>

### Exercício 2: Intermediário
**Objetivo**: Criar um teste que adiciona 2 produtos ao carrinho

```javascript
// Sua solução aqui
describe('Exercício 2', () => {
  it('Deve adicionar 2 produtos', () => {
    // DICA: 
    // 1. Visite /products
    // 2. Adicione primeiro produto
    // 3. Clique "Continue Shopping"
    // 4. Adicione segundo produto
    // 5. Vá para o carrinho
    // 6. Verifique que tem 2 produtos
  });
});
```

<details>
<summary>Ver Solução</summary>

```javascript
describe('Exercício 2', () => {
  it('Deve adicionar 2 produtos', () => {
    cy.visit('/products');
    
    // Adiciona primeiro produto
    cy.get('.features_items .product-image-wrapper')
      .eq(0)
      .contains('Add to cart')
      .click();
    cy.contains('Continue Shopping').click();
    
    // Adiciona segundo produto
    cy.get('.features_items .product-image-wrapper')
      .eq(1)
      .contains('Add to cart')
      .click();
    cy.contains('View Cart').click();
    
    // Verifica
    cy.get('.cart_info tbody tr').should('have.length.at.least', 2);
  });
});
```
</details>

### Exercício 3: Avançado
**Objetivo**: Criar um teste de API que verifica se produto específico existe

```javascript
// Sua solução aqui
describe('Exercício 3', () => {
  it('Deve verificar se produto existe via API', () => {
    // DICA:
    // 1. Faça request GET para /productsList
    // 2. Na resposta, procure por um produto específico
    // 3. Verifique se encontrou
  });
});
```

---

## 🎯 Padrões Importantes

### AAA Pattern (Arrange, Act, Assert)

```javascript
it('Deve seguir padrão AAA', () => {
  // ARRANGE (Preparar)
  cy.visit('/products');
  const produtoParaBuscar = 'Blue Top';
  
  // ACT (Agir)
  cy.get('#search_product').type(produtoParaBuscar);
  cy.get('#submit_search').click();
  
  // ASSERT (Verificar)
  cy.get('.features_items').should('contain', produtoParaBuscar);
});
```

### Usar beforeEach para preparação

```javascript
describe('Testes de Produtos', () => {
  
  // Executa ANTES de CADA teste
  beforeEach(() => {
    cy.visit('/products');
  });
  
  it('Teste 1', () => {
    // Já está na página /products
  });
  
  it('Teste 2', () => {
    // Também já está na página /products
  });
});
```

---

## 🔍 Seletores Comuns

```javascript
// Por ID
cy.get('#meu-id')

// Por classe
cy.get('.minha-classe')

// Por atributo
cy.get('[data-qa="meu-atributo"]')

// Por tag
cy.get('button')

// Combinados
cy.get('button.btn-primary')

// Por texto
cy.contains('Texto do Botão')

// Dentro de um elemento
cy.get('.container').within(() => {
  cy.get('button').click();
});

// Primeiro/Último
cy.get('.produto').first()
cy.get('.produto').last()

// Por índice
cy.get('.produto').eq(2)  // terceiro elemento (índice 0)
```

---

## 🎓 Dicas de Aprendizado

1. **Comece Simples**: Faça um teste que só visita a página
2. **Incremente**: Adicione uma verificação simples
3. **Pratique**: Modifique os exemplos existentes
4. **Experimente**: Teste diferentes seletores
5. **Leia Erros**: As mensagens de erro do Cypress são bem claras
6. **Use o Modo Interativo**: Veja cada passo acontecendo

## 🚀 Próximos Passos

1. Execute os exemplos deste guia
2. Modifique-os para entender como funcionam
3. Crie seus próprios testes
4. Tente resolver os exercícios
5. Explore os testes existentes no projeto
6. Leia a [documentação oficial do Cypress](https://docs.cypress.io/)

---

**Boa sorte nos seus testes! 🧪**

