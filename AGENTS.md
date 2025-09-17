# Agent Rules

Generated from .cursor/rules

## always.mdc

---

description:
globs:
alwaysApply: true

---

## Development cycle

1. Run `pnpm install` (you have internet access)
2. Make your code edits and changes
3. Finally run `pnpm typecheck` and `pnpm lint`

## Notes

- If there are any Typescript linting errors, run `pnpm fix` before attempting to fix the errors yourself.
- Never try to start a dev server - prompt the user to do this.

## app-description.mdc

---

## alwaysApply: true

# Project Context

This is where you describe your project. It's important you update it. For now,
suffice to say this project is a Expo and React Native starter template.

## Key Features

- Expo and React Native starter template
- Glassmorphism UI

## app-technologies.mdc

---

## alwaysApply: true

## Technologies used

### Frontend

- **iOS/Android** - Expo (React Native + TypeScript)
- **Navigation** - React Navigation
- **Maps** - react-native-maps (Google provider)
- **Native modules** - Google Maps SDK, Google Places SDK, fast image caching

### Backend

- **BFF (Backend for Frontend)** - Edge proxy for Places API
- **Database** - Postgres (users, friendships, user_places, scores, imports)
- **APIs** - Google Maps SDK for iOS + Places API

### Development

- **Testing** - Vitest
- **Code Quality** - ESLint + Prettier
- **Package Management** - pnpm

## code-conventions.mdc

---

description:
globs: **/\*.ts,**/\*.tsx
alwaysApply: false

---

# Code Conventions

When writing or modifying code in this project, please adhere to the following conventions:

1.  **TypeScript Best Practices**: Follow standard, idiomatic TypeScript coding practices for structure, naming, and types, unless otherwise overridden.
2.  **Minimal Comments**: Avoid adding comments unless they explain complex logic or non-obvious decisions. Well-written, self-explanatory code is preferred. Do not add comments that merely restate what the code does.
3.  **Tests as Documentation**: Rely on comprehensive tests (which will be added later if not present) to document the behavior and usage of the code, rather than extensive comments within the code itself.
4.  **File naming conventions**: Use kebab-case when naming directories, TypeScript, and other files.
5.  **Type checking**: after major modifications run `pnpm typecheck` and fix any errors.
6.  **Open-source conventions** Pretend you are writing code for a open-source project. Write best-in-class code.

## modern-flexbox.mdc

---

globs: \*_/_.tsx
alwaysApply: false

---

# Modern React Native Flexbox & Spacing

## Always Use Modern Flexbox Features

### Gap Property (Preferred)

- **Use `gap` for consistent spacing** between flex children instead of manual margins
- Automatically handles spacing regardless of conditional rendering
- Single source of truth for spacing values

```jsx
// ✅ GOOD: Use gap for automatic spacing
const styles = StyleSheet.create({
  container: {
    gap: 16, // Consistent 16px between all children
    paddingBottom: 20,
  },
})

// ❌ AVOID: Manual margins on individual items
const styles = StyleSheet.create({
  item: {
    marginTop: 16, // Hard to maintain, doesn't adapt
  },
})
```

### Flexbox Layout Patterns

#### Container Spacing

```jsx
// ✅ GOOD: Parent controls spacing
;<View style={styles.contentSections}>
  {showDescription && <DescriptionSection />}
  {showAmenities && <AmenitiesSection />}
  {showScoring && <ScoringSection />}
</View>

const styles = StyleSheet.create({
  contentSections: {
    gap: 24, // Automatic spacing between sections
  },
})
```

#### Component Interface Design

```jsx
// ✅ GOOD: Components don't manage their own top spacing
const SectionComponent = () => (
  <View style={styles.section}>{/* Content without top margin/padding */}</View>
)

// ❌ AVOID: Components with built-in top spacing
const SectionComponent = () => (
  <View style={[styles.section, { marginTop: 20 }]}>
    {/* Tightly coupled spacing */}
  </View>
)
```

## Modern React Native Features to Prefer

### Layout

- Use `gap` instead of manual margins between flex children
- Use `rowGap` and `columnGap` for fine-grained control
- Prefer `justifyContent` and `alignItems` over absolute positioning

### Responsive Design

- Use `Dimensions.get('window')` sparingly; prefer flexbox ratios
- Use percentage widths with flexbox for responsive layouts
- Leverage `flex: 1` for equal distribution

