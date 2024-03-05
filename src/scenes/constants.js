export const TYPE = {
    text: 'text',
    video: 'video',
};

export const SCENES = {
    greeting: 'greeting',

    alarm800: 'alarm800',
    alarm830: 'alarm830',
    alarm900: 'alarm900',
    alarm930: 'alarm930',
    alarmEndGame: 'alarmEndGame',

    goToShower: 'goToShower',
    timaInShower: 'timaInShower',
    showerEndGame: 'showerEndGame',

    willYouEat: 'willYouEat',
    breakFestSelection: 'breakFestSelection',

    workPlaceSelection: 'workPlaceSelection',
    workAtHomeStart: 'workAtHomeStart',
    toOfficeRoad: 'toOfficeRoad',

    mercedes: 'mercedes',
};

export const FIRST_SCENE = SCENES.greeting;
// export const FIRST_SCENE = SCENES.alarm930;

export const ALARM_SCENES = [SCENES.alarm800, SCENES.alarm830, SCENES.alarm900, SCENES.alarm930, SCENES.alarmEndGame];
