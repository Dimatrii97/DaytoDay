<template>
    <div class="scene scene-game">
        <JiraGame/>
        <ControlPanel
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
    computed: {
        video() {
            return this.scene.scene;
        },
    },
    methods: {
        createBackgroundUrl(url) {
            return `url(${url})`;
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
