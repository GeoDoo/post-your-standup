const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkspacesSchema = new Schema({
    teamId: String,
    teamDomain: String,
});

const WorkspacesModel = mongoose.model('WorkspacesModel', WorkspacesSchema);
module.exports = WorkspacesModel;
