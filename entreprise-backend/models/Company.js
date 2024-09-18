const mongoose = require('mongoose');
 
const CompanySchema = new mongoose.Schema({
  companyNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  naceCode: { type: String },
  activityGroup: { type: String },
  address: {
    street: { type: String },
    postalCode: { type: String },
    city: { type: String },
    region: { type: String },
  },
});
 
module.exports = mongoose.model('Company', CompanySchema);