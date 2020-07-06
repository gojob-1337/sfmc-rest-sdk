import { Auth } from '../auth/auth';
import { DataEventsASync } from './async/data-events-async';
import { DataEventsSync } from './sync/data-events-sync';

/**
 * Wrap `Data Events` SFMC REST API
 * https://developer.salesforce.com/docs/atlas.en-us.noversion.mc-apis.meta/mc-apis/asynchronous_processing_scenarios.htm
 */
export class DataEvents {
  public readonly sync: DataEventsSync;
  public readonly async: DataEventsASync;

  constructor(private readonly auth: Auth) {
    this.sync = new DataEventsSync(this.auth);
    this.async = new DataEventsASync(this.auth);
  }
}
