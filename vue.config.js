const path = require('path')
const webpack = require('webpack')
const { IgnorePlugin } = require('webpack')
const { createMockMiddleware } = require('umi-mock-middleware')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const createThemeColorReplacerPlugin = require('./config/theme.plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())

const isProd = process.env.NODE_ENV === 'production'
const isUseCDN = process.env.IS_USE_CDN === 'true'
const isAnalyz = process.env.IS_ANALYZ === 'true'

function resolve (dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash () {
  try {
    return GitRevision.version()
  } catch (e) {}
  return 'unknown'
}

const assetsCDN = {
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
  },
  assets: {
    css: [],
    // https://unpkg.com/:package@:version/:file
    // https://cdn.jsdelivr.net/package:version/:file
    js: [
      // '//cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js',
      // '//cdn.jsdelivr.net/npm/vue-router@latest/dist/vue-router.min.js',
      // '//cdn.jsdelivr.net/npm/vuex@latest/dist/vuex.min.js',
      // '//cdn.jsdelivr.net/npm/axios@latest/dist/axios.min.js',

      '//cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
      '//cdn.bootcdn.net/ajax/libs/vue-router/3.4.3/vue-router.min.js',
      '//cdn.bootcdn.net/ajax/libs/vuex/3.5.1/vuex.min.js',
      '//cdn.bootcdn.net/ajax/libs/axios/0.20.0/axios.min.js',
    ],
  },
}

// vue.config
const vueConfig = {
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate,
      }),
      new VueAutoRoutingPlugin({
        // Path to the directory that contains your page components.
        pages: 'src/views',
        // A string that will be added to importing component path (default @/pages/).
        importPrefix: '@/views/',
      }),
    ],
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': resolve('./src/icons.js'),
      },
    },
    externals: isUseCDN ? assetsCDN.externals : {},
  },
  chainWebpack: config => {
    // replace svg-loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()

    svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })

    // if `IS_USE_CDN` env is TRUE require on cdn assets
    isUseCDN && config.plugin('html').tap(args => {
      args[0].cdn = assetsCDN.assets
      return args
    })
    // if `IS_ANALYZ` env is TRUE on report bundle info
    isAnalyz && config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static',
      },
    ])

    // 开启js、css压缩
    if (isProd) {
      config.plugin('compressionPlugin')
      .use(new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 不删除源文件
      }))
    }
  },
  // style config
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'border-radius-base': '2px',
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    // development server port 8000
    port: 8000,
    // mock serve
    before: app => {
      if (process.env.MOCK !== 'none' && process.env.HTTP_MOCK !== 'none') {
        app.use(createMockMiddleware())
      }
    },
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     // backend url
    //     target: 'http://localhost:8080/gateway',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
  /* ADVANCED SETTINGS */
  publicPath: process.env.VUE_APP_CONTEXT_PATH,

  // disable source map in production
  productionSourceMap: !isProd,
  // ESLint Check: DISABLE for false
  // Type: boolean | 'warning' | 'default' | 'error'
  lintOnSave: 'warning',
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
}

// preview.pro.antdv.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('Running Preview Mode')
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
