'use strict';

let chalk = require('chalk');
let path = require('path');
let yo = require('yeoman-generator');
let ejs = require('ejs');
let moduleList = require('./modules.json');

module.exports = yo.Base.extend({
	constructor: function () {
		yo.Base.apply(this, arguments);
	},

	//initializing: function () {},

	prompting: function () {
		let done = this.async();

		let moduleNames = {};
		let f = -1;
		let fmax = moduleList.length;

		while (++f < fmax) {
			let module = moduleList[f];
			moduleNames[module.name] = f;
		}

		let modules = [];
		let choices = [];

		moduleList.forEach(module => {
			if (!module.optional) {
				modules.push(module);
			} else {
				choices.push({
					name: module.optional.name,
					value: module.name,
					checked: module.optional.checked
				});
			}
		});

		let prompts = [
			{
				type: 'text',
				name: 'appname',
				message: 'What is your app name?',
				default: path.basename(process.cwd())
			},
			{
				type: 'checkbox',
				name: 'choosed',
				message: 'Choose additional modules.',
				choices: choices
			}
		];

		this.prompt(prompts, (answers) => {
			this.appname = answers.appname;

			if (answers && answers.choosed && answers.choosed.length > 0) {
				modules = modules.concat(answers.choosed.map(name => moduleList[moduleNames[name]]));
			}

			this.modules = modules;

			done();
		});
	},

	writing: {
		app: function () {
			this.directory('src', 'src', null);
			this.copy('_gitignore', '.gitignore');
			this.copy('gulpfile.js', 'gulpfile.js');
			//this.copy('package.json', 'package.json');
			this.copy('tsd.json', 'tsd.json');
		},
		packageJson: function () {
			let source = this.read('package.json');
			let data = JSON.parse(ejs.render(source, this));
			let npm = {};

			this.modules.forEach(module => {
				if (module.npm) npm[module.npm] = '*';
			});

			data.peerDependencies = npm;
			this.fs.writeJSON('package.json', data);
		}
	},

	install: function () {
		let npm = [];
		let tsd = [];

		this.modules.forEach(module => {
			if (module.npm != undefined) npm.push(module.npm);
			if (module.tsd != undefined) tsd.push(module.tsd);
		});

		this.npmInstall(npm);
		this.npmInstall();
		this.spawnCommand('tsd', ['install'].concat(tsd, ['--resolve', '--save']));
	}

	//end: function () {
	//	console.log('index.js..end()', this.testPrompts1, this.testPrompts2);
	//}
});