import model from '../models/index';
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
			if (allManager.length === 0) return res.json('Not found');
			console.log('GET MANAGER');
			res.status(200)
				.json(allManager);
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
			if (oneManager === null) return res.json('Manager not found');
			console.log('DELETE MANAGER');
			res.status(200)
				.json(oneManager);
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
			const updateManager = await Manager.update(update, {
				where: {
					id: managerId
				}
			});
			if (updateManager[0] === 1) return res.json('true');
			console.log('UPDATE MANAGER');
			res.status(200)
				.json(updateManager);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
	
	async deleteManager(req, res) {
		try {
			const managerId = req.params.id;
			const deletedManager = await Manager.destroy({
				where: {
					id: managerId
				}
			});
			if (deletedManager === 1) {
				return res.json('true');
			} else if (deletedManager === 0) {
				return res.json('Not found');
			}
			console.log('DELETE MANAGER');
			res.status(200)
				.json(deletedManager);
		} catch (error) {
			res.status(500)
				.send({ error: error.message });
		}
	}
}

export default new ManagerController();