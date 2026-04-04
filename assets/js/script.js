import { getCalendarToday } from "/js/calendar.js";
import { loadPage } from "/js/ajax-loader.js";

function toggleSidebar () {
    //console.log("toggle-sidebar")
    let sidebar = document.getElementById("left-sidebar");
    //console.log(sidebar.className);
    if (sidebar.className === "sidebar") {
        sidebar.className += " responsive";
        sidebar.style.width = "200px";
    } else {
        sidebar.className = "sidebar";
        sidebar.style.width = "0px";
    }
};

function navButtonHandler(e) {
    e.preventDefault();
    let path = e.target.getAttribute("href")
    if (path) {
        loadPage(path);
        history.pushState({}, "", path)
        let sidebar = document.getElementById("left-sidebar");
        // collapses sidebar when navigating, if on mobile
        if (sidebar.className !== "sidebar") {
            sidebar.style.width = "0px";
            sidebar.className = "sidebar"
        }
        // console.log(path)
    } else {
        console.error("nav link has no path")
    }
};

window.addEventListener("DOMContentLoaded", () => {
    let navOpen = document.getElementById('nav-open');
    navOpen.addEventListener('click', toggleSidebar);

    let navButtons = document.getElementsByClassName('nav');
    for (button of navButtons) {
        button.addEventListener('click', navButtonHandler);
    };

    window.addEventListener("popstate", () => {
        e.preventDefault()
        loadPage(window.location.pathname);
    });

    getCalendarToday();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        let sidebar = document.getElementById("left-sidebar");
        // allow sidebar to reset once screen is big enough
        sidebar.style.width = "";
    }
});


