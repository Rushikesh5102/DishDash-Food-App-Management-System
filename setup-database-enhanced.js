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
    
    // First, execute the complete setup SQL file
    const complete_sqlFilePath = path.join(__dirname, 'database', 'complete_setup.sql');
    const complete_sqlContent = fs.readFileSync(complete_sqlFilePath, 'utf8');
    
    // Split the SQL content by statements and execute them
    const complete_statements = complete_sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log('\n📝 Step 1: Setting up base schema and data...');
    for (let i = 0; i < complete_statements.length; i++) {
      const statement = complete_statements[i];
      try {
        await connection.query(statement);
        process.stdout.write(`\r✅ Base schema statement ${i + 1}/${complete_statements.length} executed`);
      } catch (error) {
        if (!error.message.includes('already exists')) {
          console.error(`\n❌ Error in statement ${i + 1}: ${error.message}`);
          throw error;
        }
      }
    }
    
    console.log('\n✅ Base schema setup completed!');
    
    // Now execute the add_features SQL file for new tables
    const features_sqlFilePath = path.join(__dirname, 'database', 'add_features.sql');
    const features_sqlContent = fs.readFileSync(features_sqlFilePath, 'utf8');
    
    const features_statements = features_sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log('\n📝 Step 2: Adding new feature tables...');
    for (let i = 0; i < features_statements.length; i++) {
      const statement = features_statements[i];
      try {
        await connection.query(statement);
        process.stdout.write(`\r✅ Feature table statement ${i + 1}/${features_statements.length} executed`);
      } catch (error) {
        if (!error.message.includes('already exists')) {
          console.error(`\n❌ Error in statement ${i + 1}: ${error.message}`);
          // Don't throw, just continue - some statements may be optional
        }
      }
    }
    
    console.log('\n✅ Feature tables setup completed!');
    
    // Verify the setup
    console.log('\n📊 Database Verification:');
    const [result] = await connection.query(`
      SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'food_delivery'
      ORDER BY TABLE_NAME
    `);
    
    result.forEach(row => {
      console.log(`✅ Table: ${row.TABLE_NAME}`);
    });
    
    // Get row counts for all main tables
    console.log('\n📈 Data Summary:');
    const [counts] = await connection.query(`
      SELECT 'Platforms' as table_name, COUNT(*) as count FROM food_delivery.platforms
      UNION ALL
      SELECT 'Restaurants', COUNT(*) FROM food_delivery.restaurants
      UNION ALL
      SELECT 'Products', COUNT(*) FROM food_delivery.products
      UNION ALL
      SELECT 'Platform Listings', COUNT(*) FROM food_delivery.platform_listings
      UNION ALL
      SELECT 'Users', COUNT(*) FROM food_delivery.users
      UNION ALL
      SELECT 'Orders', COUNT(*) FROM food_delivery.orders
      UNION ALL
      SELECT 'Favorites', COUNT(*) FROM food_delivery.favorites
      UNION ALL
      SELECT 'Ratings', COUNT(*) FROM food_delivery.ratings
      UNION ALL
      SELECT 'Notifications', COUNT(*) FROM food_delivery.notifications
    `);
    
    counts.forEach(count => {
      const countText = count.count > 0 ? `${count.count}` : '0';
      const icon = count.count > 0 ? '✅' : '⏹️';
      console.log(`${icon} ${count.table_name}: ${countText} records`);
    });
    
    console.log('\n🎉 Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

setupDatabase();
