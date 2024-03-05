<template>
    <div class="scene scene-basic">
        <div
            class="background"
            :style="{ backgroundImage: createBackgroundUrl(backgroundUrl) }"
        >
            <div
                v-if="person"
                class="person"
                :class="[personPosition]"
                :style="{ backgroundImage: createBackgroundUrl(personUrl) }"
            />
            <ControlPanel
                :text="scene.text"
                :actions="scene.actions"
                @changeScene="$emit('changeScene', $event)"
            />
        </div>
    </div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue';
import { POSITION } from '@/scenes/person';

export default {
    name: 'SceneBasic',
    props: {
        scene: {
            type: Object,
            required: true,
        },
    },
    emits: ['changeScene'],
    components: {
        ControlPanel,
    },
    computed: {
        backgroundImage() {
            return this.scene?.scene ?? 'office.jpg';
        },
        person() {
            return this.scene?.person ?? null;
        },
        personPosition() {
            return this.person.position ?? POSITION.RIGHT;
        },
        personUrl() {
            return require('@/assets/img/person/' + this.person.url);
        },
        backgroundUrl() {
            return require('@/assets/img/back/' + this.backgroundImage);
        },
    },
    methods: {
        createBackgroundUrl(url) {
            return `url(${url})`;
        }
    }
};
</script>

<style lang="scss" scoped>
.scene {
    width: 100vw;
    height: 100vh;
    position: relative;

    .background {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
}

.person {
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
}
</style>
