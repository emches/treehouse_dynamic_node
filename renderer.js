var fs = require("fs");


function mergeValues(values, content) {
  // cycle over the keyes
  for (var key in values){
      // replace all {{{key}} with values from the values object
    content = content.replace("{{" + key + "}}",values[key]);
  }
  
  return content
  
  //return merged contend 
  
}
function view(templateName, values, response){
 // read from the template files 
  
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"})
      // insert values into the content
     // write content to response
     fileContents = mergeValues(values, fileContents);
     response.write(fileContents);
              
}              
              
module.exports.view  = view;