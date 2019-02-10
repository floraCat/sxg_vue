function installAllCode (_code, _frame, _style, _script) {
    var $html = _code[_frame]
    var $style = _code[_style]
    var $script = _code[_script]
    var $jsLink = ''
    if (_frame === 'vue') {
        $jsLink = '<script src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.min.js"></script>'
        $script =
`new Vue({
    el: '.search',
    data: function () {
        return {
            ${_code.jsData}
        }
    },
    methods: {
        ${_code.ES6Methods ? _code.jsMethods : _code.jsMethods}
    }
}`
    }
    var allCode =
`<html lang="zh-cn">
<head>
<meta charset="utf-8">
<title>效果展示</title>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<link rel="stylesheet" href="http://localhost:8000/style/reset.css" />
${$jsLink}
<style>
${$style}
</style>
</head>

<body>
${$html}
</body>

<script>
${$script}
</script>

</html>`
    return allCode
}

// 复制操作
function copyCode (_Clipboard, _cls) {
    var clipboard = new _Clipboard('.' + _cls + '')
    clipboard.on('success', e => {
        console.log('复制成功')
        clipboard.destroy() // 释放内存
    })
    clipboard.on('error', e => {
        console.log('该浏览器不支持自动复制') // 不支持复制
        clipboard.destroy() // 释放内存
    })
}

module.exports = {
    installAllCode: installAllCode,
    copyCode: copyCode
}
