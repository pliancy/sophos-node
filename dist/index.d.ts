import { SophosTenant, Endpoint, SophosConfig } from './types';
export { SophosConfig, SophosTenant, Endpoint };
export declare class Sophos {
    private readonly _config;
    domain: string;
    accessToken: string;
    constructor(_config: SophosConfig);
    getTenants(): Promise<SophosTenant[]>;
    getEndpoints(tenantId: string, tenantApiHost: string): Promise<Endpoint[]>;
    private _authenticate;
    private _SophosRequest;
}
export default Sophos;
