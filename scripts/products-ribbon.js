"use strict";
/**
 * Created by Michael on 06.06.2017.
 */
{
    var mouseDown_1, lastMouseDown_1, lastMouseDownPageX_1;
    var offsetInElem_1 = function (target, evt) { return evt.pageX - $(target).offset().left; };
    var scrollElementWithEvent_1 = function (target, evt) {
        var distFromLeftEdge = lastMouseDown_1 - offsetInElem_1(target, evt);
        $(target).scrollLeft(distFromLeftEdge);
    };
    var scrollElementWithEventIfMouseDown_1 = function (target, evt) { return mouseDown_1 ? scrollElementWithEvent_1(target, evt) : null; };
    var startScroll_1 = function (target, evt) {
        mouseDown_1 = true;
        lastMouseDown_1 = offsetInElem_1(target, evt) + target.scrollLeft;
        lastMouseDownPageX_1 = evt.pageX;
    };
    var endScroll_1 = function () {
        mouseDown_1 = false;
    };
    var distanceSinceStart_1 = function (evt) { return Math.abs(evt.pageX - lastMouseDownPageX_1); };
    $(document).ready(function () {
        $(".products-ribbon-slide")
            .on("mousedown", function (evt) { return startScroll_1(evt.currentTarget, evt); })
            .on("mousemove", function (evt) { return scrollElementWithEventIfMouseDown_1(evt.currentTarget, evt.originalEvent); });
        $(".products-ribbon-slide .product-tile")
            .on("mousedown", function (evt) { return evt.preventDefault(); })
            .on("click", function (evt) {
            if (distanceSinceStart_1(evt) > 30)
                evt.preventDefault();
        });
        $(document).on("mouseup", endScroll_1);
        //TEMPORARY
        // $(".products-ribbon-slide .product-tile, .products-ribbon-slide .product-tile *").css("-webkit-user-select", "none").css("-webkit-user-drag", "none").attr("draggable", "false");
    });
}
