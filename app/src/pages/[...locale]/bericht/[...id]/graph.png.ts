import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import config, { monolocale } from "$config";
import graph from "$graph/content";
import i18nit from "$i18n";

export async function getStaticPaths() {
	const berichten = await getCollection("bericht", bericht => !bericht.data.draft);

	return berichten.map(bericht => {
		let locale: string | undefined;
		let id: string;

		if (monolocale) {
			locale = undefined;
			id = bericht.id;
		} else {
			const [language, ...ids] = bericht.id.split("/");
			locale = config.i18n.defaultLocale === language ? undefined : language;
			id = ids.join("/");
		}

		return {
			params: { locale, id },
			props: {
				type: i18nit(locale || config.i18n.defaultLocale)(`navigation.bericht`),
				title: bericht.data.title,
				time: bericht.data.timestamp.toISOString().split("T")[0].replace(/-/g, "/"),
				tags: bericht.data.tags
			}
		};
	});
}

/**
 * GET handler that generates and returns the Open Graph image for a bericht.
 */
export const GET: APIRoute = async ({ params, props }) => {
	const image = await graph({
		locale: params.locale || config.i18n.defaultLocale,
		type: props.type,
		site: config.title,
		author: config.author.name,
		title: props.title,
		time: props.time,
		tags: props.tags
	});

	return new Response(new Uint8Array(image), { headers: { "Content-Type": "image/png" } });
};
