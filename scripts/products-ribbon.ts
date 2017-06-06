/**
 * Created by Michael on 06.06.2017.
 */

$(document).ready(() =>
{
    $(".products-ribbon-slide").on("mousemove", evt =>
    {
        // let movement = (evt as MouseEvent).movementX;
        evt.target.scrollLeft = (evt as MouseEvent).offsetX;
    });
    $(".products-ribbon-slide .product-tile").on("mousemove", evt => $(evt.target.parentElement).triggerHandler("mousemove", evt));
});