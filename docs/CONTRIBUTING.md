# 🤝 Contributing to Cheap Travels

Thank you for your interest in contributing! This guide will help you get started.

## Code of Conduct

### Our Pledge

Be respectful, inclusive, and professional in all interactions.

### Our Standards

✅ **DO:**
- Be welcoming and inclusive
- Respect differing viewpoints
- Accept constructive criticism
- Focus on what's best for the community

❌ **DON'T:**
- Use inappropriate language
- Troll or make insulting comments
- Harass others
- Publish private information

## How to Contribute

### Reporting Bugs 🐛

**Before submitting:**
1. Check [existing issues](https://github.com/Matheus-C-Martins/cheap-travels/issues)
2. Verify it's actually a bug
3. Test on the latest version

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen.

**Screenshots**
If applicable.

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

### Suggesting Features 💡

**Feature Request Template:**
```markdown
**Problem Statement**
Describe the problem you're trying to solve.

**Proposed Solution**
Your idea for solving it.

**Alternatives**
Other solutions you've considered.

**Additional Context**
Any other relevant information.
```

### Submitting Pull Requests 🔄

#### 1. Fork & Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/cheap-travels.git
cd cheap-travels
git remote add upstream https://github.com/Matheus-C-Martins/cheap-travels.git
```

#### 2. Create Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch Naming:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

#### 3. Make Changes

**Follow code style:**
- Use ESLint configuration
- Run `npm run lint` before committing
- Write clean, readable code
- Add comments for complex logic

**Testing:**
```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run test:coverage # Coverage report
```

#### 4. Commit

**Commit Message Format:**
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

**Examples:**
```bash
git commit -m "feat(deals): add cruise filter"
git commit -m "fix(api): resolve CORS issue"
git commit -m "docs(readme): update installation steps"
```

#### 5. Push

```bash
git push origin feature/your-feature-name
```

#### 6. Open Pull Request

On GitHub, open a PR from your fork to `main` branch.

**PR Template:**
```markdown
## Description
What does this PR do?

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

## Development Guidelines

### Code Style

**JavaScript/React:**
```javascript
// ✅ Good
function DealCard({ deal, onFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="deal-card">
      {/* Component content */}
    </div>
  );
}

// ❌ Bad
function dealCard(props) {
  var hover = false;
  return <div>...</div>
}
```

**CSS:**
```css
/* ✅ Good */
.deal-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ❌ Bad */
.dealCard { display:flex;flex-direction:column; }
```

### Component Guidelines

1. **One component per file**
2. **PropTypes for type checking**
3. **Meaningful names**
4. **Small, focused components**
5. **Extract reusable logic to hooks**

### Testing Guidelines

```javascript
// Component test example
import { render, screen } from '@testing-library/react';
import DealCard from './DealCard';

describe('DealCard', () => {
  it('renders deal title', () => {
    const deal = { title: 'Test Deal', /* ... */ };
    render(<DealCard deal={deal} />);
    expect(screen.getByText('Test Deal')).toBeInTheDocument();
  });
});
```

### Documentation Guidelines

- Update README.md for user-facing changes
- Update docs/ for technical changes
- Add JSDoc comments for complex functions
- Keep documentation in sync with code

## Project Structure

```
cheap-travels/
├── src/              # Frontend source
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── translations/ # i18n
│   └── styles/       # CSS files
├── api/              # Backend source
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   └── middleware/   # Express middleware
├── docs/             # Documentation
├── public/           # Static assets
└── tests/            # Test files
```

## Getting Help

**Stuck? Ask for help!**

- 💬 [GitHub Discussions](https://github.com/Matheus-C-Martins/cheap-travels/discussions)
- 🐛 [Open an Issue](https://github.com/Matheus-C-Martins/cheap-travels/issues)
- 📧 Contact maintainers

## Recognition

Contributors will be:
- Added to README.md
- Mentioned in release notes
- Forever appreciated! 🙏

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
