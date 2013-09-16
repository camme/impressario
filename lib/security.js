var everyauth = require('everyauth');
var users = require('./usermodel');
var config = require('../config');

var googleapis = require('googleapis');

var OAuth2Client = googleapis.OAuth2Client;
var oauth2Client = new OAuth2Client(config.google.key, config.google.secret, "http://loc.impressario.io/auth/google/callback");


var checkLogin = function(token, refresh) {

    auth2Client.credentials = {
        access_token: token,
        refresh_token: refresh
    };

    client
    .plus.people.get({ userId: 'me' })
    .withAuthClient(oauth2Client)
    .execute(callback);

};



exports.init = function(app) {

    everyauth.everymodule.findUserById(function(id, callback) {
        var current = users.get(id);
        console.log(current);
        callback(null, current);
    });

    everyauth.google
        .appId(config.google.key)
        .appSecret(config.google.secret)
        .scope('https://www.googleapis.com/auth/plus.login')
        .handleAuthCallbackError( function (req, res) {
            // If a user denies your app, Google will redirect the user to
            // /auth/facebook/callback?error=access_denied
            // This configurable route handler defines how you want to respond to
            // that.
            // If you do not configure this, everyauth renders a default fallback
            // view notifying the user that their authentication failed and why.
        })
       .findOrCreateUser( function (session, accessToken, accessTokenExtra, user) {

            var current = users.get(user.id);

            // if we already have a user, we just update it
            if (current) {
                console.log("Exist");
                current.google = {
                    accessToken: accessToken,
                    accessTokenExtra: accessTokenExtra,
                    id: user.id
                };
                users.save();
            }

            // if not, create it
            else {

                console.log("Create");
                current = users.add({
                    id: user.id,
                    google: {
                        accessToken: accessToken,
                        accessTokenExtra: accessTokenExtra,
                        id: user.id
                    }
                });

            }

            console.log("----- current", user, current);
            return current;





            // find or create user logic goes here
            // Return a user or Promise that promises a user
            // Promises are created via
            //     var promise = this.Promise();
        })
        .redirectPath('/');

}

