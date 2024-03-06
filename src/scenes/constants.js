export const TYPE = {
    text: 'text',
    video: 'video',
    game: 'game',
};

export const SCENES = {
    failGame: 'failGame',
    happyEndGame: 'happyEndGame',

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
    breakFestFromSasha: 'breakFestFromSasha',
    breakFestSelection: 'breakFestSelection',

    workPlaceSelection: 'workPlaceSelection',

    workAtHomeStart: 'workAtHomeStart',
    workAtHome: 'workAtHome',
    meetingAtHome: 'meetingAtHome',
    congratulationsInMm: 'congratulationsInMm',
    internetWentDown: 'internetWentDown',
    masterFixTheInternet: 'masterFixTheInternet',

    toOfficeRoad: 'toOfficeRoad',
    taxi: 'taxi',
    pony: 'poni',
    walking: 'walking',
    random: 'random',

    mercedes: 'mercedes',

    enterOffice: 'enterOffice',
    officeOpenDoor: 'officeOpenDoor',
    flowersInOffice: 'flowersInOffice',
    flowersAreGift: 'flowersAreGift',
    eatFlowers: 'eatFlowers',

    goToWorkPlaceInOffice: 'goToWorkPlaceInOffice',
    workInOffice: 'workInOffice',
    vodkaAsGift: 'vodkaAsGift',

    talkWithKolya: 'talkWithKolya',
    talkWithKolya2: 'talkWithKolya2',
    talkWithKolya3: 'talkWithKolya3',
    talkWithKolya4: 'talkWithKolya4',
    talkWithKolya5: 'talkWithKolya5',
    talkWithKolya6: 'talkWithKolya6',
    talkWithKolya7: 'talkWithKolya7',

    talkWithDenis: 'talkWithDenis',
    talkWithDenis2: 'talkWithDenis2',
    talkWithDenis3: 'talkWithDenis3',
    talkWithDenis4: 'talkWithDenis4',

    talkWithDima: 'talkWithDima',
    talkWithDima2: 'talkWithDima2',
    talkWithDima3: 'talkWithDima3',
    talkWithDima4: 'talkWithDima4',
    talkWithDima5: 'talkWithDima5',

    talkWithAndrey: 'talkWithAndrey',
    talkWithAndrey2: 'talkWithAndrey2',
    talkWithAndrey3: 'talkWithAndrey3',
    talkWithAndrey4: 'talkWithAndrey4',
    talkWithAndrey5: 'talkWithAndrey5',
};

export const FIRST_SCENE = SCENES.greeting;
// export const FIRST_SCENE = SCENES.alarm930;

export const ALARM_SCENES = [SCENES.alarm800, SCENES.alarm830, SCENES.alarm900, SCENES.alarm930, SCENES.alarmEndGame];
export const TRANSPORT_SCENES = [SCENES.taxi, SCENES.pony, SCENES.walking, SCENES.random];

export const NPC = {
    NIKOLAI: 'Коля',
    DIMA: 'Дима',
    DENIS: 'Денис',
    ANDREY: 'Андрей',
};
