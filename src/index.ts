import { Contacts } from './contacts/contacts';
import { Messaging } from './messaging/messaging';
import { DataEvents } from './data-events/data-events';
import { SFMCOptions } from './options';
import { Auth } from './auth/auth';

/**
 * Base SDK class that handle configuration and provide objects that wrap SFMC REST APIs
 */
class SFMC {
  public readonly auth: Auth;
  public readonly dataEvents: DataEvents;
  public readonly messaging: Messaging;
  public readonly contacts: Contacts;

  constructor(options: SFMCOptions) {
    this.auth = new Auth(options);
    this.dataEvents = new DataEvents(this.auth);
    this.messaging = new Messaging(this.auth);
    this.contacts = new Contacts(this.auth);
  }
}

export default SFMC;
