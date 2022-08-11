const search = document.getElementById('search')
const matchList = document.getElementById('results')

function httpGetSuggestions(key) {
    if (key.length === 0) {
        matchList.innerHTML = ""
        return
    }
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
    matchList.innerHTML = "No matches";
}

function select(element) {
    let selectUSerData = element.textContent;
    search.value = selectUSerData;
    matchList.innerHTML = ""
}
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => { return match = `<li>${match.name}</li>` }
        ).join('');
        matchList.innerHTML = html;
        allListElements = document.querySelectorAll('li');
        for (let i = 0; i < allListElements.length; i++) {
            allListElements[i].setAttribute("onclick", "select(this)")
        }
    }
}

search.addEventListener('input', () => httpGetSuggestions(search.value))