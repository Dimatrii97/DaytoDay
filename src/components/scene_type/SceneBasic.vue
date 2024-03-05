<template>
    <div class="scene scene-basic">
        <div
            class="background"
            :style="{ backgroundImage: createBackgroundUrl(backgroundUrl) }"
        >
            <div v-if="person" class="person-container">
                <div
                    class="person"
                    :class="[personPosition]"
                    :style="{ backgroundImage: createBackgroundUrl(personUrl) }"
                />
            </div>
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
            return this.person.position ?? POSITION.CENTER;
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

.person-container {
    height: 80vh;
    position: absolute;
    width: 100%;
    bottom: 0;

    .person {
        position: relative;
        background-repeat: no-repeat;
        background-size: contain;
        height: 100%;
        width: 60vw;

        &.center {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &.left {
            margin-right: auto;
        }

        &.right {
            margin-left: auto;
        }
    }
}
</style>
