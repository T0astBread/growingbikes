/**
 * Created by T0astBread on 19.02.2017.
 *
 * Libraries used: jQuery, {@link https://github.com/kswedberg/jquery-smooth-scroll jquery.smooth-scroll.js} and {@link http://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate/15191130#15191130 a library for animating rotation}
 */

let darkened = false, darkeningInProgress = false, darkeningLocked = false, navBarExtended = false,
    navBarLocked = false, scrolledToLegalInfos = false, hasSeenLegalChangesAnimationOnce = false, isHoveringOverNav;

/**
 * Call when the HTML document is ready
 */
$(document).ready(() =>
{
    let toBeHovered = document.getElementById("nav-parent");

    toBeHovered.onmouseover = () =>
    {
        if(!darkened) setNavBarExtendedState(true);
        isHoveringOverNav = true;
    };

    toBeHovered.onmouseleave = () =>
    {
        if(navBarExtended) setNavBarExtendedState(false);
        isHoveringOverNav = false;
    };

    document.getElementById("scroll-link").onclick = () =>
    {
        setScrollToLegalInfos(!scrolledToLegalInfos);
    };
});

/**
 *
 * @param {boolean} extended
 * @param {boolean} keepDarkBackground
 */
var setNavBarExtendedState = (extended, keepDarkBackground) =>
{
    if(navBarLocked) return;

    navBarExtended = extended;

    let parent = document.getElementById("nav-parent");
    setMouseOver(extended, parent);
    Array.from(parent.getElementsByTagName("*")).forEach(e =>
    {
        setMouseOver(extended, e);
        // if(i > 100) debugger;
    });
    document.getElementById("header-shadow").style.marginLeft = extended ? "20em" : "4em";

    if(keepDarkBackground === undefined) keepDarkBackground = isHoveringOverFooter;
    if(!keepDarkBackground) setDarkenContent({darken: extended});
};

/**
 * Locks the nav in its current state
 * @param {boolean} locked
 */
var setNavBarLocked = (locked) =>
{
    navBarLocked = locked;
};

/**
 *
 * @param {boolean} darken
 * @param {int} zIndex
 * @param {boolean} blockPointerEvents
 * @param {float} opacity
 */
var setDarkenContent = (config) =>
{
    darkened = config.darken;
    if(!darkened) config.blockPointerEvents = false;

    let darkener = document.getElementById("darken-body");
    darkener.style.pointerEvents = config.blockPointerEvents ? "auto" : "none" || "auto";
    darkener.style.opacity = darkened ? config.opacity || .6 : 0;
    // setMouseOver(config.darken, darkener);
    darkeningInProgress = true;
    setTimeout(() => darkeningInProgress = false, 200);
    darkener.style.zIndex = config.zIndex > 0 ? config.zIndex : 7 || 7;
    // console.log("darken " + darkened);
};

/**
 *
 * @param {boolean} mouseover
 * @param {HTMLElement} htmlElement
 */
let setMouseOver = (mouseover, htmlElement) =>
{
    htmlElement.classList.remove(mouseover ? "mouseout" : "mouseover");
    void htmlElement.offsetWidth; //No idea what this line does, I copied it off the internet
    htmlElement.classList.add(mouseover ? "mouseover" : "mouseout");

    if(htmlElement.classList.contains("appear-on-nav-extension"))
    {
        setTimeout(() =>
        {
            htmlElement.style.display = mouseover ? "inline-block" : "none";
        }, 125);
    }
};

/**
 *
 * @param {boolean} scrollThere Whether the page should scroll to the legal infos section or the top
 */
var setScrollToLegalInfos = (scrollThere) =>
{
    if(scrollThere) setTimeout(() => //replaces afterScroll
    {
        setNavBarLocked(false);
        if(hasSeenLegalChangesAnimationOnce) return;
        setNavBarExtendedState(false, true);
        $("#legal-infos").css("z-index", "10");
        setDarkenContent({darken: true, zIndex: 10});
        setTimeout(() =>
        {
            $("#legal-infos").css("z-index", "");
            setDarkenContent({darken: false});
            hasSeenLegalChangesAnimationOnce = true;
        }, 2000);
    }, 600);

    $.smoothScroll(
        {
            scrollTarget: $(scrollThere ? "#legal-infos" : "#top"),
            easing: "swing",
            speed: 1200,
            beforeScroll: () =>
            {
                if(!scrollThere) return;
                setNavBarLocked(true);
            }
        });

    $("#scroll-link-text").text(scrollThere ? "Zum Seitenanfang" : "Copyright & Impressum");

    Array.from($(".scroll-arrow")).forEach((element) =>
    {
        // $(element).css("transform", "rotate(" + (scrollThere ? 180 : 0) + "deg)");
        $(element).animateRotate(getAngle(scrollThere, true), getAngle(scrollThere, false), 300);
    });

    scrolledToLegalInfos = scrollThere;
};

let getAngle = (scrollThere, isStartAngle) =>
{
    return (isStartAngle ? 0 : 180) + (scrollThere ? 0 : 180);
};