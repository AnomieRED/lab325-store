import client from '@postgres';

class ManagerController {
	async getManagerByProduct(req, res) {
		try {
			const { offset = 1, limit = 10 } = req.query;
			const allProducts = await client.query(
				`SELECT * FROM manager ORDER BY id ASC LIMIT $2 OFFSET (($1 - 1) * $2)`, [offset, limit]
			);
			console.log('GET MANAGER product');
			res.status(200).json(allProducts.rows);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async updateManager(req, res) {
		try {
			const managerId = req.params.id;
			const { name, surname, phone } = req.body;
			if (!managerId) {
				return res.status(400).json('Check your product ID');
			}
			if (!name) {
				return res.status(400).json('Check manager name');
			}
			if (!surname) {
				return res.status(400).json('Check surname manager');
			}
			const updateManager = await client.query(`
				UPDATE manager SET name = $1, surname = $2, phone = $3 WHERE id = $4 RETURNING*`,
				[name, surname, phone, managerId]
			);
			res.status(200).json(updateManager.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async createManager(req, res) {
		try {
			const { name, surname, phone } = req.body;
			console.log(req.body);
			const newProduct = await client.query(`INSERT INTO manager(name, surname, phone)
			VALUES($1, $2, $3) RETURNING *`, [name, surname, phone]);
			console.log('CREATE MANAGER');
			res.status(201).json(newProduct.rows[0]);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
	
	async deleteManager(req, res) {
		try {
			const managerId = req.params.id;
			const deletedManager = await client.query(`DELETE FROM manager WHERE id = $1 RETURNING *`, [managerId]);
			console.log('Manager was DELETED');
			res.status(200).json(deletedManager.rows);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}
}

export default new ManagerController();