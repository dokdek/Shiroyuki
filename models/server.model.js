const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serverSchema = new Schema ({
    server: {
        type: String,
    },
    listingType: {
        type: String,
    },
    name: {
        type: String
    },
    playstyle: {
        type: String,
    },
    size: {
        type: Number,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});


//add more later
const Aether = mongoose.model('Aether', serverSchema);
const Primal = mongoose.model('Primal', serverSchema);

module.exports = {
    Aether,
    Primal,
}