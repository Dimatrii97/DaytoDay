import { SCENES, TYPE, NPC } from './constants';
import { IMAGE, VIDEO, GAME } from './background';
import { PERSON } from './person';
import { state } from './state';
import { getText, getButtons } from './text';

const nextAlarmAction = currentScene => {
    if (currentScene === SCENES.alarm800) {
        return SCENES.alarm830;
    }

    if (currentScene === SCENES.alarm830) {
        return SCENES.alarm900;
    }

    if (currentScene === SCENES.alarm900) {
        return SCENES.alarm930;
    }

    if (currentScene === SCENES.alarm930) {
        return SCENES.alarmEndGame;
    }

    throw new Error('Невозможно подобрать следующую сцену со сном. Текущая сцена - ' + currentScene);
};

const getActions = () => {
    const BUTTONS = getButtons();

    return {
        alarmActions: currentScene => {
            return [
                { text: 'Встать', nextScene: state.wakeOn930 ? SCENES.workPlaceSelection : SCENES.goToShower },
                { text: 'Лежать', nextScene: nextAlarmAction(currentScene) },
            ];
        },
        goToShowerActions: [
            { text: BUTTONS.GO_TO_SHOWER.YES, nextScene: SCENES.timaInShower },
            {
                text: BUTTONS.GO_TO_SHOWER.NO,
                nextScene: state.isAdultVersion ? SCENES.showerEndGame : SCENES.willYouEat,
            },
        ],
        willYouEat: [
            { text: 'Да', nextScene: SCENES.breakFestSelection },
            { text: 'Нет', nextScene: SCENES.workPlaceSelection },
        ],
        breakFestSelection: [
            { text: BUTTONS.BREAKFEST_SELECTION.BEER, nextScene: SCENES.workPlaceSelection },
            // TODO: вероятно, тут нужен переход к видосику, где Саша готовит трешовый завтрак
            { text: BUTTONS.BREAKFEST_SELECTION.TRASH, nextScene: SCENES.workPlaceSelection },
        ],
        workPlaceSelection: [
            { text: 'Офис', nextScene: SCENES.toOfficeRoad },
            { text: 'Удаленка', nextScene: SCENES.workAtHomeStart },
        ],
        toOfficeRoad: () => {
            if (state.allTransportsSelected) {
                return [
                    {
                        text: 'Выйти на улицу',
                        nextScene: SCENES.mercedes,
                    },
                ];
            }

            const roadActions = [
                { text: 'Такси', nextScene: SCENES.taxi },
                { text: 'Пешком', nextScene: SCENES.walking },
                { text: 'Пони', nextScene: SCENES.pony },
                { text: 'Рандом', nextScene: SCENES.random },
            ];

            return roadActions.filter(it => !state.isTransportSelected(it.text));
        },
        workAtHomeStart: [],
        workAtHome: [{ text: BUTTONS.WORK_AT_HOME.NEXT, nextScene: SCENES.meetingAtHome }],
        meetingAtHome: [{ text: BUTTONS.MEETING_AT_HOME.NEXT, nextScene: SCENES.congratulationsInMm }],
        congratulationsInMm: [{ text: BUTTONS.CONGRATULATIONS_IN_MM.NEXT, nextScene: SCENES.internetWentDown }],
        internetWentDown: [
            { text: 'Вызвать мастера', nextScene: SCENES.masterFixTheInternet },
            { text: 'Поехать в офис', nextScene: SCENES.toOfficeRoad },
        ],
        masterFixTheInternet: [
            { text: 'Остаться дома', nextScene: SCENES.happyEndGame },
            { text: 'Поехать в офис', nextScene: SCENES.toOfficeRoad },
        ],

        mercedes: [{ text: 'Как мило. Давай)', nextScene: SCENES.enterOffice }],
        office_guard: [{ text: 'Спасибо :)', nextScene: SCENES.officeOpenDoor }],
        flowersInOffice: [
            { text: 'Принять цветок', nextScene: SCENES.flowersAreGift },
            { text: BUTTONS.FLOWERS_IN_OFFICE.REJECT, nextScene: SCENES.eatFlowers },
        ],
        flowersAreGift: [
            { text: 'Спасииибо', nextScene: SCENES.goToWorkPlaceInOffice },
        ],
        vodkaAsGift: [{ text: BUTTONS.VODKA_AS_GIFT.NEXT, nextScene: SCENES.goToWorkPlaceInOffice }],
    };
};

