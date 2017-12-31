const fs = require('fs-extra');
const glob = require("glob");
const ignore = require("ignore");
let ignore_rules = [];

if (fs.existsSync('.gitignore')) {
	console.log('found .gitignore, reading rules');
	ignore_rules = fs.readFileSync('.gitignore').toString().split(/\r?\n/);
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
	console.log(`found ${paths.length} folders`);
	console.log('copying index.php file');
	let copied = 0;
	for (const path of paths) {
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
