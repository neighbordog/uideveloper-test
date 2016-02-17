/**
*   Name: selz-widget.js
*   Description:
*   Handles API calls to the Selz product API and
*   then renders the response data in a widget.
*/

var Handlebars = require("handlebars");

module.exports = function(options) {

    var API_URI = "https://selz.com/embed/itemdata";
    var MOBILE_BREAKPOINT = 480;

    // Get template data and compile to templates via handlebars
    var widgetTemplate = Handlebars.compile( document.getElementById("product-widget-tpl").innerHTML );
    var errorTemplate = Handlebars.compile( document.getElementById("product-widget-error-tpl").innerHTML );

    // The DOM element where widget will be mounted
    this.mountEl = options.mountEl;

    // id of the item that will be fetched from the API
    this.itemId = options.itemId;

    /**
    *    Constructor method
    *    @constructor
    */
    this.mount = function() {

        // Check if screen size is within mobile breakpoint
        if((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < MOBILE_BREAKPOINT) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

        // Fetch data
        this.loadData(
            this.itemId,
            function(data) {
                // OnSuccess => Load sprite sheet and render widget
                if(data.SpriteUrl !== undefined && !document.getElementById("spritesheet")) {
                    addSpriteSheet(data.SpriteUrl);
                }
                this.renderWidget(data);
            }.bind(this),
            function() {
                // OnTimeout => Render error message
                this.render(
                    {
                        ErrorTitle: "Whoops! Something went wrong...",
                        ErrorMessage: "Sorry that happenend! Please try to reload this page or come back later."
                    },
                    errorTemplate
                 );
            }.bind(this)
        );

    };


    /**
    *   Handles API request via JSONP
    *   @param {string} itemId - id of the item to be fetched from the API
    *   @param {function} onSuccess - callback when the API request was successful
    *   @param {function} onTimeout - callback when the API request timed out
    */
    this.loadData = function(itemId, onSuccess, onTimeout) {

        // Generate pseudo-random string that will be used as method name for the JSONP request
        var callbackName = "jsonpCallback" + Math.floor((Math.random() * 100000) + 1);

        var requestUri = API_URI + "?itemurl=http://selz.co/" + itemId;
        requestUri += "&callback=" + callbackName;

        var tempScript = document.createElement("script");
        tempScript.src = requestUri;

        // Set timer for basic error handling.
        var timeoutHandler = window.setTimeout(function() {
            window[callbackName] = function() {};
            tempScript.parentNode.removeChild(tempScript);
            onTimeout();
        }, 3600);

        // The JSONP callback
        window[callbackName] = function(data) {
            window.clearTimeout(timeoutHandler);
            tempScript.parentNode.removeChild(tempScript);
            onSuccess(data);
        };

        document.body.appendChild(tempScript);

    };

    /**
    *   Adds sprite sheet to document (if available)
    *   @param {string} spriteUrl - URL to SVG file that contains the spritesheet
    */
    var addSpriteSheet = function(spriteUrl) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", spriteUrl);

        /**
            When successful append response to the document body.
        */
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var spriteSheet = document.createElement("div");
                spriteSheet.id = "spritesheet";
                spriteSheet.style.display = "none";
                spriteSheet.innerHTML = xhr.responseText;
                document.body.appendChild(spriteSheet);
            }
        };
        xhr.send();
    };

    /**
    *   Renders a template
    *   @param {object} context - The data that will be rendered
    *   @param {object} template - The template that will be rendered
    **/
    this.render = function(context, template) {
        var renderedTemplate = template(context);
        this.mountEl.innerHTML = renderedTemplate;
    }

    /**
    *   Renders widget on success
    *   @param {object} context - The data that will be rendered
    **/
    this.renderWidget = function(context) {
        // Try to render data, on error => render error message instead.
        try {

            // Decide which product image to use based on whether or not the user is on a mobile device
            context.ProductImage = this.isMobile ? context.ImageUrlSmall : context.ImageUrlLarge;

            this.render(context, widgetTemplate);

            // Wait until product image is fully loaded, then display it.
            var productImage = this.mountEl.querySelector(".product-image img");
            productImage.onload = function(e) {
                productImage.style.display = "block";
                productImage.className += " stretch-in";
            }

        } catch(e) {
            this.render(
                {
                    ErrorTitle: "Whoops! Something went wrong...",
                    ErrorMessage: "Sorry that happenend! Please try to reload this page or come back later."
                },
                errorTemplate
             );
        }
    };

    this.mount();

};
