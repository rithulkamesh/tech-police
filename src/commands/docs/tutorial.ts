import { command } from 'jellycommands';
import { wrap_in_embed } from '../../utils/embed_helpers.js';
import { no_op } from '../../utils/promise.js';
import { search_tutorials } from './_tutorials_cache.js';

export default command({
	name: 'tutorial',
	description: 'Send a link to a svelte tutorial chapter.',
	options: [
		{
			type: 'STRING',
			description: 'The name of the tutorial.',
			name: 'query',
			required: false,
			autocomplete: true,
		},
	],
	global: true,

	run: async ({ interaction }) => {
		const query = interaction.options.getString('query');

		if (!query) {
			return await interaction.reply(
				wrap_in_embed(
					'Have you gone through the [Official Svelte Tutorial](https://svelte.dev/tutorial) yet? It covers all you need to know to start using svelte.',
				),
			);
		}

		const results = await search_tutorials(query);
		const top_result = results[0];

		await interaction.reply(
			top_result
				? wrap_in_embed(
						`Have you gone through the tutorial page on ${top_result}?`,
				  )
				: {
						content: `No matching result found. Try again with a different search term.`,
						ephemeral: true,
				  },
		);
	},

	autocomplete: async ({ interaction }) => {
		const focused = interaction.options.getFocused(true);
		if (focused.name !== 'query') return;

		const query = focused.value as string;
		if (!query) return await interaction.respond([]);

		const results = await search_tutorials(query, {
			limit: 5,
			as_link: false,
		});
		await interaction
			.respond(
				results.map((r) => ({
					name: r,
					value: r,
				})),
			)
			.catch(no_op);
	},
});
