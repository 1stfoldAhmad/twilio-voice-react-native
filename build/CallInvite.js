/**
 * Copyright © 2022 Twilio, Inc. All rights reserved. Licensed under the Twilio
 * license.
 *
 * See LICENSE in the project root for license information.
 */
import { EventEmitter } from 'eventemitter3';
import { Call } from './Call';
import { NativeEventEmitter, NativeModule, Platform } from './common';
import { InvalidStateError } from './error/InvalidStateError';
import { TwilioError } from './error/TwilioError';
import { UnsupportedPlatformError } from './error/UnsupportedPlatformError';
import { constructTwilioError } from './error/utility';
import { validateCallMessage } from './CallMessage/CallMessage';
import { IncomingCallMessage } from './CallMessage/IncomingCallMessage';
import { OutgoingCallMessage } from './CallMessage/OutgoingCallMessage';
import { Constants } from './constants';
/**
 * Provides access to information about a call invite, including the call
 * parameters, and exposes functionality to accept or decline a call.
 *
 * @remarks
 *
 * Note that when a `CallInvite` is acted upon (i.e. when
 * {@link (CallInvite:class).accept} or {@link (CallInvite:class).reject} is
 * invoked), then the `CallInvite` is "settled".
 *
 * The state of the `CallInvite` is changed from
 * {@link (CallInvite:namespace).State.Pending} to
 * {@link (CallInvite:namespace).State.Accepted} or
 * {@link (CallInvite:namespace).State.Rejected} and the `CallInvite` can no
 * longer be acted upon further.
 *
 * Further action after "settling" a `CallInvite` will throw an error.
 *
 *  - See the {@link (CallInvite:namespace) | CallInvite namespace} for
 *    enumerations and types used by this class.
 *
 * @public
 */
