<template>
    <div class="page_home">
        <Header></Header>
        <div class="container_home">
            首页详情
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './layout/header'
import Footer from './layout/footer'
export default {
    name: 'home',
    components: {
        Header,
        Footer
    },
    data () {
        return {}
    }
}
</script>
