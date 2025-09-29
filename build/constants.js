export var Constants;
(function (Constants) {
    // React Native Voice SDK
    Constants["ReactNativeVoiceSDK"] = "react-native";
    Constants["ReactNativeVoiceSDKVer"] = "1.6.0-dev";
    // Scope names
    Constants["ScopeVoice"] = "scopeVoice";
    Constants["ScopeCall"] = "scopeCall";
    Constants["ScopeCallMessage"] = "scopeCallMessage";
    Constants["ScopeCallInvite"] = "scopeCallInvite";
    // Voice events
    // Common
    Constants["VoiceEventError"] = "voiceEventError";
    Constants["VoiceEventType"] = "type";
    // Error
    Constants["VoiceErrorKeyError"] = "error";
    Constants["VoiceErrorKeyCode"] = "code";
    Constants["VoiceErrorKeyMessage"] = "message";
    // Registration
    Constants["VoiceEventRegistered"] = "voiceEventRegistered";
    Constants["VoiceEventUnregistered"] = "voiceEventUnregistered";
    // Call Info
    Constants["CallInfoUuid"] = "uuid";
    Constants["CallInfoSid"] = "sid";
    Constants["CallInfoFrom"] = "from";
    Constants["CallInfoTo"] = "to";
    Constants["CallInfoIsMuted"] = "isMuted";
    Constants["CallInfoIsOnHold"] = "isOnHold";
    Constants["CallInfoState"] = "state";
    Constants["CallInfoInitialConnectedTimestamp"] = "initialConnectedTimestamp";
    // Call States
    Constants["CallStateConnected"] = "connected";
    Constants["CallStateConnecting"] = "connecting";
    Constants["CallStateDisconnected"] = "disconnected";
    Constants["CallStateReconnecting"] = "reconnecting";
    Constants["CallStateRinging"] = "ringing";
    // Call Invite Info
    Constants["CallInviteInfoUuid"] = "uuid";
    Constants["CallInviteInfoCallSid"] = "callSid";
    Constants["CallInviteInfoFrom"] = "from";
    Constants["CallInviteInfoTo"] = "to";
    Constants["CallInviteInfoCustomParameters"] = "customParameters";
    // Cancelled Call Invite Info
    Constants["CancelledCallInviteInfoUuid"] = "uuid";
    Constants["CancelledCallInviteInfoCallSid"] = "callSid";
    Constants["CancelledCallInviteInfoFrom"] = "from";
    Constants["CancelledCallInviteInfoTo"] = "to";
    Constants["CancelledCallInviteInfoCustomParameters"] = "customParameters";
    // Incoming Call Invite event
    Constants["VoiceEventTypeValueIncomingCallInvite"] = "voiceEventTypeValueIncomingCallInvite";
    // Call Message
    Constants["VoiceEventSid"] = "voiceEventSid";
    Constants["CallMessage"] = "callMessage";
    Constants["CallMessageContent"] = "content";
    Constants["CallMessageContentType"] = "contentType";
    Constants["CallMessageMessageType"] = "messageType";
    Constants["JSEventKeyCallMessageInfo"] = "callMessage";
    // Audio Devices Updated Event
    Constants["VoiceEventAudioDevicesUpdated"] = "voiceEventAudioDevicesUpdated";
    // Audio Device
    Constants["AudioDeviceKeyUuid"] = "uuid";
    Constants["AudioDeviceKeyName"] = "name";
    Constants["AudioDeviceKeyType"] = "type";
    Constants["AudioDeviceKeyAudioDevices"] = "audioDevices";
    Constants["AudioDeviceKeySelectedDevice"] = "selectedDevice";
    Constants["AudioDeviceKeyEarpiece"] = "earpiece";
    Constants["AudioDeviceKeySpeaker"] = "speaker";
    Constants["AudioDeviceKeyBluetooth"] = "bluetooth";
    // CallInvite events
    Constants["CallInviteEventKeyType"] = "type";
    Constants["CallInviteEventTypeValueAccepted"] = "callInviteEventTypeValueCallInviteAccepted";
    Constants["CallInviteEventTypeValueNotificationTapped"] = "callInviteEventTypeValueCallInviteNotificationTapped";
    Constants["CallInviteEventTypeValueRejected"] = "callInviteEventTypeValueCallInviteRejected";
    Constants["CallInviteEventTypeValueCancelled"] = "callInviteEventTypeValueCallInviteCancelled";
    Constants["CallInviteEventKeyCallSid"] = "callSid";
    // Call events
    // State
    Constants["CallEventConnected"] = "callEventConnected";
    Constants["CallEventConnectFailure"] = "callEventConnectFailure";
    Constants["CallEventDisconnected"] = "callEventDisconnected";
    Constants["CallEventReconnecting"] = "callEventReconnecting";
    Constants["CallEventReconnected"] = "callEventReconnected";
    Constants["CallEventRinging"] = "callEventRinging";
    // Quality warnings
    Constants["CallEventQualityWarningsChanged"] = "callEventQualityWarningsChanged";
    Constants["CallEventCurrentWarnings"] = "callEventCurrentWarnings";
    Constants["CallEventPreviousWarnings"] = "callEventPreviousWarnings";
    // Call message events
    Constants["CallEventMessageFailure"] = "callEventMessageFailure";
    Constants["CallEventMessageReceived"] = "callEventMessageReceived";
    Constants["CallEventMessageSent"] = "callEventMessageSent";
    // Call feedback score
    Constants["CallFeedbackScoreNotReported"] = "callFeedbackScoreNotReported";
    Constants["CallFeedbackScoreOne"] = "callFeedbackScoreOne";
    Constants["CallFeedbackScoreTwo"] = "callFeedbackScoreTwo";
    Constants["CallFeedbackScoreThree"] = "callFeedbackScoreThree";
    Constants["CallFeedbackScoreFour"] = "callFeedbackScoreFour";
    Constants["CallFeedbackScoreFive"] = "callFeedbackScoreFive";
    // Call feedback issue
    Constants["CallFeedbackIssueNotReported"] = "callFeedbackIssueNotReported";
    Constants["CallFeedbackIssueDroppedCall"] = "callFeedbackIssueDroppedCall";
    Constants["CallFeedbackIssueAudioLatency"] = "callFeedbackIssueAudioLatency";
    Constants["CallFeedbackIssueOneWayAudio"] = "callFeedbackIssueOneWayAudio";
    Constants["CallFeedbackIssueChoppyAudio"] = "callFeedbackIssueChoppyAudio";
    Constants["CallFeedbackIssueNoisyCall"] = "callFeedbackIssueNoisyCall";
    Constants["CallFeedbackIssueEcho"] = "callFeedbackIssueEcho";
    // StatsReport
    Constants["PeerConnectionId"] = "peerConnectionId";
    Constants["LocalAudioTrackStats"] = "localAudioTrackStats";
    Constants["RemoteAudioTrackStats"] = "remoteAudioTrackStats";
    Constants["IceCandidatePairStats"] = "iceCandidatePairStats";
    Constants["IceCandidateStats"] = "iceCandidateStats";
    Constants["Codec"] = "codec";
    Constants["PacketsLost"] = "packetsLost";
    Constants["Ssrc"] = "ssrc";
    Constants["TrackId"] = "trackId";
    Constants["Timestamp"] = "timestamp";
    Constants["BytesSent"] = "bytesSent";
    Constants["PacketsSent"] = "packetsSent";
    Constants["RoundTripTime"] = "roundTripTime";
    Constants["AudioLevel"] = "audioLevel";
    Constants["Jitter"] = "jitter";
    Constants["BytesReceived"] = "bytesReceived";
    Constants["Mos"] = "mos";
    Constants["TransportId"] = "transportId";
    Constants["LocalCandidateId"] = "localCandidateId";
    Constants["RemoteCandidateId"] = "remoteCandidateId";
    Constants["State"] = "state";
    Constants["LocalCandidateIp"] = "localCandidateIp";
    Constants["RemoteCandidateIp"] = "remoteCandidateIp";
    Constants["Nominated"] = "nominated";
    Constants["Writeable"] = "writeable";
    Constants["Readable"] = "readable";
    Constants["TotalRoundTripTime"] = "totalRoundTripTime";
    Constants["CurrentRoundTripTime"] = "currentRoundTripTime";
    Constants["AvailableOutgoingBitrate"] = "availableOutgoingBitrate";
    Constants["AvailableIncomingBitrate"] = "availableIncomingBitrate";
    Constants["RequestsReceived"] = "requestsReceived";
    Constants["RequestsSent"] = "requestsSent";
    Constants["ResponsesReceived"] = "responsesReceived";
    Constants["ResponsesSent"] = "responsesSent";
    Constants["RetransmissionsReceived"] = "retransmissionsReceived";
    Constants["RetransmissionsSent"] = "retransmissionsSent";
    Constants["ConsentRequestsReceived"] = "consentRequestsReceived";
    Constants["ConsentRequestsSent"] = "consentRequestsSent";
    Constants["ConsentResponsesReceived"] = "consentResponsesReceived";
    Constants["ConsentResponsesSent"] = "consentResponsesSent";
    Constants["ActiveCandidatePair"] = "activeCandidatePair";
    Constants["RelayProtocol"] = "relayProtocol";
    Constants["IsRemote"] = "isRemote";
    Constants["Ip"] = "ip";
    Constants["Port"] = "port";
    Constants["Protocol"] = "protocol";
    Constants["CandidateType"] = "candidateType";
    Constants["Priority"] = "priority";
    Constants["Url"] = "url";
    Constants["Deleted"] = "deleted";
    Constants["PacketsReceived"] = "packetsReceived";
    // IceCandidatePairState
    Constants["StateFailed"] = "stateFailed";
    Constants["StateFrozen"] = "stateFrozen";
    Constants["StateInProgress"] = "stateInProgress";
    Constants["StateSucceeded"] = "stateSucceeded";
    Constants["StateWaiting"] = "stateWaiting";
    Constants["StateUnknown"] = "stateUnknown";
    // iOS CallKit configuration
    Constants["CallKitMaximumCallsPerCallGroup"] = "callKitMaximumCallsPerCallGroup";
    Constants["CallKitMaximumCallGroups"] = "callKitMaximumCallGroups";
    Constants["CallKitIncludesCallsInRecents"] = "callKitIncludesCallsInRecents";
    Constants["CallKitSupportedHandleTypes"] = "callKitSupportedHandleTypes";
    Constants["CallKitIconTemplateImageData"] = "callKitIconTemplateImageData";
    Constants["CallKitRingtoneSound"] = "callKitRingtoneSound";
})(Constants || (Constants = {}));
//# sourceMappingURL=constants.js.map