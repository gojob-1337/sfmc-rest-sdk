import { Requestable, RequestType } from '../common/requestable';
import { Scope } from '../common/scope';

export class Contacts extends Requestable {
  private readonly endpointRoot: string = 'contacts/v1/contacts/actions/';

  deleteByKey(contactsKey: string[]) {
    return this.authenticatedRequest({
      type: RequestType.POST,
      endpoint: `${this.endpointRoot}delete?type=keys`,
      scope: Scope.list_and_subscribers_write,
      data: {
        values: contactsKey,
        DeleteOperationType: 'ContactAndAttributes',
      },
    });
  }
}
