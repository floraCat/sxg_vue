<template>
    <div class="page_list">
        <Header></Header>
        <bar-select></bar-select>
        <tab-cat-m></tab-cat-m>
        <div class="container_list">
            <ol>
                <dl class="list_item">
                    <dt>
                        <router-link :to="{name:'detail'}">
                            <img src="@/assets/logo.png" />
                        </router-link>
                    </dt>
                    <dd>ttl</dd>
                </dl>
                <dl class="list_item">
                    <dt>
                        <router-link :to="{name:'detail'}">
                            <img src="@/assets/logo.png" />
                        </router-link>
                    </dt>
                    <dd>ttl</dd>
                </dl>
            </ol>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'
import barSelect from './components/bar-select'
import tabCatM from './components/tab-cat-m'
export default {
    name: 'home',
    components: {
        Header,
        Footer,
        barSelect,
        tabCatM
    },
    data () {
        return {}
    }
}
</script>

<style lang = 'scss'>
.container_list {
    width:900px;
    margin: 20px auto;
    ol {
        width: 950px;
        overflow: hidden;
    }
}
.list_item {
    float: left;
    width: 200px;
    background: #eee;
    margin: 0 20px 20px 0;
}
</style>
