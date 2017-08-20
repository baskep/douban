module.exports = function(grunt) {

	grunt.initConfig({
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['app', 'config'],
					debug: true,
					delayTime: 1,
					env: {
					PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon'],
			options: {
				logConcurrentOutput: true
			}
		}

	});

	grunt.option('force', true);

	grunt.loadNpmTasks('grunt-nodemon'); // 监听入口文件
	grunt.loadNpmTasks('grunt-concurrent'); 

	grunt.registerTask('default', ['concurrent']);
};