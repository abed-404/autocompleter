const search = document.getElementById('search')
const matchList = document.getElementById('results')

function httpGetSuggestions(key) {
    fetch(`/search?q=${key}`).
        then((response) => check(response)).
        then((data) => outputHtml(data)).
        catch((err) => errHandler(err))
}

function check(response) {
    console.log(response.status);
    if (response.status === 404) throw new Error('No matches');
    return response.json();
}
function errHandler(err) {
    matchList.innerHTML = "";
}

function select(element) {
    let selectUSerData = element.textContent;
    search.value = selectUSerData;
}
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => { return match = `<li>${match.name}(${match.code})</li>` }
        ).join('');
        matchList.innerHTML = html;
        allListElements = document.querySelectorAll('li');
        for (let i = 0; i < allListElements.length; i++) {
            allListElements[i].setAttribute("onclick", "select(this)")
        }
    }
}

search.addEventListener('input', () => httpGetSuggestions(search.value))