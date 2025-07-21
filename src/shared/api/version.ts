// Version information injected by webpack
declare global {
    const __APP_VERSION__: string;
    const __APP_MAJOR_VERSION__: string;
}

export interface VersionInfo {
    version: string;
    majorVersion: string;
    buildTime?: string;
}

export const getVersionInfo = (): VersionInfo => {
    return {
        version: __APP_VERSION__,
        majorVersion: __APP_MAJOR_VERSION__,
    };
};

// Fetch version from static file (alternative approach)
export const fetchVersionInfo = async (): Promise<VersionInfo> => {
    try {
        const response = await fetch('/version.json');
        if (!response.ok) {
            throw new Error('Failed to fetch version info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching version info:', error);
        // Fallback to webpack-injected values
        return getVersionInfo();
    }
};