#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BACKEND_REPO_URL = process.env.BACKEND_REPO_URL || 'https://github.com/your-org/backend-repo.git';
const BACKEND_REPO_TOKEN = process.env.BACKEND_REPO_TOKEN;
const TEMP_DIR = path.join(__dirname, '../temp-backend');

async function syncVersionToBackend() {
  try {
    // 1. Extract frontend version
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    const fullVersion = packageJson.version;
    const majorVersion = fullVersion.split('.')[0];
    
    console.log(`Frontend version: ${fullVersion}`);
    console.log(`Major version: ${majorVersion}`);
    
    // 2. Clone backend repository
    console.log('Cloning backend repository...');
    if (fs.existsSync(TEMP_DIR)) {
      execSync(`rm -rf ${TEMP_DIR}`);
    }
    
    const cloneUrl = BACKEND_REPO_TOKEN 
      ? BACKEND_REPO_URL.replace('https://', `https://${BACKEND_REPO_TOKEN}@`)
      : BACKEND_REPO_URL;
      
    execSync(`git clone ${cloneUrl} ${TEMP_DIR}`);
    
    // 3. Update version file in backend
    const versionFilePath = path.join(TEMP_DIR, '.env.frontend-version');
    const versionContent = `FRONTEND_MAJOR_VERSION=${majorVersion}\nFRONTEND_FULL_VERSION=${fullVersion}\nLAST_UPDATED=${new Date().toISOString()}\n`;
    
    fs.writeFileSync(versionFilePath, versionContent);
    
    // 4. Commit and push changes
    process.chdir(TEMP_DIR);
    execSync('git config user.name "Frontend Version Sync"');
    execSync('git config user.email "noreply@yourcompany.com"');
    execSync('git add .env.frontend-version');
    
    try {
      execSync(`git commit -m "chore: update frontend version to ${fullVersion} (major: ${majorVersion})"`);
      execSync('git push origin main');
      console.log('✅ Version successfully synced to backend repository');
    } catch (error) {
      if (error.message.includes('nothing to commit')) {
        console.log('ℹ️  No version changes to commit');
      } else {
        throw error;
      }
    }
    
    // 5. Cleanup
    process.chdir(path.join(__dirname, '..'));
    execSync(`rm -rf ${TEMP_DIR}`);
    
  } catch (error) {
    console.error('❌ Error syncing version:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  syncVersionToBackend();
}

module.exports = { syncVersionToBackend };