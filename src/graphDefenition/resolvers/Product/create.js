/* eslint-disable */
import { validator } from '@validation/validator';
import imageUpload from '@upload';
import { ROLE_ADMIN } from '@role';

export default {
	type: 'mutation',
	name: 'createProduct',
	roleAccess: [ROLE_ADMIN],
	// language=graphql
	typeDef: `
      input createProductInput {
          name: String!
          description: String!
          price: Float!
          image: Upload!
          title:String!
          value:String!
          availability: ProductEnum!
          managerId: Int!
      }

      type Mutation{
          createProduct(product: createProductInput!): Product
      }
	`,
	resolverFunc: async (parent, {
		product
	}, {
     model: {
       Manager,
       Product,
       Feature,
       sequelize
     }
		}) => {
		const transaction = await sequelize.transaction();
		try {
			const {
				name,
				description,
				price,
				image,
				title,
				value,
				availability,
				managerId
			} = product;
			if (!title || !value) return new Error('Fields cannot be empty');
			const check = validator.product({
				name,
				description,
				price,
				managerId
			});
			if (check) return new Error(check);
			
			const newProduct = await Product.create({
				name,
				description,
				price,
				image: image.file.filename,
				availability,
				managerId
			}, { transaction });
			
			const regex = /(\w+)/si;
			const newImageName = image.file.filename.replace(regex, newProduct.id);
			const {
				createReadStream
			} = await image.file;
			const stream = createReadStream();
			const pathObj = await imageUpload({
				stream,
				filename: newImageName
			});
			newProduct.image = newImageName;
			await newProduct.save({ transaction });
			
			const [newFeature, boolean] = await Feature.findOrCreate({
				where: { title },
				transaction
			});
			console.log('Create product resolver: ', boolean);
			await newProduct.addFeature(newFeature, {
				through: { value },
				transaction
			});
			await transaction.commit();
			await newProduct.reload({
				include: [Manager, Feature]
			});
			return newProduct;
		} catch (error) {
			await transaction.rollback();
			return null;
		}
	}
};
