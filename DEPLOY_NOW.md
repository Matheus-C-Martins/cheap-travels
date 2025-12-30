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

### Passo 3: Variáveis de Ambiente

Adicione as seguintes variáveis:

```
NODE_ENV=production
PORT=3001
SCRAPE_INTERVAL_MINUTES=30
MAX_CONCURRENT_SCRAPES=2
CACHE_TTL_SECONDS=300
```

### Passo 4: Deploy
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (5-10 minutos)
3. Anote a URL gerada (ex: `https://cheap-travels-api.onrender.com`)

### Passo 5: Verificar

Acesse: `https://cheap-travels-api.onrender.com/api/health`

Deve retornar:
```json
{"status":"ok","message":"API funcionando"}
```

---

## Parte 2: Conectar Frontend com Backend

### Passo 1: Atualizar URL da API

Crie arquivo `.env` na **raiz do projeto**:

```env
VITE_API_URL=https://cheap-travels-api.onrender.com/api
```

### Passo 2: Commit e Push

```bash
git add .env
git commit -m "config: Add API URL for production"
git push origin main
```

### Passo 3: GitHub Pages Deploy

O GitHub Actions fará o deploy automaticamente!

Aguarde 2-3 minutos e acesse:
`https://matheus-c-martins.github.io/cheap-travels/`

---

## Parte 3: Configurar CORS

### No Render Dashboard:

1. Vá em **Environment**
2. Adicione variável:

```
CORS_ORIGIN=https://matheus-c-martins.github.io
```

3. Clique em **"Save Changes"**
4. O serviço reiniciará automaticamente

---

## ✅ Verificar Deploy Completo

### 1. Testar API
```bash
curl https://cheap-travels-api.onrender.com/api/health
```

### 2. Testar Frontend
Acesse: https://matheus-c-martins.github.io/cheap-travels/

### 3. Verificar Ofertas
```bash
curl https://cheap-travels-api.onrender.com/api/deals
```

---

## 📊 Status do Sistema

### Monitorar Logs da API

1. No Render Dashboard
2. Selecione "cheap-travels-api"
3. Clique em "Logs"
4. Ver logs em tempo real

### Verificar Scraping

Nos logs, procure por:
```
🔍 INICIANDO SCRAPING DE VOOS
✅ LATAM: X ofertas
✅ Azul: X ofertas
✅ GOL: X ofertas
```

---

## 🐛 Troubleshooting

### API não responde

**Problema:** 502 Bad Gateway

**Solução:**
1. Verificar logs no Render
2. Checar variáveis de ambiente
3. Redeployar: Manual Deploy > Deploy Latest Commit

### CORS Error no Frontend

**Problema:** `Access-Control-Allow-Origin`

**Solução:**
1. Adicionar `CORS_ORIGIN` nas variáveis
2. Verificar que a URL está correta
3. Reiniciar serviço

### Scraping não funciona

**Problema:** Puppeteer error

**Solução:**
1. O Render Free tier tem limitações
2. Considerar usar dados mockados inicialmente
3. Ou upgrade para plano pago ($7/mês)

### Frontend não carrega ofertas

**Problema:** API URL incorreta

**Solução:**
1. Verificar arquivo `.env`
2. Rebuild do frontend
3. Verificar console do navegador

---

## 💰 Custos

### Render Free Tier
- ✅ **Gratuito**
- ✅ 750 horas/mês
- ⚠️ Dorme após 15 min de inatividade
- ⚠️ 512 MB RAM

### Render Paid ($7/mês)
- ✅ Sem sleep
- ✅ 1 GB RAM
- ✅ Melhor para Puppeteer

### GitHub Pages
- ✅ **100% Gratuito**
- ✅ Ilimitado

---

## 🚀 Otimizações Futuras

### 1. Adicionar Banco de Dados

**PostgreSQL no Render (Gratuito):**
```bash
# No Dashboard
New > PostgreSQL
```

### 2. Adicionar Redis Cache

**Upstash Redis (Gratuito):**
- 10,000 comandos/dia
- 256 MB storage

### 3. Monitoramento

**Sentry (Gratuito):**
- 5,000 eventos/mês
- Error tracking

### 4. Uptime Monitoring

**UptimeRobot (Gratuito):**
- 50 monitores
- Notificações

---

## 📝 Checklist Final

- [ ] API deployada no Render
- [ ] URL da API anotada
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado
- [ ] `.env` criado com API URL
- [ ] Frontend deployado no GitHub Pages
- [ ] Teste: API responde
- [ ] Teste: Frontend carrega
- [ ] Teste: Ofertas aparecem
- [ ] Logs verificados
- [ ] Scraping funcionando

---

## 🎉 Próximos Passos

1. ✅ Sistema deployado e funcionando
2. 📈 Monitorar performance
3. 🔧 Ajustar scrapers conforme necessário
4. 📨 Adicionar sistema de notificações
5. 📊 Implementar analytics
6. 👥 Coletar feedback de usuários

---

## 📞 Suporte

**Problemas?**
- Issues: https://github.com/Matheus-C-Martins/cheap-travels/issues
- Render Docs: https://render.com/docs
- Vite Docs: https://vitejs.dev/

**Deploy bem-sucedido?**
⭐ Dê uma estrela no GitHub!
