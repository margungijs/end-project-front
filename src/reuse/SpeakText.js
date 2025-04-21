import detectLanguage from "./DetectLanguage";

const speakText = (text) => {
    if (!text) return;

    const detectedLangCode = detectLanguage(text);
    console.log(detectedLangCode);

    const isEnglish = detectedLangCode === 'en';

    const languageName = getLanguageName(detectedLangCode);

    let finalText = text;
    if (!isEnglish) {
        finalText = `The english text-to-speech might not be accurate because the detected language is ${languageName} - ${text}`;
    }

    if (!window.speechSynthesis) {
        console.warn("Speech synthesis is not supported by this browser.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(finalText);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
};

const getLanguageName = (langCode) => {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
    return displayNames.of(langCode) || 'Unknown Language';
};

export default speakText;
