import { state } from './state';

const ADULT_TEXT = {
    END_GAME: 'Блять... Так, в этой игре сто процентов несколько концовок, пойду перепройду',
    FIRING: 'Вы уволены',

    GREETING: 'Привет, мы начинаем приключение!',

    ALARM800: 'Время 8.00, пора вставать!',
    ALARM830: 'Время 8.30, ты скоро проспишь!',
    ALARM900: 'Аллоха накраситься не успеешь',
    ALARM930: 'АААА СРОЧНО ВСТАВАЙ УЖЕ 9.30',

    GO_TO_SHOWER: 'Идем в душ?))))',

    WILL_YOU_EAT: 'Будешь есть?',
    BREAKFEST_SELECTION: 'Что будешь есть?',

    WORKSPACE_SELECTION: 'Где будем работать?',

    WORK_AT_HOME_START: 'Начинается работа...',
    WORK_AT_HOME: 'Работаем?',
    MEETING_AT_HOME: 'Идем на мит?',
    CONGRATULATIONS_IN_MM: 'Поздравляю, вас только что поздравили в ММ!',
    INTERNET_WENT_DOWN: 'Бля инет наебнулся, пизда конечно...',
    MASTER_FIX_THE_INTERNET: 'Оу май... А можешь футболочку снять?',

    TO_OFFICE_ROAD: 'Как будем добираться?',
};

const BASE_TEXT = {
    END_GAME: 'Эх... В этой игре сто процентов несколько концовок, пойду перепройду',
    FIRING: 'Вы уволены',

    GREETING: 'Привет, мы начинаем приключение!',

    ALARM800: 'Время 8.00, пора вставать!',
    ALARM830: 'Время 8.30, ты скоро проспишь!',
    ALARM900: 'Аллоха накраситься не успеешь',
    ALARM930: 'АААА СРОЧНО ВСТАВАЙ УЖЕ 9.30',

    GO_TO_SHOWER: 'Идем в душ?',

    WILL_YOU_EAT: 'Будешь есть?',
    BREAKFEST_SELECTION: 'Что будешь есть?',

    WORKSPACE_SELECTION: 'Где будем работать?',

    WORK_AT_HOME_START: 'Начинается работа...',
    WORK_AT_HOME: 'Работаем?',
    MEETING_AT_HOME: 'Идем на мит?',
    CONGRATULATIONS_IN_MM: 'Поздравляю, вас только что поздравили в ММ!',
    INTERNET_WENT_DOWN: 'Что-то с инетом, похоже он сломался. Может вызвать мастера?',
    MASTER_FIX_THE_INTERNET: 'Такой мастер мне в душе... Всмысле по душе',

    TO_OFFICE_ROAD: 'Как будем добираться?',
};

const ADULT_BUTTONS = {
    GO_TO_SHOWER: {
        YES: 'Да)',
        NO: 'Пшел нах',
    },
    BREAKFEST_SELECTION: {
        BEER: 'Выпить пиво',
        TRASH: 'Саша приготовит трешовый завтрак',
    },
    WORK_AT_HOME: {
        NEXT: 'Блять панголин(',
    },
    MEETING_AT_HOME: {
        NEXT: 'Блять(((',
    },
    CONGRATULATIONS_IN_MM: {
        NEXT: 'Как миииило',
    },
};

const BASE_BUTTONS = {
    GO_TO_SHOWER: {
        YES: 'Да',
        NO: 'Нет',
    },
    BREAKFEST_SELECTION: {
        BEER: 'Выпить пиво',
        TRASH: 'Саша приготовит трешовый завтрак',
    },
    WORK_AT_HOME: {
        NEXT: 'Работаем работаем',
    },
    MEETING_AT_HOME: {
        NEXT: 'Идем',
    },
    CONGRATULATIONS_IN_MM: {
        NEXT: 'Как миииило',
    },
};

export const getText = () => state.isAdultVersion ? ADULT_TEXT : BASE_TEXT;
export const getButtons = () => state.isAdultVersion ? ADULT_BUTTONS : BASE_BUTTONS;
