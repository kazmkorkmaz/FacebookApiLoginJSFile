var scopeOptions = 'public_profile,email';


var customFields = "id";


(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var FacebookLoginLibrary = {
    AddScope: (scopeName) => {
        scopeOptions = scopeOptions + ',' + scopeName;
    },
    AddField: (fieldName) => {
        customFields = customFields + ',' + fieldName;
    },
    Constants: {
        FacebookAppId: "",
        FacebookGraphApi: ""
    },
    AddConstants: function (facebookAppId, facebookGraphApi) {
        FacebookLoginLibrary.Constants.FacebookAppId = facebookAppId,
        FacebookLoginLibrary.Constants.FacebookGraphApi = facebookGraphApi
    },
    GetData: (callbackFunction) => {
        FB.api('/me', { fields: customFields  }, function (responseUser) {
            callbackFunction(responseUser);
        });
    },
    Facebook: {
        LoginFacebook: function (callbackFunction) {
            FB.init({
                appId: FacebookLoginLibrary.Constants.FacebookAppId,
                xfbml: true,
                version: FacebookLoginLibrary.Constants.FacebookGraphApi
            });
            FB.AppEvents.logPageView();
            FB.login(function (response) {
                if (response.status == 'connected') {
                   return FacebookLoginLibrary.GetData(callbackFunction);
                } else {
                    console.log('User can not login correctly!');
                }
               
            }, { scope: scopeOptions  });

        }
    }
}
var Fields = {
   //Defaults field is id.
    NAME: 'name',
    FIRSTNAME: 'first_name',
    LASTNAME: 'last_name',
    MIDDLENAME: 'middle_name',
    NAMEFORMAT: 'name_format',
    PICTURE: 'picture',
    SHORTNAME: 'short_name',
    EMAIL: 'email'
}

var Scopes = {
     //Defaults scopes public_profile and email
    //If you need additional scopes, you can add here like above in Fields. Then you can call FacebookLoginLibrary.AddScopes() function in your code such as FacebookLoginLibrary.AddFields()
    //Don't forget if you need additional scopes, you have to provide some additional requirements for your app in developers.facebook.com
}



//Example usage in the below

//< input type = "submit" class="btn btn-primary" id = "Login" name = "Login" onclick = "LoginFacebook()" value = "Continue With Facebook" />


//<script src="~/js/facebook-login-basic.js"></script>


//<script>
//    function LoginFacebook() {
//        FacebookLoginLibrary.AddConstants("382918793345122", "v11.0");  //You have to add some constants. First constants facebook api id, other is facebook grap api version.
//        FacebookLoginLibrary.AddField(Fields.NAME);   //You can add the fields that you want like this way.
//        FacebookLoginLibrary.AddField(Fields.FIRSTNAME);
//        FacebookLoginLibrary.AddField(Fields.MIDDLENAME);
//        FacebookLoginLibrary.AddField(Fields.LASTNAME);
//        FacebookLoginLibrary.AddField(Fields.SHORTNAME);
//        FacebookLoginLibrary.AddField(Fields.NAMEFORMAT);
//        FacebookLoginLibrary.AddField(Fields.PICTURE);
//        FacebookLoginLibrary.AddField(Fields.EMAIL);
//        //With this function you can use user information coming from facebook api.
//        FacebookLoginLibrary.Facebook.LoginFacebook((response) => {
//            console.log(response);       
//        });     
//    }
//</script>