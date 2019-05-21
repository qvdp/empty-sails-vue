module.exports = {

  friendlyName: 'Signup',

  description: 'Sign up for a new user account.',

  extendedDescription: `This creates a new user record in the database`,

  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      maxLength: 200,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.'
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    name: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'Bengalter',
      description: 'The name the new account.'
    },

    firstName: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'Thomas',
      description: 'The first name for the new account.'
    }

  },

  exits: {

    success: {
      description: 'A new user record sign up succeed.',
      extendedDescription: `Under the covers, this creates a new record with the provided informations, sends a confirmation email and stores the id of the logged-in user in the session as the \`userId\` key.`
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided partner, password and/or email address are invalid.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.'
    }

  },

  fn: async function (inputs, exits) {

    sails.log.info('SIGN UP (cont.) - Called');

    // Validation of email address case
    var newEmailAddress = inputs.emailAddress.toLowerCase();

    let emailAddressCheck = await User.findOne({ emailAddress: newEmailAddress });

    if (emailAddressCheck) {
      sails.log.warn('SIGN UP (cont.) - Email already in use');
      throw 'emailAlreadyInUse';
    }

    // Build up data for the new user record, save it to the database and send a confirmation email
    var newUserRecord = await User.create(Object.assign({
      emailAddress: newEmailAddress,
      encryptedPassword: await sails.helpers.utils.hashPassword(inputs.password),
      name: inputs.name,
      firstName: inputs.firstName
    }))
    .intercept('UsageError', 'invalid')
    .fetch();

    // New user record created
    sails.log.info('SIGN UP (cont.) - New user created, id ' + newUserRecord.id);

    // Send success response (this is where the session actually gets persisted) with the generated token to store for next requests
    sails.log.info('SIGN UP (cont.) - Succeed');
    return exits.success()
  }

};
