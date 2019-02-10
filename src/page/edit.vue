<template>
    <div class="page_edit">
        <iframe id="iframe"></iframe>
        <div id="toolWrap">
            <div id="drag"></div>
            <tool
                :tpl="$route.query.tpl"
                :mod="mod"
                :mode="mode"
                :modCur="modCur"
                @reprint="reprint"
            ></tool>
            <div class="copyWrap">
                <ul class="btn_group">
                    <a v-if="copyObj.html" class="copy-html" @click="copyCode('copy-html')" :data-clipboard-text="copyObj.html">html复制</a>
                    <a v-if="copyObj.vue" class="copy-vue" @click="copyCode('copy-vue')" :data-clipboard-text="copyObj.vue">vue复制</a>
                    <a v-if="copyObj.css" class="copy-css" @click="copyCode('copy-css')" :data-clipboard-text="copyObj.css">css复制</a>
                    <a v-if="copyObj.less" class="copy-less" @click="copyCode('copy-less')" :data-clipboard-text="copyObj.less">less复制</a>
                    <a v-if="copyObj.scss" class="copy-scss" @click="copyCode('copy-scss')" :data-clipboard-text="copyObj.scss">scss复制</a>
                    <a v-if="copyObj.js" class="copy-js" @click="copyCode('copy-js')" :data-clipboard-text="copyObj.js">js复制</a>
                    <a v-if="copyObj.jsData" class="copy-jsData" @click="copyCode('copy-jsData')" :data-clipboard-text="copyObj.jsData">jsData复制</a>
                    <a v-if="copyObj.jsMethods" class="copy-jsMethods" @click="copyCode('copy-jsMethods')" :data-clipboard-text="copyObj.jsMethods">jsMethods复制</a>
                    <a v-if="copyObj.ES6Methods" class="copy-ES6Methods" @click="copyCode('copy-ES6Methods')" :data-clipboard-text="copyObj.ES6Methods">ES6Methods复制</a>
                </ul>
                <a class="btn_mid2 copy-all" @click="copyCode('copy-all')" :data-clipboard-text="copyAll">全套主体源码复制</a>
            </div>
        </div>
    </div>
</template>

<script>
import tool from './components/tool'
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import { installAllCode, copyCode } from '@/assets/js/codeHandle'

