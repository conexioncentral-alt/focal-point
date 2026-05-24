export interface RSVPToken {
    id: string;
    original: string;
    clean: string;
    delayMultiplier: number;
    isParagraphStart?: boolean;
}

/**
 * Processes raw text into a list of RSVP tokens with timing weights.
 */
export const processText = (text: string): RSVPToken[] => {
    const normalized = text.replace(/\r\n/g, '\n');
    const refinedTokens: RSVPToken[] = [];
    const words = normalized.trim().split(/\s+/);

    words.forEach((word, idx) => {
        let multiplier = 1.0;
        const cleanWord = word;

        // Punctuation logic
        if (cleanWord.endsWith(',')) multiplier = 1.5;
        else if (/[.?!:;]$/.test(cleanWord)) multiplier = 2.0;

        // Length logic
        if (cleanWord.length > 10) multiplier += 0.3;

        refinedTokens.push({
            id: `token-${idx}-${Date.now()}`,
            original: word,
            clean: word,
            delayMultiplier: multiplier,
            isParagraphStart: false
        });
    });

    return refinedTokens;
};
