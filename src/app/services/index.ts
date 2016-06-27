import { HTTP_PROVIDERS } from '@angular/http';
import { TestRequestService } from './test-requests';
import { UserService } from './user';

export {
  TestRequestService,
  UserService
}

export default [
  HTTP_PROVIDERS,
  TestRequestService,
  UserService
];