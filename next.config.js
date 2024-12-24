const path = require('path')

module.exports = {
    webpack(config, { isServer }) {
        // افزودن قانون جدید برای مدیریت فایل‌های SVG
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/images/',
                        publicPath: '/_next/static/images/',
                    },
                },
            ],
        })

        return config
    },
}
