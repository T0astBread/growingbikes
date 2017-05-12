/**
 * Created by T0astBread on 26.03.2017.
 */


$(document).ready(() =>
{
    $(window).resize(evt =>
    {
        let rows = $(".products-showcase tr");
        rows.each((i, r) =>
        {
            // console.log($(r).outerWidth(), r.scrollWidth);
            // if($(r).outerWidth() < r.scrollWidth) console.log("out of bounds");
        });
    });

    $(".products-showcase").each((i, e) => e.addEventListener("overflow", (evt) => console.log("overflow")));
});