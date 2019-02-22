<template>
    <div class="page_detail">
        <Header></Header>
        <bar-select></bar-select>
        <tab-cat-m></tab-cat-m>
        <div class="container_detail">
            <div class="detail_info">
                <label>名称：</label>
                <p class="ttl">{{cat2.ttl}}</p>
            </div>
            <div class="detail_info">
                <label>简介：</label>
                <p class="ttl">BBB</p>
            </div>
            <div class="detail_tpls">
                <div class="tab_switch">
                    <a :class="{on: tabOn.ttl === tpl.ttl}"
                        v-for="tpl in tpls"
                        v-bind:key="tpl._id"
                        @click="tabChange(tpl)"
                    >{{tpl.ttl}}</a>
                </div>
                <div class="detail_win">
                    <img v-if="tabOn.ttl" :src="'http://localhost:8000/images/m/1/templates/' + tabOn.ttl + '.png'" />
                </div>
            </div>
            <ul class="btn_group">
                <a v-if="copyObj.angular" class="copy-angular" @click="copyCode('copy-angular')" :data-clipboard-text="copyObj.angular">angular复制</a>
                <a v-if="copyObj.react" class="copy-react" @click="copyCode('copy-react')" :data-clipboard-text="copyObj.react">react复制</a>
                <a v-if="copyObj.html" class="copy-html" @click="copyCode('copy-html')" :data-clipboard-text="copyObj.html">html复制</a>
                <a v-if="copyObj.vue" class="copy-vue" @click="copyCode('copy-vue')" :data-clipboard-text="copyObj.vue">vue复制</a>
                <a v-if="copyObj.css" class="copy-css" @click="copyCode('copy-css')" :data-clipboard-text="copyObj.css">css复制</a>
                <a v-if="copyObj.less" class="copy-less" @click="copyCode('copy-less')" :data-clipboard-text="copyObj.less">less复制</a>
                <a v-if="copyObj.scss" class="copy-scss" @click="copyCode('copy-scss')" :data-clipboard-text="copyObj.scss">scss复制</a>
                <a v-if="copyObj.js" class="copy-js" @click="copyCode('copy-js')" :data-clipboard-text="copyObj.js">js复制</a>
                <a v-if="copyObj.angularJs" class="copy-angularJs" @click="copyCode('copy-angularJs')" :data-clipboard-text="copyObj.angularJs">angularJs复制</a>
                <a v-if="copyObj.jsData" class="copy-jsData" @click="copyCode('copy-jsData')" :data-clipboard-text="copyObj.jsData">jsData复制</a>
                <a v-if="copyObj.jsMethods" class="copy-jsMethods" @click="copyCode('copy-jsMethods')" :data-clipboard-text="copyObj.jsMethods">jsMethods复制</a>
                <a v-if="copyObj.ES6Data" class="copy-ES6Data" @click="copyCode('copy-ES6Data')" :data-clipboard-text="copyObj.ES6Data">ES6Data复制</a>
                <a v-if="copyObj.ES6Methods" class="copy-ES6Methods" @click="copyCode('copy-ES6Methods')" :data-clipboard-text="copyObj.ES6Methods">ES6Methods复制</a>
                <a v-if="copyObj.mounted" class="copy-mounted" @click="copyCode('copy-mounted')" :data-clipboard-text="copyObj.mounted">mounted复制</a>
                <a v-if="copyObj.jsImport" class="copy-jsImport" @click="copyCode('copy-jsImport')" :data-clipboard-text="copyObj.jsImport">jsImport复制</a>
                <a v-if="copyObj.vueImport" class="copy-vueImport" @click="copyCode('copy-vueImport')" :data-clipboard-text="copyObj.vueImport">vueImport复制</a>
                <a v-if="copyObj.angularImport" class="copy-angularImport" @click="copyCode('copy-angularImport')" :data-clipboard-text="copyObj.angularImport">angularImport复制</a>
                <a v-if="copyObj.reactImport" class="copy-reactImport" @click="copyCode('copy-reactImport')" :data-clipboard-text="copyObj.reactImport">reactImport复制</a>
            </ul>
            <div class="detail_btns">
                <router-link target="_blank" :to="{name: 'edit',query: {tpl: type+'|'+attr+'|'+tabOn.ttl}}" class="btn_mid">展示 + 编辑</router-link>
                <a class="btn_mid2 copy-all" @click="copyCode('copy-all')" :data-clipboard-text="copyAll">全套主体源码复制</a>
            </div>
            <div class="detail_content">
                <ol class="detail_section">
                    <label>依赖：</label>
                    <ul>
                        <p>（所依赖文件）</p>
                        <dl>
                            <dt>reset.css：</dt>
                            <dd>
                                <p>浏览器重置样式</p>
                                <div class="link">
                                    <a class="btn_small" href="#">查看源码</a>
                                    <a class="btn_small" href="#">点击下载</a>
                                </div>
                            </dd>
                        </dl>
                    </ul>
                </ol>
            </div>
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
import Clipboard from 'clipboard'
import { installAllCode, copyCode } from '@/assets/js/codeHandle'
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
            cat2: {},
            tpls: [],
            tabOn: {},
            copyObj: {
                angular: '',
                react: '',
                html: '',
                vue: '',
                css: '',
                less: '',
                scss: '',
                js: '',
                angularJs: '',
                jsData: '',
                ES6Data: '',
                jsMethods: '',
                ES6Methods: '',
                mounted: '',
                jsImport: '',
                vueImport: '',
                angularImport: '',
                reactImport: ''
            },
            copyAll: ''
        }
    },
    computed: {
        ...mapState({
            type: state => state.type,
            attr: state => state.attr,
            frame: state => state.frame,
            style: state => state.style,
            script: state => state.script
        }),
        // 框架|样式|脚本
        mode () {
            let _frame = this.$store.state.frame
            let _style = this.$store.state.style
            let _script = this.$store.state.script
            if (_frame) {
                _script = 'jsData|jsMethods'
            }
            return _frame + '|' + _style + '|' + _script
        }
    },
    watch: {
        frame () {
            this.copyData()
        },
        style () {
            this.copyData()
        },
        script () {
            this.copyData()
        }
    },
    mounted () {
        // 保存状态
        this.$store.commit('type', this.$route.query.type)
        this.$store.commit('attr', parseInt(this.$route.query.attr))
        this.$store.commit('frame', this.$route.query.frame)
        this.$store.commit('style', this.$route.query.style)
        this.$store.commit('script', this.$route.query.script)
        this.getList()
    },
    methods: {
        // 获取模板
        getList () {
            let self = this
            this.axios({
                url: self.Host + '/list?db=templates&cat2=' + self.$route.query.cat2,
                method: 'GET'
            }).then((res) => {
                console.log('模板')
                console.log(res)
                self.tpls = res.data.templates
                self.cat2 = res.data.cat2
                self.tabOn = self.tpls[0]
                self.copyData()
            })
        },
        // tab切换
        tabChange (_val) {
            this.tabOn = _val
            this.copyData()
        },
        // 获取复制代码
        copyData () {
            let self = this
            self.axios({
                url: self.Host + '/copy',
                method: 'GET',
                params: {
                    mode: self.mode,
                    tpl: self.type + '|' + self.attr + '|' + self.tabOn.ttl
                }
            }).then((res) => {
                console.log('复制代码')
                console.log(res)
                self.copyObj = res.data
                self.copyAll = installAllCode(self.copyObj, self.frame, self.style, self.script)
            })
        },
        // 复制操作
        copyCode (_cls) {
            copyCode(Clipboard, _cls)
        }
    }
}
</script>

