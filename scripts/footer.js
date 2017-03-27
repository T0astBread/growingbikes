/**
 * Created by T0astBread on 18.03.2017.
 */

let hightlighted, highlightFootersOnHover, lastHoverSwitch, isHoveringOverFooter;

$(document).ready(() =>
{
    // $("footer").each(() =>
    // {
    //     $(this).onmouseover = () =>
    //     {
    //         console.log("mouseenter on footer");
    //     }
    // })
    $("footer").mousemove(() => handleMouseEvent(true)).mouseleave(() => handleMouseEvent(false));
    setHighlightFootersOnHover(true);
});

/**
 *
 * @param {boolean} enter Indicates whether a mouseenter event or a mouseout event has occured
 */
let handleMouseEvent = (enter) =>
{
    isHoveringOverFooter = enter;
    if(enter && !highlightFootersOnHover) return;
    // let currTime = Date.now(), doContinue = true;
    // if(lastHoverSwitch === undefined || currTime - lastHoverSwitch < 1000)
    // {
    //     doContinue = false;
    // }
    // lastHoverSwitch = currTime;
    // if(!doContinue) return;

    setHighlightedFooter(enter);
};

/**
 *
 * @param {boolean} highlighted
 */
var setHighlightedFooter = (isHighlighted) =>
{
    if(isHighlighted === hightlighted/* || darkeningInProgress*/) return;
    hightlighted = isHighlighted;
    // setTimeout(() => $("footer").css("z-index", highlighted ? "10" : "6"), highlighted ? 0 : 200);
    $("footer").css("z-index", hightlighted ? "10" : "6");
    if(hightlighted) setDarkenContent(true, 10);
    else setDarkenContent(false);
};

var setHighlightFootersOnHover = (highlightOnHover) =>
{
    highlightFootersOnHover = highlightOnHover;
};