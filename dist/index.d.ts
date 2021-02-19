import { SophosConfig, SophosTenant, SophosEndpoint } from './types';
export { SophosConfig, SophosTenant, SophosEndpoint };
export declare class Sophos {
    private readonly _config;
    domain: string;
    accessToken: string;
    constructor(_config: SophosConfig);
    getTenants(): Promise<SophosTenant[]>;
    getEndpoints(tenantId: string, tenantApiHost: string): Promise<SophosEndpoint[]>;
    private _authenticate;
    private _SophosRequest;
}
export default Sophos;
