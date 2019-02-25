<template>
    <div class="page_list">
        <Header></Header>
        <bar-select></bar-select>
        <tab-cat-m></tab-cat-m>
        <list 
            :items="items" 
            name="detail" 
            :opts="type+'|'+attr+'|'+frame+'|'+style+'|'+script"
        ></list>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'
import List from './components/list'
import barSelect from './components/bar-select'
import tabCatM from './components/tab-cat-m'
import { mapState } from 'vuex'
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
            level: 'cats2',
            items: []
        }
    },
    computed: mapState({
        type: state => state.type,
        attr: state => state.attr,
        frame: state => state.frame,
        style: state => state.style,
        script: state => state.script
    }),
    mounted () {
        if (!this.$store.state.type) {
            this.$store.commit('type', 'm')
        }
        this.getList()
    },
    methods: {
        // 获取二级分类
        getList () {
            let self = this
            this.axios({
                url: self.Host + '/list?db=cats2&cat1=' + self.$route.query.cat,
                method: 'GET'
            }).then((res) => {
                console.log('二级分类')
                console.log(res)
                self.items = res.data
                for (let i = 0, len = self.items.length; i < len; i ++) {
                    self.items[i].path = self.$store.state.type + '/' + self.$store.state.attr + '/' + self.level + '/' + self.items[i].ttl;
                }
            })
        }
    }
}
</script>

<style lang = 'scss'>

</style>
