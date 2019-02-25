<template>
    <div class="container_list">
        <ol>
            <dl class="list_item" v-for="item in items" v-bind:key="item._id">
                <dt>
                    <router-link :to="{
                        name: name,
                        query: {
                            cat: item._id,
                            opts: opts // type | attr | frame | style | script
                        }}">
                        <img :src="'http://localhost:8000/images/' + item.path + '.png'" />
                    </router-link>
                </dt>
                <dd>{{item.ttl}}</dd>
            </dl>
        </ol>
    </div>
</template>

<script>

export default {
    data () {
        return {}
    },
    props: ['items', 'name', 'opts'],
    methods: {},
    filters: {
        urlComplement (val) {
            var _ = this.$router
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
        height: 100px;
        padding: 10px;
        overflow: hidden;
        background: #eee;
        a {
            display: table-cell;
            width: 100%;
            height: 100px;
            vertical-align: middle;
            text-align: center;
        }
        img {
            max-width: 180px;
            width: auto;
            max-height: 100px;
        }
    }
    dd {
        text-align: center;
    }
}
</style>
