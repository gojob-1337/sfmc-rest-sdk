import { Scope } from './../../common/scope';
import { Requestable, RequestType } from '../../common/requestable';

export interface SyncPostData {
  keys: any;
  values: any;
}

/**
 * Wrap `Data Events` Synchronous SFMC REST API
 * https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/asynchronous_processing_scenarios.htm
 */
export interface SyncPutData {
  values: any;
}

export class DataEventsSync extends Requestable {
  private readonly endpointRoot: string = 'hub/v1/dataevents/';

  /**
   * Insert rows of data into a SFMC dataextension
   *
   * @param data - Array of rows content to insert
   * @param dataExtensionKey - Targetted dataextension key
   *
   * @returns the http response sent by SFMC
   */
  insertRows(data: Array<SyncPostData>, dataExtensionKey: string) {
    return this.authenticatedRequest({
      type: RequestType.POST,
      endpoint: `${this.endpointRoot}key:${dataExtensionKey}/rowset`,
      scope: Scope.data_extensions_write,
      data,
    });
  }

  /**
   * Upsert one row of data into a SFMC dataextension
   *
   * @param data - A row content to insert
   * @param primaryKey - The primary key of the targetted row to update
   * @param dataExtensionKey - Targetted dataextension key
   *
   * @returns the http response sent by SFMC
   */
  upsert(data: SyncPutData, primaryKey: { key: string; value: string }, dataExtensionKey: string) {
    return this.authenticatedRequest({
      type: RequestType.PUT,
      endpoint: `${this.endpointRoot}key:${dataExtensionKey}/rows/${primaryKey.key}:${primaryKey.value}`,
      scope: Scope.data_extensions_write,
      data,
    });
  }
}
