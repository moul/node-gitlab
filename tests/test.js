var assert = require("assert")

// Setup
var Gitlab, credentials, gitlab;
Gitlab = require('..').ApiV3;
credentials = { // From http://demo.gitlab.com/
    host: "http://demo.gitlab.com",
    token: "Wvjy2Krpb7y8xi93owUz",
    password: "123456",
    login: "test@test.com"
};
gitlab = new Gitlab({
    token: credentials.token
    , url: credentials.host
    , verbose: true
});

describe('User', function(){
  describe('#all()', function(){
    it('should retrieve array of users without error', function(done){
        gitlab.users.all(function(result) {
            // console.log(result);
            done();
            return result;
        });
    })
  })
  describe('#login()', function(){
    it('should retrieve a users session without error', function(done){
        gitlab.users.session(credentials.login, credentials.password, function(result) {
            //console.log(result);
            done();
            return result;
        });
    })
  })

})

describe('Project', function(){
  describe('#all()', function(){
    it('should retrieve array of projects without error', function(done){
        gitlab.projects.all(function(result) {
            //console.log(result);
            done();
            return result;
        });
    })
  })
})
