import { SCENES, TYPE } from './constants';
import { IMAGE, VIDEO } from './background';
// eslint-disable-next-line no-unused-vars
import { PERSON } from './person';
import { state } from './state';

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

const ACTIONS = {
    alarmActions: currentScene => {
        return [
            { text: 'Встать', nextScene: state.wakeOn930 ? SCENES.workPlaceSelection : SCENES.goToShower },
            { text: 'Лежать', nextScene: nextAlarmAction(currentScene) },
        ];
    },
    goToShowerActions: [
        { text: 'Да)', nextScene: SCENES.timaInShower },
        { text: 'Пшел нах', nextScene: SCENES.showerEndGame },
    ],
    willYouEat: [
        { text: 'Да', nextScene: SCENES.breakFestSelection },
        { text: 'Нет', nextScene: SCENES.workPlaceSelection },
    ],
    breakFestSelection: [
        { text: 'Выпить пиво', nextScene: SCENES.workPlaceSelection },
        // TODO: вероятно, тут нужен переход к видосику, где Саша готовит трешовый завтрак
        { text: 'Саша приготовит трешовый завтрак', nextScene: SCENES.workPlaceSelection },
    ],
    workPlaceSelection: [
        { text: 'Офис', nextScene: SCENES.toOfficeRoad },
        { text: 'Удаленка', nextScene: SCENES.workAtHomeStart },
    ],
    toOfficeRoad: [
        { text: 'Такси', nextScene: SCENES.mercedes },
        { text: 'Пешком', nextScene: SCENES.mercedes },
        { text: 'Пони', nextScene: SCENES.mercedes },
        { text: 'Рандом', nextScene: SCENES.mercedes },
    ],
    workAtHomeStart: [],
    workAtHome: [
        { text: 'Работаем(', nextScene: SCENES.meetingAtHome },
    ],
    meetingAtHome: [
        { text: 'Идем(( ', nextScene: SCENES.congratulationsInMm },
    ],
    congratulationsInMm: [
        { text: 'Как мииило', nextScene: SCENES.internetWentDown },
    ],
    internetWentDown: [
        { text: 'Вызвать мастера', nextScene: SCENES.masterFixTheInternet },
        { text: 'Поехать в офис', nextScene: SCENES.toOfficeRoad },
    ],
    masterFixTheInternet: [
        { text: 'Остаться дома', nextScene: SCENES.endGame },
        { text: 'Поехать в офис', nextScene: SCENES.toOfficeRoad },
    ],
};

export const DEFAULT_NEXT_ACTION_ID = 'next';
export const RESTART_ACTION_ID = 'restart';

export const NEXT_ACTION = {
    text: 'Дальше',
    nextScene: DEFAULT_NEXT_ACTION_ID,
};

export const END_GAME_ACTIONS = [
    { text: 'Заново', nextScene: RESTART_ACTION_ID },
];

const END_GAME_SCENE = {
    text: 'Блять... Так, в этой игре сто процентов несколько концовок, пойду перепройду',
    actions: END_GAME_ACTIONS,
    scene: VIDEO.DIRECTED_BY_ROBERT,
    type: TYPE.video,
};

export const getSceneGraph = () => ({
    [SCENES.endGame]: {
        ...END_GAME_SCENE,
        text: 'Вы уволены.',
    },

    [SCENES.greeting]: {
        person: null,
        scene: IMAGE.HOME,
        text: 'Привет, мы начинаем приключение!',
        type: TYPE.text,
    },

    // Будильники
    [SCENES.alarm800]: {
        actions: ACTIONS.alarmActions(SCENES.alarm800),
        scene: IMAGE.morning630,
        text: 'Время 8.00, пора вставать!',
        type: TYPE.text,
    },
    [SCENES.alarm830]: {
        person: null,
        actions: ACTIONS.alarmActions(SCENES.alarm830),
        scene: IMAGE.morning830,
        text: 'Время 8.30, ты скоро проспишь!',
        type: TYPE.text,
    },
    [SCENES.alarm900]: {
        person: null,
        actions: ACTIONS.alarmActions(SCENES.alarm900),
        scene: IMAGE.morning1030,
        text: 'Аллоха накраситься не успеешь',
        type: TYPE.text,
    },
    [SCENES.alarm930]: {
        person: null,
        actions: ACTIONS.alarmActions(SCENES.alarm930),
        scene: IMAGE.morning1030,
        text: 'АААА СРОЧНО ВСТАВАЙ УЖЕ 9.30',
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
        text: 'Идем в душ?))))',
        type: TYPE.text,
    },
    [SCENES.timaInShower]: {
        scene: VIDEO.TIMA_IN_SHOWER,
        type: TYPE.video,
    },
    [SCENES.showerEndGame]: {
        ...END_GAME_SCENE,
        text: 'Вы уволены.',
    },

    // Кухня
    [SCENES.willYouEat]: {
        person: null,
        actions: ACTIONS.willYouEat,
        scene: IMAGE.KITCHEN,
        text: 'Будешь есть?',
        type: TYPE.text,
    },
    [SCENES.breakFestSelection]: {
        actions: ACTIONS.breakFestSelection,
        scene: IMAGE.KITCHEN,
        text: 'Что будешь есть?',
        type: TYPE.text,
    },

    // Выбор рабочего места
    [SCENES.workPlaceSelection]: {
        actions: ACTIONS.workPlaceSelection,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Где будем работать?',
        type: TYPE.text,
    },

    // Работа дома
    [SCENES.workAtHomeStart]: {
        actions: ACTIONS.workAtHomeStart,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Начинается работа...',
        type: TYPE.text,
    },
    [SCENES.workAtHome]: {
        actions: ACTIONS.workAtHome,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Работаем?',
        type: TYPE.text,
    },
    [SCENES.meetingAtHome]: {
        actions: ACTIONS.meetingAtHome,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Идем на мит?',
        type: TYPE.text,
    },
    [SCENES.congratulationsInMm]: {
        actions: ACTIONS.congratulationsInMm,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Поздравляю, вас только что поздравили в ММ!',
        type: TYPE.text,
    },
    [SCENES.internetWentDown]: {
        actions: ACTIONS.internetWentDown,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Бля инет наебнулся, пизда конечно...',
        type: TYPE.text,
    },
    [SCENES.masterFixTheInternet]: {
        actions: ACTIONS.masterFixTheInternet,
        scene: VIDEO.DENIS_MONTAGER,
        text: 'Оу май...',
        type: TYPE.video,
    },

    // Работа в офисе
    [SCENES.toOfficeRoad]: {
        actions: ACTIONS.toOfficeRoad,
        scene: IMAGE.HOME_WORKPLACE,
        text: 'Как будем добираться?',
        type: TYPE.text,
    },


});

export const NEXT_SCENE_TRANSITION = {
    [SCENES.greeting]: SCENES.alarm800,
    [SCENES.alarm800]: SCENES.goToShower,
    [SCENES.timaInShower]: SCENES.willYouEat,
    [SCENES.workAtHomeStart]: SCENES.workAtHome,
};
