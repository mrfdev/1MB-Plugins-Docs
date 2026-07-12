import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeGalaxy from 'starlight-theme-galaxy';
import { readFileSync } from 'node:fs';

const docsSources = JSON.parse(
  readFileSync(new URL('./docs-sources.json', import.meta.url), 'utf8'),
);
const standaloneRoutes = {
  'custom-server-plugin': 'custom-server-plugins',
  'other-server-feature': 'other-server-features',
};
const redirects = Object.fromEntries(
  docsSources.projects
    .filter((project) => standaloneRoutes[project.category])
    .map((project) => {
      const directory = standaloneRoutes[project.category];
      return [
        `/${directory}/${project.id}`,
        `/player-guides/${directory}/${project.id}/`,
      ];
    }),
);

export default defineConfig({
  site: 'https://docs.1moreblock.com',
  redirects,
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
      plugins: [starlightThemeGalaxy()],
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
              label: '1MoreBlock Features',
              collapsed: true,
              items: [{ autogenerate: { directory: 'player-guides/plugins' } }],
            },
            {
              label: 'Custom Server Plugins',
              collapsed: true,
              items: [{ autogenerate: { directory: 'player-guides/custom-server-plugins' } }],
            },
            {
              label: 'Other Server Features',
              collapsed: true,
              items: [{ autogenerate: { directory: 'player-guides/other-server-features' } }],
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
