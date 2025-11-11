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

We recommend using Commitizen for creating commits. You can use either the full command or the shortcut:

```bash
# Full command
bun run commit

# Shortcut (easier!)
bun run c
```

This will guide you through creating a properly formatted commit message interactively.

## Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes

3. Stage your changes:
   ```bash
   git add .
   ```

4. Add a changeset (required for versioning):
   ```bash
   # Full command
   bun run changeset:add
   
   # Shortcut (easier!)
   bun run cs
   ```
   
   Select the appropriate version bump:
   - **Major**: Breaking changes
   - **Minor**: New features (backwards compatible)
   - **Patch**: Bug fixes (backwards compatible)

5. Commit your changes:
   ```bash
   # Easiest: Single command (stages, adds changeset if needed, commits)
   bun run save
   
   # Or step-by-step:
   # Using Commitizen (recommended)
   bun run c
   
   # Or manually (must follow conventional commit format)
   git commit -m "feat: your feature description"
   ```

6. Push and create a Pull Request

## Versioning and Releases

This project uses [Changesets](https://github.com/changesets/changesets) for version management.

### Adding a Changeset

When making changes, you must add a changeset. Use the shortcut for convenience:

```bash
# Shortcut (recommended)
bun run cs

# Or full command
bun run changeset:add
```

This creates a markdown file in `.changeset/` describing your change.

### Release Process

Releases are automated via GitHub Actions:

1. When changesets are merged to `main`, a PR is automatically created to version packages
2. Once the version PR is merged, packages are automatically published to npm

## Quick Reference

### Common Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| `bun run save` | - | **One command to rule them all!** Stage, add changeset (if needed), and commit |
| `bun run commit` | `bun run c` | Create a commit with Commitizen |
| `bun run changeset:add` | `bun run cs` | Add a changeset for versioning |
| `bun run typecheck` | - | Check TypeScript types |
| `bun run build` | - | Build the project |

### Typical Workflow

**Option 1: Single Command (Easiest!)**
```bash
# 1. Make your changes
# ... edit files ...

# 2. Save everything (stages, adds changeset if needed, commits)
bun run save

# 3. Push
git push
```

**Option 2: Step-by-Step**
```bash
# 1. Make your changes
# ... edit files ...

# 2. Stage changes
git add .

# 3. Add changeset (if needed)
bun run cs

# 4. Commit
bun run c

# 5. Push
git push
```

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

