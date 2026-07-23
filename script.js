/*
G THE GENIUS TNUSRB EXAM PORTAL V4
Main JavaScript File
*/


document.addEventListener("DOMContentLoaded", () => {


    console.log("G THE GENIUS TNUSRB Portal Loaded Successfully");


    // Smooth Scroll

    const links = document.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener("click", () => {

            console.log("Opening:", link.href);

        });

    });



});