export const DEFAULT_NEXT_ACTION_ID = 'next';
export const RESTART_ACTION_ID = 'restart';

export const NEXT_ACTION = {
    text: 'Дальше',
    nextScene: DEFAULT_NEXT_ACTION_ID,
};

export const END_GAME_ACTIONS = [{ text: 'Заново', nextScene: RESTART_ACTION_ID }];

const workInOfficeParams = () => {
    // NOTE: тексты должны разные иначе все ебанется
    const npcList = [
        {
            name: NPC.NIKOLAI,
            person: PERSON.KOLYA_STAND,
            text: 'Привет, не хочешь поболтать?',
            nextScene: SCENES.talkWithKolya,
        },
        {
            name: NPC.DENIS,
            person: PERSON.DENIS_K_GREETINGS,
            text: 'Ыыы Привет, не хочешь поболтать?',
            nextScene: SCENES.talkWithDenis,
        },
        {
            name: NPC.DIMA,
            person: PERSON.DIMA_HELLO,
            text: 'Ууу Привет, не хочешь поболтать?',
            nextScene: SCENES.talkWithDima,
        },
        {
            name: NPC.ANDREY,
            person: PERSON.ANDREY_HELLO,
            text: 'ЭЭэ Привет, не хочешь поболтать?',
            nextScene: SCENES.talkWithAndrey,
        },
    ].filter(it => !state.talkedWithNpc(it.name));

    console.log({ state, npcList });

    if (state.talkedWithAllNpc) {
        return {
            text: 'Фух, кажется рабочий день закончился...',
        };
    }

    const currentNpc = npcList[0];

    const callback = () => state.talkWithNpc(currentNpc.name);

    return {
        text: currentNpc.text,
        person: {
            url: currentNpc.person,
        },
        actions: [
            { text: 'Работать', nextScene: SCENES.workInOffice, callback },
            { text: 'Поболтать', nextScene: currentNpc.nextScene, callback },
        ],
    };
};

