export function randomBoolean(probability = .5) {
    return Math.random() < probability;
}

export function createBackgroundUrl(url) {
    return `url(${url})`;
}

export function randomItemFromList(list) {
    const itemIdx = Math.floor(Math.random() * list.length);
    const item = list[itemIdx];
    list.splice(itemIdx, 1);
    return item;
}