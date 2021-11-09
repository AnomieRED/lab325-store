System.config({
	'paths': {
		'@schema': './src/validator/schema',
		'@router/*': './src/routes/*',
		'@postgres': './src/lib/db',
		'@controller/*': './src/controllers/*',
		'@migration': './src/lib/migration'
	}
});