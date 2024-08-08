import type { Emoji } from '@/types/api/Emoji';

const EMOJI_SHORTCODE_PATTERN = /:([^ :]+):/gi;

/**
 * Converts HTML special characters to HTML entities
 * Shamelessly stolen wholesale from https://github.com/teppeis/htmlspecialchars/
 * @param {string} text
 * @returns {string}
 */ 
export function htmlSpecialChars(text: string = ''): string {
	return String(text).replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&#039;');
}

/**
 * Substitutes emoji shortcodes in text for the HTML needed to display them
 * @param [text] - The input text containing shortcodes
 * @param [emojis] - An array of the (custom) emoji that appear in the text
 * @returns An HTML string with the emoji substituted
 */
export function htmlizeCustomEmoji(text: string = '', emojis: Emoji[] = []): string {
	let output = text;
	const rawMatchedShortcodes = [ ...text.matchAll(EMOJI_SHORTCODE_PATTERN) ]
		.map(([ _, shortcode ]) => shortcode);
	const shortcodeMatches = new Set(rawMatchedShortcodes);

	shortcodeMatches.forEach(shortcode => {
		const emojiData = emojis.find(emojiData => emojiData.shortcode == shortcode);
		
		if (emojiData) {
			output = output.replaceAll(
				`:${shortcode}:`,
				`<img src="${emojiData.url}" alt=":${shortcode}:" title=":${shortcode}:" class="emoji" />`
			);
		}
	});

	return output;
}

/**
 * Removes all emoji shortcodes in text
 * @param text - input text
 * @returns input text with the shortcodes removed
 */
export function removeEmojiShortcodes(text: string): string {
	return text.replace(EMOJI_SHORTCODE_PATTERN, '').trim();
}