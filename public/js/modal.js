window.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target == document.getElementById("modal") || e.target == document.getElementById("modal-content")) {
        closeModal();
    }
});

function openModal(imgSrc) {
    // change the source of the image element
    let modal_image = document.getElementById("modal-image");
    let modal = document.getElementById("modal");
    modal_image.setAttribute("src", imgSrc)
    // add class that has overflow: hidden to prevent scroll
    document.body.className += "modal-open";
    modal.style.display = "block";
};

function closeModal() {
    let modal = document.getElementById("modal");
    let modal_image = document.getElementById("modal-image");
    modal.style.display = "none";
    modal_image.setAttribute("src", "")
    // restore body's scroll
    document.body.className = "";
};