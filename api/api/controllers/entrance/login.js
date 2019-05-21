module.exports = {

  friendlyName: 'Login authentication',

  description: 'Let a user logs in using the provided email and password combination.',

  extendedDescription: `This action attempts to look up the user record in the database with the specified email address.  Then, if such a user exists, it uses bcrypt to compare the hashed password from the database with the provided password attempt.`,

  inputs: {

    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      maxLength: 200,
      description: 'The email address for the authentication, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.'
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the authentication.'
    }

  },

  exits: {

    success: {
      description: 'The requesting user agent has been successfully logged in.',
    },

    badCombo: {
      description: 'The provided email and password combination does not match any user in the database.',
      responseType: 'unAuthorized'
    }

  },

  fn: async function (inputs, exits) {

    sails.log.info('LOG IN (cont.) - Called');

    // Look up by the email address. (note that we lowercase it to ensure the lookup is always case-insensitive)
    var user = await User.findOne({ emailAddress: inputs.emailAddress.toLowerCase() });

    // If there was no matching user, respond thru the "badCombo" exit.
    if(!user) {
      throw 'badCombo';
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.utils.checkPassword(inputs.password, user.encryptedPassword)
    .intercept('incorrect', 'badCombo');

    // Modify the active session instance.
    this.req.session.userId = user.id;

    // Send success response (this is where the session actually gets persisted) with the generated token to store for next requests
    sails.log.info('LOG IN (cont.) - Succeed, user ' + user.id + ' logged in.');
    return exits.success({
      token: TokenService.issue({
        id: user.id
      })
    });

  }

};
