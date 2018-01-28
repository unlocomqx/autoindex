const fs = require('fs-extra'),
	glob = require("glob"),
	ignore = require("ignore"),
	parseArgs = require('minimist');
let ignore_rules = [];

var args = process.argv.slice(2);

var argv = parseArgs(args, opts = {
	'string': true
});

const ignore_file = argv[ 'ignore-file' ] || '.gitignore';

if (fs.existsSync(ignore_file)) {
	console.log(`found ${ignore_file}, reading rules`);
	ignore_rules = fs.readFileSync(ignore_file).toString().split(/\r?\n/);
} else {
	console.log(`no ${ignore_file} found`);
}

// add ignore_rules to the ignore module
const ig = ignore().add(ignore_rules);

// check if we have an index.php file in the current directory.
// We will use it to copy it to other folders
if (!fs.existsSync('index.php')) {
	console.error('No index.php file found in the current directory');
	process.exit(1);
}

// get all folders in current directory
glob("**/", async (error, paths) => {
	filtered_paths = ig.filter(paths);
	console.log(`found ${paths.length} folders in total`);
	console.log(`found ${filtered_paths.length} folders after filtering`);
	console.log('copying index.php file');
	let copied = 0;
	for (const path of filtered_paths) {
		const target = `${path}index.php`;
		// make sure not to overwrite existing index.php files
		const operations = [];
		if (!fs.existsSync(target)) {
			copied++;
			console.log(`copying ${target}`);
			await fs.copy('index.php', target);
		}
	}
	console.log(`copied ${copied} index files`);
});
