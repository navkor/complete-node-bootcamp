const fs = require('fs');
const http = require('http');
const url = require('url');


/////////////////////////////////////
//
//
//   FILES
//
//
//
/* //Blocking, synchronous way
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

console.log('File written!'); */


//non-blocking, asynchronous way
/*
    this is going to be a bit crazy!!
*/
/*
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log('Error!!! ');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written yay!!!');
            });
        });
    });
});
console.log('will read file!');
*/

///////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
console.log('this only runs once');
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const server = http.createServer((req, res) => {
    //console.log(req);
    const pathName = req.url;

    // Overview page
    if (pathName === '/' || pathName === '/overview'){



        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHTML = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);
        res.end(output);

    
    //product page
    } else if (pathName === '/product') {
        res.end('this is the PRODUCT');


    // API
    } else if (pathName === '/api'){

        
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);


    //NOT FOUND
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8001, '127.0.0.1', () => {
    console.log('listening to requests on port 8001');
});