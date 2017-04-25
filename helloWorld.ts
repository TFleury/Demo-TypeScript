///<reference types="jquery"/>

function SayHello() {
    let pageTitle = $("<h1></h1>");
    pageTitle.text("Hello Code2be !");

    $("body").append(pageTitle);
}

SayHello();