const { DataSource } = require("typeorm");
const Task = require("./entity/Task");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH || "./database.sqlite",
  synchronize: true,
  entities: [Task],
});

module.exports = {
  AppDataSource,
};
