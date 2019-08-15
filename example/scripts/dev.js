/**
 * @file 本地开发环境
 * @author fuqqnl
 */

 const express = require('express');
 const webpack = require('webpack');
 const webpackDevMiddleWare = require('webpack-dev-middleware');
 const webpackHotMiddleWare = require('webpack-hot-middleware');
 const webpackDevConfig = require('./webpack.dev.conf');

 const port = process.env.PORT || 8899;
 const app = express();

 devStart().then(stats => {
     if (stats) {
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false
        }) + '\n');
     }
 }).catch(e => {
    process.stderr.write(e.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false
    }) + '\n');
 });

 function devStart() {
     return new Promise((resolve, reject) => {
        const compiler = webpack(webpackDevConfig);
        compiler.hooks.done.tap('comile done', (stats) => {
            const hasErrors = stats.hasErrors();
            if (hasErrors) {
                reject(stats);
            } else {
                resolve(stats);
            }
        })
        const devMiddleWare = webpackDevMiddleWare(compiler, {
            quiet: true,
            compress: true,
            noInfo: true,
            publicPatch: '/dist'
        });
        const hotMiddleWare = webpackHotMiddleWare(compiler);
        app.use(devMiddleWare);
        app.use(hotMiddleWare);

        app.listen(port, () => {
            console.log(`server started on http://localhost:${port}`);
        });
     });
 }
