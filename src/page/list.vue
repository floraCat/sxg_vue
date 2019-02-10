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
                            name: 'detail',
                            query: {
                                cat2: item._id,
                                type: type,
                                attr: attr,
                                frame: frame,
                                style: style,
                                script: script
                            }}">
                            <img :src="'http://localhost:8000/images/m/1/templates/' + item.ttl + '.png'" />
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
import { mapState } from 'vuex'
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
                url: self.Host + '/list?db=cats2&cat1=' + self.$route.query.cat1,
                method: 'GET'
            }).then((res) => {
                console.log('二级分类')
                console.log(res)
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
    background: #eee;
    margin: 0 20px 20px 0;
}
</style>
