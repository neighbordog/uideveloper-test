/**
*   Tests for the product widget.
*/

casper.test.begin("Test Selz Widget", 14, function suite(test) {

    casper.start("widget.html");

    casper.then(function() {
        this.wait(3600);
    });

    casper.then(function() {
        test.assertExists(".title", "\"Title\" found.");
        test.assert(this.fetchText('.title').length > 0, 'Text for \"title\" found.');

        test.assertExists(".product-image > img", "\"Product image\" found.");

        test.assertExists(".desc", "\"Description\" found.");
        test.assert(this.fetchText('.desc').length > 0, 'Text for \"description\" found.');

        test.assertExists(".price-regular-amount", "\"Regular price\" found.");
        test.assert(this.fetchText('.price-regular-amount').length > 0, 'Text for \"regular price\" found.');

        test.assertExists(".price-amount", "\"Price\" found.");
        test.assert(this.fetchText('.price-amount').length > 0, 'Text for \"price\" found.');

        test.assertExists(".buy-button", "\"Buy button\" found.");
        test.assert(this.fetchText('.buy-button').length > 0, 'Label for \"buy button\" found.');

        test.assertExists(".payment-method", "\"Payment methods\" found.");
        test.assertExists(".paypal", "\"Paypal icon\" found.");
        test.assertExists(".visa, .mastercard, .diners, .amex, .discover, .jcb", "\"Credit card icons\" found.");
    });

    casper.run(function() {
        test.done();
    });

});
