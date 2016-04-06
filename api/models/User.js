/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      email : 'string',
      encryptedPassword : 'string',
      encryptedId : 'string',
      name : 'string',
      file1 : 'string',
      file2 : 'string',
      file3 : 'string',
      file4 : 'string',
      // files : 'array',
      types : 'string',
      gender : 'string',
      grade : "string",
      address : 'string',
      placebirth : 'string',
      datebirth : 'string',
      phone : 'string',
      status : 'integer',
      handphone : 'string',
      fathername : 'string',
      fatheroccupation : 'string',
      fathersalary : 'integer',
      fatherphone : 'string',
      mothername : 'string',
      motheroccupation : 'string',
      mothersalary : 'integer',
      motherphone : 'string',
      numbersiblings : 'integer',
      opendate : 'date',
      closedate : 'date',
      testdate : 'date',
      admin : {
        type : 'boolean',
        defaultsTo : false
      }
  }
};
