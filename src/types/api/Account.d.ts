import type { Emoji } from './Emoji.d';

export type AccountField = {
	name: string;
	value: string;
	verified_at?: string | null;
};

export type AccountRelationship = {
	blocked_by?: boolean;
	blocking?: boolean;
	domain_blocking?: boolean;
	endorsed?: boolean;
	followed_by?: boolean;
	following?: boolean;
	id?: string;
	muting?: boolean;
	muting_notifications?: boolean;
	note?: string;
	notifying?: boolean;
	requested?: boolean;
	showing_reblogs?: boolean;
	subscribing?: boolean;
};

export type Account = {
	acct: string;
	avatar: string;
	avatar_static: string;
	bot: boolean;
	created_at: string;
	display_name: string;
	emojis: Emoji[];
	fields: AccountField[];
	fqn: string;
	follow_requests_count?: number;
	followers_count: number;
	following_count: number;
	header: string;
	header_static: string;
	id: string;
	locked: boolean;
	note: string;

	pleroma?: {
		accepts_chat_messages?: boolean | null;
		allow_following_move?: boolean;
		also_known_as: string[];
		ap_id: string;
		background_image: string | null;
		birthday?: string | null;
		chat_token?: string;
		email?: string;
		favicon: string | null;
		hide_favorites: boolean;
		hide_followers: boolean;
		hide_followers_count: boolean;
		hide_follows: boolean;
		hide_follows_count: boolean;
		is_admin: boolean;
		is_confirmed: boolean;
		is_moderator: boolean;
		is_suggested: boolean;
		notification_settings?: {
			block_from_strangers: boolean;
			hide_notification_contents: boolean;
		};
		relationship: AccountRelationship;
		skip_thread_containment?: boolean;
		tags: string[];
		unread_conversation_count: number;
		unread_notifications_count: number;
	};
	
	source?: {
		fields: AccountField[];
		note: string;
		pleroma: {
			actor_type: string;
			discoverable: boolean;
			no_rich_text?: boolean;
			show_birthday?: boolean;
			show_role?: boolean;
		};
		privacy?: string;
		sensitive: boolean;
	};
	
	statuses_count: number
	username: string
	url: string
};
