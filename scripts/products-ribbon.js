"use strict";
/**
 * Created by Michael on 06.06.2017.
 */
$(document).ready(function () {
    $(".products-ribbon-slide").on("mousemove", function (evt) {
        // let movement = (evt as MouseEvent).movementX;
        evt.target.scrollLeft = evt.offsetX;
    });
    $(".products-ribbon-slide .product-tile").on("mousemove", function (evt) { return $(evt.target.parentElement).triggerHandler("mousemove", evt); });
});
