<template>
    <div class="scene scene-basic">
        <transition name="slide-fade">
            <div
                class="background"
                :key="createBackgroundUrl(backgroundUrl)"
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
        </transition>
    </div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue';
import { POSITION } from '@/scenes/person';
import { createBackgroundUrl } from '@/util';

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
    mounted() {
        console.log('SceneBasic mounted')
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
            return this.backgroundImage;
        },
    },
    methods: {
        createBackgroundUrl,
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

/* prefix with transition name */
.slide-fade-enter-active {
  opacity: 1;
  z-index: 10;
}

.slide-fade-leave-active {
  opacity: 1;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
