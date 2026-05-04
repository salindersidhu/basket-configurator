# Basket Configurator

[![Contributors](https://img.shields.io/github/contributors/salindersidhu/basket-configurator?style=for-the-badge)](https://github.com/salindersidhu/basket-configurator/graphs/contributors) [![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=for-the-badge)](/LICENSE) [![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Fsalindersidhu%2Fbasket-configurator&countColor=%23263759)](https://visitorbadge.io/status?path=https%3A%2F%2Fgithub.com%2Fsalindersidhu%2Fbasket-configurator)

## Overview

A 3D basket configurator for 3D printing. Design a custom basket with configurable dimensions, wall patterns, and handle cutouts, then export to STL.

<img src="https://images.squarespace-cdn.com/content/v1/5cc22d6593a63233d214110c/1597710652025-QEY2UL92MLE1E2BX4WSJ/Vercel+%28Zeit%29.jpg" width="130" /> <img src="https://miro.medium.com/v2/resize:fit:1258/1*okiCUvTUJLtOqJv1dMzwpA.png" width="130" /> <img src="https://user-images.githubusercontent.com/98990/89711240-4172a200-d989-11ea-8d51-4aaf922fa407.png" width="130" /> <img src="https://miro.medium.com/max/400/1*mrOXGyIa3BlPK80peLmEbA.png" width="130" /> <img src="https://camo.githubusercontent.com/86918d276006681ebba60a6dba69d4c090751d7c2487ffe3608fa126cbb5b8f2/68747470733a2f2f63646e2e7261776769742e636f6d2f7a656b652f6a6176617363726970742d79656c6c6f772f6d61737465722f6c6f676f2e737667" width="130" /> <img src="https://images.seeklogo.com/logo-png/43/2/three-js-logo-png_seeklogo-431124.png" width="130" />

## Features

<img alt="Screenshot" src="https://github.com/user-attachments/assets/dfeb8313-03c8-41fd-9572-f485fbfffbc8" />

- **Dimensions**: Adjustable width, height, and length
- **Wall thickness**: Fine-tune for your printer
- **Wall patterns**: Solid, circular holes, or hexagonal patterns
- **Handle cutouts**: Optional rounded-rectangle handles on short walls
- **Export**: STL format for 3D printing/modeling
- **3D Preview**: Interactive orbit controls (drag to rotate, scroll to zoom)

## Prerequisite Software

| Software | Version  |
| :------- | :------- |
| Git      | 2.20.1+  |
| Node     | 10.15.0+ |

## Getting Started

1. Run the following command to install all the required packages:

```bash
npm i
```

## Running

1. Run the development server:

```bash
npm run dev
```

## Cleaning

If you run into caching or build issues, you can clear the Next.js build artifacts:

```bash
npm run clean
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Build

1. Create and merge a Pull Request into the main branch.

2. The production site is automatically deployed to [https://basket-configurator.vercel.app/](https://basket-configurator.vercel.app/).

## Contributing

Please see our [Contributing Guide](/CONTRIBUTING.md) for more info.

## Project Structure

      .
      ├── app                               #
      │   ├── favicon.ico                   # App favicon
      │   ├── global.css                    # Global styles
      │   ├── layout.tsx                    # Root layout
      │   ├── manifest.json                 # Web app manifest
      │   ├── page.tsx                      # Main entry page
      │   └── ...
      ├── public                            # Static assets
      │   └── ...
      ├── components                        # Reusable UI + feature components
      │   ├── ...
      │   ├── BasketConfigurator            #
      │   │   ├── index.ts                  # Entry point
      │   │   ├── BasketConfigurator.tsx    # Main UI + layout
      │   │   └── ...                       # Feature-specific subcomponents
      │   └── ...
      ├── hooks/                            # Custom React hooks
      │   └── ...
      ├── lib/                              # Core logic, non-UI code
      │   └── ...
      ├── next.config.ts                    # Next.js configuration
      ├── postcss.config.mjs                # PostCSS / Tailwind config
      ├── package.json
      └── ...
