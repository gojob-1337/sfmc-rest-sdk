import axios from 'axios';

import { SFMCOptions } from '../options';

export interface AuthData {
  requestedAt: Date;
  token: string;
  expireIn: number;
  scope: string;
  restInstanceUrl: string;
  soapInstanceUrl: string;
}

/**
 * Handle authentification with SFMC, through the REST /v2/token API
 */
export class Auth {
  private authData?: AuthData;

  constructor(private readonly options: SFMCOptions) {}

  /**
   * Request an acces token for server-to-server integration to the /v2/token SFMC endpoint.
   * The delivred authorisation will have all attributes described in SFMC
   * Acces Token doc: https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/access-token-s2s.htm
   *
   * @returns the data relative to an authenticated session
   * @see getAuthData
   */
  async requestToken() {
    const { clientId: client_id, clientSecret: client_secret, grantType: grant_type } = this.options;

    try {
      const response = await axios.post(
        `https://${this.options.domain}.auth.marketingcloudapis.com/v2/token`,
        {
          client_id,
          client_secret,
          grant_type,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );

      this.authData = {
        requestedAt: new Date(),
        token: response.data.access_token,
        expireIn: response.data.expires_in,
        scope: response.data.scope,
        restInstanceUrl: response.data.rest_instance_url,
        soapInstanceUrl: response.data.soap_instance_url,
      };

      return this.authData;
    } catch (e) {
      throw new Error(`Cannot get authentification token: ${e}`);
    }
  }

  /**
   * Accessor to the authData delivred by a requestToken request
   *
   * @returns an object containing :
   *  requestedAt - date of the token request,
   *  token - the delivred token
   *  expireIn - the absolute validity of the token in seconds
   *  scope - the SFMC scope addressed by this token
   *  restInstanceUrl - the SFMC REST url addressed by this token
   *  soapInstanceUrl - the SFMC SOAP url addressed by this token
   */
  getAuthData() {
    return this.authData;
  }

  /**
   * Accessor the the SFMC domain addressed by this Auth instance
   *
   * @returns a string representing the domain
   */
  getDomain() {
    return this.options.domain;
  }

  /**
   * Deduce if the current token is valid or expired
   *
   * @returns true if the token is valid
   */
  hasValidToken(): boolean {
    if (!this.authData) {
      return false;
    }

    return Date.now() < this.authData.requestedAt.getTime() + this.authData.expireIn;
  }
}
