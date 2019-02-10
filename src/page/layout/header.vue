<template>
    <div class="site_header">
        <div class="site_logo">
            <router-link :to="{name:'home'}"><img src="@/assets/logo.png" /></router-link>
        </div>
        <ul class="site_col_lt">
            <li :class="{on: type === 'pc'}">
                <router-link :to="{name:'catSinglePc'}">PC组件</router-link>
            </li>
            <li :class="{on: type === 'm'}">
                <router-link :to="{name:'cat1m'}">移动端组件</router-link>
            </li>
            <li :class="{on: type === 'pc'}">
                <router-link :to="{name:'catSingleResponse'}">响应式组件</router-link>
            </li>
        </ul>
        <ul class="site_col_rt">
            <li :class="{on: type === 'pc'}">
                <router-link :to="{name:'cat1m'}">关于我们</router-link>
            </li>
            <li :class="{on: type === 'pc'}">
                <router-link :to="{name:'cat1m'}">使用说明</router-link>
            </li>
            <li :class="{on: type === 'pc'}">
                <router-link :to="{name:'cat1m'}">代码规范</router-link>
            </li>
            <li :class="{on: type === 'pc'}">
                <router-link :to="{name:'cat1m'}">框架搭建</router-link>
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
        type: state => state.type
    })
}
</script>

<style lang = 'scss'>
.site_header {
    overflow: hidden;
    background: #eee;
    padding: 10px;
}
.site_logo {
    width: 30px;
    height: 30px;
    float: left;
}
.site_col_lt {
    overflow: hidden;
    float: left;
    li {
        float: left;
        margin-right: 10px;
        &.on a {
            color: red;
        }
    }
}
.site_col_rt {
    overflow: hidden;
    float: right;
    li {
        float: left;
        margin-right: 10px;
    }
}
</style>
