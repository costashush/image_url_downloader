const readline = require('readline');
var request = require('request'),
      cheerio = require('cheerio'),
      fs = require('fs');


var inputs = [];
var dir = './';
var regexUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

 
//promt function
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'intango> '
});

rl.prompt();

rl.on('line', (line) => {

  inputs.push(line);
  switch (true) {      
   case inputs.length == 1:
    var regexDir = new RegExp(/^$|\s+/ );
      if (!line.match(regexDir)){
      console.log("good dir")
        dir+=line.trim();
          if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
          }
          console.log(dir);
          console.log('now enter theurl name from where you want to download images');
    }else{
      inputs.length = 0;
      console.log("provide a vaild forler name");
      console.log(inputs);
    }
    break; 
   case inputs.length == 2:
      if (line.match(regexUrl)){

        console.log("download started");
        fetchPics(inputs[1],dir)
        inputs = [];
        dir = './';
        
      } else{
        inputs.length = 1;
        console.log("provide a vaild url name");
        console.log(inputs);
      }      
      break;          
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});


function buildHtml(header,body) {
  return '<!DOCTYPE html>'
  + '<html><head></head><body><h1>' 
  + header +
   '</h1><table>'
  + body + 
   '</table></body></html>';
};

// find img in url
function fetchPics(url,dir){
  var header = '';
  var newBody = '';
  request(url, function(err, res, body) {
    if (err)
    throw err;
    header+= url ;
    var $ = cheerio.load(body);
     $('img').each(function(i,img) {
       if($(this).attr('src').match(regexUrl)){

         newBody+= '<tr><td>'+$(this).attr('src')+'</td><td><img src="'+i+'.png" width="120"></td></tr>'; 
         console.log(`${i}`);
         console.log($(this).attr('src'));
         request({
           method: 'GET',
           url: $(this).attr('src'),
           responseType: 'stream'
          }).pipe(fs.createWriteStream(`${dir}/${i}.png`)).on('close', function(){
            console.log('done download file');});
            
          }  
        });
          var stream = fs.createWriteStream(dir+'/index.html');
          stream.once('open', function(fd) {
            var html = buildHtml(header,newBody);
            stream.end(html);
            console.log('done build html');
          });
          
        });
      }
    



