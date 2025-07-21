const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

// Extract version
const version = packageJson.version;
const majorVersion = version.split('.')[0];

console.log(`Full version: ${version}`);
console.log(`Major version: ${majorVersion}`);

// Export for use in CI/CD
console.log(`::set-output name=version::${version}`);
console.log(`::set-output name=major_version::${majorVersion}`);

// Also write to a file that can be read by other scripts
const versionInfo = {
    version: version,
    majorVersion: majorVersion,
    buildTime: new Date().toISOString()
};

fs.writeFileSync(path.join(__dirname, '..', 'version-info.json'), JSON.stringify(versionInfo, null, 2));