/**
 * Created by T0astBread on 23.04.2017.
 */

let isDragging = false, heightStart, prevDistance;

let getPageY = (evt) =>
{
    let y = undefined;
    if(evt.originalEvent !== null && evt.originalEvent.touch !== null) y = evt.originalEvent.touches[0].pageY;
    else y = evt.pageY;
    return y;
};

let getHeight = () =>
{
    return parseInt($("#actionbar-nav").height());
};

let collapse = (duration = 300) =>
{
    // $("#actionbar-nav").animate({height: "0"}, duration, "swing");
    animateHeight(0, duration);
    isDragging = false;
};

let setHeight = (height) =>
{
    $("#actionbar-nav").height(height);
    updateDarkenness();
};

let updateDarkenness = () =>
{
    if(getHeight() < 10) setDarkenContent({darken: false});
    else setDarkenContent({darken: true, blockPointerEvents: true, opacity: 1.0 * getHeight() / window.innerHeight});
};

let animateHeight = (height, duration) =>
{
    $("#actionbar-nav").animate({height: "" + height}, duration, "swing");
    $({i: 0}).animate({i: 100}, {duration: duration, step: updateDarkenness});
};

let inactive = () =>
{
    return $("#actionbar-nav").css("display") === "none";
};

$(document).ready(() =>
{
    $("#actionbar").on("touchstart mousedown", evt =>
    {
        if(inactive()) return;

        // oldTransition = $("header").css("transition");
        // $("header").css("transition", "none");
        isDragging = true;
        if(getHeight() <= 10) heightStart = getPageY(evt);
        evt.preventDefault();
    }).on("touchmove mousemove", (evt) =>
    {
        if(inactive()) return;

        if(isDragging)
        {
            let distance = getPageY(evt) - heightStart, deltaDist = distance - prevDistance;
            if(getHeight() <= window.innerHeight * .8 || (deltaDist < 0 && distance < getHeight()))
            {
                setHeight(distance);
            }
            if(isDragging && deltaDist < -15)
            {
                collapse(1000);
            }
            prevDistance = distance;
            evt.preventDefault();
        }
    }).on("touchend mouseleave", () =>
    {
        if(inactive()) return;

        isDragging = false;
        // $("header").css("transition", oldTransition);
        if(getHeight() <= 200) collapse();
        prevDistance = 0;
    });
});
