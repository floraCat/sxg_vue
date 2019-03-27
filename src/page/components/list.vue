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
                <dd>{{item.ttl}}<span v-if="item.summary"> (+{{item.summary}}...)</span></dd>
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
    methods: {}
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
        height: 150px;
        padding: 10px;
        overflow: hidden;
        background: #eee;
        a {
            display: table-cell;
            width: 100%;
            height: 150px;
            vertical-align: middle;
            text-align: center;
        }
        img {
            max-width: 180px;
            width: auto;
            max-height: 150px;
        }
    }
    dd {
        height: 24px;
        line-height: 24px;
        text-align: center;
        span {
            color: #ccc;
        }
    }
}
</style>
