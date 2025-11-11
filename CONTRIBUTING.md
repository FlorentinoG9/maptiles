# Contributing

Thank you for your interest in contributing to `@vibe/pmtiles-map`! This document provides guidelines and instructions for contributing.

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Build the project:
   ```bash
   bun run build
   ```

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. We use Commitlint and Commitizen to enforce this.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semi colons, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system or external dependencies
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify src or test files
- `revert`: Revert a previous commit

### Examples

```
feat(markers): add custom pin support
fix(map): resolve center prop update issue
docs(readme): update installation instructions
```

### Using Commitizen

We recommend using Commitizen for creating commits:

```bash
bun run commit
```

This will guide you through creating a properly formatted commit message.

## Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes

3. Add a changeset (required for versioning):
   ```bash
   bun run changeset:add
   ```
   
   Select the appropriate version bump:
   - **Major**: Breaking changes
   - **Minor**: New features (backwards compatible)
   - **Patch**: Bug fixes (backwards compatible)

4. Commit your changes:
   ```bash
   bun run commit
   ```
   
   Or manually:
   ```bash
   git commit -m "feat: your feature description"
   ```

5. Push and create a Pull Request

## Versioning and Releases

This project uses [Changesets](https://github.com/changesets/changesets) for version management.

### Adding a Changeset

When making changes, you must add a changeset:

```bash
bun run changeset:add
```

This creates a markdown file in `.changeset/` describing your change.

### Release Process

Releases are automated via GitHub Actions:

1. When changesets are merged to `main`, a PR is automatically created to version packages
2. Once the version PR is merged, packages are automatically published to npm

## Code Style

- Use TypeScript
- Follow existing code patterns
- Run type checking before committing:
  ```bash
  bun run typecheck
  ```

## Testing

Before submitting a PR, ensure:

- [ ] Code builds successfully (`bun run build`)
- [ ] Type checking passes (`bun run typecheck`)
- [ ] A changeset has been added (`bun run changeset:add`)
- [ ] Commit messages follow the convention

## Questions?

Feel free to open an issue for any questions or clarifications!

