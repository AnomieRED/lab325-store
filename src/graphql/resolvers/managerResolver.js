import model from '@model';
import { validator } from '@validation/validator';

const {
	Manager
} = model;

const managerResolver = {
	Query: {
		async getAllManager() {
			return Manager.findAll();
		},
		
		async getOneManager(_, { id }) {
			const oneManager = await Manager.findByPk(id);
			if (!oneManager) throw new Error('Manager not found');
			return oneManager;
		}
	},
	
	Mutation: {
		async createManager(_, {
			name,
			surname,
			phone
		}) {
			const check = validator.manager({
				name,
				surname,
				phone
			});
			if (check) throw new Error(check);
			return await Manager.create({
				name,
				surname,
				phone
			});
		},
		
		async updateManager(_, arg) {
			const oneManager = await Manager.findByPk(arg.id);
			if (!oneManager) throw new Error('Manager not found');
			const updateManager = await Manager.update(arg, {
				where: {
					id: arg.id
				}
			});
			if (updateManager[0] === 1) return true;
		},
		
		async deleteManager(_, { id }) {
			const checkManager = await Manager.findByPk(id);
			if (!checkManager) throw new Error('Manager not found');
			console.log(id);
			const deletedManager = await Manager.destroy({
				where: {
					id
				}
			});
			if (deletedManager === 1) return true;
		}
	}
};

export default managerResolver;