#!/usr/bin/env node

// Keep-alive script for Render free tier
// Run this as a cron job to prevent server from sleeping

const axios = require('axios');

const SERVER_URL = 'https://hymovie.onrender.com';
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes (before 15min timeout)

let pingCount = 0;

const pingServer = async () => {
  try {
    pingCount++;
    console.log(`[${new Date().toISOString()}] Ping #${pingCount} - Pinging server...`);
    
    const response = await axios.get(`${SERVER_URL}/health`, {
      timeout: 30000
    });
    
    console.log(`✅ Server responded: ${response.data.status}`);
    
  } catch (error) {
    console.error(`❌ Ping failed:`, error.message);
    
    // If server is sleeping, try to wake it up
    if (error.code === 'ECONNABORTED' || error.response?.status >= 500) {
      console.log('🔄 Server might be sleeping, attempting wake-up...');
      try {
        await axios.get(SERVER_URL, { timeout: 60000 });
        console.log('✅ Server wake-up successful');
      } catch (wakeUpError) {
        console.error('❌ Wake-up failed:', wakeUpError.message);
      }
    }
  }
};

// Ping immediately
pingServer();

// Set up interval
setInterval(pingServer, PING_INTERVAL);

console.log(`🚀 Keep-alive service started for ${SERVER_URL}`);
console.log(`⏰ Pinging every ${PING_INTERVAL / 1000 / 60} minutes`);
console.log('Press Ctrl+C to stop');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Keep-alive service stopped');
  process.exit(0);
});
