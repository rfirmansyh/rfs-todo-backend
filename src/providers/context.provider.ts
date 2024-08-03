import { ClsServiceManager } from 'nestjs-cls';
import { User } from '@/features/user/user.entity';

export class ContextProvider {
  private static readonly nameSpace = 'request';
  private static readonly authUserKey = 'user_key';

  private static getKeyWithNamespace(key: string): string {
    return `${ContextProvider.nameSpace}.${key}`;
  }

  private static get<T>(key: string) {
    const store = ClsServiceManager.getClsService();

    return store.get<T>(ContextProvider.getKeyWithNamespace(key));
  }
  private static set(key: string, value: any): void {
    const store = ClsServiceManager.getClsService();

    store.set(ContextProvider.getKeyWithNamespace(key), value);
  }

  static getAuthUser(): User | undefined {
    return ContextProvider.get<User>(ContextProvider.authUserKey);
  }
  static setAuthUser(user: User): void {
    ContextProvider.set(ContextProvider.authUserKey, user);
  }
}
