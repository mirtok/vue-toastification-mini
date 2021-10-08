module.exports = {
    lintOnSave: false,
    pages:{
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    chainWebpack: config =>{
        config.module
            .rule('js')
            .inc
    }
}