import siteConfig from "./src/lib/config";

const config = siteConfig({
	title: "Henry Hollink",
	prologue: "Never say goodbye,\nbecause goodbye means going away\nand going away means forgetting.",
	author: {
		name: "Esmee & Marcel Hollink - van Kuijk",
		email: "contact@marcelhollink.nl",
		link: "https://marcel.hollink.dev"
	},
	description: "A modern Astro theme focused on content creation.",
	copyright: {
		type: "CC BY-NC-ND 4.0",
		year: "2026"
	},
	timezone: "UTC",
	i18n: {
		locales: ["nl"],
		defaultLocale: "nl"
	},
	pagination: {
		note: 15,
		bericht: 24
	},
	heatmap: {
		unit: "day",
		weeks: 20
	},
	feed: {
		section: "*",
		limit: 20
	},
	latest: "*"
});

export const monolocale = Number(config.i18n.locales.length) === 1;

export default config;
