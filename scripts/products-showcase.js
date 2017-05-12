"use strict";
/**
 * Created by T0astBread on 26.03.2017.
 */
$(document).ready(function () {
    $(window).resize(function (evt) {
        var rows = $(".products-showcase tr");
        rows.each(function (i, r) {
            // console.log($(r).outerWidth(), r.scrollWidth);
            // if($(r).outerWidth() < r.scrollWidth) console.log("out of bounds");
        });
    });
    $(".products-showcase").each(function (i, e) { return e.addEventListener("overflow", function (evt) { return console.log("overflow"); }); });
});
