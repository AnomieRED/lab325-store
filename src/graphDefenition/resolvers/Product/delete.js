import fs from 'fs';
const { PATH_IMAGE } = process.env;

export default {
	type: 'mutation',
	name: 'deleteProduct',
	// language=graphql
	typeDef: `
      type Mutation{
          deleteProduct(id: ID!): String
      }
	`,
	resolverFunc: async (parent, { id }, { Product }) => {
		
		const findProduct = await Product.findOne({
			where: {
				id
			}
		});
		if (findProduct.image !== null) {
			const path = `${PATH_IMAGE}${findProduct.image}`;
			fs.unlink(path, (err) => {
				if (err) throw err;
				console.log('DELETE, file was deleted');
			});
		}
		const deletedProduct = await Product.destroy({
			where: {
				id
			}
		});
		if (deletedProduct === 1) {
			return 'true';
		} else if (deletedProduct === 0) {
			return 'Not Found';
		}
	}
};