export class CallInvite extends EventEmitter {
    /**
     * The current state of the call invite.
     *
     * @remarks
     * See {@link (CallInvite:namespace).State}.
     */
    _state;
    /**
     * The `Uuid` of this call invite. Used to identify calls between the JS and
     * native layer so we can associate events and native functionality between
     * the layers.
     */
    _uuid;
    /**
     * A string representing the SID of this call.
     */
    _callSid;
    /**
     * Call custom parameters.
     */
    _customParameters;
    /**
     * Call `from` parameter.
     */
    _from;
    /**
     * Call `to` parameter.
     */
    _to;
    /**
     * These objects should not be instantiated by consumers of the SDK. All
     * instances of the `CallInvite` class should be emitted by the SDK.
     *
     * @param nativeCallInviteInfo - A dataobject containing the native
     * information of a call invite.
     * @param state - Mocking options for testing.
     *
     * @internal
     */
    constructor({ uuid, callSid, customParameters, from, to }, state) {
        super();
        this._uuid = uuid;
        this._callSid = callSid;
        this._customParameters = { ...customParameters };
        this._from = from;
        this._to = to;
        this._state = state;
        NativeEventEmitter.addListener(Constants.ScopeCallInvite, this._handleNativeCallInviteEvent);
    }
    /**
     * This helper function serves as both a runtime-check error log and a
     * compile-time type-guard. If the switch-case statement below is non-
     * exhaustive, then the type passed to this function will _not_ have type
     * `never`.
     */
    _handleUnexpectedCallInviteEventType(event) {
        throw new TwilioError(`Unknown event type "${event?.type}" reached call invite.`);
    }
    /**
     * This intermediate native call invite event handler acts as a "gate", only
     * executing the actual call invite event handler (such as `Accepted`) if
     * this call invite object matches the `Uuid` of the call invite that had an
     * event raised.
     * @param nativeCallInviteEvent - A call invite event directly from the native
     * layer.
     */
    _handleNativeCallInviteEvent = (nativeCallInviteEvent) => {
        if (typeof nativeCallInviteEvent !== 'object') {
            throw new TwilioError(`Received a "${typeof nativeCallInviteEvent}" native call invite event.`);
        }
        if (nativeCallInviteEvent === null) {
            throw new TwilioError('Received a null native call invite event.');
        }
        if (typeof nativeCallInviteEvent.callSid !== 'string') {
            throw new TwilioError('Received a native call invite event without a call SID.');
        }
        if (nativeCallInviteEvent.callSid !== this._callSid) {
            return;
        }
        switch (nativeCallInviteEvent.type) {
            case Constants.CallInviteEventTypeValueAccepted:
                return this._handleCallInviteAccepted(nativeCallInviteEvent);
            case Constants.CallInviteEventTypeValueRejected:
                return this._handleCallInviteRejected();
            case Constants.CallInviteEventTypeValueCancelled:
                return this._handleCallInviteCancelled(nativeCallInviteEvent);
            case Constants.CallInviteEventTypeValueNotificationTapped:
                return this._handleCallInviteNotificationTapped();
            case Constants.CallEventMessageReceived:
                return this._handleMessageReceivedEvent(nativeCallInviteEvent);
            default:
                return this._handleUnexpectedCallInviteEventType(nativeCallInviteEvent);
        }
    };
    /**
     * Handler for the {@link (CallInvite:namespace).Event.MessageReceived} event.
     * @param nativeCallEvent - The native call event.
     */
    _handleMessageReceivedEvent = (nativeCallInviteEvent) => {
        const { callMessage: callMessageInfo } = nativeCallInviteEvent;
        const callMessage = new IncomingCallMessage(callMessageInfo);
        this.emit(CallInvite.Event.MessageReceived, callMessage);
    };
    /**
     * Handle when this call invite is accepted.
     */
    _handleCallInviteAccepted = ({ callInvite, }) => {
        this._state = CallInvite.State.Accepted;
        const callInfo = {
            uuid: callInvite.uuid,
            customParameters: callInvite.customParameters,
            sid: callInvite.callSid,
            from: callInvite.from,
            to: callInvite.to,
        };
        const call = new Call(callInfo);
        this.emit(CallInvite.Event.Accepted, call);
    };
    /**
     * Handle when this call invite is rejected.
     */
    _handleCallInviteRejected = () => {
        this._state = CallInvite.State.Rejected;
        this.emit(CallInvite.Event.Rejected);
    };
    /**
     * Handle when a call invite is cancelled.
     */
    _handleCallInviteCancelled = (nativeCallInviteCancelledEvent) => {
        this._state = CallInvite.State.Cancelled;
        const error = nativeCallInviteCancelledEvent.error
            ? constructTwilioError(nativeCallInviteCancelledEvent.error.message, nativeCallInviteCancelledEvent.error.code)
            : undefined;
        this.emit(CallInvite.Event.Cancelled, error);
    };
    /**
     * Handle when a call invite notification is tapped.
     */
    _handleCallInviteNotificationTapped = () => {
        this.emit(CallInvite.Event.NotificationTapped);
    };
    /**
     * Accept a call invite. Sets the state of this call invite to
     * {@link (CallInvite:namespace).State.Accepted}.
     * @param options - Options to pass to the native layer when accepting the
     * call.
     * @returns
     *  - Resolves when a {@link (Call:class) | Call object} associated with this
     *    {@link (CallInvite:class)} has been created.
     */
    async accept(options = {}) {
        if (this._state !== CallInvite.State.Pending) {
            throw new InvalidStateError(`Call in state "${this._state}", ` +
                `expected state "${CallInvite.State.Pending}".`);
        }
        const acceptResult = await NativeModule.callInvite_accept(this._uuid, options)
            .then((callInfo) => {
            return { type: 'ok', callInfo };
        })
            .catch((error) => {
            const code = error.userInfo.code;
            const message = error.userInfo.message;
            return { type: 'err', message, code };
        });
        if (acceptResult.type === 'err') {
            throw constructTwilioError(acceptResult.message, acceptResult.code);
        }
        return new Call(acceptResult.callInfo);
    }
    /**
     * Reject a call invite. Sets the state of this call invite to
     * {@link (CallInvite:namespace).State.Rejected}.
     * @returns
     *  - Resolves when the {@link (CallInvite:class)} has been rejected.
     */
    async reject() {
        if (this._state !== CallInvite.State.Pending) {
            throw new InvalidStateError(`Call in state "${this._state}", ` +
                `expected state "${CallInvite.State.Pending}".`);
        }
        await NativeModule.callInvite_reject(this._uuid);
    }
    /**
     * Check if a `CallInvite` is valid.
     *
     * @returns
     *  - TODO
     *
     * @alpha
     */
    isValid() {
        return NativeModule.callInvite_isValid(this._uuid);
    }
    /**
     * Get the call SID associated with this `CallInvite` class.
     * @returns - A string representing the call SID.
     */
    getCallSid() {
        return this._callSid;
    }
    /**
     * Get the custom parameters of the call associated with this `CallInvite`
     * class.
     * @returns - A `Record` of custom parameters.
     */
    getCustomParameters() {
        return this._customParameters;
    }
    /**
     * Get the `from` parameter of the call associated with this `CallInvite`
     * class.
     * @returns - A `string` representing the `from` parameter.
     */
    getFrom() {
        return this._from;
    }
    /**
     * Get the `state` of the `CallInvite`.
     * @returns - The `state` of this `CallInvite`.
     */
    getState() {
        return this._state;
    }
    /**
     * Get the `to` parameter of the call associated with this `CallInvite`
     * class.
     * @returns - A `string` representing the `to` parameter.
     */
    getTo() {
        return this._to;
    }
    /**
     * Send a CallMessage.
     *
     * @example
     * To send a user-defined-message
     * ```typescript
     * const outgoingCallMessage: OutgoingCallMessage = await callInvite.sendMessage({
     *   content: { key1: 'This is a messsage from the parent call invite' },
     *   contentType: 'application/json',
     *   messageType: 'user-defined-message'
     * });
     *
     * outgoingCallMessage.addListener(OutgoingCallMessage.Event.Failure, (error) => {
     *   // outgoingCallMessage failed, handle error
     * });
     *
     * outgoingCallMessage.addListener(OutgoingCallMessage.Event.Sent, () => {
     *   // outgoingCallMessage sent
     * });
     * ```
     *
     * @param message - The call message to send.
     *
     * @returns
     *  A `Promise` that
     *    - Resolves with the OutgoingCallMessage object.
     *    - Rejects when the message is unable to be sent.
     */
    async sendMessage(message) {
        const { content, contentType, messageType } = validateCallMessage(message);
        const voiceEventSid = await NativeModule.call_sendMessage(this._uuid, content, contentType, messageType);
        const outgoingCallMessage = new OutgoingCallMessage({
            content,
            contentType,
            messageType,
            voiceEventSid,
        });
        return outgoingCallMessage;
    }
    /**
     * Update the caller name displayed in the iOS system incoming call screen.
     *
     * @param newHandle - The new value of the caller's name.
     *
     * @remarks
     * Unsupported platforms:
     * - Android
     *
     * This API is specific to iOS and unavailable in Android. Invoke this method
     * after the incoming call has been reported to CallKit and before the call
     * has been accepted. For example, perform an async request to your app server
     * to fetch the full name of the caller and use this method to replace the
     * default caller name in `from`.
     *
     * @returns
     *  - Resolves when the caller name has been updated.
     */
    async updateCallerHandle(newHandle) {
        switch (Platform.OS) {
            case 'ios':
                return NativeModule.callInvite_updateCallerHandle(this._uuid, newHandle);
            default:
                throw new UnsupportedPlatformError(`Unsupported platform "${Platform.OS}". This method is only supported on iOS.`);
        }
    }
}
/**
 * Provides enumerations and types used by a {@link (CallInvite:class)
 * | CallInvite object}.
 *
 * @remarks
 *  - See also the {@link (CallInvite:class) | CallInvite class}.
 *
 * @public
 */