export const getSceneGraph = () => {
    const TEXT = getText();
    const ACTIONS = getActions();

    const END_GAME_SCENE = {
        text: TEXT.END_GAME,
        actions: END_GAME_ACTIONS,
        scene: VIDEO.DIRECTED_BY_ROBERT,
        type: TYPE.video,
    };

    const HAPPY_ENDING = {
        text: TEXT.HAPPY_END,
        actions: END_GAME_ACTIONS,
        scene: VIDEO.DIRECTED_BY_ROBERT,
        type: TYPE.video,
    };

    return {
        [SCENES.failGame]: {
            ...END_GAME_SCENE,
            text: TEXT.FIRING,
        },
        [SCENES.happyEndGame]: {
            ...HAPPY_ENDING,
        },

        [SCENES.greeting]: {
            person: null,
            scene: IMAGE.HOME,
            text: TEXT.GREETING,
            type: TYPE.text,
        },

        // Будильники
        [SCENES.alarm800]: {
            actions: ACTIONS.alarmActions(SCENES.alarm800),
            scene: IMAGE.morning630,
            text: TEXT.ALARM800,
            type: TYPE.text,
        },
        [SCENES.alarm830]: {
            person: null,
            actions: ACTIONS.alarmActions(SCENES.alarm830),
            scene: IMAGE.morning830,
            text: TEXT.ALARM830,
            type: TYPE.text,
        },
        [SCENES.alarm900]: {
            person: null,
            actions: ACTIONS.alarmActions(SCENES.alarm900),
            scene: IMAGE.morning1030,
            text: TEXT.ALARM900,
            type: TYPE.text,
        },
        [SCENES.alarm930]: {
            person: null,
            actions: ACTIONS.alarmActions(SCENES.alarm930),
            scene: IMAGE.morning1030,
            text: TEXT.ALARM930,
            type: TYPE.text,
        },
        [SCENES.alarmEndGame]: {
            ...END_GAME_SCENE,
        },

        // Душ
        [SCENES.goToShower]: {
            person: null,
            actions: ACTIONS.goToShowerActions,
            scene: IMAGE.SHOWER,
            text: TEXT.GO_TO_SHOWER,
            type: TYPE.text,
        },
        [SCENES.timaInShower]: {
            scene: VIDEO.TIMA_IN_SHOWER,
            type: TYPE.video,
        },
        [SCENES.showerEndGame]: {
            ...END_GAME_SCENE,
            text: TEXT.FIRING,
        },

        // Кухня
        [SCENES.willYouEat]: {
            person: null,
            actions: ACTIONS.willYouEat,
            scene: IMAGE.KITCHEN,
            text: TEXT.WILL_YOU_EAT,
            type: TYPE.text,
        },
        [SCENES.breakFestSelection]: {
            actions: ACTIONS.breakFestSelection,
            scene: IMAGE.KITCHEN,
            text: TEXT.BREAKFEST_SELECTION,
            type: TYPE.text,
        },

        // Выбор рабочего места
        [SCENES.workPlaceSelection]: {
            actions: ACTIONS.workPlaceSelection,
            scene: IMAGE.HOME_WORKPLACE,
            text: TEXT.WORKSPACE_SELECTION,
            type: TYPE.text,
        },

        // Работа дома
        [SCENES.workAtHomeStart]: {
            actions: ACTIONS.workAtHomeStart,
            scene: IMAGE.HOME_WORKPLACE,
            text: TEXT.WORK_AT_HOME_START,
            type: TYPE.text,
        },
        [SCENES.workAtHome]: {
            actions: ACTIONS.workAtHome,
            scene: GAME.JIRA,
            text: '',
            type: TYPE.game,
        },
        [SCENES.meetingAtHome]: {
            actions: ACTIONS.meetingAtHome,
            scene: IMAGE.HOME_WORKPLACE,
            text: TEXT.MEETING_AT_HOME,
            type: TYPE.text,
        },
        [SCENES.congratulationsInMm]: {
            actions: ACTIONS.congratulationsInMm,
            scene: VIDEO.MATTERMOST_CONGRATULATIONS,
            text: TEXT.CONGRATULATIONS_IN_MM,
            type: TYPE.video,
        },
        [SCENES.internetWentDown]: {
            actions: ACTIONS.internetWentDown,
            scene: IMAGE.HOME_WORKPLACE,
            text: TEXT.INTERNET_WENT_DOWN,
            type: TYPE.text,
        },
        [SCENES.masterFixTheInternet]: {
            actions: ACTIONS.masterFixTheInternet,
            scene: VIDEO.DENIS_MONTAGER,
            text: TEXT.MASTER_FIX_THE_INTERNET,
            type: TYPE.video,
            textDelay: 15000,
        },

        // транспорт в офис
        [SCENES.toOfficeRoad]: {
            actions: ACTIONS.toOfficeRoad(),
            scene: IMAGE.HOME,
            text: state.allTransportsSelected ? 'Черт, что же мне делать...' : TEXT.TO_OFFICE_ROAD,
            type: TYPE.text,
        },
        [SCENES.taxi]: {
            scene: IMAGE.HOME,
            text: 'Машина не может подъехать на ваш заказ, пожалуйста подождите... Бесконечно',
            type: TYPE.text,
        },
        [SCENES.walking]: {
            scene: IMAGE.BAD_WEATHER,
            text: 'Ой что то там как то не солнечно :(',
            type: TYPE.text,
        },
        [SCENES.pony]: {
            scene: IMAGE.PONY,
            text: 'Конечно было бы хорошо если бы не было так сказочно...',
            type: TYPE.text,
        },
        [SCENES.random]: {
            scene: IMAGE.HOME,
            text: 'Блин, рандомайзер сломался',
            type: TYPE.text,
        },
        [SCENES.mercedes]: {
            actions: ACTIONS.mercedes,
            scene: IMAGE.MERCEDES,
            text: TEXT.MERCEDES,
            type: TYPE.text,
        },

        // Офис
        [SCENES.enterOffice]: {
            actions: ACTIONS.office_guard,
            scene: IMAGE.OFFICE_GUARD,
            text: TEXT.OFFICE_GUARD,
            type: TYPE.text,
        },
        [SCENES.officeOpenDoor]: {
            actions: ACTIONS.officeOpenDoor,
            scene: IMAGE.OFFICE_OPEN_DOOR,
            text: TEXT.OFFICE_OPEN_DOOR,
            type: TYPE.text,
        },
        [SCENES.flowersInOffice]: {
            actions: ACTIONS.flowersInOffice,
            scene: VIDEO.OFFER_FLOWERS,
            text: '',
            type: TYPE.video,
        },
        [SCENES.flowersAreGift]: {
            actions: ACTIONS.flowersAreGift,
            scene: VIDEO.FLOWERS_ARE_GIFT,
            text: '',
            type: TYPE.video,
        },
        [SCENES.eatFlowers]: {
            scene: VIDEO.EATING_FLOWERS,
            text: '',
            type: TYPE.video,
        },
        [SCENES.vodkaAsGift]: {
            actions: ACTIONS.vodkaAsGift,
            scene: IMAGE.VODKA_AS_GIFT,
            text: 'Теперь вместо цветов для тебя подарок еще лучше!',
            type: TYPE.text,
        },

        [SCENES.goToWorkPlaceInOffice]: {
            text: 'Фух, теперь можно и поработать...',
            scene: IMAGE.OFFICE,
            type: TYPE.text,
        },
        [SCENES.workInOffice]: {
            ...workInOfficeParams(),
            scene: IMAGE.OFFICE,
            type: TYPE.text,
        },
        [SCENES.talkWithKolya]: {
            person: {
                url: PERSON.KOLYA_TALKING,
            },
            scene: IMAGE.OFFICE,
            text: 'Йоу йоу йоу. Хорошо поболтали?',
            type: TYPE.text,
        },
        [SCENES.talkWithAndrey]: {
            person: {
                url: PERSON.ANDREY_TALKING,
            },
            scene: IMAGE.OFFICE,
            text: 'Йоу йоу йоу. Хорошо поболтали?',
            type: TYPE.text,
        },
        [SCENES.talkWithDenis]: {
            person: {
                url: PERSON.DENIS_K_TALKING,
            },
            scene: IMAGE.OFFICE,
            text: 'Йоу йоу йоу. Хорошо поболтали?',
            type: TYPE.text,
        },
        [SCENES.talkWithDima]: {
            person: {
                url: PERSON.DIMA_TALKING,
            },
            scene: IMAGE.OFFICE,
            text: 'Йоу йоу йоу. Хорошо поболтали?',
            type: TYPE.text,
        },
    };
};

