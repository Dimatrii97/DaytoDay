export function randomBoolean(probability = .5) {
    return Math.random() < probability;
}

export function createBackgroundUrl(url) {
    return `url(${url})`;
}
