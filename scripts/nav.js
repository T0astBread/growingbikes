/**
 * Created by T0astBread on 19.02.2017.
 *
 * Libraries used: jQuery, {@link https://github.com/kswedberg/jquery-smooth-scroll jquery.smooth-scroll.js} and {@link http://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate/15191130#15191130 a library for animating rotation}
 */

var darkened = false, navBarExtended = false, navBarLocked = false, scrolledToLegalInfos = false, hasSeenLegalChangesAnimationOnce = false;

/**
 * Call when the HTML document is ready
 */
function init()
{
    var toBeHovered = document.getElementById("nav-parent");

    toBeHovered.onmouseenter = function()
    {
        if(!darkened) setNavBarExtendedState(true);
    }

    toBeHovered.onmouseleave = function()
    {
        if(navBarExtended) setNavBarExtendedState(false);
    }

    document.getElementById("scroll-link").onclick = function()
    {
        setScrollToLegalInfos(!scrolledToLegalInfos);
    }
}

/**
 *
 * @param {boolean} extended
 * @param {boolean} keepDarkBackground
 */
function setNavBarExtendedState(extended, keepDarkBackground)
{
    if(navBarLocked) return;

    navBarExtended = extended;

    setMouseOver(extended, document.getElementById("nav-parent"));
    var children = document.getElementById("nav-parent").getElementsByTagName("*");
    for(var i = 0; i < children.length; i++)
    {
        setMouseOver(extended, children[i]);
        if(i > 100) debugger;
    }

    if(keepDarkBackground === undefined) keepDarkBackground = false;
    if(!keepDarkBackground) setDarkenContent(extended);
}

/**
 * Locks the nav in its current state
 * @param {boolean} locked
 */
function setNavBarLocked(locked)
{
    navBarLocked = locked;
}

/**
 *
 * @param {boolean} darken
 * @param {Integer} zIndex
 */
function setDarkenContent(darken, zIndex)
{
    darkened = darken;

    var darkener = document.getElementById("darken-body");
    setMouseOver(darken, darkener);
    darkener.style.zIndex = zIndex > 0 ? zIndex : 7;
}

/**
 *
 * @param {boolean} mouseover
 * @param {HTMLElement} htmlElement
 */
function setMouseOver(mouseover, htmlElement)
{
    htmlElement.classList.remove(mouseover ? "mouseout" : "mouseover");
    void htmlElement.offsetWidth; //No idea what this line does, I copied it off the internet
    htmlElement.classList.add(mouseover ? "mouseover" : "mouseout");

    if(htmlElement.classList.contains("appear-on-nav-extension"))
    {
        setTimeout(function()
        {
            htmlElement.style.display = mouseover ? "inline-block" : "none";
        }, 125);
    }
}

/**
 *
 * @param {boolean} scrollThere Whether the page should scroll to the legal infos section or the top
 */
function setScrollToLegalInfos(scrollThere)
{
    if(scrollThere) setTimeout(function() //replaces afterScroll
    {
        console.log("afterscroll");
        setNavBarLocked(false);
        setNavBarExtendedState(false, true);
        $("#legal-infos").css("z-index", "10");
        setDarkenContent(true, 10);
        setTimeout(function()
        {
            $("#legal-infos").css("z-index", "");
            setDarkenContent(false);
            hasSeenLegalChangesAnimationOnce = true;
        }, hasSeenLegalChangesAnimationOnce ? 750 : 2000);
    }, 600);

$.smoothScroll(
    {
        scrollTarget: $(scrollThere ? "#legal-infos" : "#top"),
        easing: "swing",
        speed: 1200,
        beforeScroll: function()
        {
            if(!scrollThere) return;
            setNavBarLocked(true);
            console.log("beforescroll");
        }
    });

$("#scroll-link-text").text(scrollThere ? "Zum Seitenanfang" : "Copyright & Impressum");

$(".scroll-arrow").each(function(index, element)
{
    // $(element).css("transform", "rotate(" + (scrollThere ? 180 : 0) + "deg)");
    $(element).animateRotate(getAngle(scrollThere, true), getAngle(scrollThere, false), 300);
});

scrolledToLegalInfos = scrollThere;
}

function getAngle(scrollThere, isStartAngle)
{
    return (isStartAngle ? 0 : 180) + (scrollThere ? 0 : 180);
}