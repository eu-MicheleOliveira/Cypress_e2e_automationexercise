# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com este projeto! Este documento fornece diretrizes para contribuições.

## 📋 Como Contribuir

### 1. Fork do Projeto

1. Clique no botão "Fork" no GitHub
2. Clone seu fork localmente:
```bash
git clone https://github.com/seu-usuario/seu-fork.git
cd seu-fork
```

### 2. Crie uma Branch

Crie uma branch para sua feature ou correção:

```bash
git checkout -b feature/minha-nova-feature
```

Padrões de nomenclatura:
- `feature/` - Nova funcionalidade
- `fix/` - Correção de bug
- `docs/` - Alterações na documentação
- `test/` - Novos testes ou correções
- `refactor/` - Refatoração de código

### 3. Faça suas Alterações

- Escreva código limpo e comentado
- Siga as convenções de código existentes
- Adicione testes se aplicável
- Atualize a documentação se necessário

### 4. Commit suas Mudanças

Use mensagens de commit claras e descritivas:

```bash
git add .
git commit -m "feat: adiciona testes de checkout"
```

Padrões de commit (Conventional Commits):
- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `test:` - Adiciona ou modifica testes
- `refactor:` - Refatoração de código
- `style:` - Formatação de código
- `chore:` - Tarefas de manutenção

### 5. Push para o GitHub

```bash
git push origin feature/minha-nova-feature
```

### 6. Abra um Pull Request

1. Vá para o repositório original no GitHub
2. Clique em "New Pull Request"
3. Selecione sua branch
4. Descreva suas alterações detalhadamente
5. Aguarde a revisão

## ✅ Checklist de Pull Request

Antes de enviar seu PR, verifique:

- [ ] O código está funcionando
- [ ] Os testes estão passando
- [ ] A documentação foi atualizada
- [ ] O código segue as convenções do projeto
- [ ] Não há conflitos com a branch principal
- [ ] As mensagens de commit são claras
- [ ] O PR tem uma descrição detalhada

## 📝 Padrões de Código

### JavaScript/Cypress

```javascript
// ✅ BOM
describe('Testes de Produto', () => {
  it('Deve adicionar produto ao carrinho', () => {
    cy.visit('/products');
    cy.get('.add-to-cart').first().click();
    cy.contains('added to cart').should('be.visible');
  });
});

// ❌ EVITE
describe('teste', () => {
  it('teste1', () => {
    cy.visit('/products')
    cy.get('.add-to-cart').first().click()
  })
})
```

### Boas Práticas

1. **Use comentários explicativos**
```javascript
/**
 * Teste 1: Verificar se a página carrega
 */
it('Deve carregar a página inicial', () => {
  // ...
});
```

2. **Organize os testes logicamente**
```javascript
describe('Carrinho de Compras', () => {
  beforeEach(() => {
    cy.visit('/cart');
  });
  
  it('Teste 1...', () => {});
  it('Teste 2...', () => {});
});
```

3. **Use seletores consistentes**
```javascript
// Prefira seletores data-qa
cy.get('[data-qa="login-button"]')

// Evite seletores frágeis
cy.get('body > div:nth-child(3) > div > button')
```

## 🐛 Reportar Bugs

### Template de Issue para Bug

```markdown
**Descrição do Bug**
Descrição clara do que está acontecendo.

**Como Reproduzir**
1. Execute '...'
2. Navegue para '...'
3. Clique em '...'
4. Veja o erro

**Comportamento Esperado**
O que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente**
- OS: [ex: Windows 10]
- Browser: [ex: Chrome 120]
- Node.js: [ex: v18.0.0]
- Cypress: [ex: 13.6.0]
```

## 💡 Sugerir Melhorias

### Template de Issue para Feature

```markdown
**Descrição da Feature**
Descrição clara da feature sugerida.

**Problema que Resolve**
Qual problema esta feature resolve?

**Solução Proposta**
Como você imagina que esta feature funcione?

**Alternativas Consideradas**
Outras abordagens que você pensou?

**Contexto Adicional**
Qualquer informação adicional relevante.
```

## 🧪 Adicionando Novos Testes

### Template de Novo Teste

```javascript
/**
 * Testes de [Funcionalidade]
 * 
 * Este arquivo testa [descrição]
 */

describe('[Nome do Grupo de Testes]', () => {
  
  beforeEach(() => {
    // Preparação antes de cada teste
  });

  /**
   * Teste 1: [Descrição]
   */
  it('Deve [ação esperada]', () => {
    // Arrange (preparar)
    
    // Act (agir)
    
    // Assert (verificar)
  });
});
```

## 📚 Melhorando a Documentação

Contribuições para documentação são muito bem-vindas!

- Corrija erros de digitação
- Melhore explicações
- Adicione exemplos
- Traduza para outros idiomas
- Atualize links quebrados

## 🎓 Para Estudantes

Este é um projeto educacional! Suas contribuições ajudam outros alunos a aprender:

- Adicione exemplos didáticos
- Melhore comentários nos testes
- Crie tutoriais
- Compartilhe dicas e truques
- Reporte problemas que encontrou ao aprender

## 📞 Dúvidas?

- Abra uma [Issue](../../issues) com sua dúvida
- Procure por issues similares primeiro
- Seja claro e educado na comunicação

## 🙏 Agradecimentos

Toda contribuição é valorizada, seja ela:
- Código
- Documentação
- Relato de bugs
- Sugestões
- Compartilhamento do projeto

**Obrigado por contribuir! 🚀**

