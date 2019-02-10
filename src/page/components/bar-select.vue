<template>
    <div class="bar_select">
        <div class="wrap">
            <ol class="group_select">
                <label>框架：</label>
                <ul>
                    <li :class="{on:frame === 'vue'}" @click="selectFrame('vue')" data-val="vue">vue</li>
                    <li :class="{on:frame === 'angular'}" @click="selectFrame('angular')" data-val="angular">angular</li>
                    <li :class="{on:frame === 'react'}" @click="selectFrame('react')" data-val="react">react</li>
                    <li :class="{on:frame === 'html'}" @click="selectFrame('html')" data-val="html">不使用框架</li>
                </ul>
            </ol>
            <ol class="group_select">
                <label>样式：</label>
                <ul>
                    <li :class="{on:style === 'css'}" @click="selectStyle('css')" data-val="css">css</li>
                    <li :class="{on:style === 'less'}" @click="selectStyle('less')" data-val="less">less</li>
                    <li :class="{on:style === 'scss'}" @click="selectStyle('scss')" data-val="scss">scss</li>
                </ul>
            </ol>
            <ol class="group_select">
                <label>脚本：</label>
                <ul>
                    <li :class="{on:script === 'javascript'}" @click="selectScript('javascript')" data-val="javascript">javascript</li>
                    <li :class="{on:script === 'ES6'}" @click="selectScript('ES6')" data-val="ES6">ES6</li>
                </ul>
            </ol>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {}
    },
    computed: mapState({
        frame: state => state.frame,
        style: state => state.style,
        script: state => state.script
    }),
    methods: {
        selectFrame (_val) {
            this.$store.commit('frame', _val)
        },
        selectStyle (_val) {
            this.$store.commit('style', _val)
        },
        selectScript (_val) {
            this.$store.commit('script', _val)
        }
    }
}
</script>

<style lang = 'scss'>
.bar_select {
    background: #ddd;
    height: 40px;
    line-height: 40px;
    .wrap {
        width: 900px;
        overflow: hidden;
        margin: 0 auto;
    }
}
.group_select {
    float: left;
    padding: 0 10px;
    overflow: hidden;
    label {
        float: left;
    }
    ul {
        float: left;
        overflow: hidden;
        li {
            float: left;
            margin: 8px 2px 0;
            padding: 0 8px;
            height: 24px;
            line-height: 22px;
            border: #fff 1px solid;
            cursor: pointer;
            &.on {
                background: red;
                color: #fff;
            }
        }
    }
}
</style>
