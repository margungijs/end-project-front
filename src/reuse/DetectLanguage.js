import { franc } from 'franc';
import langs from 'langs';

const detectLanguage = (text) => {
    const langCode = franc(text);
    if (langCode === 'und') return 'en';
    const language = langs.where('3', langCode);
    return language?.['1'] || 'en';
};

export default detectLanguage;