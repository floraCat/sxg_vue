<template>
    <div class="tab_cat">
        <div class="line"></div>
        <ul>
            <li :class="{on: attr === 1 }">
                <router-link :to="{ name: 'cat1m'}" @click.native="switchAttr(1)" replace>单一组件</router-link>
            </li>
            <li :class="{on: attr === 2 }">
                <router-link :to="{ name: 'cat2m'}" @click.native="switchAttr(2)" replace>组合组件</router-link>
            </li>
            <li :class="{on: attr === 3 }">
                <router-link :to="{ name: 'cat3m'}" @click.native="switchAttr(3)" replace>小部件</router-link>
            </li>
            <li :class="{on: attr === 4 }">
                <router-link :to="{ name: 'cat4m'}" @click.native="switchAttr(4)" replace>自定义表单</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {}
    },
    computed: mapState({
        attr: state => state.attr
    }),
    methods: {
        switchAttr (_attr) {
            this.$store.commit('attr', _attr)
        }
    }
}
</script>

<style lang = 'scss'>
.tab_cat {
    position: relative;
    margin: 15px auto 0;
    width: 900px;
    .line {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background: #333;
    }
    ul {
        position: relative;
        z-index: 2;
        width: 420px;
        display: flex;
        margin: 0 auto;
        li {
            flex: 1;
            text-align: center;
            a {
                display: block;
                width: 85px;
                margin: 0 auto;
                color: #333;
                background: #eee;
                border-radius: 12px;
            }
            &.on {
                a {
                    background: red;
                    color: #fff;
                }
            }
        }
    }
}
</style>
