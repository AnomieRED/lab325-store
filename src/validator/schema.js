const productSchema = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		description: { type: 'string' },
		color: { type: 'string' },
		characteristic: { type: 'string' },
		price: { type: 'integer' }
	},
	required: ['name', 'description', 'price'],
	additionalProperties: false
};

export default productSchema;