const productSchema = {
		name: { type: 'string',  min: 3, max: 255 },
		description: { type: 'string' },
		price: { type: 'number' },
		manager_id: { type: 'number' }
};

export default productSchema;