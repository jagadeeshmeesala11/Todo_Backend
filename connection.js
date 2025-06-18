const { DataSource } = require("typeorm");
const Task = require("./Entity/Task");

const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_PATH || "./database.sqlite",
  synchronize: true,
  entities: [Task],
});

module.exports = {
  AppDataSource,
};
