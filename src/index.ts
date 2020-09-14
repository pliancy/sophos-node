import got from 'got'
import qs from 'qs'

/**
 * The Config for the Sophos class
 * This interface allows utilization of sophos API
 * @export
 * @interface SophosConfig
 */
interface SophosConfig {
  clientId: string
  clientSecret: string
  partnerId?: string
}

// example interface for use in the sample commands
interface Tenant {
  id: string
  name: string
  dataGeography: 'US' | 'IE' | 'DE'
  dataRegion: string
  billingType: string
  parter: any
  organization: any
  apiHost: string
}

class Sophos {
  config: SophosConfig
  domain: string
  accessToken: string

  constructor (_config: SophosConfig) {
    this.config = _config
    this.domain = 'https://api.central.sophos.com'
    this.accessToken = ''
  }

  //
  // Example commands
  //

  async getTenants (): Promise<Tenant[]> {
    let sophos: any = []
    let pageNum = 1
    let pageTotal = 1
    while (pageTotal - pageNum >= 0) {
      const res = await this._SophosRequest(
        `${this.domain}/partner/v1/tenants?pageTotal=true&page=${pageNum}&pagesize=100`,
        {
          method: 'GET',
          headers: {
            'X-Partner-ID': this.config.partnerId
          }
        }
      )
      const sophosReturn = JSON.parse(res.body)
      pageTotal = sophosReturn.pages.total
      pageNum++
      sophos = sophos.concat(sophosReturn.items)
    }
    return sophos
  }

  async getEndpoints (
    tenantId: string,
    tenantApiHost: string
  ): Promise<object[]> {
    let sophos: any = []
    let pageKey = ''
    let status = true
    while (status) {
      const res = await this._SophosRequest(
        `${tenantApiHost}/endpoint/v1/endpoints?pageFromKey=${pageKey}&pagesize=500`,
        {
          method: 'GET',
          headers: {
            'X-Tenant-ID': tenantId
          }
        }
      )
      const sophosReturn = JSON.parse(res.body)
      sophos = sophos.concat(sophosReturn.items)
      pageKey = sophosReturn.pages.nextKey
      if (!pageKey) {
        status = false
      }
    }
    return sophos
  }

  private async _authenticate (): Promise<string> {
    const res = await got('https://id.sophos.com/api/v2/oauth2/token', {
      method: 'post',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: qs.stringify({
        grant_type: 'client_credentials',
        scope: 'token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret
      })
    })
    const body: any = JSON.parse(res.body)
    this.accessToken = body.access_token
    return body.access_token
  }

  private async _SophosRequest (url: string, options: any): Promise<any> {
    try {
      if (!this.accessToken) {
        const token = await this._authenticate()
        options.headers.Authorization = `Bearer ${token}`
      } else {
        options.headers.Authorization = `Bearer ${this.accessToken}`
      }
      const res = await got(url, options)

      return res
    } catch (err) {
      if (err.statusCode === 401) {
        const token = await this._authenticate()
        options.headers.Authorization = `Bearer ${token}`
        const res = await got(url, options)
        return res
      }
      throw err
    }
  }
}

export = Sophos
