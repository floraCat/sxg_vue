<template>
    <div class="page_list">
        <Header></Header>
        <bar-select></bar-select>
        <tab-cat-m></tab-cat-m>
        <list :items="items" name="list"></list>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'
import List from './components/list'
import barSelect from './components/bar-select'
import tabCatM from './components/tab-cat-m'
export default {
    name: 'home',
    components: {
        Header,
        Footer,
        List,
        barSelect,
        tabCatM
    },
    data () {
        return {
            level: 'cats1',
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
                for (let i = 0, len = self.items.length; i < len; i ++) {
                    self.items[i].path = self.$store.state.type + '/' + self.$store.state.attr + '/' + self.level + '/' + self.items[i].en;
                }
            })
        }
    }
}
</script>

<style lang = 'scss'>

</style>
