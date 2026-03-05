// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://spencerbull.github.io',
	base: '/yokai-docs/',
	integrations: [
		starlight({
			title: 'yokai',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/spencerbull/Yokai' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Quick Start', slug: 'getting-started/quick-start' },
						{ label: 'Configuration', slug: 'getting-started/configuration' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Adding Devices', slug: 'guides/adding-devices' },
						{ label: 'Deploying Models', slug: 'guides/deploying-models' },
						{ label: 'Monitoring', slug: 'guides/monitoring' },
						{ label: 'AI Tool Setup', slug: 'guides/ai-tool-setup' },
					],
				},
				{
					label: 'Architecture',
					items: [
						{ label: 'System Overview', slug: 'architecture/system-overview' },
						{ label: 'Network Topology', slug: 'architecture/network-topology' },
						{ label: 'Agent API', slug: 'architecture/agent-api' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'CLI Commands', slug: 'reference/cli-commands' },
						{ label: 'Keyboard Shortcuts', slug: 'reference/keyboard-shortcuts' },
						{ label: 'Troubleshooting', slug: 'reference/troubleshooting' },
					],
				},
			],
			components: {
				Footer: './src/components/Footer.astro',
			},
		}),
	],
});
