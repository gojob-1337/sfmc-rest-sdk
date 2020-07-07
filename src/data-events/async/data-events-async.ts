import { Scope } from './../../common/scope';
import { Requestable, RequestType } from '../../common/requestable';

export interface ASyncData {
  items: any[];
}

export interface ASyncRequest {
  originDate: Date;
  status: string;
}

/**
 * Wrap `Data Events` Asynchronous SFMC REST API
 * https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/asynchronous_processing_scenarios.htm
 */
export class DataEventsASync extends Requestable {
  private readonly endpointRoot: string = 'data/v1/async/dataextensions/';

  /**
   * Insert rows of data into a SFMC dataextension
   *
   * @param data - Array of rows content to insert
   * @param dataExtensionKey - Targetted dataextension key
   *
   * @returns an object containing the request id to be processed by SFMC
   */
  async insertRows(data: Array<ASyncData>, dataExtensionKey: string) {
    const response = await this.authenticatedRequest({
      type: RequestType.POST,
      endpoint: `${this.endpointRoot}key:${dataExtensionKey}/rows`,
      scope: Scope.data_extensions_write,
      data,
    });

    return response.data;
  }

  /**
   * Upsert rows of data into a SFMC dataextension
   *
   * @param data - Array of rows content to insert
   * @param dataExtensionKey - Targetted dataextension key
   *
   * @returns an object containing the request id to be processed by SFMC
   */
  async upsertRows(data: Array<ASyncData>, dataExtensionKey: string) {
    const response = await this.authenticatedRequest({
      type: RequestType.PUT,
      endpoint: `${this.endpointRoot}key:${dataExtensionKey}/rows`,
      scope: Scope.data_extensions_write,
      data,
    });

    return response.data;
  }
}
