declare module '@/config' {
  interface Config {
    COMMENT_URL: string;
    // 添加其他配置项的类型
  }
  const config: Config;
  export default config;
}

declare module '@/router' {
  import type { Router } from 'vue-router';
  const router: Router;
  export default router;
}

declare module '@/store' {
  import type { Store } from 'vuex';
  const store: Store<any>;
  export default store;
}

declare module '@/utils/utils' {
  const utils: {
    [key: string]: any;
  };
  export default utils;
} 