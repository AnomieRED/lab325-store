const { ESLint } = require('eslint');

lint()
	.then(lintErrors => {
		if (lintErrors)
			throw new Error('MAKE AN EFFORT TO FIX LINTER ERRORS, BITCH!!!');
	})
	.then(async () => await import('./src/index.js'))
	.catch(console.error);

async function lint() {
	const eslint = new ESLint({ fix: true });
	
	const results = await eslint.lintFiles(['src/**/*.js']);
	
	await ESLint.outputFixes(results);
	
	const formatter = await eslint.loadFormatter('stylish');
	const resultText = formatter.format(results);
	console.log(resultText);
	return resultText;
}