import { SCENES, TYPE } from './constants';
import { IMAGE, VIDEO, GAME } from './background';
// eslint-disable-next-line no-unused-vars
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
        toOfficeRoad: [
            { text: 'Такси', nextScene: SCENES.mercedes },
            { text: 'Пешком', nextScene: SCENES.mercedes },
            { text: 'Пони', nextScene: SCENES.mercedes },
            { text: 'Рандом', nextScene: SCENES.mercedes },
        ],
        workAtHomeStart: [],
        workAtHome: [{ text: BUTTONS.WORK_AT_HOME.NEXT, nextScene: SCENES.meetingAtHome }],
        meetingAtHome: [{ text: BUTTONS.MEETING_AT_HOME.NEXT, nextScene: SCENES.congratulationsInMm }],
        congratulationsInMm: [{ text: BUTTONS.CONGRATULATIONS_IN_MM.NEXT, nextScene: SCENES.internetWentDown }],
        internetWentDown: [
            { text: 'Вызвать мастера', nextScene: SCENES.masterFixTheInternet },
            { text: 'Поехать в офис', nextScene: SCENES.toOfficeRoad },
        ],
        masterFixTheInternet: [
            { text: 'Остаться дома', nextScene: SCENES.endGame },
            { text: 'Поехать в офис', nextScene: SCENES.toOfficeRoad },
        ],
    };
};

export const DEFAULT_NEXT_ACTION_ID = 'next';
export const RESTART_ACTION_ID = 'restart';

export const NEXT_ACTION = {
    text: 'Дальше',
    nextScene: DEFAULT_NEXT_ACTION_ID,
};

export const END_GAME_ACTIONS = [{ text: 'Заново', nextScene: RESTART_ACTION_ID }];

export const getSceneGraph = () => {
    const TEXT = getText();
    const ACTIONS = getActions();

    const END_GAME_SCENE = {
        text: TEXT.END_GAME,
        actions: END_GAME_ACTIONS,
        scene: VIDEO.DIRECTED_BY_ROBERT,
        type: TYPE.video,
    };

    return {
        [SCENES.endGame]: {
            ...END_GAME_SCENE,
            text: TEXT.FIRING,
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
            scene: IMAGE.HOME_WORKPLACE,
            text: TEXT.CONGRATULATIONS_IN_MM,
            type: TYPE.text,
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

        // Работа в офисе
        [SCENES.toOfficeRoad]: {
            actions: ACTIONS.toOfficeRoad,
            scene: IMAGE.HOME_WORKPLACE,
            text: TEXT.TO_OFFICE_ROAD,
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
};
