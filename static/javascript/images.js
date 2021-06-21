// create references to the modal...
let modal = document.getElementById("myModal");

// to all images
let images = document.getElementsByClassName("myImages");

// the image in the modal
let modalImg = document.getElementById("img01");

// Go through all of the images with our custom class
for (let i = 0; i < images.length; i++) {
    let img = images[i];

    // and attach our click listener for this image.
    img.onclick = function (evt) {
        modal.style.display = "block";
        modalImg.src = this.src;
    };
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};