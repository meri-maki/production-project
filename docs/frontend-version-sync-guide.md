# Frontend Version Synchronization Guide

This guide explains how to fetch the frontend version on the backend and commit the major version to the backend repository environment.

## Overview

We've implemented multiple approaches to expose and sync the frontend version:

1. **Static JSON file** served by the frontend (`/version.json`)
2. **Webpack-injected constants** available in the frontend code
3. **GitHub Actions workflow** to automatically sync versions between repositories
4. **Backend fetching utilities** to retrieve version at runtime

## Frontend Setup

### 1. Version Exposure

The frontend exposes version information through:

- **Static file**: `/public/version.json` (updated during build)
- **Global constants**: `__APP_VERSION__` and `__APP_MAJOR_VERSION__` (injected by webpack)

### 2. Build Scripts

Two scripts handle version management:

```bash
# Extract version information (used in CI/CD)
node scripts/extract-version.js

# Update public/version.json before build
node scripts/update-version-file.js
```

The build commands automatically update the version file:
```json
{
  "prebuild:prod": "node scripts/update-version-file.js",
  "build:prod": "webpack --env mode=production"
}
```

### 3. Accessing Version in Frontend Code

```typescript
import { getVersionInfo, fetchVersionInfo } from '@/shared/api/version';

// Get webpack-injected version
const version = getVersionInfo();
console.log(version.majorVersion); // "1"

// Fetch from static file
const versionFromFile = await fetchVersionInfo();
```

## Backend Integration

### Method 1: Runtime Fetching

Fetch the version from the frontend's `/version.json` endpoint:

```javascript
const { fetchFrontendVersion } = require('./scripts/backend-version-fetcher-example');

// Fetch once during startup
const versionInfo = await fetchFrontendVersion('https://your-frontend.com');
process.env.FRONTEND_MAJOR_VERSION = versionInfo.majorVersion;
```

### Method 2: CI/CD Synchronization

Use the GitHub Actions workflow to automatically commit version changes:

1. Set up a Personal Access Token with repo permissions
2. Add it as `BACKEND_REPO_TOKEN` in your frontend repo secrets
3. Update the workflow file with your backend repo details:

```yaml
repository: YOUR_ORG/YOUR_BACKEND_REPO
```

The workflow will:
- Trigger when `package.json` changes on main branch
- Extract the version and major version
- Update the backend's `.env` file
- Create/update `config/frontend-version.json`
- Commit and push changes

### Method 3: Build-time Integration

During your deployment pipeline:

```bash
# In your CI/CD pipeline
FRONTEND_VERSION=$(node -p "require('./package.json').version")
FRONTEND_MAJOR_VERSION=$(echo $FRONTEND_VERSION | cut -d. -f1)

# Pass to backend deployment
docker build --build-arg FRONTEND_MAJOR_VERSION=$FRONTEND_MAJOR_VERSION ...
```

## Best Practices

1. **Version Format**: Use semantic versioning (MAJOR.MINOR.PATCH)
2. **Caching**: Cache version info on backend with periodic refresh
3. **Fallbacks**: Always provide fallback values if version fetch fails
4. **Security**: Use HTTPS for production version endpoints
5. **Monitoring**: Log version mismatches for debugging

## Environment Variables

Backend should expect these environment variables:

```env
FRONTEND_VERSION=1.0.0
FRONTEND_MAJOR_VERSION=1
FRONTEND_URL=https://your-frontend.com
```

## Troubleshooting

### Version not updating
- Check if `prebuild` scripts are running
- Verify GitHub Actions has correct permissions
- Ensure `/version.json` is accessible (not blocked by auth)

### CORS issues
- Add backend domain to frontend CORS whitelist
- Use server-side fetching instead of browser requests

### Version mismatch
- Check deployment order (frontend should deploy first)
- Verify caching headers on `/version.json`
- Consider adding version checks to health endpoints