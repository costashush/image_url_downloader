# node js command line url pictures downloader


 node js requered

 ---->the base64 encoding is not fuctional yet<----
### clone the repo and run the next commands 
```
npm install
npm start
```

specs
Create a command line tool that will scrape all images from a given URL and create an HTML page displaying all of the fetched images. 
Guidelines 
1. Choose any computer language but - if compiled also send the source code 2. The command line tool will get 
2 arguments: a. URL of the web page  b. output folder 
3. It should run on both windows and Linux 4. Be able to explain everything you did. 
Specification 
1. Scan the given URL for image URLs 
2. Download all images to the output folder 
3. Create in the given output folder an index.html file 
4. The created HTML file will include a table with two columns  
    a. The image in max width of 120px (height should change accordingly as the original proportions) 
      *i. Optional -  Present the image as  inline Base64 and not remote image  (*** Resize the images before encoding it to base64)*
    b. The original URL of the image, it’s original size and format 