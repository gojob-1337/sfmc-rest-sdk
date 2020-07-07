import { AuthData } from './../auth/auth';
import axios from 'axios';

import { Auth } from '../auth/auth';

export enum RequestType {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export interface RequestableOptions {
  type: RequestType;
  endpoint: string;
  scope: string;
  data?: any;
}

/**
 * Provide a wrapper on top of Axios http client, and ensure authentification have been made with SFMC
 */
export class Requestable {
  constructor(private readonly auth: Auth) {}

  /**
   * Ensure authentification with SFMC is present, and send a REST http request to SFMC API
   *
   * @param options - Object allowing to forge an HTTP request to SFMC
   * @returns The http axios response
   */
  async authenticatedRequest(options: RequestableOptions) {
    const { scope, data, endpoint, type } = options;

    if (!this.auth.hasValidToken()) {
      await this.auth.requestToken();
    }

    const authData: AuthData | undefined = this.auth.getAuthData();

    if (!authData) {
      throw new Error('Cannot make an authenticated request with invalid authentification data');
    }

    const { token } = authData;
    const domain = this.auth.getDomain();

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      scope,
    };

    let response: any;

    switch (type) {
      case RequestType.GET:
        response = await axios.get(`https://${domain}.rest.marketingcloudapis.com/${endpoint}`, {
          headers,
        });
        break;
      case RequestType.POST:
        response = await axios.post(`https://${domain}.rest.marketingcloudapis.com/${endpoint}`, data, {
          headers,
        });
        break;
      case RequestType.PATCH:
        response = await axios.patch(`https://${domain}.rest.marketingcloudapis.com/${endpoint}`, data, {
          headers,
        });
        break;
      case RequestType.PUT:
        response = await axios.put(`https://${domain}.rest.marketingcloudapis.com/${endpoint}`, data, {
          headers,
        });
        break;
      case RequestType.DELETE:
        response = await axios.delete(`https://${domain}.rest.marketingcloudapis.com/${endpoint}`, {
          headers,
        });
        break;
    }

    return response;
  }
}
