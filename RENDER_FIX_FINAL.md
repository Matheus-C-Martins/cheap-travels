# 🔧 SOLUÇÃO FINAL - Render Deploy

## ❌ Problema:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'express'
```

**Causa:** O `npm install` não está instalando as dependências no diretório correto.

---

## ✅ SOLUÇÃO APLICADA

O `render.yaml` foi atualizado com o build command correto.

### **Mas você precisa configurar MANUALMENTE no dashboard:**

---

## 🚀 Passo a Passo CORRETO:

### 1. Acessar Settings

1. https://dashboard.render.com
2. Selecione `cheap-travels-api`
3. Menu lateral → **Settings**

### 2. Configurar Build & Deploy

Role até a seção **"Build & Deploy"**

#### **Root Directory:**
```
api
```

#### **Build Command:** ⚠️ IMPORTANTE!
```
npm install
```

#### **Start Command:**
```
npm start
```

### 3. Salvar e Redeployar

1. **Save Changes** (botão no final da página)
2. Voltar para o dashboard do serviço
3. **Manual Deploy** (canto superior direito)
4. **Deploy latest commit**

---

## 📊 Logs Esperados (CORRETOS):

```
==> Cloning from https://github.com/...
==> Checking out commit ...
==> Using Node.js version 22.x
==> Running build command 'npm install'...

added 250+ packages, and audited 251 packages in 15s
                ^^^ Deve ser 250+, não 8!

15 packages are looking for funding

==> Build successful 🎉
==> Deploying...
==> Running 'npm start'

> cheap-travels-api@1.0.0 start
> node server.js

==================================================
🚀 Cheap Travels API
==================================================
🌐 Servidor: http://0.0.0.0:3001
📅 Iniciado: ...
⚙️  Ambiente: production
🔍 Scraping: Ativo (a cada 30 minutos)
==================================================
```

---

## ✅ Como Verificar que Funcionou:

### 1. Nos Logs:

**Deve mostrar:**
- ✅ `added 250+ packages` (NÃO 8)
- ✅ `Build successful 🎉`
- ✅ `🚀 Cheap Travels API` (servidor iniciado)
- ✅ Sem erros `ERR_MODULE_NOT_FOUND`

### 2. Testar API:

Copie a URL do seu serviço (topo do dashboard).

Teste:
```bash
curl https://seu-servico.onrender.com/api/health
```

**Resposta esperada:**
```json
{
  "status": "ok",
  "message": "API funcionando",
  "timestamp": "2025-12-30T14:35:00.000Z",
  "uptime": 5.123,
  "environment": "production"
}
```

---

## 🐛 Se Continuar com Erro:

### Erro: "added 8 packages" (ainda)

**Solução:**

O Root Directory não está configurado. Verifique que está EXATAMENTE:
```
api
```

(sem `/`, sem espaços, minúsculo)

### Erro: "Cannot find module 'express'" (ainda)

**Solução Alternativa:**

Mude o **Build Command** para:

```bash
cd api && npm install
```

Isso força o npm a instalar dentro da pasta api.

### Erro: "Puppeteer downloading Chromium" (travado)

**Solução:**

O free tier do Render pode travar baixando o Chrome do Puppeteer.

**Opção 1:** Aguarde 10-15 minutos (às vezes demora mesmo)

**Opção 2:** Temporariamente desabilite o scraping:

Adicione Environment Variable:
```
DISABLE_SCRAPING=true
```

E depois implemente lógica no código para pular o scraping se essa variável existir.

---

## 🎯 Checklist Final:

- [ ] Settings acessado
- [ ] Root Directory = `api`
- [ ] Build Command = `npm install`
- [ ] Start Command = `npm start`
- [ ] Environment Variables configuradas (6 no total)
- [ ] Save Changes clicado
- [ ] Manual Deploy executado
- [ ] Logs mostram "added 250+ packages"
- [ ] Logs mostram "🚀 Cheap Travels API"
- [ ] `/api/health` responde com status: ok
- [ ] Sem erros nos logs

---

## ⏱️ Tempo Esperado:

- **Build:** 1-2 minutos
- **Deploy:** 30 segundos
- **Puppeteer download:** 5-10 minutos (primeira vez)
- **Total:** 7-13 minutos

❌ **1 hora = Algo está travado!**

Se passar de 15 minutos, cancele e tente novamente.

---

## 🆘 Última Alternativa:

### Se NADA funcionar:

**Delete o serviço e crie um NOVO seguindo EXATAMENTE:**

1. New + → Web Service
2. Repositório: `Matheus-C-Martins/cheap-travels`
3. **Name:** `cheap-travels-api`
4. **Root Directory:** `api` ⬅️ NÃO ESQUEÇA!
5. **Build:** `npm install`
6. **Start:** `npm start`
7. **Environment:** Adicionar as 6 variáveis
8. Create Web Service

---

## 📞 Suporte:

Se continuar com erro depois de seguir tudo isso:

1. Copie os logs COMPLETOS do Render
2. Tire screenshot da página de Settings (Build & Deploy)
3. Abra issue: https://github.com/Matheus-C-Martins/cheap-travels/issues
4. Cole tudo lá

---

## ✅ Quando Funcionar:

**Você verá:**

```
🚀 Cheap Travels API
🌐 Servidor rodando
🔍 Scraping iniciado
✅ /api/health respondendo
```

**Próximo passo:**

Configurar o GitHub Secret com a URL da API!
