var assert = require("assert")

// Setup
var Gitlab, credentials, gitlab;
Gitlab = require('..').ApiV3;
credentials = { // From http://demo.gitlab.com/
    host: "http://demo.gitlab.com",
    token: "Wvjy2Krpb7y8xi93owUz"
};
gitlab = new Gitlab({
    token: credentials.token
    , url: credentials.host
    , verbose: true
});

describe('User', function(){
  describe('#all()', function(){
    it('should retrieve array of users without error', function(done){
        gitlab.users.all(function(users) {
            // console.log(users);
            done();
            return users;
        });
    })
  })
})

describe('Project', function(){
  describe('#all()', function(){
    it('should retrieve array of projects without error', function(done){
        gitlab.projects.all(function(projects) {
            console.log(projects);
            done();
            return projects;
        });
    })
  })
})
