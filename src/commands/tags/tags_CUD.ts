import type { SupabaseClient } from '@supabase/supabase-js';
import { command } from 'jellycommands';
import { DEV_MODE } from '../../config.js';
import { Tag } from './_common.js';
import { tag_create_command_handler } from './_tags_create.js';
import { tag_delete_command_handler } from './_tags_delete.js';
import { tag_update_command_handler } from './_tags_update.js';

const enum Actions {
	CREATE = 'create',
	UPDATE = 'update',
	DELETE = 'delete',
}

export default command({
	name: 'tags',
	description: 'Create, edit or delete tags',
	global: true,
	dev: DEV_MODE,
	options: [
		{
			name: Actions.CREATE,
			type: 'SUB_COMMAND',
			description: 'Create a tag',
			options: [
				{
					name: 'name',
					description: 'The name of the tag to create',
					type: 'STRING',
					required: true,
				},
			],
		},
		{
			name: Actions.UPDATE,
			type: 'SUB_COMMAND',
			description: 'Update a tag',
			options: [
				{
					name: 'name',
					description: 'The exact name of the tag to edit',
					type: 'STRING',
					required: true,
				},
			],
		},
		{
			name: Actions.DELETE,
			type: 'SUB_COMMAND',
			description: 'Delete a tag',
			options: [
				{
					name: 'name',
					description: 'The exact name of the tag to delete',
					type: 'STRING',
					required: true,
				},
			],
		},
	],

	run: async ({ interaction, client }) => {
		const subcommand = interaction.options.getSubcommand() as Actions;
		const tag_name = interaction.options
			.getString('name', true)
			.toLowerCase();
		const supabase: SupabaseClient = client.props.get('supabase');

		const { data: tags, error } = await supabase
			.from<Tag>('tags')
			.select('*')
			.eq('tag_name', tag_name)
			.limit(1);

		if (error) return;

		const tag = tags?.[0];

		try {
			switch (subcommand) {
				case Actions.CREATE: {
					await tag_create_command_handler({
						tag,
						interaction,
						tag_name,
						supabase,
					});
					break;
				}

				case Actions.DELETE: {
					await tag_delete_command_handler({
						tag,
						interaction,
						supabase,
						tag_name,
						client,
					});
					break;
				}

				case Actions.UPDATE: {
					await tag_update_command_handler({
						tag,
						interaction,
						tag_name,
						client,
						supabase,
					});
					break;
				}
			}
		} catch {
			// Do something with the errors
		}
	},
});
