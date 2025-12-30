# 🚀 GUIA DE DEPLOY RÁPIDO

## Parte 1: Deploy do Backend API no Render.com

### Passo 1: Criar Conta no Render
1. Acesse: https://render.com
2. Clique em "Get Started"
3. Conecte sua conta GitHub

### Passo 2: Criar Web Service
1. No dashboard do Render, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte ao repositório: `Matheus-C-Martins/cheap-travels`
4. Configure:

```
Name: cheap-travels-api
Region: Oregon (US West)
Branch: main
Root Directory: api
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### Passo 3: Configurar Variáveis de Ambiente no Render

Na seção **"Environment"** do Render, adicione:

```
NODE_ENV=production
PORT=3001
SCRAPE_INTERVAL_MINUTES=30
MAX_CONCURRENT_SCRAPES=2
CACHE_TTL_SECONDS=300
CORS_ORIGIN=https://matheus-c-martins.github.io
```

**📝 Importante:** Adicione `CORS_ORIGIN` aqui mesmo, na aba Environment!

### Passo 4: Deploy
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (5-10 minutos)
3. **Anote a URL gerada** (ex: `https://cheap-travels-api.onrender.com`)

### Passo 5: Verificar

Acesse: `https://cheap-travels-api.onrender.com/api/health`

Deve retornar:
```json
{"status":"ok","message":"API funcionando"}
```

---

## Parte 2: Configurar GitHub Secret (SEGURANÇA) 🔒

### Por que usar GitHub Secrets?
- ✅ Mais seguro - URL não fica exposta no código
- ✅ Pode ser alterada sem modificar código
- ✅ Cada ambiente pode ter URL diferente
- ✅ Boa prática de segurança

### Passo 1: Adicionar Secret no GitHub

1. **Vá para o repositório:** https://github.com/Matheus-C-Martins/cheap-travels

2. **Clique em:** `Settings` (no topo do repositório)

3. **No menu lateral esquerdo:**
   - Clique em `Secrets and variables`
   - Clique em `Actions`

4. **Clique em:** `New repository secret`

5. **Configure:**
   ```
   Name: VITE_API_URL
   Secret: https://cheap-travels-api.onrender.com/api
   ```
   ⚠️ **Substitua pela URL real que você anotou no Passo 4 da Parte 1!**

6. **Clique em:** `Add secret`

### Passo 2: Remover .env do Repositório

O arquivo `.env` não deve estar no repositório. Vamos removê-lo:

```bash
git rm .env
git commit -m "security: Remove .env file"
git push origin main
```

### Passo 3: Trigger Deploy

O GitHub Actions criará o `.env` automaticamente usando o secret!

**Opção A - Fazer um commit qualquer:**
```bash
echo "# Deploy triggered" >> README.md
git add README.md
git commit -m "trigger: Deploy with secrets"
git push origin main
```

**Opção B - Executar workflow manualmente:**
1. Vá em: https://github.com/Matheus-C-Martins/cheap-travels/actions
2. Clique em "Deploy to GitHub Pages"
3. Clique em "Run workflow"
4. Selecione branch `main`
5. Clique em "Run workflow"

### Passo 4: Verificar Deploy

1. Vá em: https://github.com/Matheus-C-Martins/cheap-travels/actions
2. Aguarde o workflow concluir (✅ verde)
3. Acesse: https://matheus-c-martins.github.io/cheap-travels/

---

## Parte 3: Configurar CORS no Render (CORRETO) 🔧

### Onde Configurar o CORS:

**IMPORTANTE:** O CORS já foi configurado no Passo 3 da Parte 1!

Mas se precisar alterar depois:

1. **Dashboard do Render:** https://dashboard.render.com

2. **Selecione seu serviço:** `cheap-travels-api`

3. **No menu lateral esquerdo, clique em:** `Environment`

4. **Procure pela variável:** `CORS_ORIGIN`
   - Se não existir, clique em `Add Environment Variable`
   - Name: `CORS_ORIGIN`
   - Value: `https://matheus-c-martins.github.io`

5. **Clique em:** `Save Changes`

6. O serviço reiniciará automaticamente (30-60 segundos)

### Como Saber se o CORS está Correto:

**Teste 1 - Via Browser:**
1. Abra: https://matheus-c-martins.github.io/cheap-travels/
2. Abra o Console do navegador (F12)
3. Se NÃO houver erro de CORS = ✅ Funcionando
4. Se houver erro tipo "Access-Control-Allow-Origin" = ❌ CORS mal configurado

**Teste 2 - Via CURL:**
```bash
curl -H "Origin: https://matheus-c-martins.github.io" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     https://cheap-travels-api.onrender.com/api/deals
```

Deve retornar header:
```
access-control-allow-origin: https://matheus-c-martins.github.io
```

---

## ✅ Verificar Deploy Completo

### 1. Testar API
```bash
curl https://cheap-travels-api.onrender.com/api/health
```
**Esperado:**
```json
{"status":"ok","message":"API funcionando"}
```

### 2. Testar Frontend
Acesse: https://matheus-c-martins.github.io/cheap-travels/

