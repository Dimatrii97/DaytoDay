<template>
    <div class="scene scene-video">
        <video
            width="100%"
            height="calc(100% - 1px)"
            autoplay
            @ended="onEnded"
        >
            <source
                autoplay
                size="1080"
                :src="video"
                type="video/mp4"
            />
            <p>
                Sorry, Your Browser Doesn't Support Embedded Videos. Here's the
                <a href="https://www.youtube.com/watch?v=yDzQDeaW6O8">Link to the video</a>
            </p>
        </video>

        <ControlPanel
            v-if="showControls"
            :text="scene.text"
            :actions="scene.actions"
            :delay="scene.textDelay"
            @changeScene="$emit('changeScene', $event)"
        />
    </div>
</template>

<script>
import ControlPanel from '@/components/ControlPanel.vue';

export default {
    name: 'SceneVideo',
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
    data() {
        return {
            showControls: false,
        }
    },
    mounted() {
        document.addEventListener('keyup', this.showControlsOnSpace);
        this.showControls = this.scene.showControlsImmediately ?? false;
    },
    beforeUnmount() {
        document.removeEventListener('keyup', this.showControlsOnSpace);
    },
    computed: {
        video() {
            return this.scene.scene;
        },
        showControlPanelAfterEnding() {
            return this.scene.controlAfterVideoEnds;
        },
    },
    methods: {
        createBackgroundUrl(url) {
            return `url(${url})`;
        },
        showControlsOnSpace(event) {
            if (event.code === 'Space') {
                this.showControls = true;
            }
        },
        onEnded() {
            this.showControls = true;
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
    display: flex;

    .background {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
    }
}

video {
}
</style>
