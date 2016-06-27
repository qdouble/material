import { DBSchema } from '@ngrx/db';

const schema: DBSchema = {
    version: 1,
    name: 'user_app',
    stores: {
        users: {
            autoIncrement: true,
            primaryKey: 'id'
        }
    }
};

export default schema;
