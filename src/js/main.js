/**
*   Name: Main.js
*   Description: Handles API calls to the Selz product API and renders
*/

var SelzWidget = require("./selz-widget");

// Find placeholders and initialize a widget for each of them.
var widgetMounts = document.getElementsByClassName("selz-product-widget");

for(var i = 0; i < widgetMounts.length; i++) {

    // data-id is required since it will be used as the itemId in API calls.
    if(widgetMounts[i].getAttribute("data-id")) {
        var myWidget = new SelzWidget({
            mountEl: widgetMounts[i],
            itemId: widgetMounts[i].getAttribute("data-id")
        });
    }

}
