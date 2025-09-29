import type { Constants } from '../constants';
export interface NativeErrorInfo {
    code: number;
    message: string;
}
export interface NativeErrorEvent {
    type: Constants.VoiceEventError;
    error: NativeErrorInfo;
}
//# sourceMappingURL=Error.d.ts.map