import { TransactionModule } from 'src/modules/transactions/transaction.module';
import { UserModule } from 'src/modules/user/user.module';

export const routerConfig = [
  {
    path: '/users',
    module: UserModule,
  },
  {
    path: '/transactions',
    module: TransactionModule,
  },
];
