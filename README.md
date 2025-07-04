# Johannes

My personal website built with [Astro](https://astro.build/) and deployed on [Cloudflare](https://www.cloudflare.com/) pages.

## Tech Stack

- [Astro](https://astro.build/) - Web framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cloudflare](https://www.cloudflare.com/) - Hosting
- [Cypress](https://www.cypress.io/) - End-to-end testing
- [Biome](https://biomejs.dev/) - Linting and formatting
- [AT Protocol API](https://atproto.com/) - Bluesky integration

## Development

This project uses [pnpm](https://pnpm.io/) as the package manager. Make sure you have it installed before proceeding.

### Prerequisites

- Node.js 23
- pnpm 10

### Getting Started

1. Clone the repository
   ```bash
   git clone git@github.com:Johannes-Andersen/Johannes.git # Using SSH
   git clone https://github.com/Johannes-Andersen/Johannes.git # Using HTTPS
   gh repo clone Johannes-Andersen/Johannes # Using GitHub CLI
   ```

2. Cd into the repo and install dependencies
   ```bash
   cd Johannes
   pnpm install
   ```

3. Create a `dev.vars` file in the root directory and add your environment variables. You can use `dev.vars.example` as a reference.
    ```bash
    cp .dev.vars.example .dev.vars
    ```

4. Start the development server
   ```bash
   pnpm dev
   ```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm deploy` - Build and deploy to Cloudflare
- `pnpm preview` - Build and preview locally with Wrangler
- `pnpm cy:open` - Open Cypress in interactive mode
- `pnpm type-check` - Check TypeScript types
- `pnpm lint` - Lint code
- `pnpm lint:fix` - Lint and fix code
- `pnpm format` - Check formatting
- `pnpm format:fix` - Format code
- `pnpm check` - Check code with Biome
- `pnpm check:fix` - Check and fix code with Biome
