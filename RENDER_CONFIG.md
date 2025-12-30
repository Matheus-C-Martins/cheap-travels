# 🔧 Configuração Manual do Render

## ⚠️ PROBLEMA IDENTIFICADO

O `render.yaml` não está sendo usado automaticamente. É necessário configurar manualmente.

---

## 🚀 Passo a Passo CORRETO

### 1. Acessar Render Dashboard

Acesse: https://dashboard.render.com

### 2. Criar Novo Web Service

1. Clique em **"New +"** (canto superior direito)
2. Selecione **"Web Service"**
3. Conecte ao repositório GitHub: `Matheus-C-Martins/cheap-travels`
4. Clique em **"Connect"**

### 3. Configurar o Serviço

#### 📝 Configurações Básicas:

```
Name: cheap-travels-api
Region: Oregon (US West)
Branch: main
Runtime: Node
```

#### 📂 **IMPORTANTE - Root Directory:**

```
Root Directory: api
```

⚠️ **ATENÇÃO:** Certifique-se de que está escrito exatamente `api` (minúsculo, sem barras)

#### 🔨 Build & Start Commands:

```
Build Command: npm install
Start Command: npm start
```

#### 💰 Plan:

```
Instance Type: Free
```

### 4. Environment Variables

Clique em **"Advanced"** e adicione estas variáveis:

```
NODE_ENV=production
PORT=3001
SCRAPE_INTERVAL_MINUTES=30
MAX_CONCURRENT_SCRAPES=2
CACHE_TTL_SECONDS=300
CORS_ORIGIN=https://matheus-c-martins.github.io
```

### 5. Health Check

Role para baixo e em **"Health Check Path"**:

```
/api/health
```

### 6. Auto-Deploy

```
☑ Auto-Deploy: Yes
```

### 7. Criar o Serviço

Clique em **"Create Web Service"**

Aguarde 3-5 minutos para o primeiro deploy.

---

## ✅ Verificar Deploy

### Ver Logs em Tempo Real

1. No dashboard do seu serviço
2. Clique em **"Logs"** (menu lateral esquerdo)

### O que Você Deve Ver:

```
==> Cloning from https://github.com/...
==> Checking out commit ...
==> Using Node.js version 22.x
==> Running build command 'npm install'...

added XXX packages (onde XXX > 50)

==> Build successful 🎉
==> Deploying...
==> Running 'npm start'

==================================================
🚀 Cheap Travels API
==================================================
🌐 Servidor: http://...:3001
📅 Iniciado: ...
⚙️  Ambiente: production
🔍 Scraping: Ativo
==================================================
```

### Testar a API

Copie a URL do seu serviço (aparece no topo do dashboard).

Exemplo: `https://cheap-travels-api.onrender.com`

Teste:

```bash
curl https://cheap-travels-api.onrender.com/api/health
```

**Resposta Esperada:**
```json
{
  "status": "ok",
  "message": "API funcionando",
  "timestamp": "...",
  "uptime": ...,
  "environment": "production"
}
```

---

## 🐛 Troubleshooting

### Erro: "Missing script: start"

**Causa:** Root Directory não foi configurado corretamente.

**Solução:**

1. No Render Dashboard, vá em **Settings**
2. Procure **"Root Directory"**
3. Certifique-se que está: `api` (sem barras, sem espaços)
4. Clique em **"Save Changes"**
5. Manual Deploy > Deploy latest commit

### Erro: "added 8 packages" (muito pouco)

**Causa:** Está instalando do `package.json` da raiz em vez do `api/package.json`.

**Solução:** Mesmo que acima - verificar Root Directory.

### Erro: "Cannot find module 'express'"

**Causa:** Dependências não foram instaladas.

**Solução:**

1. Verificar Root Directory = `api`
2. Verificar Build Command = `npm install`
3. Redeployar

---

## 📊 O que Esperar

### Build Logs Corretos:

```
==> Running build command 'npm install'...

npm warn deprecated ...
npm warn deprecated ...

added 250+ packages, and audited 251 packages in 15s

15 packages are looking for funding

==> Build successful 🎉
```

### Start Logs Corretos:

```
==> Running 'npm start'

> cheap-travels-api@1.0.0 start
> node server.js

==================================================
🚀 Cheap Travels API
==================================================
🌐 Servidor: http://0.0.0.0:3001
📅 Iniciado: 30/12/2025, 13:30:00
⚙️  Ambiente: production
🔍 Scraping: Ativo (a cada 30 minutos)
==================================================

🛫 ========== INICIANDO SCRAPING DE VOOS ==========
📅 30/12/2025, 13:30:05

🔍 Acessando LATAM Ofertas...
...
```

---

## 📄 Checklist de Verificação

- [ ] Serviço criado no Render
- [ ] Root Directory = `api`
- [ ] Build Command = `npm install`
- [ ] Start Command = `npm start`
- [ ] 6 Environment Variables configuradas
- [ ] Health Check Path = `/api/health`
- [ ] Auto-Deploy = Yes
- [ ] Build mostra "added 250+ packages"
- [ ] Start mostra "🚀 Cheap Travels API"
- [ ] `/api/health` responde com status: ok
- [ ] Logs sem erros críticos

---

## 🎉 Sucesso!

Quando tudo estiver funcionando:

1. ✅ API respondendo em `/api/health`
2. ✅ Logs mostrando "API funcionando"
3. ✅ Scraping iniciando automaticamente
4. ✅ Sem erros nos logs

**Anote a URL da sua API:** `https://cheap-travels-api.onrender.com`

**Próximo passo:** Configurar o GitHub Secret com esta URL.

---

## 📧 Suporte

**Ainda com problemas?**

1. Copie os logs completos do Render
2. Abra um issue: https://github.com/Matheus-C-Martins/cheap-travels/issues
3. Cole os logs e descreva o problema
