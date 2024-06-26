import type { I18n } from 'vue-i18n';
import { createI18n as _createI18n } from 'vue-i18n';
import * as enLocale from './locales/en.json'; // we want the default locale preloaded

const loaders: Record<string, () => any> = {
	'en': () => enLocale,
	'pl': () => loadLanguageFile('pl'),
};

export function createI18n(): I18n {
	return _createI18n({
		locale: 'en',
		fallbackLocale: 'en',
		messages: { en: enLocale },
		legacy: false
	});
}

export async function setLanguage(i18n: I18n, locale: string){
	// @ts-ignore docs say this is the correct approach when legacy: false (https://vue-i18n.intlify.dev/guide/essentials/scope#local-scope-1)
	i18n.global.locale.value = locale;

	if(loaders.hasOwnProperty(locale)){
		const messages = await loaders[locale]();
		i18n.global.setLocaleMessage(locale, messages);
	}
}

async function loadLanguageFile(path: string) {
	return import(
		/* webpackInclude: /\.json$/ */
		/* webpackChunkName: "i18n/[request]" */
		`./locales/${path}.json`
	);
}