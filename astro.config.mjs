import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://mrfdev.github.io',
  base: '/1MB-Plugins-Docs',
  integrations: [
    starlight({
      title: '1MoreBlock Plugin Docs',
      description: 'Friendly public documentation for 1MoreBlock plugin features.',
      editLink: {
        baseUrl: 'https://github.com/mrfdev/1MB-Plugins-Docs/edit/main/',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/mrfdev/1MB-Plugins-Docs',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Home', link: '/' },
        {
          label: 'Players',
          items: [
            { slug: 'player-guides/getting-started' },
            { slug: 'player-guides/commands' },
            { slug: 'player-guides/features' },
            {
              label: 'Plugin Command Guides',
              items: [{ autogenerate: { directory: 'player-guides/plugins' } }],
            },
          ],
        },
        {
          label: 'Staff Reference',
          items: [
            { slug: 'staff-reference' },
            { slug: 'staff-reference/plugins' },
          ],
        },
      ],
    }),
  ],
});
