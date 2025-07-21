// Example backend code to fetch frontend version

const https = require('https');
const http = require('http');

/**
 * Fetches version info from the frontend's /version.json endpoint
 * @param {string} frontendUrl - The URL of the frontend (e.g., 'https://app.example.com')
 * @returns {Promise<Object>} Version information
 */
async function fetchFrontendVersion(frontendUrl) {
    return new Promise((resolve, reject) => {
        const url = new URL('/version.json', frontendUrl);
        const client = url.protocol === 'https:' ? https : http;
        
        client.get(url.toString(), (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const versionInfo = JSON.parse(data);
                    resolve(versionInfo);
                } catch (error) {
                    reject(new Error('Failed to parse version data'));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Example usage with Express.js backend
const express = require('express');
const app = express();

// Store frontend version in memory (refresh periodically)
let frontendVersion = null;

// Refresh version every 5 minutes
async function refreshFrontendVersion() {
    try {
        frontendVersion = await fetchFrontendVersion(process.env.FRONTEND_URL || 'http://localhost:3000');
        console.log('Frontend version updated:', frontendVersion);
    } catch (error) {
        console.error('Failed to fetch frontend version:', error);
    }
}

// Initial fetch and periodic refresh
refreshFrontendVersion();
setInterval(refreshFrontendVersion, 5 * 60 * 1000);

// API endpoint to get frontend version
app.get('/api/frontend-version', (req, res) => {
    res.json(frontendVersion || { error: 'Version not available' });
});

// Alternative: Using axios (if you prefer)
async function fetchVersionWithAxios(frontendUrl) {
    const axios = require('axios');
    try {
        const response = await axios.get(`${frontendUrl}/version.json`);
        return response.data;
    } catch (error) {
        console.error('Error fetching version:', error);
        throw error;
    }
}

// Example: Set version as environment variable during backend startup
async function setVersionEnvVar() {
    try {
        const versionInfo = await fetchFrontendVersion(process.env.FRONTEND_URL);
        process.env.FRONTEND_VERSION = versionInfo.version;
        process.env.FRONTEND_MAJOR_VERSION = versionInfo.majorVersion;
        console.log(`Frontend version set: ${versionInfo.version} (Major: ${versionInfo.majorVersion})`);
    } catch (error) {
        console.error('Failed to set frontend version:', error);
    }
}

module.exports = {
    fetchFrontendVersion,
    fetchVersionWithAxios,
    setVersionEnvVar
};