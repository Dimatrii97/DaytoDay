const loadBackground = fileName => {
    return require('@/assets/img/back/' + fileName);
};

const loadVideo = fileName => {
    return require('@/assets/video/' + fileName);
};

// const loadPerson = fileName => {
//     return require('@/assets/img/person/' + fileName);
// };

export const IMAGE = {
    GREETING: null,
    morning630: loadBackground('morning630.jpg'),
    morning830: loadBackground('morning830.jpg'),
    morning1030: loadBackground('morning1030.jpg'),
    HOME: loadBackground('home.webp'),
    HOME_WORKPLACE: loadBackground('home_workplace.jpg'),
    SHOWER: loadBackground('shower.jpg'),
    KITCHEN: loadBackground('kitchen.jpg'),

    BAD_WEATHER: loadBackground('bad_weather.webp'),
    PONY: loadBackground('pony.webp'),
    MERCEDES: loadBackground('mercedes.webp'),

    OFFICE_OPEN_DOOR: loadBackground('office_open_door.webp'),
    OFFICE_GUARD: loadBackground('office_guard.webp'),
    OFFICE: loadBackground('office.jpg'),
    VODKA_AS_GIFT: loadBackground('vodka_as_gift.webp'),
};

export const VIDEO = {
    DIRECTED_BY_ROBERT: loadVideo('endgame.mp4'),
    TIMA_IN_SHOWER: loadVideo('tima_in_shower.mp4'),
    DENIS_MONTAGER: loadVideo('denis_montager.mp4'),
    FLOWERS_ARE_GIFT: loadVideo('endgame.mp4'),
    EATING_FLOWERS: loadVideo('endgame.mp4'),
    MATTERMOST_CONGRATULATIONS: loadVideo('mattermost_congratulations.mp4'),
};

export const GAME = {
    JIRA: null,
};
