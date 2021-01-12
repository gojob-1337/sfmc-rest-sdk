import { Requestable, RequestType } from '../common/requestable';
import { Scope } from '../common/scope';

interface StringMap {
  [key: string]: string;
}

export interface EmailRecipient {
  contactKey: string;
  to: string;
  attributes: Array<StringMap>;
}

export interface EmailData {
  definitionKey: string;
  recipient: EmailRecipient;
}

export type DefinitionStatus = 'Active' | 'Inactive' | 'Deleted';

export interface DefinitionData {
  status: DefinitionStatus;
  name: string;
  subscriptions: DefinitionSubscription;
}

export interface DefinitionSubscription {
  list: string;
  dataExtension: string;
  autoAddSubscriber?: boolean;
  updateSubscriber?: boolean;
}

export class Messaging extends Requestable {
  private readonly endpointRoot: string = 'messaging/v1/email/messages/';

  updateDefinition(definition: DefinitionData, definitionKey: string, customerKey: string) {
    return this.authenticatedRequest({
      type: RequestType.PATCH,
      endpoint: `messaging/v1/email/definitions/${definitionKey}`,
      scope: Scope.email_write,
      data: {
        content: {
          customerKey,
        },
        ...definition,
      },
    });
  }

  createDefinition(definition: DefinitionData, definitionKey: string, customerKey: string) {
    return this.authenticatedRequest({
      type: RequestType.POST,
      endpoint: `messaging/v1/email/definitions`,
      scope: Scope.email_send,
      data: {
        definitionKey,
        content: {
          customerKey,
        },
        ...definition,
      },
    });
  }

  sendSingleEmail(data: EmailData, messageKey: string) {
    return this.authenticatedRequest({
      type: RequestType.POST,
      endpoint: `${this.endpointRoot}${messageKey}`,
      scope: Scope.email_send,
      data,
    });
  }
}
