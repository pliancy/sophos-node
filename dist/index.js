"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sophos = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
class Sophos {
    constructor(_config) {
        if (!_config.clientId || !_config.clientSecret)
            throw new Error('Missing required inputs for Sophos constructor');
        this._config = _config;
        this.domain = 'https://api.central.sophos.com';
        this.accessToken = '';
    }
    async getTenants() {
        let tenants = [];
        let pageNum = 1;
        let pageTotal = 1;
        while (pageTotal - pageNum >= 0) {
            const res = await this._SophosRequest(`${this.domain}/partner/v1/tenants?pageTotal=true&page=${pageNum}&pagesize=100`, {
                method: 'GET',
                headers: {
                    'X-Partner-ID': this._config.partnerId,
                },
            });
            const sophosReturn = res.data;
            pageTotal = sophosReturn.pages.total;
            pageNum++;
            tenants = tenants.concat(sophosReturn.items);
        }
        return tenants;
    }
    async getEndpoints(tenantId, tenantApiHost) {
        let endpoints = [];
        let pageKey = '';
        let status = true;
        while (status) {
            const res = await this._SophosRequest(`${tenantApiHost}/endpoint/v1/endpoints?pageFromKey=${pageKey}&pagesize=500`, {
                method: 'GET',
                headers: {
                    'X-Tenant-ID': tenantId,
                },
            });
            const sophosReturn = res.data;
            endpoints = endpoints.concat(sophosReturn.items);
            pageKey = sophosReturn.pages.nextKey;
            if (!pageKey) {
                status = false;
            }
        }
        return endpoints;
    }
    async _authenticate() {
        const res = await axios_1.default('https://id.sophos.com/api/v2/oauth2/token', {
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs_1.default.stringify({
                grant_type: 'client_credentials',
                scope: 'token',
                client_id: this._config.clientId,
                client_secret: this._config.clientSecret,
            }),
        });
        const { data: AccessToken } = res;
        this.accessToken = AccessToken.access_token;
        return AccessToken.access_token;
    }
    async _SophosRequest(url, options) {
        try {
            if (!this.accessToken) {
                const token = await this._authenticate();
                options.headers.Authorization = `Bearer ${token}`;
            }
            else {
                options.headers.Authorization = `Bearer ${this.accessToken}`;
            }
            const res = await axios_1.default(url, options);
            return res;
        }
        catch (err) {
            if (err.statusCode === 401) {
                const token = await this._authenticate();
                options.headers.Authorization = `Bearer ${token}`;
                const res = await axios_1.default(url, options);
                return res;
            }
            throw err;
        }
    }
}
exports.Sophos = Sophos;
exports.default = Sophos;
