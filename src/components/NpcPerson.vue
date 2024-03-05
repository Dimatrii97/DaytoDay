<template>
    <div :class="className" id="person">
    </div>
</template>

<script>
/*
* obejct
* url:
* position: {
* top
* bottom
* left
* right
* }
* className: []
* size:{
* w:
* h:
* }
*
*
* */

export default {
    name: 'NpcPerson',
    props:{
        position: Object,
        className: [Array, String],
        size: Object,
        img: String
    },
    methods: {
        setPosition(value) {
            if (!value) {
                return;
            }


        },
        setSize(value) {

        },
        setImg(value) {

        }
    },
    watch: {
        position: {
            handler(value) {
                this.setPosition(value);
            },
            deep: true
        },
        className: {
            handler(value) {
                this.setPosition(value);
            },
            deep: true
        },
        size: {
            handler(value) {
                this.setPosition(value);
            },
            deep: true
        },
        img: {
            handler(value) {
                this.setPosition(value);
            },
            deep: true
        }
    }

};
</script>

<style lang="scss" scoped>
.person {
    width: 35vw;
    height: 70vh;
    background-image: url("../../assets/img/person/sticker.webp");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
    left: 50%;
    border: 1px solid red;
}

</style>