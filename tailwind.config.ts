import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      height: {
        //@ts-expect-error - Array is supported to allow fallback values
        screen: ['100vh', '100dvh'],
      },
      minHeight: {
        //@ts-expect-error - Array is supported to allow fallback values
        screen: ['100vh', '100dvh'],
      },
    },
  },
  plugins: [],
} satisfies Config;
