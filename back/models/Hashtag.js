const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model{
    static initiate(sequelize){
        Hashtag.init({
            name:{
                type:Sequelize.STRING(30),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:true,
            underscored:false,
            modelName:'Hashtag',
            tableName:'hashtags',
            paranoid:false,
            charset:'utf8mb4',
            collate:'utf8mb4_general_ci',

        })
    }
    static associate(db){
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }); //hashtag.addPostId
    }
}

module.exports = Hashtag;