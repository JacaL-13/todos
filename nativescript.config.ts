import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.todos',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;