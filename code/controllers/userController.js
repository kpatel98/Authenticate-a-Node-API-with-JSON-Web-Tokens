const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.createUser = (req, res, next) => {
	const userName = req.body.userName;
	const password = req.body.password;

	bcrypt.hash(password, 12)
		.then(hashedPw => {
			const user = new User({
				userName: userName,
				password: hashedPw
			});
			user.save()
				.then(result => {
					res.status(200).json({res: 'user-create', message: 'user create successfully', data: result});
				}).catch(error => console.log(error));
		}).catch(error => console.log(error));
}


exports.loginUser = (req, res, next) => {
	const userName = req.body.userName;
	const password = req.body.password;
	User.findOne({
			userName: userName
		}).then(user => {
			if (!user) {
				return res.status(200).json({res: 'not-found', message: 'username not found.', data: null});
			}
			loadedUser = user;
			bcrypt.compare(password, user.password)
				.then(isEqual => {
					if (!isEqual) {
						return res.status(200).json({res: 'not-valid', message: 'username or password not valid.', data: null});
					}
					const token = jwt.sign({
							id: user.id,
							data: user
						}, 'mysecrate', {expiresIn: '24h'});
					return res.status(200).json({res: "login", message: 'you are login successfully.', data: null, token: token});
				}).catch(error => console.log(error));
		}).catch(error => console.log(error));
}

exports.userProfile = (req, res, next) => {
	const token = req.get('Authorization');
	const decodedToken = jwt.verify(token, "mysecrate");
	User.findById(decodedToken.id)
		.then(user => {
			return res.status(200).json({res: 'profile', message: 'profile found successfully.', data: user, token: token});
		}).catch(error => console.log(error));
}
