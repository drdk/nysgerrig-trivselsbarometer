export function getQueryParam(name) {
var href = document.location.href;
var myregexp = /[?,&]([^=]+)=([^&]+)/img;
var match = myregexp.exec(href);
while (match != null) {
    if (match[1].toLowerCase() === name.toLowerCase()) {
    return match[2];
    }
    match = myregexp.exec(href);
}
}