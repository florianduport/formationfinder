/**
 * MangoPayTrasference.js
 *
 * @description :: Data de Mangopay trasferences.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    userwallet: {
      type: 'json',
      required: true
    },
    userdata: {
      type: 'json',
      required: true
    },
    nameformationcenter: {
      type: 'string',
      required: true
    },
    buyeramount: {
      type: 'float',
      required: true
    },
    selleramount: {
      type: 'float',
      required: true
    }
  }
};

