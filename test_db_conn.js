const { Sequelize } = require('sequelize');

const testPasswords = ['ppk40313', 'password', ''];
const dbName = 'food_delivery';
const user = 'root';

async function test() {
  for (const password of testPasswords) {
    console.log(`Testing password: "${password}"...`);
    const sequelize = new Sequelize(dbName, user, password, {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
    });
    try {
      await sequelize.authenticate();
      console.log(`✅ Success with password: "${password}"`);
      process.exit(0);
    } catch (err) {
      console.log(`❌ Failed with password: "${password}": ${err.message}`);
    }
  }
}

test();
