const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UIDSchema=Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    lastname: String

});
module.exports=mongoose.model('UID2', UIDSchema);