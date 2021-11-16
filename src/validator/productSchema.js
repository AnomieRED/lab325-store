const productSchema = {
	name: { type: 'string', min: 3, max: 255 },
	description: { type: 'string' },
	price: { type: 'number' },
	managerId: { type: 'number' }
};

export default productSchema;