import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Use local dist for Docker builds, monorepo dist for nx builds
  outDir: process.env.DOCKER_BUILD ? './dist' : '../../../../dist/apps/personal/rcristea/portfolio',
  integrations: [react()],
});