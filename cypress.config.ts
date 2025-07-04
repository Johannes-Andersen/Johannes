import { defineConfig } from 'cypress';

export default defineConfig({
  redirectionLimit: 5,
  retries: {
    openMode: 0,
    runMode: 1,
  },
  e2e: {
    baseUrl: 'http://localhost:4321',
    supportFile: false,
    experimentalCspAllowList: true,
  },
});
