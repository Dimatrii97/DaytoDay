import { SCENES, TYPE, NPC } from './constants';
import { IMAGE, VIDEO, GAME } from './background';
import { PERSON } from './person';
import { state } from './state';
import { getText, getButtons } from './text';
import { randomItemFromList } from '@/util.js';

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
        flowersAreGift: [{ text: 'Спасииибо', nextScene: SCENES.goToWorkPlaceInOffice }],
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
            text: 'Привет! Как дела?',
            answer: 'Хорошо. У тебя как?',
            nextScene: SCENES.talkWithKolya,
        },
        {
            name: NPC.DENIS,
            person: PERSON.DENIS_K_GREETINGS,
            text: 'Ой, привет! Ну надо же, совсем не ожидал встретить тебя здесь!',
            nextScene: SCENES.talkWithDenis,
            answer: 'Привет!',
        },
        {
            name: NPC.DIMA,
            person: PERSON.DIMA_HELLO,
            text: 'Привет!',
            nextScene: SCENES.talkWithDima,
            answer: 'Привет! Есть вопрос...',
        },
        {
            name: NPC.ANDREY,
            person: PERSON.ANDREY_TALKING,
            text: 'О, привет! Слушай, хочешь историю? Вот недавно был у стоматолога, это был поздний вечер и последний приём стоматолога.',
            nextScene: SCENES.talkWithAndrey,
            answer: 'Так! А дальше?',
        },
    ].filter(it => !state.talkedWithNpc(it.name));

    if (state.talkedWithAllNpc) {
        return {
            text: 'Фух, кажется рабочий день закончился...',
        };
    }

    const currentNpc = randomItemFromList(npcList);

    const callback = () => state.talkWithNpc(currentNpc.name);

    return {
        text: currentNpc.text,
        person: {
            url: currentNpc.person,
        },
        actions: [
            { text: 'Работать', nextScene: SCENES.workInOffice, callback },
            { text: currentNpc.answer, nextScene: currentNpc.nextScene, callback },
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

        // Коля
        [SCENES.talkWithKolya]: {
            person: {
                url: PERSON.KOLYA_800,
            },
            actions: [{ ...NEXT_ACTION, text: 'Что она?' }],
            scene: IMAGE.OFFICE,
            text: 'Нормально. А ты знала, что Евлампия из бухгалтерии...',
            type: TYPE.text,
        },
        [SCENES.talkWithKolya2]: {
            person: {
                url: PERSON.KOLYA_641,
            },
            actions: [{ ...NEXT_ACTION, text: 'Да лааадно, опять!?' }],
            scene: IMAGE.OFFICE,
            text: 'Уехала в отпуск!',
            type: TYPE.text,
        },
        [SCENES.talkWithKolya3]: {
            person: {
                url: PERSON.KOLYA_030,
            },
            actions: [{ ...NEXT_ACTION }],
            scene: IMAGE.OFFICE,
            text: 'ДА-ДА...',
            type: TYPE.text,
        },
        [SCENES.talkWithKolya3]: {
            person: {
                url: PERSON.KOLYA_318,
            },
            actions: [{ ...NEXT_ACTION, text: 'Какой кошмар!' }],
            scene: IMAGE.OFFICE,
            text: 'Я к ней сегодня снова пришел, а её нет на месте!',
            type: TYPE.text,
        },
        [SCENES.talkWithKolya4]: {
            person: {
                url: PERSON.KOLYA_TALKING,
            },
            actions: [{ ...NEXT_ACTION, text: 'Спасибо' }],
            scene: IMAGE.OFFICE,
            text: 'Да, но это всё неважно, потому что сегодня особый день. Поздравляю тебя с 8 Марта! Пусть в твоей душе всегда будет весна, лёгкость и красота. Желаю тебе хорошего настроения и кучу незабываемых впечатлений!',
            type: TYPE.text,
        },
        [SCENES.talkWithKolya5]: {
            person: {
                url: PERSON.KOLYA_624,
            },
            actions: [{ ...NEXT_ACTION }],
            scene: IMAGE.OFFICE,
            text: 'Ну ладно, пока, хорошего тебе дня!',
            type: TYPE.text,
        },

        // Андрей
        [SCENES.talkWithAndrey]: {
            person: {
                url: PERSON.ANDREY_2,
            },
            scene: IMAGE.OFFICE,
            text:
                'Я вышел из кабинета и увидел мужчину с очень обеспокоенным видом, он зашел сразу после меня. Я слышал их разговор через открытую дверь, женщина сказала ему:\n' +
                '- Мужчина, я уже ухожу, вы вообще записывались!?',
            actions: [{ ...NEXT_ACTION, text: 'Ага, а он что!?' }],
            type: TYPE.text,
        },
        [SCENES.talkWithAndrey2]: {
            person: {
                url: PERSON.ANDREY_3,
            },
            scene: IMAGE.OFFICE,
            text:
                'Он промолчал, а она сказала:\n' +
                '- Ладно, у вас очень обеспокоенный вид. Говорите, что случилось - может быть отвечу, пока собираюсь.',
            actions: [{ ...NEXT_ACTION, text: 'Что с ним?' }],
            type: TYPE.text,
        },
        [SCENES.talkWithAndrey3]: {
            person: {
                url: PERSON.ANDREY_HELLO,
            },
            scene: IMAGE.OFFICE,
            text:
                'И мужчина сказал: Доктор, помогите! Мне кажется, что я мотылёк...\n' +
                'Доктор: Вам кажется, что вы мотылек? Тогда вы не по адресу - вам к психиатру, а я стоматолог, вы вообще видели вывеску на дверях?\n' +
                'Мужчина: Видел',
            actions: [{ ...NEXT_ACTION, text: 'Ага..' }],
            type: TYPE.text,
        },
        [SCENES.talkWithAndrey4]: {
            person: {
                url: PERSON.ANDREY_5,
            },
            scene: IMAGE.OFFICE,
            text: 'Доктор: Тогда почему вы зашли?\n' + 'Мужчина: Потому что свет был включен',
            actions: [{ ...NEXT_ACTION, text: 'Хааа!' }],
            type: TYPE.text,
        },

        // Денис
        [SCENES.talkWithDenis]: {
            person: {
                url: PERSON.DENIS_K_1,
            },
            actions: [{ ...NEXT_ACTION, text: 'Ой, и не знаю..' }],
            scene: IMAGE.OFFICE,
            text: 'И почему здесь сегодня так много наших девушек?.. Может быть этому есть какая-то причина?..',
            type: TYPE.text,
        },
        [SCENES.talkWithDenis2]: {
            person: {
                url: PERSON.DENIS_K_3,
            },
            actions: [{ ...NEXT_ACTION, text: 'Ой, как мило!' }],
            scene: IMAGE.OFFICE,
            text: 'Ну точно, сегодня же праздник! От души поздравляю!',
            type: TYPE.text,
        },
        [SCENES.talkWithDenis3]: {
            person: {
                url: PERSON.DENIS_K_TALKING,
            },
            actions: [{ ...NEXT_ACTION, text: 'Спасибо! :)' }],
            scene: IMAGE.OFFICE,
            text: 'Комплименты излишни, ты и так всегда супер!',
            type: TYPE.text,
        },

        [SCENES.talkWithDima]: {
            person: {
                url: PERSON.DIMA_3,
            },
            scene: IMAGE.OFFICE,
            text: 'О, это по сделке N20240308? Да, я там посмотрел - баг выглядит как несложный в исправлении, но есть свои нюансы..',
            type: TYPE.text,
            actions: [{ ...NEXT_ACTION, text: 'Какие?' }],
        },
        [SCENES.talkWithDima2]: {
            person: {
                url: PERSON.DIMA_4,
            },
            scene: IMAGE.OFFICE,
            text: 'Да какая разница!? Сейчас важнее другое: я поздравляю тебя с 8 Марта! Оставайся такой же замечательной и неповторимой! ',
            type: TYPE.text,
            actions: [{ ...NEXT_ACTION, text: 'Как рада это слышать!' }],
        },
        [SCENES.talkWithDima3]: {
            person: {
                url: PERSON.DIMA_STICKER,
            },
            scene: IMAGE.OFFICE,
            text: 'Пусть в твоём доме всегда будут спокойствие и уют, твоя жизнь будет такой же прекрасной как ты, а тебя окружают только самые лучшие люди!',
            type: TYPE.text,
            actions: [{ ...NEXT_ACTION, text: 'Мне очень приятно :)' }],
        },
        [SCENES.talkWithDima4]: {
            person: {
                url: PERSON.DIMA_TALKING,
            },
            scene: IMAGE.OFFICE,
            text: 'Ладно, я пойду, а ты отдыхай! ',
            type: TYPE.text,
            actions: [{ ...NEXT_ACTION }],
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

    [SCENES.talkWithKolya]: SCENES.talkWithKolya2,
    [SCENES.talkWithKolya2]: SCENES.talkWithKolya3,
    [SCENES.talkWithKolya3]: SCENES.talkWithKolya4,
    [SCENES.talkWithKolya4]: SCENES.talkWithKolya5,
    [SCENES.talkWithKolya5]: SCENES.workInOffice,

    [SCENES.talkWithAndrey]: SCENES.talkWithAndrey2,
    [SCENES.talkWithAndrey2]: SCENES.talkWithAndrey3,
    [SCENES.talkWithAndrey3]: SCENES.talkWithAndrey4,
    [SCENES.talkWithAndrey4]: SCENES.workInOffice,

    [SCENES.talkWithDima]: SCENES.talkWithDima2,
    [SCENES.talkWithDima2]: SCENES.talkWithDima3,
    [SCENES.talkWithDima3]: SCENES.talkWithDima4,
    [SCENES.talkWithDima4]: SCENES.workInOffice,

    [SCENES.talkWithDenis]: SCENES.talkWithDenis2,
    [SCENES.talkWithDenis2]: SCENES.talkWithDenis3,
    [SCENES.talkWithDenis3]: SCENES.workInOffice,
};
