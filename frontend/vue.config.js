const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
		proxy: {
			'/api/': {
				// target: 'https://ideally-apparent-newt.ngrok-free.app/api/',
				// target: 'http://localhost/api/',
				target: 'https://tonproject.ru/api/',
				changeOrigin: true,
				pathRewrite: { '^/api/': '' },
			},
		},
	},
})