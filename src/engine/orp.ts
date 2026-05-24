/**
 * Calculates the Optimal Recognition Point (ORP) index for a given word.
 * The ORP is typically slightly to the left of the center.
 * 
 * Heuristics based on word length:
 * 1: 0 (1st letter)
 * 2-5: 1 (2nd letter)
 * 6-9: 2 (3rd letter)
 * 10-13: 3 (4th letter)
 * 14+: 4 (5th letter)
 */
export const calculateORP = (word: string): number => {
    const len = word.length;
    if (len <= 1) return 0;
    if (len <= 5) return 1;
    if (len <= 9) return 2;
    if (len <= 13) return 3;
    return 4;
};

/**
 * Splits a word into three parts: pre-pivot, pivot, post-pivot.
 */
export const splitWordAtORP = (word: string) => {
    const pivotIndex = calculateORP(word);
    return {
        left: word.slice(0, pivotIndex),
        pivot: word[pivotIndex] || '',
        right: word.slice(pivotIndex + 1),
        index: pivotIndex
    };
};
