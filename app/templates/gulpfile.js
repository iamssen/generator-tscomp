'use strict';

var gulp = require('gulp');
var typescript = require('gulp-tsc');
var sass = require('gulp-sass');
var clean = require('gulp-clean');

gulp.task('clean', function () {
	return gulp.src('./dist', {read: false})
		.pipe(clean());
});

gulp.task('typescript', function () {
	return gulp.src(['./src/**/*.ts', '!./src/typings/**'])
		.pipe(typescript({
			module: "commonjs",
			target: "es5",
			sourceMap: true,
			removeComments: true,
			noImplicitAny: false,
			declaration: true,
			experimentalDecorators: true,
			emitDecoratorMetadata: true
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
	return gulp.src('./src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', ['clean', 'typescript', 'sass']);