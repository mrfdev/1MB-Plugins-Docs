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
const redirects = {
  '/custom-server-plugins/antifire': '/player-guides/plugins/antifire/',
  '/player-guides/custom-server-plugins/antifire': '/player-guides/plugins/antifire/',
  '/player-guides/plugins/filterlab': '/player-guides/plugins/contentguard/',
  '/player-guides/plugins/filterguard': '/player-guides/plugins/contentguard/',
  '/player-guides/plugins/notablemsg': '/player-guides/plugins/teammsg/',
  '/player-guides/plugins/gametypes': '/player-guides/plugins/bentobox/',
  '/staff-reference/plugins/gametypes': '/staff-reference/plugins/bentobox/',
  '/player-guides/plugins/profile': '/player-guides/plugins/staffcenter/',
  '/player-guides/plugins/warninglens': '/player-guides/plugins/staffcenter/',
  '/staff-reference/plugins/profile': '/staff-reference/plugins/staffcenter/',
  '/staff-reference/plugins/warninglens': '/staff-reference/plugins/staffcenter/',
  '/player-guides/plugins/staffmsg': '/player-guides/plugins/teammsg/',
  '/player-guides/plugins/pluginversions': '/player-guides/plugins/servercheck/',
  '/player-guides/plugins/startupdoctor': '/player-guides/plugins/servercheck/',
  '/player-guides/plugins/updatesmoke': '/player-guides/plugins/servercheck/',
  '/player-guides/plugins/hoppers': '/player-guides/plugins/servercheck/',
  '/player-guides/plugins/sparkreviewer': '/player-guides/plugins/servercheck/',
  '/staff-reference/plugins/hoppers': '/staff-reference/plugins/servercheck/',
  '/staff-reference/plugins/sparkreviewer': '/staff-reference/plugins/servercheck/',
  '/player-guides/plugins/tpauto': '/player-guides/plugins/recordingmode/',
  '/staff-reference/plugins/tpauto': '/staff-reference/plugins/recordingmode/',
  '/staff-reference/plugins/pluginversions': '/staff-reference/plugins/servercheck/',
  '/player-guides/plugins/worthhelper': '/player-guides/plugins/worthaudit/',
  '/player-guides/plugins/worthdrift': '/player-guides/plugins/worthaudit/',
  '/player-guides/plugins/messagefont': '/player-guides/plugins/',
  '/player-guides/plugins/cmiplaceholders': '/player-guides/plugins/placeholders/',
  '/player-guides/plugins/onembplaceholders': '/player-guides/plugins/placeholders/',
  '/player-guides/plugins/placeholderhealth': '/player-guides/plugins/placeholders/',
  '/player-guides/plugins/placeholderprobe': '/player-guides/plugins/placeholders/',
  '/custom-server-plugins/trick-or-treat-doors': '/player-guides/plugins/doors/',
  '/player-guides/custom-server-plugins/trick-or-treat-doors': '/player-guides/plugins/doors/',
  ...Object.fromEntries(
    docsSources.projects
      .filter((project) => standaloneRoutes[project.category])
      .map((project) => {
        const directory = standaloneRoutes[project.category];
        return [
          `/${directory}/${project.id}`,
          `/player-guides/${directory}/${project.id}/`,
        ];
      }),
  ),
};

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
            { slug: 'player-guides/next-and-guidance' },
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
            { slug: 'staff-reference/plugins/halloweenvirus' },
            {
              label: 'Custom Server Plugins',
              collapsed: true,
              items: [{ autogenerate: { directory: 'staff-reference/custom-server-plugins' } }],
            },
            {
              label: 'Third-Party Plugins',
              collapsed: true,
              items: [{ autogenerate: { directory: 'staff-reference/other-server-features' } }],
            },
          ],
        },
      ],
    }),
  ],
});
