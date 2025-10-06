package com.twiliovoicereactnative

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.twilio.voice.Voice
import com.twilio.voice.ConnectOptions
import com.twilio.voice.RegistrationListener
import com.twilio.voice.RegistrationException
import com.twilio.voice.UnregistrationListener
import java.util.UUID
import com.twiliovoicereactnative.CallRecordDatabase.CallRecord

class ExpoTwilioModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTwilio')` in JavaScript.
    Name("ExpoTwilio")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }
    // Register for incoming calls with optional FCM token (for expo-notifications compatibility)
    AsyncFunction("voice_register") { accessToken: String, fcmToken: String? ->
      val context = appContext.reactContext ?: throw Exception("Context not available")

      Voice.register(accessToken, Voice.RegistrationChannel.FCM, context, object : RegistrationListener {
        override fun onRegistered(accessToken: String, fcmToken: String) {
          // Registration successful - event will be sent via native event emitter
        }

        override fun onError(registrationException: RegistrationException, accessToken: String, fcmToken: String) {
          // Error will be sent via native event emitter
        }
      })
    }

    // Unregister from incoming calls with optional FCM token
    AsyncFunction("voice_unregister") { accessToken: String, fcmToken: String? ->
      val context = appContext.reactContext ?: throw Exception("Context not available")

      Voice.unregister(accessToken, Voice.RegistrationChannel.FCM, context, object : UnregistrationListener {
        override fun onUnregistered(accessToken: String, fcmToken: String) {
          // Unregistration successful - event will be sent via native event emitter
        }

        override fun onError(registrationException: RegistrationException, accessToken: String, fcmToken: String) {
          // Error will be sent via native event emitter
        }
      })
    }

    Function("voice_connect") { accessToken: String, twimlParams: HashMap<String, String>?, calleeName: String, displayName: String ->
      val context = appContext.reactContext ?: return@Function null

      val connectOptions = ConnectOptions.Builder(accessToken)

      if (twimlParams != null) {
        connectOptions.params(twimlParams)
      }

      val uuid = UUID.randomUUID()
      val callListenerProxy = CallListenerProxy(uuid, context)

      val call = VoiceApplicationProxy.getVoiceServiceApi().connect(
        connectOptions.build(),
        callListenerProxy
      )

      val callRecord = CallRecordDatabase.CallRecord(
        uuid,
        call,
        calleeName,
        twimlParams ?: HashMap(),
        CallRecord.Direction.OUTGOING,
        displayName
      )

      VoiceApplicationProxy.getCallRecordDatabase().add(callRecord)

      return@Function uuid.toString()
    }
  }
}
