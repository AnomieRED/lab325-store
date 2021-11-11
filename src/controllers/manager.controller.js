import Manager from '@models/modelManager';
import { validator } from '@validation/validator';


class ManagerController {
	async getManagerByProduct(req, res) {
		try {
			const { offset = 1, limit = 10 } = req.query;
			const allManager = await Manager.findAll(offset, limit);
			console.log('GET MANAGER');
			res.status(200).json(allManager);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async getOneManager(req, res) {
		try {
			if (!req.params.id) {
				return res.status(404).json('Check your product ID');
			}
			const oneManager = await Manager.findById(req.params.id);
			console.log('DELETE MANAGER');
			res.status(200).json(oneManager);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async updateManager(req, res) {
		try {
			const managerId = req.params.id;
			const { name, surname, phone } = req.body;
			const updateManager = await Manager.update(managerId, { name, surname, phone });
			console.log('UPDATE MANAGER');
			res.status(200).json(updateManager);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async createManager(req, res) {
		try {
			const { name, surname, phone } = req.body;
			const check = validator.manager({ name, surname, phone })
			if(check) {
				return res.status(404).send({ error: check });
			}
			const addManager = await Manager.create({ name, surname, phone });
			console.log('CREATE MANAGER');
			res.status(201).json(addManager);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async deleteManager(req, res) {
		try {
			const managerId = req.params.id;
			const deletedManager = await Manager.delete(managerId);
			console.log('DELETE MANAGER');
			res.status(200).json(deletedManager);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
}

export default new ManagerController();