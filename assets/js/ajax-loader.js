/*
references:

https://stackoverflow.com/questions/17636528/how-do-i-load-an-html-page-in-a-div-using-javascript
https://ransei.neocities.org/home
https://www.youtube.com/watch?v=ZleShIpv5zQ
*/
const pageCache = {};

export function loadPage(path) {
    fetch(path)
        .then((res) => res.text())
            .then((html) => {
                let parser = new DOMParser();
                let newContent = parser.parseFromString(html, "text/html");
                document.getElementById("main-content").innerHTML = newContent.getElementById("main-content").innerHTML;

                // get page title
                // console.log(newContent.getElementsByTagName("title")[0]);
                document.getElementsByTagName("title")[0].innerHTML = newContent.getElementsByTagName("title")[0].innerHTML;
                pageCache[path] = newContent;
                window.scrollTo(0,0)
            })
            .catch((err) => console.warn(err))
};