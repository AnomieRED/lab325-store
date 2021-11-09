export class Model {
	constructor() {
		if(new.target === Model) throw new Error('Instance Error');
	}
	static firstName;
	static lastName;
	static modelName;
	static syoss;

	static init(attr, options) {
		console.log(attr, options);
		this.syoss = options.syoss;
		this.firstName = options.firstName;
		this.lastName = options.lastName;
		this.modelName = attr.modelName;
	}
	
	static update(){
		this.syoss.query('SELECT NOW()', (err, res) => {
			console.log(res);
		});
		
		
		// if(!id) return console.error()
		// const updateManager = this.syoss.query(`
		// 		UPDATE manager SET name = $1, surname = $2, phone = $3 WHERE id = $4 RETURNING*`
		// );
		// console.log(updateManager);
	}
	
	
	// static getById(){}
	// static delete(){}
	// static create(){}
}

