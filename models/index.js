const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('profile','root','',{
    host:'localhost',
    dialect:'mysql'
})

sequelize.authenticate()
.then(()=>{
    console.log("Connected");
})
.catch((e)=>{
    console.log("Eroor : "+ e);
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({ force:false})
.then(()=>{
    console.log("Synced");
})
.catch((e)=>{
    console.log("Sync Eroor : "+ e);
})

db.profile = require('./profile')(sequelize,DataTypes);
module.exports = db;