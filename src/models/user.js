/* eslint-disable */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {
	JWT_SECRET,
	USER_SESSION_LIFE
} = process.env;

const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	const { models } = sequelize;
	
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			User.belongsTo(models.Role, { foreignKey: 'role' });
		}
		
		
		async singIn(password) {
			return bcrypt.compare(password, this.password);
		}
		
		async createToken() {
			return jwt.sign({ userId: this.id }, JWT_SECRET, {
				algorithm: 'HS256',
				expiresIn: `${USER_SESSION_LIFE}d`
			});
		}
		
		static getTokenPayload(authToken) {
			return jwt.verify(authToken, JWT_SECRET);
		}
		
		static async findUserId(req) {
			try {
				const { Role } = models;
				const authToken = req.headers.authorization;
				if (!authToken) return new Error('No token found');
				const { userId } = User.getTokenPayload(authToken);
				return userId ? await User.findOne({
					where: {
						id: userId
					},
					include: [Role]
				}) : null;
			} catch (error) {
				console.log(error);
				return null;
			}
		}
	}
	
	User.init({
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		role: DataTypes.INTEGER
		
	}, {
		sequelize,
		modelName: 'User',
		tableName: 'user',
		timestamps: true
	});
	return User;
};