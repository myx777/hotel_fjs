import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  async prerender() {
    return ['/', '/about', '/contact'];
  },
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
