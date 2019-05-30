var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    onDeviceReady: function() {

    var userData='';
        this.receivedEvent('deviceready');
        var env = env_variable;
        ref = cordova.InAppBrowser.open(env, '_blank');

    var nameInterval;
    var passwordInterval;


    // define secure storage
    var ss = new cordova.plugins.SecureStorage(
      function() {
        localStorage.clear();
      },
      function(error) {
        console.log("Error " + error);
      },
      "my_app"
    );

    function setValueToSecureStorage(userData)
        {
            var array=userData.split(' ');
            var username= array[0];
            var password = array[1];
            ss.set(
              function(key) {
              //  console.log("Set " + key);
              },
              function(error) {
              //  console.log("Error " + error);
              },
              "mykey",
              userData
            );
        }


    ss.get(
      function(value) {
      if(value!=null)
      {
     //   console.log(value);
        ref.executeScript({code: "\
        if(window.location.href.indexOf('users/sign_in') > -1){\
                                                document.getElementById('user_email').value = value[0];\
                                                document.getElementById('user_password').value = value[0];\
                                                }\
        "
                });
      }
       // console.log("Success, got " + value);
      },
      function(error) {
      //  console.log("Error " + error);
      },
      "mykey"
    );

//  var encryptedAES = CryptoJS.AES.encrypt("Message", "My Secret Passphrase");\
               //    var decryptedBytes = CryptoJS.AES.decrypt(encryptedAES, "My Secret Passphrase");\

               //    var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);\
         ref.addEventListener('message', messageCallBack);


         window.FirebasePlugin.onTokenRefresh(function(token) {
             // save this server-side and use it to push notifications to this device
             console.log(token);
         }, function(error) {
             console.error(error);
         });

        ref.addEventListener("loadstop", function(e) {
            ref.executeScript({
                code: "\
                var message = 'this is the message';\
                            var messageObj = {my_message: message};\
                            var stringifiedMessageObj = JSON.stringify(messageObj);\
                            webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);\
               if(window.location.href.indexOf('users/sign_in') > -1){\
                        var user_email = '';\
                        var user_password = '';\
                          if (window.localStorage.getItem('user_email') !== null && window.localStorage.getItem('user_password') !== null) {\
                              user_email = window.localStorage.getItem('user_email');\
                              user_password = window.localStorage.getItem('user_password');\
                              document.getElementById('user_email').value = user_email;\
                              document.getElementById('user_password').value = user_password;\
                              }\
                document.getElementById('new_user').addEventListener('submit', function (e){\
                 if(document.getElementById('user_email').value!=null && document.getElementById('user_password').value !==null) {\
                                if(document.getElementById('user_remember_me').checked){\
                                window.localStorage.setItem('user_email', document.getElementById('user_email').value);\
                                window.localStorage.setItem('user_password', document.getElementById('user_password').value);}\
                                }\
                });\
                }\
                "
            });


        usernameInterval = setInterval(function() {
                    ref.executeScript({ code: "window.localStorage.getItem('user_email')+' '+window.localStorage.getItem('user_password');" }, function(values) {
                     userData=values[0];
                  //   console.log(userData);
                     if ( userData ) {
                        clearInterval( usernameInterval );
                        setValueToSecureStorage(userData);
                     }
                    });
                }, 1000);



        });
      //  RegisterWithFCM();




    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }



};

app.initialize();

    function RegisterWithFCM() {

    try {

        if (window.FirebasePlugin == null) {
            console.log("FCMPlugin is null")
            return;
        }
        window.FirebasePlugin.getToken(function(token) {
            //”token” received from FCM server.
            //It will get automatically registered in you device.No extra code is needed.
            console.log(token);
        });
    } catch (e) {
        alert(e);
    }
}



function messageCallBack(params){
    console.log("message received: "+params.data.my_message);
}

