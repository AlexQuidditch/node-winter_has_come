const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/');

const WallModel = require('../models/wall-wrapper').WallModel;

mongoose.connect(config.mongoose.uri);
const Schema = mongoose.Schema;
const defaultValues = require('mongoose-default-values');

mongoose.plugin( defaultValues, [ 'String' , 'Number' ]);

// Schemas
const Images = new Schema({
	kind: {
		type: String,
		enum: ['thumbnail', 'detail'],
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

const User = new Schema({
	isAgent : {
		type: Boolean
	},
	wallID: {
		type: String
	},
	personal: {
		avatar: {
			type: String
		},
		name: {
			type: String
		},
		sename: {
			type: String
		},
		email: {
			type: String
		},
		password: {
			type: String
		},
		born: {
			type: String
		},
		gender: {
			type: String
		},
		caption: {
			type: String
		}
	},
	information: {
		specialization: {
			type: String
		},
		lastVisit: {
			type: String
		},
		status: {
			type: String
		},
		town: {
			type: String
		},
		country: {
			type: String
		},
		education: {
			place: {
				type: String
			},
			faculty: {
				type: String
			}
		}
	},
	ratings: {
		mainRate: {
			type: Number
		},
		average: {
			type: Number
		},
		completed: {
			type: Number
		},
		tests: {
			value: {
				type: Number
			},
			total: {
				type: Number
			},
			rate: {
				type: Number
			}
		}
	},
	social: {
		contacts: {
			vk: {
				type: String
			},
			fb: {
				type: String
			},
			skype: {
				type: String
			},
			telegram: {
				type: String
			}
		},
		teams: {
			type: Array
		}
	},
	portfolio: {
		type: Array
	},
	reviews: {
		type: Array
	}
});

User.statics.authenticate = ( email , password , callback ) => {
  UserModel.findOne({ 'personal.email' : email } , ( err , user ) => {
  	if ( err ) {
  		return callback(err)
  	} else if ( !user ) {
  		const err = new Error('User not found.');
  		err.status = 401;
  		return callback(err);
  	} else {
			if ( password === user.personal.password ) {
  			return callback( null , user );
			} else {
				return callback();
			}
		}
  })
};

//hashing a password before saving it to the database
User.pre('save', function (next) {
	const user = this;
	WallModel.create( { posts : [] } , ( error , wrapper ) => {
		if ( error ) return next( error );
		user.wallID = wrapper._id;
	});
	next()
	// if ( user.personal.password.length ) {
	// 	bcrypt.hash( user.personal.password , 11 , ( err , hash ) => {
	// 		if (err) return next(err);
	// 		user.personal.password = hash;
	// 		next();
	// 	})
	// }
});

// validation
// User.path('title').validate( value => value.length > 5 && value.length < 70 );

const UserModel = mongoose.model('User', User);

module.exports.UserModel = UserModel;
