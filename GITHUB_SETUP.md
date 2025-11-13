# 🐙 Como Configurar no GitHub

Este guia explica como configurar o projeto no GitHub e habilitar a pipeline CI/CD.

## 📋 Pré-requisitos

- Conta no GitHub
- Git instalado localmente
- Projeto baixado/clonado

## 🚀 Passo a Passo

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository" (botão verde)
3. Preencha os dados:
   - **Repository name**: `automationexercise-cypress-tests`
   - **Description**: "Projeto de testes automatizados com Cypress"
   - **Visibility**: Public ou Private (sua escolha)
   - **NÃO marque**: Initialize with README (já temos um)
4. Clique em "Create repository"

### 2. Conectar Repositório Local ao GitHub

Copie os comandos que aparecem na tela do GitHub ou use estes:

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Primeiro commit
git commit -m "feat: projeto inicial de testes com Cypress"

# Renomear branch para main (se necessário)
git branch -M main

# Adicionar remote (substitua SEU-USUARIO e SEU-REPO)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git

# Enviar para o GitHub
git push -u origin main
```

### 3. Verificar Upload

Atualize a página do GitHub. Você deve ver todos os arquivos do projeto.

### 4. Habilitar GitHub Actions

A pipeline já está configurada! Para verificar:

1. Vá até a aba **Actions** no GitHub
2. Você verá o workflow "Cypress Tests"
3. Ele será executado automaticamente em:
   - Cada push para main/master
   - Cada pull request
   - Pode ser executado manualmente

### 5. Executar Pipeline Manualmente

1. Vá em **Actions**
2. Clique em "Cypress Tests" na barra lateral
3. Clique em "Run workflow"
4. Selecione a branch (main)
5. Clique em "Run workflow" (botão verde)

### 6. Visualizar Resultados

1. Na aba **Actions**, clique no workflow em execução
2. Veja os logs em tempo real
3. Após conclusão:
   - ✅ Verde = Passou
   - ❌ Vermelho = Falhou
4. Clique em cada job para ver detalhes
5. Baixe artefatos (vídeos/screenshots) se necessário

## 🏷️ Badge de Status

Adicione um badge ao README para mostrar o status dos testes:

```markdown
[![Cypress Tests](https://github.com/SEU-USUARIO/SEU-REPO/actions/workflows/cypress-tests.yml/badge.svg)](https://github.com/SEU-USUARIO/SEU-REPO/actions/workflows/cypress-tests.yml)
```

Substitua `SEU-USUARIO` e `SEU-REPO` pelos valores corretos.

## 🔧 Configurações Avançadas

### Proteger Branch Main

1. Vá em **Settings** > **Branches**
2. Clique em "Add rule"
3. Branch name pattern: `main`
4. Marque:
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date
5. Selecione os checks: `frontend-tests`, `backend-tests`
6. Clique em "Create"

Agora ninguém pode fazer push para main sem que os testes passem!

### Secrets (se necessário)

Para adicionar variáveis de ambiente sensíveis:

1. Vá em **Settings** > **Secrets and variables** > **Actions**
2. Clique em "New repository secret"
3. Adicione nome e valor
4. Use na pipeline: `${{ secrets.NOME_DO_SECRET }}`

### Configurar Notificações

1. Vá em **Settings** > **Notifications**
2. Configure como deseja ser notificado
3. Escolha eventos: workflow runs, pull requests, etc.

## 📊 Monitoramento

### Ver Histórico de Execuções

1. Aba **Actions**
2. Veja lista de todas as execuções
3. Filtre por:
   - Branch
   - Status (sucesso/falha)
   - Workflow
   - Data

### Analisar Falhas

Se um teste falhar:

1. Clique na execução falhada
2. Clique no job que falhou
3. Expanda os logs para ver detalhes
4. Baixe os artefatos (vídeos/screenshots)
5. Analise o erro
6. Corrija localmente
7. Faça commit e push novamente

## 🔄 Workflow de Desenvolvimento

### Fluxo Recomendado

```bash
# 1. Criar nova branch
git checkout -b feature/minha-feature

# 2. Fazer alterações
# ... edite os arquivos ...

# 3. Testar localmente
npm run test:all

# 4. Commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# 5. Push
git push origin feature/minha-feature

# 6. Abrir Pull Request no GitHub
# 7. Pipeline executa automaticamente
# 8. Se passou, fazer merge para main
```

## 🎯 Dicas

### Comandos Úteis do Git

```bash
# Ver status
git status

# Ver histórico
git log --oneline

# Criar nova branch
git checkout -b nome-da-branch

# Mudar de branch
git checkout main

# Atualizar do remoto
git pull origin main

# Ver branches
git branch -a

# Deletar branch local
git branch -d nome-da-branch

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1
```

### Resolver Conflitos

Se houver conflitos ao fazer pull:

```bash
# 1. Fazer pull
git pull origin main

# 2. Se houver conflitos, Git mostrará os arquivos
# 3. Abra os arquivos e resolva manualmente
# 4. Remova os marcadores: <<<<, ====, >>>>
# 5. Adicione os arquivos resolvidos
git add .

# 6. Complete o merge
git commit -m "fix: resolve conflitos"

# 7. Push
git push
```

## 📚 Recursos Adicionais

- [GitHub Docs - Actions](https://docs.github.com/en/actions)
- [GitHub Docs - Workflows](https://docs.github.com/en/actions/using-workflows)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

## ❓ Problemas Comuns

### "Permission denied" ao fazer push
**Solução**: Configure suas credenciais do GitHub
```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

### "Remote origin already exists"
**Solução**: Remova e adicione novamente
```bash
git remote remove origin
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
```

### Pipeline não executa
**Solução**: 
1. Verifique se o arquivo está em `.github/workflows/`
2. Verifique se o arquivo tem extensão `.yml` ou `.yaml`
3. Valide a sintaxe YAML

### Testes falhando na pipeline mas passando localmente
**Solução**:
1. Diferentes versões do Node.js
2. Timeouts mais rigorosos na CI
3. Problemas de rede/latência
4. Ajuste os timeouts no `cypress.config.js`

## 🎓 Para Estudantes

Este guia foi criado pensando em quem está aprendendo. Não tenha medo de:
- Experimentar
- Cometer erros
- Aprender com os logs
- Pedir ajuda nas Issues

**Git e GitHub são ferramentas essenciais para desenvolvedores!**

---

**Dúvidas? Abra uma [Issue](../../issues) no repositório! 🚀**

