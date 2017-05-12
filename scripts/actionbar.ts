/**
 * Created by T0astBread on 23.04.2017.
 */

let isDragging: boolean, collapseOnRelease:boolean, expandOnRelease: boolean, heightStart: number, prevDistance: number;

let getPageY = (evt) =>
{
    let y = undefined;
    if(evt.originalEvent !== null && evt.originalEvent.touch !== null) y = evt.originalEvent.touches[0].pageY;
    else y = evt.pageY;
    return y;
};

let getHeight = () =>
{
    return $("#actionbar-nav").height();
};

let animateExpandedState = (duration = 300, targetExpandedHeight = 0) =>
{
    // $("#actionbar-nav").animate({height: "0"}, duration, "swing");
    animateHeight(targetExpandedHeight, duration);
    isDragging = false;
};

let setHeight = (height) =>
{
    $("#actionbar-nav").height(height);
    slideUpdate();
};

let slideUpdate = () =>
{
    updateNavOpacity();
    updateDarkenness();
}

let updateNavOpacity = () => $("#actionbar-nav > *").css("opacity", getActionBarSlideProgress());

let updateDarkenness = () =>
{
    if(getHeight() < 10) setDarkenContent({darken: false});
    else setDarkenContent({darken: true, blockPointerEvents: true, opacity: getActionBarHeightProgress()});
};

var getActionBarHeightProgress = () => 1.0 * getHeight() / window.innerHeight;
var getActionBarSlideProgress = () => 1.0 * getHeight() / (getMaxHeight());

let getMaxHeight = () => window.innerHeight * .8;

let animateHeight = (height, duration) =>
{
    $("#actionbar-nav").animate({height: "" + height}, duration, "swing");
    $({i: 0}).animate({i: 100}, {duration: duration, step: slideUpdate});
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
            if(getHeight() <= getMaxHeight() || (deltaDist < 0 && distance < getHeight()))
            {
                setHeight(distance);
            }

            collapseOnRelease = isDragging && deltaDist < -1;
            expandOnRelease = isDragging && deltaDist > 1;

            prevDistance = distance;
            evt.preventDefault();
        }
    }).on("touchend mouseleave", () =>
    {
        if(inactive()) return;

        isDragging = false;
        // $("header").css("transition", oldTransition);
        prevDistance = 0;

        // animateExpandedState(1000, getHeight() < getMaxHeight() * .4 ? 0 : getMaxHeight());

        if(getHeight() <= 200)
        {
            animateExpandedState();
            return;
        }

        if(collapseOnRelease) animateExpandedState(1000);
        else if(expandOnRelease) animateExpandedState(1000, getMaxHeight());
        else animateExpandedState(1000, getHeight() < getMaxHeight() * .4 ? 0 : getMaxHeight());
        console.log(collapseOnRelease, expandOnRelease);
    });
});
