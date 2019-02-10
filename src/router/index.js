import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
// import catSinglePc from '@/page/cat_single_m'
import catSingleM from '@/page/cat_single_m'
// import catSingleResponse from '@/page/cat_single_m'
import catUnitM from '@/page/cat_unit_m'
// import catWidgetM from '@/page/cat_single_m'
// import catFormM from '@/page/cat_single_m'
import list from '@/page/list'
import detail from '@/page/detail'
import edit from '@/page/edit'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        // {
        //     path: '/catSinglePc',
        //     name: 'catSinglePc',
        //     component: catSinglePc
        // },
        {
            path: '/catSingleM',
            name: 'cat1m',
            component: catSingleM
        },
        // {
        //     path: '/catSingleResponse',
        //     name: 'catSingleResponse',
        //     component: catSingleResponse
        // },
        {
            path: '/catUnitM',
            name: 'cat2m',
            component: catUnitM
        },
        // {
        //     path: '/catWidgetM',
        //     name: 'cat3m',
        //     component: catWidgetM
        // },
        // {
        //     path: '/catFormM',
        //     name: 'cat4m',
        //     component: catFormM
        // },
        {
            path: '/list',
            name: 'list',
            component: list
        },
        {
            path: '/detail',
            name: 'detail',
            component: detail
        },
        {
            path: '/edit',
            name: 'edit',
            component: edit
        }
    ]
})
