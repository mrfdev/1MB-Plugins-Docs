import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki';

export default defineConfig({
  site: 'https://docs.1moreblock.com',
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
      plugins: [starlightThemeFlexoki({ accentColor: 'green' })],
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
              label: 'Plugin Player Guides',
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
