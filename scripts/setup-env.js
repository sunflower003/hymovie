const fs = require('fs');
const path = require('path');

// Setup environment files
const setupEnvFiles = () => {
  console.log('🔧 Setting up environment files...');

  // Client environment files
  const clientEnvExample = path.join(__dirname, '../client/.env.example');
  const clientEnvDev = path.join(__dirname, '../client/.env.development');
  
  if (!fs.existsSync(clientEnvDev) && fs.existsSync(clientEnvExample)) {
    fs.copyFileSync(clientEnvExample, clientEnvDev);
    console.log('✅ Created client/.env.development');
  }

  // Server environment file
  const serverEnvExample = path.join(__dirname, '../server/.env.example');
  const serverEnv = path.join(__dirname, '../server/.env');
  
  if (!fs.existsSync(serverEnv) && fs.existsSync(serverEnvExample)) {
    fs.copyFileSync(serverEnvExample, serverEnv);
    console.log('✅ Created server/.env');
  }

  console.log('🎉 Environment setup complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update environment variables in .env files if needed');
  console.log('2. Run "npm run dev" to start both frontend and backend');
  console.log('3. Visit http://localhost:3000 to see your app');
};

setupEnvFiles();
