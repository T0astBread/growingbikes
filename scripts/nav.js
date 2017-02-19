/**
 * Created by T0astBread on 19.02.2017.
 */

var darkened = false, navBarExtended = false;

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
}

/**
 *
 * @param {boolean} extended
 */
function setNavBarExtendedState(extended)
{
    navBarExtended = extended;

    setMouseOver(extended, document.getElementById("nav-parent"));
    var children = document.getElementById("nav-list").getElementsByTagName("*");
    for(var i = 0; i < children.length; i++)
    {
        setMouseOver(extended, children[i]);
        if(i > 100) debugger;
    }
    setDarkenContent(extended);
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

    if(htmlElement.tagName === "DIV" && htmlElement.id == "")
    {
        setTimeout(function()
        {
            htmlElement.style.display = mouseover ? "inline-block" : "none";
        }, 125);
    }
}