const mongoose = require('mongoose')
const mongoConnect = (url)=>{
    return mongoose.connect(url)
}

module.exports = mongoConnect