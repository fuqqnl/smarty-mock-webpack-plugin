/**
 * @file 处理开发环境中smarty数据在react/vue/san等框架中的展现
 * @author fuqqnl
 * @description 在php + 单页应用实现中，会有通过smarty接收同步返回数据的情况，如果本地没有搭建smarty的运行环境，
 * 调试起来会比较麻烦。所以通过此插件来处理比较常用的smarty变量.
 * 
 */

const baseRegExp = /({%|{)\$((\w+)([.]\w+)*)(}|%})/gi; // {%$data%}
const jsonEncodeRegExp = /({%|{)json_encode\(\$((\w+)([.]\w+)*)\)(%}|})/gi;  // {%json_encode($data)%}
const assignRegExp = /({%|{)assign\s+var="(\w+)"\s+value=\"\$((\w+)([.]\w+)*)\"\s*(}|%})/gi; // {%assign var="a" value="$data"%}

function replaceHtmlString($data, keys) {
    let resData = $data;
    for(const key of keys) {
        if (!resData) {
            return '';
        }
        else if (typeof resData === 'number' || typeof resData === 'string') {
            return resData;
        }
        resData = resData[key];
    }
    return resData;
}

function SmartyResolve (options) {
    this.$data = options || {};
}

 SmartyResolve.prototype.apply = function(compiler) {
     compiler.hooks.compilation.tap('smarty-resolve', compilation => {
         compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('smartyMock', (data, cb) => {
            const regExpsArr = [baseRegExp, jsonEncodeRegExp];
            for (const reg of regExpsArr) {
                if(reg.test(data.html)) {
                    data.html = data.html.replace(reg, ($0, $1, $2) => {
                        const keys = $2.match(/\w+/g);
                        const replaceData = replaceHtmlString(this.$data, keys);
                        return JSON.stringify(replaceData);
                    });
                }
            }
            
            if (assignRegExp.test(data.html)) {
                data.html = data.html.replace(assignRegExp, ($0, $1, $2, $3) => {
                    // 需要拿到var和value，放到页面上
                    const keys = $3.match(/\w+/g);
                    const replaceData = replaceHtmlString(this.$data, keys);
                    return (`<script>var ${$2} = "${replaceData}"</script>`);
                });
            }
            cb(null, data);
         });
     });
 }

 module.exports = SmartyResolve;
