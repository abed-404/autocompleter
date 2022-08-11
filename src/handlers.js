const fs = require('fs');
const path = require('path');

const handleHomeRoute = (request, response) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end("<h1>Sorry, we've had a problem on our end</h1>");
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(file);
        }
    });
};

const handlePublic = (request, response, url) => {
    const extension = url.split('.')[1];
    const extensionType = {
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
    };

    const filePath = path.join(__dirname, '..', url);
    fs.readFile(filePath, (error, file) => {
        if (error) {
            console.log(error);
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('<h1>404 file not found</h1>');
        } else {
            response.writeHead(200, { 'Content-Type': extensionType[extension] });
            response.end(file);
        }
    });
    console.log(url);
};

const getSuggestions = (key, response) => {
    fs.readFile('./src/countries.json', (error, data) => {
        if (error) {
            console.log(error);
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end("<h1>Sorry, we've had a problem on our end</h1>");
        } else {
            const countries = JSON.parse(data.toString());
            let matches = countries.filter(country => {
                const regex = new RegExp(`^${key}`, 'gi');
                //return country.name.match(regex) || country.code.match(regex); search by name or code
                return country.name.match(regex)
            });
            if (matches.length == 0) {
                response.writeHead(404);
                response.end()
            }
            else {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(matches))
            }

        }
    })

}
module.exports = {
    handleHomeRoute,
    handlePublic,
    getSuggestions
};
