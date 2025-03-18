// formatSeconds converts seconds to minutes and seconds
export function formatSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
}

// getDefinition fetches the definition of a word from the dictionary API
export async function getDefinition(word: string, currentDefinition: string) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    let definitions;
    try {
        definitions = data[0].meanings[0].definitions;
        if (currentDefinition.toLowerCase() !== definitions[0].definition.toLowerCase()) {
            definitions.splice(0, 0, { definition: currentDefinition });
        }
    } catch (error) {
        definitions = [{ definition: currentDefinition }];
    }
    return definitions;
}