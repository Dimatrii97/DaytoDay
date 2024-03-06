<template>
    <div class="scene scene-game">
        <JiraGame
            @game-completed="onGameCompleted"
        />
        <ControlPanel
            v-if="gameCompleted"
            :text="scene.text"
            :actions="scene.actions"
            @changeScene="$emit('changeScene', $event)"
        />
    </div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue';
import JiraGame from '@/components/games/JiraGame.vue';

export default {
    name: 'SceneGame',
    props: {
        scene: {
            type: Object,
            required: true,
        },
    },
    emits: ['changeScene'],
    components: {
        ControlPanel,
        JiraGame
    },
    data() {
        return {
            gameCompleted: false,
        }
    },
    computed: {},
    methods: {
        onGameCompleted() {
            this.gameCompleted = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.scene {
    width: 100%;
    height: 100vh;
    position: relative;
    background: black;
    // display: flex;
    background-color: aliceblue;

    .background {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
}

.game {

}
</style>
