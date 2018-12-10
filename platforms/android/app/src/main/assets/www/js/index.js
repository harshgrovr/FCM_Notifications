/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        //console.log("hello");




        cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
            // Enable background mode

            cordova.plugins.backgroundMode.enable();

            // Called when background mode has been activated

            cordova.plugins.backgroundMode.onactivate = function () {

            cordova.plugins.notification.local.schedule({
                 title: '1st notification',
                 message: 'hello world',
                 every:'minute',
                 data: {page:'index.html'}
            });

/*
              setInterval(function () {
                    console.log("hello");

                    cordova.plugins.notification.local.schedule({
                        title: 'My first notification',
                        text: 'Thats pretty easy...',
                        foreground: true
                    });

                    // Modify the currently displayed notification
                    //cordova.plugins.backgroundMode.configure({
                     //   text:'Running in background for more than 5s now.'
                    //});

                }, 600000);
                */

            cordova.plugins.notification.local.on("trigger", function(notification) {

                                                                                var socket = new WebSocket('ws://10.0.2.2:8081/');

                                                                                        // When a connection is made
                                                                                        socket.onopen = function() {
                                                                                          console.log('Opened connection ');

                                                                                          // send data to the server
                                                                                          var json = JSON.stringify({ message: 'client message ' });
                                                                                          socket.send(json);
                                                                                        }

                                                                                        // When data is received
                                                                                        socket.onmessage = function(event) {
                                                                                          console.log(event.data);
                                                                                        }

                                                                                        // A connection could not be made
                                                                                        socket.onerror = function(event) {
                                                                                          console.log(event);
                                                                                        }

                                                                                        // A connection was closed
                                                                                        socket.onclose = function(code, reason) {
                                                                                          console.log(code, reason);
                                                                                        }

                                                                                        // Close the connection when the window is closed
                                                                                        window.addEventListener('beforeunload', function() {
                                                                                         // socket.close();
                                                                                        });

                                                                //cordova.plugins.notification.local.clearAll(function() {
                                                                //}, this);

                                                                /*
                                                         cordova.plugins.notification.local.schedule({
                                                                         title: 'hello there',
                                                                         message: 'My ultimate is charging..',
                                                                         every:'minute',
                                                                         data: {page:'index.html'}
                                                                    });
                                                                    */

            });



            }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
