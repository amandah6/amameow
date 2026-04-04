// https://stackoverflow.com/questions/13735912/anchor-jumping-by-using-javascript
window.addEventListener("DOMContentLoaded", () => {
    let selector = document.getElementById("jump-selector")
    if (selector) {
        selector.addEventListener("change", (e) => {
            jumpTo(e.target.selectedOptions[0].value);
        });
    }
});

function jumpTo(x) {
    if (x) {
        let url = location.href;
        window.location.replace("#"+x);
        history.replaceState(null, "", url);
    }
};