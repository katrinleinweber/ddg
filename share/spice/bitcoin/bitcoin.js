function ddg_spice_bitcoin(api_result) {

    if (!api_result) {
        return;
    }

    var DEFAULT_CURRENCY = "USD";

    var query = DDG.get_query();
    var params = query.split(/\s+/g);

    var prices = null;
    for (var i=0; i < params.length; i++) {
        var currency = $.trim(params[i].toUpperCase());
        prices = api_result[currency];
        if (prices) {
            break;
        }
    }

    if (!prices) {
        prices = api_result[DEFAULT_CURRENCY];
    }

    var buy = {
        price: prices.buy.toFixed(2),
        symbol: prices.symbol,
        title: "Buy"
    };

    var sell = {
        price: prices.sell.toFixed(2),
        symbol: prices.symbol,
        title: "Sell"
    };

    Spice.render({
        header1           : "Bitcoin Exchange Prices",
        source_name       : "Blockchain",
        spice_name        : "bitcoin",
        source_url        : 'http://markets.blockchain.info/',
        force_favicon_url : "http://blockchain.info/favicon.ico",

        template_frame   : "twopane",
        template_options : {
            left : { template: "bitcoin", data: buy },
            right : { template: "bitcoin", data: sell }
        },
        force_no_fold    : true,
        force_big_header : true
    });
}