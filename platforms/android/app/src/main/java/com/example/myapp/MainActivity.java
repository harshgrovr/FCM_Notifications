/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.example.myapp;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.messaging.FirebaseMessagingService;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.messaging.FirebaseMessagingService;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                                           @Override
                                           public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                               if (!task.isSuccessful()) {
                                                   Log.w(TAG, "getInstanceId failed", task.getException());
                                                   return;
                                               }

                                               // Get new Instance ID token
                                               String token = task.getResult().getToken();

                                               // Log and toast
                                               String msg = token;
                                               Log.d("token gen", msg);
                                               Toast.makeText(MainActivity.this, msg, Toast.LENGTH_SHORT).show();
                                           }
                                       });

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);


    }


     class MyFirebaseMessagingService extends FirebaseMessagingService {
        private static final String TAG = "MyFirebaseMsgService";

        public void onNewToken(String token) {
            Log.d(TAG, "Refreshed token: " + token);

            // If you want to send messages to this application instance or
            // manage this apps subscriptions on the server side, send the
            // Instance ID token to your app server.
            sendRegistrationToServer(token);
        }

        private void sendRegistrationToServer(String token) {
            // TODO: Implement this method to send token to your app server.
        }

    }

}
