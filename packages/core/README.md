## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
- [Component API](#component-api)
- [Responsive Design](#responsive-design)
- [Advanced Usage](#advanced-usage)
- [TypeScript Support](#typescript-support)
- [Extending Bloxi](#extending-bloxi)
- [License](#license)

## Installation  
```bash
# npm
npm  install  @bloxi/core
```
```bash
# yarn
yarn  add  @bloxi/core
```
```bash
# pnp
pnpm  add  @bloxi/core
```

  

## Quick Start
```typescript
import  React  from  'react';
import { HtmlH1 } from  '@bloxi/core';
  
// Create a simple counter component
const  App = () => {

return  HtmlH1({ children: "Hello World"});

// Render the component
renderRoot(App());

```

  

## Core Concepts
### Function-Call Syntax
Instead of JSX:
```jsx
<Box  padding={20}  backgroundColor="blue">
<Text>Hello World</Text>
</Box>
```
With Bloxi:
```typescript
HtmlDiv({
	padding:  20,
	backgroundColor:  'blue',
	children:  Text({ children:  'Hello World' })
})
```

  

### Building Blocks
Bloxi provides primitive components that serve as building blocks:
-  **HtmlDiv**: Basic container element (renders as `div` by default)
-  **BxFlex**: Flexbox layout container
-  **BxGrid**: CSS Grid layout container
-  **HtmlH(1, 2, 3...)**: Text component with typography controls

### Component Composition
Components can be nested and composed:
```typescript
Flex({
	direction:  'column',
	gap:  16,
	children: [
		HtmlH1({ children:  'Header' }),
		HtmlDiv({
			padding:  16,
			children:  'Content'
		})
	]
})

```
## Component API

### Box (HtmlDiv)
The fundamental building block for layout.
```typescript
HtmlDiv({
	// Layout props
	width:  200,
	height:  100,
	padding:  16,
	margin:  8,
	
	// Appearance
	background:  '#f0f0f0',
	border:  '1px solid #ccc',
	borderRadius:  4,

	// Events
	onClick: () =>  console.log('Clicked!'),
	
	// Content
	children:  'Hello World'
})

```

  

### BxFlex
A Box with flex layout enabled.
```typescript
BxFlex({
	// Flex-specific props
	direction:  'row', // 'row' | 'column' | 'row-reverse' | 'column-reverse'
	wrap:  'wrap', // 'nowrap' | 'wrap' | 'wrap-reverse'
	justify:  'space-between', // 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
	align:  'center', // 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
	gap:  16,
	// All Box props are also available
	padding:  24,
	background:  '#fff',
	children: [
		Box({ children:  'Item 1' }),
		Box({ children:  'Item 2' })
	]
})

```

  

### Grid
A Box with grid layout enabled.
```typescript
Grid({
	// Grid-specific props
	columns:  3, // Shorthand for gridTemplateColumns: 'repeat(3, 1fr)'
	rows:  '100px auto',
	gap:  16,
	// All HtmlDiv props are also available
	padding:  24,
	children: [
		HtmlDiv({ children:  'Item 1' }),
		HtmlDiv({ children:  'Item 2' }),
		HtmlDiv({ children:  'Item 3' })
	]
})
```

### HtmlH(1, 2, 3, ....)
Typography component.
```typescript
HtmlH1({
	// Text-specific props
	fontSize:  16,
	fontWeight:  'bold',
	color:  '#333',
	textAlign:  'center',
	children:  'Hello World'
})
```
## Responsive Design
All style props in Bloxi accept responsive values:
```typescript
HtmlH1({
	// Different values at different breakpoints
	width: { base:  '100%', md:  '50%', lg:  '33.3%' },
	padding: { base:  16, md:  24, lg:  32 },
	flexDirection: { base:  'column', md:  'row' },
	children:  'Responsive Box'
})
```
Default breakpoints:
-  `base`: 0px and up (mobile first)
-  `xs`: 480px and up
-  `sm`: 640px and up
-  `md`: 768px and up
-  `lg`: 1024px and up
-  `xl`: 1280px and up
-  `2xl`: 1536px and up

## Advanced Usage
### Creating Custom Components
```typescript
// A custom Card component
const  Card = (props) => {
const { title, children, ...rest } = props;

return  HtmlDiv({
			padding:  16,
			border:  '1px solid #eaeaea',
			borderRadius:  8,
			boxShadow:  '0 2px 4px rgba(0,0,0,0.1)',
			...rest,
			children: [
				title && HtmlH1({
					marginBottom:  8,
					children:  title
				}),
				children
			]
	});
};

// Usage
Card({
	title:  'My Card',
	children:  Text({ children:  'Card content here' })
})
```

  

### Using with Event Handlers
```typescript
const  ClickCounter = () => {
const [clicks, setClicks] = React.useState(0);

return  Box({
		padding:  16,
		onClick: () =>  setClicks(clicks + 1),
		children:  `Clicked ${clicks} times`
	});
};
```
### Working with Lists
```typescript
const  UserList = ({ users }) => {

return  Flex({
		direction:  'column',
		gap:  8,
		children:  users.map(user  =>
			Box({
				key:  user.id, // Always provide keys for list items
				padding:  16,
				background:  '#f5f5f5',
				children:  Text({ children:  user.name })
			})
		)
	});
};
```
## TypeScript Support
Bloxi is built with TypeScript and provides excellent type definitions:
```typescript
import { HtmlDiv, HTMLElementProps } from  '@bloxi/core';

// All props are fully typed
const  MyComponent = () => {
	return  HtmlDiv({
			width:  200,
			height:  100,
			// TypeScript will provide autocompletion and type checking
			children:  'Hello World'
		});
	};

// Creating typed custom components

interface  CardProps  extends  HTMLElementProps {
	title?: string;
	footer?: React.ReactNode;
}

const  Card = (props: CardProps) => {
const { title, footer, children, ...rest } = props;
	return  HtmlDiv({
		padding:  16,
		borderRadius:  8,
		...rest,
		children: [
			title && Text({ as:  'h3', children:  title }),
			Box({ padding:  '16px 0', children }),
			footer && Box({ paddingTop:  16, borderTop:  '1px solid #eee', children:  footer })
		]
	});
};
```

## Extending Bloxi

You can create your own component library based on Bloxi:
```typescript
// button.ts
import { HtmlButton, HTMLElementProps } from  "@bloxi/core";

export  interface  ButtonProps  extends  HTMLElementProps {
	variant?:  "primary"  |  "secondary";
	size?:  "lg"  |  "md"  |  "sm";
}

export  const  Button  = (props:  ButtonProps) => {
	const { variant  =  "primary", size  =  "md", children, ...rest } =  props;
	const  variantStyles  = {
		primary: { backgroundColor:  "#3182ce", color:  "white" },
		secondary: { backgroundColor:  "#718096", color:  "white" },
	};
  
	const  sizeStyles  = {
	lg: { padding:  "12px 24px", fontSize:  "1.25rem" },
	md: { padding:  "8px 16px", fontSize:  "1rem" },
	sm: { padding:  "4px 8px", fontSize:  "0.875rem" },
	};
  
	return  HtmlButton({
		...rest,
		style: {
			...variantStyles[variant],
			...sizeStyles[size],
			borderRadius:  "4px",
			border:  "none",
			cursor:  "pointer",
		},
		children,
	});
};

```
## License
MIT © [Eric Kweyunga](https://github.com/erickweyunga)