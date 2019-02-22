<template>
    <div class="page_list">
        <Header></Header>
        <bar-select></bar-select>
        <tab-cat-m></tab-cat-m>
        <div class="container_list">
            <ol>
                <dl class="list_item" v-for="item in items" v-bind:key="item._id">
                    <dt>
                        <router-link :to="{
                            name: 'list',
                            query: {
                                cat1: item._id
                            }}">
                            <img :src="'http://localhost:8000/images/m/1/cats1/' + item.ttl + '.png'" />
                        </router-link>
                    </dt>
                    <dd>{{item.ttl}}</dd>
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
        return {
            items: []
        }
    },
    mounted () {
        this.$store.commit('type', 'm') // 设置全局type
        this.$store.commit('attr', 1) // 设置全局attr
        this.getList()
    },
    methods: {
        // 获取一级分类
        getList () {
            let self = this
            this.axios({
                url: self.Host + '/list?db=cats1',
                method: 'GET'
            }).then((res) => {
                console.log('一级分类')
                self.items = res.data
            })
        }
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
    margin: 0 20px 20px 0;
    dt {
        display: table-cell;
        width: 100%;
        height: 200px;
        padding: 10px;
        background: #eee;
        overflow: hidden;
        vertical-align: middle;
        text-align: center;
    }
    dd {
        text-align: center;
    }
}
</style>
