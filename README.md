## smarty-mock-webpack-plugin

 smarty-mock-webpack-plugin是用于单页面应用中，在类似于index.html的顶层页面中处理服务端用php或smarty返回同步数据的情况。返回的数据需要放在我们前端页面的全局中使用时，可以使用此插件。

### Install

```
npm install smarty-mock-webpack-plugin -D
```

### Tips

> 在单页应用中，可以说只会在入口的html文件中获取同步返回的数据，一般没有其它操作。有其它操作的情况，后面会陆续添加。如果您用其它一些比较复杂的smarty操作，
> 那么这个插件可能不适合。因为在处理php或smarty中，通常来说都是$data表示返回的数据，所以在处理的时候，需要加上$


* 处理的几种情况：
* {%$data%}
* {%json_encode($data.data)%}
* {%assign var="name" value="$data.name"%}

### Usage

```
// 在webpack plugins中进行配置
const SmartyMockPlugin = require('smarty-mock-webpack-plugin');
module.exports = {
    //...
    plugins: [
	new HTMLWebpackPlugin({
             filename: 'index.html',
             template: './index.html',
             inject: true
         }),
	new SmartyMockPlugin(require(__dirname + '/../mock/home.json'));
    ]
}
```
