const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        path: `${__dirname}/lib`,
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'VueWindow',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.scss/, use: ["style-loader", "css-loader", "sass-loader",] },
            {
                test: /\.ts$/, loader: 'ts-loader', options: {
                    appendTsSuffixTo: [/\.vue$/],
                    compilerOptions: {
                        declaration: true,
                        declarationDir: "./lib/types",
                    },
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ],
    },
    externals:[
    ],
    plugins: [
        new VueLoaderPlugin(),
    ],
}