export default {
    name: 'HelloWorld',
    components: {
        tool
    },
    data () {
        return {
            // 标记修改的数据
            mod: [{val: ''}, {val: ''}, {val: ''}],
            modDef: [],
            modCur: [],
            toolHTML: '',
            copyObj: {
                html: '',
                vue: '',
                css: '',
                less: '',
                scss: '',
                js: '',
                jsData: '',
                jsMethods: '',
                ES6Methods: ''
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
        // iframe链接
        frameSrc () {
            return sessionStorage.getItem('frameSrc')
        },
        // 框架|样式|脚本
        mode () {
            let _frame = this.$store.state.frame
            let _script = this.$store.state.script
            if (_frame) {
                _script = 'jsData|jsMethods'
            }
            return _frame + '|css|' + _script
        }
    },
    mounted () {
        if (this.frameSrc) {
            // 删除上一次生成的文件
            this.delFile(this.frameSrc)
        }
        this.getTemp()
    },
    methods: {

        // 获取模板代码
        getTemp () {
            let self = this
            this.axios({
                url: self.Host + '/tpl',
                params: {
                    act: 'init',
                    mode: self.mode,
                    tpl: self.$route.query.tpl,
                    file: self.frameSrc
                },
                method: 'GET'
            }).then((res) => {
                console.log('模板代码')
                console.log(res)
                self.reprint(res.data.tpl.view)
                self.toolHTML = res.data.tool
                self.modDef = JSON.parse(res.data.tpl.mod)
                self.modCur = JSON.parse(res.data.tpl.mod)
                self.mod = JSON.parse(res.data.tpl.mod)
                self.copyObj = res.data.tpl.code
                self.copyAll = installAllCode(self.copyObj, self.frame, self.style, self.script)
                setTimeout(function () {
                    self.onDrag()
                }, 0)
            })
        },

        // 模板重绘
        reprint (_src) {
            sessionStorage.setItem('frameSrc', _src)
            document.getElementById('iframe').src = this.Host + '/html/' + _src + '.html'
            this.modCur = JSON.parse(JSON.stringify(this.mod))
        },

        // 删除生成的文件
        delFile () {
            let self = this
            this.axios({
                url: self.Host + '/delFile',
                params: {
                    file: self.frameSrc
                },
                method: 'POST'
            }).then((res) => {
                console.log('删除文件')
                console.log(res)
            })
        },

        // tool可拖动
        onDrag () {
            var toolMain = document.getElementById('toolWrap')
            var toolDrag = document.getElementById('drag')
            toolDrag.onmousedown = function (event) {
                fndown(event, toolMain)
            }
            function fndown (event, main) {
                event = event || window.event
                var disX = event.clientX - main.offsetLeft
                var disY = event.clientY - main.offsetTop
                document.onmousemove = function (event) {
                    event = event || window.event
                    fnMove(event, disX, disY, main)
                }
                toolDrag.onmouseup = function () {
                    document.onmousemove = null
                    toolDrag.onmouseup = null
                }
            }
            function fnMove (event, disX, disY, main) {
                var l = event.clientX - disX
                var t = event.clientY - disY
                main.style.left = l + 'px'
                main.style.top = t + 'px'
            }
        },

        // 复制操作
        copyCode (_cls) {
            copyCode(Clipboard, _cls)
        }

    }
}
</script>

<style>
.page_edit {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #eee;
}
#iframe {
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 375px;
    height:667px;
    background: #fff;
    border: #bbb 1px solid;
}
#toolWrap {
    position: fixed;
    z-index: 99;
    top: 50px;
    left: 50px;
    width: 500px;
    height: 200px;
    font-size: 12px;
    background: #fff;
    border: #ddd 1px solid;
}
.myTool {
    height: 200px;
}
#drag {
    z-index: 99;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 40px;
    background: red;
    cursor: move;
}
#imgDef {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -22px;
    margin-left: - 107px;
}
#imgDef img {
    width: auto;
}
#toolOl {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.myTool dl {
    position: absolute;
    min-width: 150px;
}
.myTool dt {
    float: left;
    height: 20px;
    line-height: 20px;
    padding: 3px 5px;
    overflow: hidden;
    background: yellow;
}
.myTool dt label {
    float: left;
}
.myTool dt .ctrl {
    float: left;
}
.myTool dt input {
    width: 60px;
    text-indent: 5px;
    height: 18px;
    line-height: 18px;
    background: #fff;
    border: #ddd 1px solid;
}
.myTool dd {
    position: absolute;
    background: #ccc;
}
.toolTop {
    top: 0;
    left: 0;
}
.toolTop dd {
    width: 1px;
    height: 100px;
    top: 26px;
    left: 50%;
}
.toolBtm {
    bottom: 0;
    left: 0;
}
.toolBtm dd {
    width: 1px;
    height: 100px;
    bottom: 26px;
    left: 50%;
}
.toolRt {
    top: 50%;
    left: 0;
    margin-top: -13px;
}
.toolRt dd {
    width: 20px;
    height: 1px;
    top: 50%;
    right: 100%;
}
/*.myTool { width: 380px;}
#imgDef img { margin-left: -70px;}
#toolOl { margin-left: -80px;}
#mod01 { top: 50px; left: 120px; }
#mod01 dd { height: 10px;}
#mod02 { bottom: 50px; left: 210px; }
#mod02 dd { height: 10px;}
#mod03 { left: 310px; }
#mod03 dd { width: 10px;}*/
</style>
