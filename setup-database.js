const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ override: true });

async function setupDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
  });

  try {
    console.log('🔄 Starting database setup...');
    
    // Read the complete setup SQL file
    const sqlFilePath = path.join(__dirname, 'database', 'complete_setup.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split the SQL content by statements and execute them
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        await connection.query(statement);
        console.log(`✅ Statement ${i + 1}/${statements.length} executed`);
      } catch (error) {
        console.error(`❌ Error in statement ${i + 1}:`, error.message);
        if (!error.message.includes('already exists')) {
          throw error;
        }
      }
    }
    
    console.log('✅ Database setup completed successfully!');
    console.log('📊 Database Structure:');
    
    // Verify the setup
    const [result] = await connection.query(`
      SELECT 'Platforms' as table_name, COUNT(*) as count FROM food_delivery.platforms
      UNION ALL
      SELECT 'Restaurants', COUNT(*) FROM food_delivery.restaurants
      UNION ALL
      SELECT 'Products', COUNT(*) FROM food_delivery.products
      UNION ALL
      SELECT 'Platform Listings', COUNT(*) FROM food_delivery.platform_listings
    `);
    
    console.table(result);
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupDatabase();
