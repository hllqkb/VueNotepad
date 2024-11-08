// 页面尺寸自适应
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 20, // 75表示750设计稿，37.5表示375设计稿
      propList: ['*']
    }
  }
}