### Best Practices

1. **Single Responsibility**: Parent containers handle spacing, children handle content
2. **Adaptability**: Layouts should work with conditional rendering
3. **Maintainability**: Spacing controlled in one place, easy to adjust globally
4. **Clean Interfaces**: Components shouldn't assume their positioning context

## Migration Pattern

When refactoring spacing:

1. Identify sections that need consistent spacing
2. Wrap in container with `gap` property
3. Remove individual `marginTop`/`paddingTop` from children
4. Test with conditional rendering scenarios

## react.mdc

---

description:
globs: \*_/_.tsx
alwaysApply: false

---

React Naming Conventions:

- Use kebab-case for files and directories.

Components:

- DO not use 'use client' or 'use server' statements
- Favor named exports for components
- Ensure components are modular, reusable, and maintain a clear separation of concerns.
- Always split React components out so there is only ever one per file
- Keep logic as low as possible. For example a PostItem should handling its own deletion, rather than passing the logic up in a property callback.
- Rather than have a large function, like a TRPC mutation handler, inside the component, refactor and split it out into a generic helper or hooks lib.
- Prefer the hooks pattern for complex logic. Look at existing examples in the project.
- DO NOT `import * as React from 'react'`, import each React function specifically
- `zod` and `react-hook-form` packages are installed - use them.

## style.mdc

---

## alwaysApply: true

Context:

- Conventions: small files, single-responsibility, testable interfaces, providers+hooks for state, one component per file, '@/' imports, zod for parsing/validation, no any.
- Events: define event name constants; payloads are discriminated unions; normalize snake_case (Rust) → camelCase (TS).
- Rust: offload blocking work with spawn_blocking; emit structured serde-tagged payloads; keep interfaces minimal.
- Quality gates: Propose a plan first; after edits run cargo check, pnpm typecheck, pnpm lint; fix issues; ensure hooks rules respected.
- Keep modules small and composable.
- Add zod schemas for all incoming data; normalize to camelCase once in a bridge layer.
- Use discriminated unions and type guards; export helper predicates (e.g., isTerminalEvent).
- Centralize constants (event names, keys) in a types or constants file.
- In React, create a provider and a small hook for state; avoid conditional hooks.
- In Rust, use spawn_blocking for blocking ops; include identifiers like repo_id in every event.

Non-negotiables:

- No any. Use zod for runtime validation.
- Normalize casing at boundaries; TS types are camelCase.
- Small, testable modules; clear public APIs.
- Don’t call hooks conditionally.
- Prefer to split out logic into smaller files.
- Never use `any` or `as any` in Typescript.
- Never use single character variable names.
- Always write documentation for all public APIs.

## typescript.mdc

---

globs: **/\*.tsx,**/\*.ts
alwaysApply: false

---

# TypeScript Best Practices

## Type System

- Prefer interfaces over types for object definitions
- Use type for unions, intersections, and mapped types
- NEVER use `any` or `as any` types or coercion
- Use strict TypeScript configuration
- Leverage TypeScript's built-in utility types
- Use generics for reusable type patterns
- Use `unknown` for variables that are not yet typed
- Use `Zod` for schema validation
- Use the type guards pattern for runtime type checking
- Use `assertString` for runtime string checking

## Naming Conventions

- Use PascalCase for type names and interfaces
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Use descriptive names with auxiliary verbs (e.g., isLoading, hasError)
- Prefix interfaces for React props with 'Props' (e.g., ButtonProps)

## Code Organization

- Keep type definitions close to where they're used
- Export types and interfaces from dedicated type files when shared
- Use barrel exports (index.ts) for organizing exports
- Place shared types in a `types.ts` file
- Co-locate component props with their components
- Prefer to use multiple files.
- Never place two classes or components in the same file.

## Functions

- Use explicit return types for public functions
- Use arrow functions for callbacks and methods
- Use function overloads for complex type scenarios
- Prefer async/await over Promises
- Prefer function declarations over function expressions.
- Prefer functional programming over classes.

## Best Practices

- Enable strict mode in tsconfig.json
- Use readonly for immutable properties
- Leverage discriminated unions for type safety
- Implement proper null checking
- When making changes, don't worry about backwards compatibility. For example, don't alias types.

## Imports

- ALWAYS use `@/` style imports vs relative imports, except when importing from the same directory.

## Error Handling

- DO NOT proactively add error handling
