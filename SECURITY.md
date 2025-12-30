# 🔒 Guia de Segurança

## Variáveis de Ambiente

### ❌ NUNCA faça isso:

```javascript
// Não comitar URLs ou chaves diretamente no código
const API_URL = 'https://minha-api.com'; // ❌ ERRADO
```

### ✅ Sempre faça isso:

```javascript
// Usar variáveis de ambiente
const API_URL = import.meta.env.VITE_API_URL; // ✅ CORRETO
```

## GitHub Secrets

### Como Configurar

1. **Repositório** → `Settings` → `Secrets and variables` → `Actions`
2. **New repository secret**
3. Adicionar secrets:

```
VITE_API_URL = https://sua-api.onrender.com/api
```

### Como Usar no GitHub Actions

```yaml
- name: Create .env file
  run: |
    echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" > .env
```

## Arquivo .env

### ✅ Boas Práticas

1. **SEMPRE** adicionar `.env` ao `.gitignore`
2. **NUNCA** commitar `.env` no repositório
3. Criar `.env.example` com valores de exemplo
4. Documentar todas as variáveis necessárias

### Estrutura do .env

```env
# .env.example (pode commitar)
VITE_API_URL=http://localhost:3001/api

# .env (NÃO commitar)
VITE_API_URL=https://sua-api-real.com/api
```

## CORS

### Configuração Segura

```javascript
// ❌ INSEGURO - Permite qualquer origem
app.use(cors({ origin: '*' }));

// ✅ SEGURO - Apenas origens específicas
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://matheus-c-martins.github.io',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

### No Render.com

Adicionar em Environment:
```
CORS_ORIGIN=https://matheus-c-martins.github.io
```

## API Keys

### Se usar APIs externas

```env
# Backend .env
SKYSCANNER_API_KEY=sua_chave_secreta
AMADEUS_API_KEY=sua_chave_secreta
```

### No código:

```javascript
// ✅ CORRETO
const apiKey = process.env.SKYSCANNER_API_KEY;

// ❌ ERRADO
const apiKey = 'sk_live_abc123...'; // Nunca hardcode!
```

## Rate Limiting

### Já implementado:

```javascript
// api/middleware/rateLimiter.js
// 100 requests por minuto por IP
```

### Recomendações:

- ✅ Manter rate limiting ativo
- ✅ Ajustar limites conforme necessário
- ✅ Monitorar logs para abusos

## Scraping Ético

### Boas Práticas

1. ✅ Respeitar `robots.txt`
2. ✅ Delays entre requests (2 segundos)
3. ✅ User-Agent realista
4. ✅ Não sobrecarregar servidores
5. ✅ Máximo 2 scrapers simultâneos

### Configurado em:

```javascript
// api/config/scraping.js
REQUEST_DELAY: 2000,
MAX_CONCURRENT: 2
```

## Validação de Dados

### Sempre validar:

```javascript
// ✅ Validação implementada
if (!deal.url || !deal.url.startsWith('http')) {
  return false; // Rejeitar dados inválidos
}
```

## Headers de Segurança

### Helmet.js implementado:

```javascript
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
```

## Logs Seguros

### ❌ NUNCA logar:

- Senhas
- Tokens
- API Keys
- Dados pessoais sensíveis

### ✅ Pode logar:

- Timestamps
- Endpoints acessados
- Erros (sem dados sensíveis)
- Métricas

## Checklist de Segurança

- [ ] ✅ `.env` no `.gitignore`
- [ ] ✅ Secrets configurados no GitHub
- [ ] ✅ CORS com origem específica
- [ ] ✅ Rate limiting ativo
- [ ] ✅ Helmet.js configurado
- [ ] ✅ Validação de dados
- [ ] ✅ Logs seguros
- [ ] ✅ Scraping ético
- [ ] ✅ HTTPS em produção
- [ ] ✅ Dependências atualizadas

## Atualizações de Segurança

### Verificar vulnerabilidades:

```bash
npm audit
```

### Corrigir automaticamente:

```bash
npm audit fix
```

### Atualizar dependências:

```bash
npm update
```

## Reportar Vulnerabilidade

Se encontrar uma vulnerabilidade:

1. **NÃO** abrir issue público
2. Enviar email privado para o mantenedor
3. Aguardar correção antes de divulgar

## Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
