const managerSchema = {
	name: { type: 'string' },
	surname: { type: 'string' },
	phone: { type: 'string', min: 12, max: 12 }
};

export default managerSchema;