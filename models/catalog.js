const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const catalogSchema = mongoose.Schema({
    imageURL: {
      type: String,
      required: true
    },
    unitLengthCost: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});


const catalog = module.exports = mongoose.model('Catalog', catalogSchema);

module.exports.getCatalog = function (callback) {
    catalog.find(callback);
};


module.exports.addCatalogElement = function (catalogElement,callback) {
  catalogElement.save(callback);
};


module.exports.getCatalogElement = function (catalogName,callback) {
    const query = {title : catalogName};
    catalog.find(query,callback);
}