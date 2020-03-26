const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const EntranceSchema=Schema({
    uid: {
        type: Number,
    },
    timestamps: {
        type: Date,
        default: Date.now
    }
    

});
module.exports=mongoose.model('entrances', EntranceSchema);