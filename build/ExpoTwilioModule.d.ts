import { NativeModule } from 'expo';
import { ExpoTwilioModuleEvents } from './ExpoTwilio.types';
declare class ExpoTwilioModule extends NativeModule<ExpoTwilioModuleEvents> {
    PI: number;
    hello(): string;
    setValueAsync(value: string): Promise<void>;
    voice_connect(accessToken: string, twimlParams: any, calleeName: string, displayName: string): string;
}
declare const _default: ExpoTwilioModule;
export default _default;
//# sourceMappingURL=ExpoTwilioModule.d.ts.map