import {defineConfig} from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1600,
    viewportHeight: 1200,
    supportFile: false,
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    supportFile: false,
  },
});
