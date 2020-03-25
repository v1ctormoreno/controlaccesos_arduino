const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const UIDSchema=Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    name: String,
    lastname: String,
    timestamps: {
        type: Date,
        default: Date.now
    }
    

});
module.exports=mongoose.model('UID2', UIDSchema);