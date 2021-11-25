/* eslint-disable */
import fs from 'fs';
import imageUpload from "@upload";
import { ROLE_ADMIN } from '@role';
const { PATH_IMAGE } = process.env;

export default {
	type: 'mutation',
	name: 'updateProduct',
	roleAccess: [ROLE_ADMIN],
	// language=graphql
	typeDef: `
      input updateProductInput {
          id: Int!
          name: String
          description: String
          price: Float
          image: Upload
          title:String
          value:String
          availability: ProductEnum
          managerId: Int
      }
      
      type Mutation{
          updateProduct(product: updateProductInput): String
      }
	`,
	resolverFunc: async (parent, { product }, { model: {Product} }) => {
		const {
			image
		} = product;
		if (image !== undefined) {
			console.log('OK');
			const findImage = await Product.findOne({
				where: {
					id: product.id
				}
			});
			if(findImage.image !== null) {
				const path = `${PATH_IMAGE}${findImage.image}`;
				fs.unlink(path, (err) => {
					if(err) throw err;
					console.log('UPDATE, file was deleted');
				});
			}
			const regex = /(\w+)/si;
			const newImageName = image.file.filename.replace(regex, findImage.id);
			const {
				createReadStream
			} = await image.file;
			const stream = createReadStream();
			const pathObj = await imageUpload({
				stream,
				filename: newImageName
			});
			product.image = newImageName;
		}
		const updateProduct = await Product.update(product, {
			where: {
				id: product.id
			}
		});
		if (updateProduct[0] === 1) {
			return 'true';
		} else if (updateProduct[0] === 0) {
			return 'Not Found';
		}
	}
};
