module.exports = {
    devServer: {
        // 反向代理
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //路径重写
                  }
            }
        }
    }
}