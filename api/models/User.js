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
      name : {
        type : 'string',
        defaultsTo : ''
      },
      idgrade0 : 'integer',
      idgrade1 : 'integer',
      idgrade2 : 'integer',
      idgrade3 : 'integer',
      idgrade4 : 'integer',
      idgrade5 : 'integer',
      nousm : {
        type : 'string',
        defaultsTo : '-'
      },
      // file1 : 'object',
      // file2 : 'object',
      // file3 : 'object',
      // file4 : 'object',
      // file1 : 'string',
      // file2 : 'string',
      // file3 : 'string',
      // file4 : 'string',
      types : 'string',
      gender : 'string',
      grade : 'string',
      address : 'string',
      placebirth : 'string',
      datebirth : 'date',
      phone : 'string',
      dashboard_status : {
        type : 'integer',
        defaultsTo : 0
      },
      grade_status : {
        type : 'integer',
        defaultsTo : 0
      },
      documents_status : {
        type : 'integer',
        defaultsTo : 0
      },
      status : {
        type : 'integer',
        defaultsTo : 0
      },
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
      previousschool : 'string',
      verifyremarks : 'string',
      admin : {
        type : 'boolean',
        defaultsTo : false
      }
  }
};
