<template>
    <div class="myTool">
        <div id="imgDef">
            <img src="static/imgs/p-search-010.png" />
        </div>
        <ol id="toolOl">
            <dl class="toolTop" id="mod01">
                <dt>
                    <label>左边宽：</label>
                    <div class="ctrl">
                        <input type="text" v-model="mod[0].val" @blur="modHandle(0)" />
                    </div>
                </dt>
                <dd class="line"></dd>
            </dl>
            <dl class="toolBtm" id="mod02">
                <dt>
                    <label>右边宽：</label>
                    <div class="ctrl">
                        <input type="text" v-model="mod[1].val" @blur="modHandle(1)" />
                    </div>
                </dt>
                <dd class="line"></dd>
            </dl>
            <dl class="toolRt" id="mod03">
                <dt>
                    <label>整体高：</label>
                    <div class="ctrl">
                        <input type="text" v-model="mod[2].val" @blur="modHandle(2)" />
                    </div>
                </dt>
                <dd class="line"></dd>
            </dl>
        </ol>
    </div>
</template>

<script>

export default {
    data () {
        return {}
    },
    props: ['tpl', 'mod', 'mode', 'modCur'],
    methods: {
        modHandle (index) {
            let self = this
            if (this.mod[index].val !== this.modCur[index].val) {
                this.axios({
                    url: self.Host + '/tpl',
                    method: 'GET',
                    params: {
                        act: 'mod',
                        mode: self.mode,
                        tpl: self.tpl,
                        file: sessionStorage.getItem('frameSrc'),
                        data: JSON.stringify(self.mod)
                    }
                }).then((res) => {
                    console.log('修改')
                    self.$emit('reprint', res.data.tpl.view)
                })
            }
        }
    }
}
</script>

<style>
#mod01 { top: 50px; left: 120px;} #mod01 dd { height: 10px;} #mod02 { bottom: 50px; left: 210px;} #mod02 dd { height: 10px;} #mod03 { left: 310px;} #mod03 dd { width: 10px;}
</style>
