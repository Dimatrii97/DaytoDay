<template>
<div class="control-panel">
    <span class="autor">

    </span>
    <div class="panel">
        <vue-typewriter-effect :strings="'Lorem ipsum dolor sit amet, consect....'" :delay="65"  cursor="" :loop="false" />
        <div class="actions">
            <div class="center">

            </div>
            <div class="left">

            </div>
        </div>
    </div>
</div>
</template>

<script>


export default {
    name: 'ControlPanel',
    methods: {
        write() {

        }
    },
    mounted() {
        this.write();
    }
};
</script>

<style lang="scss" scoped>
.control-panel {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 90vw;
    height: 10vw;
    color: white;
    font-size: 20px;
}

.panel {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0, 0.5);
    padding: 30px 50px;
}

.actions {
    background-color: #000000;
}


</style>