export const NEXT_SCENE_TRANSITION = {
    [SCENES.greeting]: SCENES.alarm800,
    [SCENES.alarm800]: SCENES.goToShower,
    [SCENES.timaInShower]: SCENES.willYouEat,
    [SCENES.workAtHomeStart]: SCENES.workAtHome,
    [SCENES.workAtHome]: SCENES.meetingAtHome,
    [SCENES.taxi]: SCENES.toOfficeRoad,
    [SCENES.pony]: SCENES.toOfficeRoad,
    [SCENES.walking]: SCENES.toOfficeRoad,
    [SCENES.random]: SCENES.toOfficeRoad,

    [SCENES.officeOpenDoor]: SCENES.flowersInOffice,
    [SCENES.flowersAreGift]: SCENES.goToWorkPlaceInOffice,
    [SCENES.eatFlowers]: SCENES.vodkaAsGift,
    [SCENES.vodkaAsGift]: SCENES.goToWorkPlaceInOffice,
    [SCENES.goToWorkPlaceInOffice]: SCENES.workInOffice,

    [SCENES.talkWithKolya]: SCENES.workInOffice,
    [SCENES.talkWithAndrey]: SCENES.workInOffice,
    [SCENES.talkWithDima]: SCENES.workInOffice,
    [SCENES.talkWithDenis]: SCENES.workInOffice,
};
