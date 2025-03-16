<p align="center">
  <img src="website/public/logo.svg" alt="React Blocks Logo" width="150" />
</p>

<h1 align="center">React Blocks</h1>

<p align="center">
  A function-call based React meta-framework for building type-safe UIs without JSX
</p>

<p align="center">
  <a href="https://npmjs.com/package/@bloxi/core">
    <img src="https://img.shields.io/npm/v/@bloxi/core.svg" alt="npm package" />
  </a>
  <a href="https://github.com/erickweyunga/bloxi/actions">
    <img src="https://github.com/erickweyunga/bloxi/workflows/CI/badge.svg" alt="CI Status" />
  </a>
  <a href="https://github.com/erickweyunga/bloxi/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/erickweyunga/bloxi" alt="License" />
  </a>
</p>

## Features

- 🔤 **Pure TypeScript**: No JSX/TSX needed - just functions
- 🛠️ **Type-safe by design**: Strong typing all the way down
- 🧩 **Component blocks**: Intuitive function-call syntax for components
- 🎨 **Theme system**: Built-in theming support
- 🚀 **Modern React**: Fully compatible with hooks and concurrent features
- 📦 **Tree-shakeable**: Only import what you need
- 🔄 **Server & client**: Works in both Node.js and browsers

## Quick Start

Create a new React Blocks app with a single command:

```bash
npx create-bloxi-app my-app
cd my-app
npm start
```

## Installation

To add to an existing project:

```bash
npm install @bloxi/core
```

## Basic Usage

```typescript
import { Box, Flex, Text, renderRoot } from '@bloxi/core';

function App() {
  return Flex({
    direction: 'column',
    align: 'center',
    justify: 'center',
    padding: 24,
    children: [
      Text({
        as: 'h1',
        fontSize: 24,
        children: 'Hello from React Blocks!'
      }),
      
      Box({
        margin: '20px 0',
        padding: 16,
        background: '#f5f5f5',
        borderRadius: 8,
        children: Text({
          children: 'Building UIs with functions, not JSX'
        })
      })
    ]
  });
}

// Render to DOM
renderRoot(App());
```

## Why React Blocks?

React Blocks provides a different approach to building React applications:

- **No JSX transpilation needed** - works with standard TypeScript
- **More flexible code generation** - programmatically create components
- **Better type inference** - improved TypeScript experience
- **Functional approach** - aligns with functional programming principles
- **Lightweight and focused** - minimal overhead, maximum flexibility

## Documentation

Visit our [documentation site](https://erickweyunga.github.io/bloxi) for comprehensive guides, API references, and examples.

## Examples

Check the `examples` directory for full projects demonstrating different use cases.

## Contributing

We welcome contributions! See our [contributing guidelines](CONTRIBUTING.md) for details.

## License

React Blocks is MIT licensed.