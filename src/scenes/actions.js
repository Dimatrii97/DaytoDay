const ACTIONS = {
    alarmActions: currentScene => ([
        { text: 'Встать', nextScene: SCENES.goToShower },
        { text: 'Лежать', nextScene: nextAlarmAction(currentScene) },
    ]),
};