const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);

// Extract version info
const version = packageJson.version;
const majorVersion = version.split('.')[0];

// Create version info object
const versionInfo = {
    version: version,
    majorVersion: majorVersion,
    buildTime: new Date().toISOString()
};

// Write to public/version.json
const versionFilePath = path.join(__dirname, '..', 'public', 'version.json');
fs.writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2));

console.log(`Updated version.json with version ${version} (major: ${majorVersion})`);