class FilterModel {
	static findByConditionOr(options) {
		let inputConditionAnd = '';
		Object.entries(options.where)
			.forEach(([key, values]) => {
				if (key === 'or') return;
				inputConditionAnd += `${key} = '${values}' AND `;
			});
		
		let inputFilter = '';
		Object.keys(options.where.or)
			.forEach((key) => {
				Object.entries(options.where.or[key])
					.forEach(([key, value]) => {
						inputFilter += `${key} = '${value}' OR `;
					});
			});
		const inputConditionOr = inputFilter.slice(0, -4);
		return [inputConditionAnd, inputConditionOr];
	}
	
	static findByConditionAnd(options) {
		let inputFilter = '';
		Object.entries(options.where)
			.forEach(([key, value]) => {
				inputFilter += `${key} = '${value}' AND `;
			});
		return inputFilter.slice(0, -5);
	}
}

export default FilterModel;