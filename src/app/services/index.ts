import { HTTP_PROVIDERS } from '@angular/http';
import { UserService } from './user';

export {
    UserService
}

export default [
    HTTP_PROVIDERS,
    UserService
];