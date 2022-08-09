const { handleHomeRoute, handlePublic, getSuggestions } = require('./handlers.js')

const router = (request, response) => {
    let urlObj = request.url.split('?')
    const url = urlObj[0]
    if (url === '/') {
        handleHomeRoute(request, response);
    }
    else if (url === '/search') {
        const searchParams = urlObj[1].split('=')
        const key = searchParams[1]
        getSuggestions(key, response);
    }
    else if (url.indexOf('public') !== -1) {
        handlePublic(request, response, url);
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        console.log("error :" + request.baseUrl);
        response.end('<h1>404 file not found</h1>');
    }
};

module.exports = router;
