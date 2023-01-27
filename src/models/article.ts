import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize
} from 'sequelize'
import { User } from './user'

export class Article extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
  declare articleId: number
  declare title: string
  declare content: string
  declare createdAt?: Date
  declare UserUserId?: number
}

export function ArticleFactory (sequelize: Sequelize) {
  Article.init(
    {
      articleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      UserUserId: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      tableName: 'articles',
      sequelize
    }
  )
}

export function AssociateUserArticles() {
  User.hasMany(Article, {
      foreignKey: {
          name: 'userId',
          allowNull: false
      }
  });
  Article.belongsTo(User, {
      foreignKey: {
          name: 'userId',
          allowNull: false
      }
  })
} 