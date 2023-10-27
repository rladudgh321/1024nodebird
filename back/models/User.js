const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
           email:{
            type:Sequelize.STRING(100),
            allowNull:true,
            unique:true,
           },
           password:{
            type:Sequelize.STRING(150),
            allowNull:true
           },
           snsId:{
            type:Sequelize.STRING(100),
            allowNull:true,
           },
           provider:{
            type:Sequelize.ENUM('local', 'kakao'),
            allowNull:false,
            defaultValue:'local',
           },
           nickname:{
            type:Sequelize.STRING(30),
            allowNull:false,
           },
           description:{
            type:Sequelize.TEXT('tiny')
           }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'User',
            tableName:'users',
            paranoid:true,
            charset:'utf8',
            collate:'utf8_general_ci',
        })
    }
    static associate(db){
        db.User.hasMany(db.Post);
        
    }
}

module.exports = User;