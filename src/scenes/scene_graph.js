import { SCENES, TYPE } from './constants';
import { IMAGE, VIDEO } from './background';
import { PERSON } from './person';

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
    alarmActions: currentScene => ([
        { text: 'Встать', nextScene: SCENES.goToShower },
        { text: 'Лежать', nextScene: nextAlarmAction(currentScene) },
    ]),
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

export const SCENE_GRAPH = {
    [SCENES.greeting]: {
        person: null,
        scene: IMAGE.GREETING,
        text: 'Привет, мы начинаем приключение!',
        type: TYPE.text,
    },

    // Будильники
    [SCENES.alarm800]: {
        person: {
            url: PERSON.DENIS_K_GREETINGS,
        },
        actions: ACTIONS.alarmActions(SCENES.alarm800),
        scene: IMAGE.ALARM,
        text: 'Время 8.00, пора вставать!',
        type: TYPE.text,
    },
    [SCENES.alarm830]: {
        person: null,
        actions: ACTIONS.alarmActions(SCENES.alarm830),
        scene: IMAGE.ALARM,
        text: 'Время 8.30, ты скоро проспишь!',
        type: TYPE.text,
    },
    [SCENES.alarm900]: {
        person: null,
        actions: ACTIONS.alarmActions(SCENES.alarm900),
        scene: IMAGE.ALARM,
        text: 'Аллоха накраситься не успеешь',
        type: TYPE.text,
    },
    [SCENES.alarm930]: {
        person: null,
        actions: ACTIONS.alarmActions(SCENES.alarm930),
        scene: IMAGE.ALARM,
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
        // TODO: заменить на видео
        scene: IMAGE.SHOWER,
        text: '...',
        type: TYPE.text,
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
        scene: IMAGE.HOME,
        text: 'Где будем работать?',
        type: TYPE.text,
    },
    [SCENES.workAtHomeStart]: {
        actions: ACTIONS.workAtHomeStart,
        scene: IMAGE.HOME,
        text: 'Начинается работа...',
        type: TYPE.text,
    },
    [SCENES.toOfficeRoad]: {
        actions: ACTIONS.toOfficeRoad,
        scene: IMAGE.HOME,
        text: 'Как будем добираться?',
        type: TYPE.text,
    },
};

export const NEXT_SCENE_TRANSITION = {
    [SCENES.greeting]: SCENES.alarm800,
    [SCENES.alarm800]: SCENES.goToShower,
    [SCENES.timaInShower]: SCENES.willYouEat,
};
