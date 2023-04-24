import { UserModule } from 'src/modules/user/user.module';

export const routerConfig = [
  {
    path: '/users',
    module: UserModule,
  },
];
