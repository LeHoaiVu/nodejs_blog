const mongoose = require('mongoose');
const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect db successfully');
    } catch (error) {
        console.log('Connect db fail with: ', error);
    }
};

module.exports = { connect };
