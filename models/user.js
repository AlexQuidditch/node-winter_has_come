const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/');

const WallModel = require('../models/wall-wrapper').WallModel;

mongoose.connect(config.mongoose.uri);
const Schema = mongoose.Schema;
const defaultValues = require('mongoose-default-values');

mongoose.plugin( defaultValues, [ 'String' , 'Number' ]);

// Schemas

const User = new Schema({
	isAgent : {
		type: Boolean
	},
	isOnline : {
		type: Boolean
	},
	wall: {
		type: Array
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
			type: String,
			require: true,
			unique: true
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
		company: {
			title: {
				type: String
			},
			link: {
				type: String
			}
		},
		education: {
			place: {
				type: String
			},
			faculty: {
				type: String
			}
		},
		about: {
			type: String
		}
	},
	registrationDate: {
		type: String
	},
	popularity: {
		type: Number
	},
	responses: {
		issued: {
			type: Number
		},
		positive: {
			type: Number
		},
		negative: {
			type: Number
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
		},
		company: {
			activities: { type: String },
			starts: { type: String },
			achivements: { type: String }
		}
	},
	portfolio: {
		type: Array
	},
	reviews: {
		type: Array
	},
	tasks: {
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
	next();
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
