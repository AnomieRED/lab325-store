import model from '@model';
import { validator } from '@validation/validator';

const { Manager } = model;

class ManagerController {
	async getManagerByProduct(req, res) {
		try {
			const {
				offset = 0,
				limit = 10
			} = req.query;
			const where = req.body;
			const allManager = await Manager.findAll({
				offset,
				limit,
				where
			});
			console.log('GET MANAGER');
			if (allManager.length === 0) {
				return res.status(200)
					.json('Not found');
			} else {
				res.status(200)
					.json(allManager);
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async getOneManager(req, res) {
		try {
			const managerId = req.params.id;
			if (!managerId) {
				return res.status(404)
					.json('Check your product ID');
			}
			const oneManager = await Manager.findByPk(managerId);
			console.log('DELETE MANAGER');
			if (oneManager === null) {
				return res.status(200)
					.json('Manager not found');
			} else {
				res.status(200)
					.json(oneManager);
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async createManager(req, res) {
		try {
			const {
				name,
				surname,
				phone
			} = req.body;
			const check = validator.manager({
				name,
				surname,
				phone
			});
			if (check) {
				return res.status(404)
					.send({ error: check });
			}
			const addManager = await Manager.create({
				name,
				surname,
				phone
			});
			
			console.log('CREATE MANAGER');
			res.status(201)
				.json(addManager);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async updateManager(req, res) {
		try {
			const managerId = req.params.id;
			const update = req.body;
			const checkManager = await Manager.findByPk(managerId);
			if (!checkManager) {
				return res.status(404)
					.send({ error: 'Manager not found' });
			}
			const updateManager = await Manager.update(update, {
				where: {
					id: managerId
				}
			});
			console.log('UPDATE MANAGER');
			if (updateManager[0] === 1) return res.status(200)
				.json('true');
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async deleteManager(req, res) {
		try {
			const managerId = req.params.id;
			const checkManager = await Manager.findByPk(managerId);
			if (!checkManager) {
				return res.status(404)
					.send({ error: 'Manager not found' });
			}
			const deletedManager = await Manager.destroy({
				where: {
					id: managerId
				}
			});
			console.log('DELETE MANAGER');
			if (deletedManager === 1) {
				return res.status(200)
					.json('true');
			}
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
}

export default new ManagerController();