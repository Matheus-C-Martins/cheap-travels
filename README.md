# Cheap Travels 🌍✈️

Uma aplicação React moderna para encontrar as melhores ofertas de viagens.

[![Deploy to GitHub Pages](https://github.com/Matheus-C-Martins/cheap-travels/actions/workflows/deploy.yml/badge.svg)](https://github.com/Matheus-C-Martins/cheap-travels/actions/workflows/deploy.yml)

## 🚀 Tecnologias

- **React 18** - Biblioteca UI moderna
- **Vite** - Build tool ultrarrápido e dev server
- **React Router** - Navegação entre páginas
- **ESLint** - Linting e qualidade de código
- **GitHub Actions** - CI/CD pipeline automático
- **GitHub Pages** - Hospedagem gratuita

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/Matheus-C-Martins/cheap-travels.git
cd cheap-travels

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint do código
npm run lint

# Deploy para GitHub Pages
npm run deploy
```

## 🔧 Desenvolvimento

O servidor de desenvolvimento estará disponível em `http://localhost:3000`

### Estrutura de Componentes

- **Navbar** - Barra de navegação responsiva
- **Footer** - Rodapé com informações
- **Home** - Página inicial com busca e features
- **About** - Página sobre o projeto

## 🌐 Deploy

O projeto está configurado para **deploy automático** no GitHub Pages através do GitHub Actions.

### Como funciona:

1. Cada push para a branch `main` dispara automaticamente o workflow
2. O GitHub Actions executa:
   - ✅ Instalação de dependências (`npm ci`)
   - ✅ Linting (`npm run lint`)
   - ✅ Build (`npm run build`)
   - ✅ Deploy para GitHub Pages

3. O site fica disponível em: `https://matheus-c-martins.github.io/cheap-travels/`

### Configuração do GitHub Pages

Para ativar o GitHub Pages:

1. Vá em **Settings** > **Pages** do repositório
2. Em **Source**, selecione **GitHub Actions**
3. O deploy será automático após o próximo push

## 📁 Estrutura do Projeto

```
cheap-travels/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD workflow
├── public/
│   └── vite.svg               # Ícone público
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Componente de navegação
│   │   ├── Navbar.css
│   │   ├── Footer.jsx         # Componente de rodapé
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx           # Página inicial
│   │   ├── Home.css
│   │   ├── About.jsx          # Página sobre
│   │   └── About.css
│   ├── App.jsx                # Componente principal
│   ├── App.css
│   ├── main.jsx               # Ponto de entrada
│   └── index.css              # Estilos globais
├── .eslintrc.cjs              # Configuração ESLint
├── .gitignore                 # Arquivos ignorados pelo Git
├── index.html                 # HTML principal
├── package.json               # Dependências e scripts
├── vite.config.js             # Configuração Vite
└── README.md                  # Este arquivo
```

## 🎨 Features

- ✨ Interface moderna e responsiva
- 🔍 Sistema de busca de viagens
- 📱 Mobile-first design
- 🌓 Suporte a tema escuro
- ⚡ Performance otimizada com Vite
- 🔄 CI/CD automático
- 📦 Deploy automático no GitHub Pages

## 🛠️ Comandos Úteis

| Comando | Descrição |
|---------|----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Cria build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Verifica código com ESLint |
| `npm run deploy` | Deploy manual para GitHub Pages |

## 📝 Próximos Passos

- [ ] Integrar API de busca de voos
- [ ] Adicionar sistema de filtragem avançada
- [ ] Implementar comparação de preços
- [ ] Adicionar autenticação de usuários
- [ ] Sistema de favoritos
- [ ] Notificações de ofertas
- [ ] Testes automatizados (Jest + React Testing Library)

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT © Matheus C. Martins

## 👨‍💻 Autor

**Matheus C. Martins**

- GitHub: [@Matheus-C-Martins](https://github.com/Matheus-C-Martins)

---

⭐ Se este projeto foi útil, considere dar uma estrela!