**Verificar:**
- ✅ Página carrega
- ✅ Sem erros no console
- ✅ Ofertas aparecem (pode demorar 30 seg na primeira vez - cold start)

### 3. Verificar Ofertas
```bash
curl https://cheap-travels-api.onrender.com/api/deals
```

---

## 🔒 Segurança - Checklist

- [ ] ✅ `.env` removido do repositório
- [ ] ✅ `.env` adicionado ao `.gitignore`
- [ ] ✅ Secret `VITE_API_URL` criado no GitHub
- [ ] ✅ CORS configurado no Render com origem específica
- [ ] ✅ Workflow usando secret
- [ ] ✅ Deploy funcionando

---

## 📊 Monitorar Sistema

### Ver Logs da API (Render)

1. https://dashboard.render.com
2. Selecione `cheap-travels-api`
3. Clique em `Logs` (menu lateral)
4. Ver logs em tempo real

**Procure por:**
```
🚀 Cheap Travels API
🌐 Servidor: http://...
🔍 Scraping: Ativo
✅ LATAM: X ofertas
✅ Azul: X ofertas
```

### Ver Logs do Deploy (GitHub)

1. https://github.com/Matheus-C-Martins/cheap-travels/actions
2. Clique no workflow mais recente
3. Ver logs detalhados de cada step

---

## 🐛 Troubleshooting

### Erro: "CORS policy: No 'Access-Control-Allow-Origin'"

**Causa:** CORS mal configurado

**Solução:**
1. Render Dashboard > Environment
2. Adicionar/Verificar: `CORS_ORIGIN=https://matheus-c-martins.github.io`
3. Save Changes
4. Aguardar reinício (30-60s)

### Erro: "Failed to fetch" no frontend

**Causa:** URL da API incorreta ou API offline

**Solução:**
1. Verificar secret no GitHub está correto
2. Testar API diretamente: `curl https://sua-api.onrender.com/api/health`
3. Ver logs no Render

### Erro: API retorna 502 Bad Gateway

**Causa:** API crashou ou não iniciou

**Solução:**
1. Ver logs no Render
2. Procurar por erros
3. Comum: Puppeteer não consegue iniciar no Free tier
4. Considerar: Starter plan ($7/mês) ou usar dados mockados inicialmente

### Frontend não atualiza ofertas

**Causa:** Secret não configurado ou build antigo

**Solução:**
1. Verificar secret existe: Settings > Secrets > Actions
2. Re-run workflow: Actions > Run workflow
3. Limpar cache do browser (Ctrl+Shift+R)

---

## 💰 Custos

### Render Free Tier
- ✅ **$0/mês**
- ✅ 750 horas/mês
- ⚠️ Dorme após 15min inatividade
- ⚠️ 512 MB RAM
- ⚠️ Puppeteer pode ser lento

### Render Starter (Recomendado para Puppeteer)
- 💵 **$7/mês**
- ✅ Sempre ativo
- ✅ 512 MB RAM dedicada
- ✅ Puppeteer roda melhor

### GitHub Pages
- ✅ **$0/mês** - 100% gratuito
- ✅ Bandwidth ilimitado
- ✅ Deploy automático

**Total mínimo: $0/mês**
**Recomendado: $7/mês** (para melhor performance)

---

## 📝 Checklist Final

### Backend
- [ ] API deployada no Render
- [ ] Variáveis de ambiente configuradas (incluindo CORS_ORIGIN)
- [ ] URL da API anotada
- [ ] Teste: `/api/health` responde
- [ ] Logs verificados sem erros

### Segurança
- [ ] Secret VITE_API_URL criado no GitHub
- [ ] Arquivo .env removido do repositório
- [ ] .env está no .gitignore
- [ ] CORS configurado corretamente

### Frontend
- [ ] Workflow executado com sucesso
- [ ] Deploy no GitHub Pages concluído
- [ ] Site acessível
- [ ] Sem erros CORS no console
- [ ] Ofertas carregando

### Funcionalidades
- [ ] Scraping funcionando (ver logs)
- [ ] Ofertas sendo validadas
- [ ] API retornando dados
- [ ] Frontend exibindo cards
- [ ] Filtros funcionando
- [ ] Links redirecionando

---

## 🎉 Próximos Passos

1. ✅ **Sistema deployado e funcionando!**
2. 📊 **Monitorar performance** por 24h
3. 🔧 **Ajustar scrapers** se necessário
4. 🚀 **Considerar upgrade** se Puppeteer estiver lento
5. 📱 **Compartilhar** com usuários para testar
6. 📈 **Adicionar analytics** (opcional)
7. 🔔 **Sistema de notificações** (futuro)

---

## 📞 Suporte

**Dúvidas sobre:**
- **Render:** https://render.com/docs
- **GitHub Actions:** https://docs.github.com/actions
- **GitHub Secrets:** https://docs.github.com/actions/security-guides/encrypted-secrets
- **Issues:** https://github.com/Matheus-C-Martins/cheap-travels/issues

**Deploy funcionando?**
⭐ Dê uma estrela no repositório!