(function (CallInvite) {
    /**
     * An enumeration of {@link (CallInvite:class)} states.
     */
    let State;
    (function (State) {
        /**
         * State of a call invite when it has not been acted upon.
         */
        State["Pending"] = "pending";
        /**
         * State of a call invite when it has been accepted.
         */
        State["Accepted"] = "accepted";
        /**
         * State of a call invite when it has been rejected.
         */
        State["Rejected"] = "rejected";
        /**
         * State of a call invite when it has been cancelled.
         */
        State["Cancelled"] = "cancelled";
    })(State = CallInvite.State || (CallInvite.State = {}));
    /**
     * Enumeration of all event strings emitted by {@link (CallInvite:class)}
     * objects.
     */
    let Event;
    (function (Event) {
        /**
         * Event string for the `Accepted` event.
         * See {@link (CallInvite:interface).(addListener:1)}.
         */
        Event["Accepted"] = "accepted";
        /**
         * Event string for the `Rejected` event.
         * See {@link (CallInvite:interface).(addListener:2)}.
         */
        Event["Rejected"] = "rejected";
        /**
         * Event string for the `Cancelled` event.
         * See {@link (CallInvite:interface).(addListener:3)}.
         */
        Event["Cancelled"] = "cancelled";
        /**
         * Event string for the `NotificationTapped` event.
         * See {@link (CallInvite:interface).(addListener:4)}.
         */
        Event["NotificationTapped"] = "notificationTapped";
        /**
         * Event string for the `MessageReceived` event.
         * See {@link (CallInvite:interface).(addListener:5)}
         */
        Event["MessageReceived"] = "messageReceived";
    })(Event = CallInvite.Event || (CallInvite.Event = {}));
})(CallInvite || (CallInvite = {}));
//# sourceMappingURL=CallInvite.js.map