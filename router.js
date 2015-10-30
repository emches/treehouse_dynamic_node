var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'}

//  Handle HTTP route
function home(request, response){
    if(request.url === "/"){
      console.log(request.method.toLowerCase());
      if(request.method.toLowerCase() ==="get"){

      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response)
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
    // if post
        request.on("data", function(postBody){
        console.log(postBody.toString());
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, {"Location": "/" +query.username});
        response.end();
        });
     }
   }
}

function user(request, response){
  
     var username = request.url.replace("/","");  
       if(username.length > 0){
         response.writeHead(200, commonHeaders);
         renderer.view("header", {}, response)
         console.log(username);
      
        var studentProfile = new Profile(username);

        studentProfile.on("end", function(profileJSON){
       //show profile
       //store values we need
         var values = {
           avatarUrl: profileJSON.gravatar_url,
           username: profileJSON.profile_name,
           badges: profileJSON.badges.length,
           javascriptPoints: profileJSON.points.JavaScript
       }
       // simple response
      renderer.view("profile", values, response);
      renderer.view("footer", values, response);
      response.end();
      });
    
     // on error
       studentProfile.on("error", function(error){
      // show error 
         renderer.view("error", {errorMessage: error.message},response);
         renderer.view("search", {}, response);
         renderer.view("footer",{},response);
         response.end();

       });
      }
}
    
module.exports.home = home;
module.exports.user = user;