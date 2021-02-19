export interface SophosConfig {
    clientId: string;
    clientSecret: string;
    partnerId?: string;
}
export interface SophosTenant {
    id?: string;
    name?: string;
    dataGeography?: string;
    dataRegion?: string;
    billingType?: string;
    partner?: object;
    organization?: string;
    apiHost?: string;
}
export interface Endpoint {
    id?: string;
    type?: string;
    tenant?: {
        id?: string;
    };
    hostname?: string;
    health?: {
        overall?: string;
        threats?: {
            status?: string;
        };
        services?: {
            status?: string;
            serviceDetails?: EndpointService[];
        };
    };
    os?: {
        isServer?: boolean;
        platform?: string;
        name?: string;
        majorVersion?: number;
        minorVersion?: number;
        build?: number;
    };
    ipv4Addresses?: string[];
    macAddresses?: string[];
    associatedPerson?: {
        name?: string;
        viaLogin?: string;
        id?: string;
    };
    tamperProtectionEnabled?: boolean;
    assignedProducts?: EndpointServiceAssignedProduct[];
    lastSeenAt?: string;
    encryption?: {
        volumes?: EndpointEncryptionVolume[];
    };
}
export interface EndpointService {
    name: string;
    status: string;
}
export interface EndpointServiceAssignedProduct {
    code: string;
    version: string;
    status: string;
}
export interface EndpointEncryptionVolume {
    volumeId: string;
    status: string;
}
export interface AccessToken {
    access_token?: string;
    errorCode?: string;
    expires_in?: string;
    message?: string;
    refresh_token: string;
    token_type: string;
    trackingId: string;
}
