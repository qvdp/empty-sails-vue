/*****************************************
*               USER Model              *
*        Contains all user records       *
*****************************************/

module.exports = {

  tableName: 'user',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'carol.reynard@microsoft.com',
      description: 'Email address of the user.'
    },

    encryptedPassword: {
      type: 'string',
      required: true,
      protect: true,
      maxLength: 200,
      example: '2$28a8eabna301089103-13948134nad',
      description: 'Securely hashed representation of the user\'s login password.'
    },

    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the user\'s identity when recovering a password.  Expires after 1 use, or after a set amount of time has elapsed.',
      allowNull: true
    },

    passwordResetTokenExpiresAt: {
      type: 'ref',
      example: 1502844074211,
      description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `passwordResetToken` will expire (or 0 if the user currently has no such token).'
    },

    firstName: {
      type: 'string',
      required: true,
      maxLength: 35,
      example: 'Lisa Microwave van der Jenny',
      description: 'The user\'s fisrt name'
    },

    name: {
      type: 'string',
      maxLength: 35,
      example: 'Microwave van der Jenny',
      description: 'The user\'s name',
    },

    // phoneNumbr: {
    //   type: 'ref',
    //   example: 0601020304,
    //   description: 'The user\'s phone number.'
    // },
    //
    // emailProofToken: {
    //   type: 'string',
    //   description: 'A pseudorandom, probabilistically-unique token for use in our account verification emails.'
    // },
    //
    // emailProofTokenExpiresAt: {
    //   type: 'ref',
    //   example: 1502844074211,
    //   description: 'A JS timestamp (epoch ms) representing the moment when this user\'s `emailProofToken` will expire (or 0 if the user currently has no such token).'
    // },
    //
    // emailStatus: {
    //   type: 'string',
    //   isIn: ['unconfirmed', 'changeRequested', 'confirmed'],
    //   defaultsTo: 'unconfirmed',
    //   description: 'The confirmation status of the user\'s email address.',
    //   extendedDescription: `Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
    //     admin users). When the email verification feature is enabled, new users created via the
    //     signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
    //     Similarly, when an existing user changes their email address, they switch to the "changeRequested"
    //     email status until they click the link in the confirmation email.`
    // },
    //
    // emailChangeCandidate: {
    //   type: 'string',
    //   isEmail: true,
    //   maxLength: 200,
    //   example: 'carol.reynard@microsoft.com',
    //   description: 'The (still-unconfirmed) email address that this user wants to change to.'
    // },

    emailAuthorization: {
      type: 'boolean',
      defaultsTo: false,
      description: 'A state of user preferency on email notification authorization',
    },

    tosAcceptedby: {
      type: 'string',
      isIP: true,
      description: 'The IP (ipv4) address of the request that accepted the terms of service.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer'
    },

    tosAcceptedAt: {
      type: 'ref',
      example: 1502844074211,
      description: 'A JS timestamp (epoch ms) representing the moment at which this user has accepted the tos (or 0 if they have not interacted with the backend at all yet)'
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


  },

  // Return a shallow copy of this record with certain attributes removed at each request
  customToJSON () {
    return _.omit(this, ['encryptedPassword','passwordResetToken','passwordResetTokenExpiresAt']);
  }
};