<style lang = 'scss'>
.container_detail {
    width:900px;
    margin: 20px auto;
}
.detail_info {
    overflow: hidden;
    label {
        float: left;
        width: 120px;
        text-align: right;
    }
    p {
        float: left;
    }
}
.tab_switch{ overflow: hidden; padding: 10px 20px 5px; background-color: #f7faf4; }
.tab_switch a{ float: left; margin: 0 15px 10px 0; padding: 0 15px; height: 30px; line-height: 30px; color:#cf5d4e;  border:#e19c92 1px solid; background: #f2e6e6; cursor: pointer; border-radius: 5px;}
.tab_switch a.on{ position: relative; color: #fff; border:#cf5d4e 1px solid; background-color: #cf5d4e; font-weight: bold;}
.tab_switch a.on:after{ content: ""; position: absolute; bottom: -15px; left: 50%; margin-left: -8px; width:0; height:0; border:transparent dashed; border-top:#cf5d4e solid; border-width:8px; border-top-width:6px;}
.detail_win {
    width: 880px;
    height: 200px;
    margin: 0 auto;
    padding: 12px 0;
    background: #eee;
    img {
        width: 200px;
        margin: 0 auto;
    }
}
.detail_section {
    background: #eee;
    overflow: hidden;
    label {
        float: left;
        width: 120px;
        text-align: right;
    }
    ul {
        margin-left: 130px;
        p {
            color: #aaa;
        }
        dl {
            overflow: hidden;
            dt {
                float: left;
                color: green;
            }
            dd {
                float: left;
                p {
                    float: left;
                    margin-right: 5px;
                }
                .link {
                    float: left;
                    .btn_small {
                        float: left;
                        margin-right: 5px;
                    }
                }
            }
        }
    }

}
.btn_group {
    overflow: hidden;
    a {
        float: left;
        margin: 5px 5px 0 0;
        height: 26px;
        line-height: 24px;
        padding: 0 10px;
        border: #ccc 1px solid;
        color: #666;
        background: #eee;
    }
}
.detail_btns {
    width: 700px;
    margin: 20px auto;
    overflow: hidden;
}
.detail_btns .btn_mid {
    float: left;
}
.detail_btns .btn_mid2 {
    float: right;
}
.btn_small {
    display: block;
    width: 58px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    background: #d9534f;
    color: #fff;
    border-radius: 4px;
}
.btn_mid {
    width: 130px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: red;
    color: #fff;
    border-radius: 4px;
}
.btn_mid2 {
    width: 130px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: #fff;
    color: red;
    border: red 1px solid;
    border-radius: 4px;
}
</style>
