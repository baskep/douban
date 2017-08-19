module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['app/views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['resources/js/**', 'app/models/**/*.js', 'app/controllers/**/*.js', 'app/schemas/**/*.js'],
				options: {
					livereload: true
				}
			}
		/*	styles: {
				files: ['resources/css/*.css'],
				tasks: ['css'],
				options: {
					nospawn: true
				}
			}*/

		},
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
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}

	});

	grunt.option('force', true);

	grunt.loadNpmTasks('grunt-contrib-watch'); // 监听文件变动
	grunt.loadNpmTasks('grunt-nodemon'); // 监听入口文件
	grunt.loadNpmTasks('grunt-concurrent'); 

	grunt.registerTask('default', ['concurrent']);
};