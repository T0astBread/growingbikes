"use strict";
/**
 * Created by T0astBread on 23.04.2017.
 */
var isDragging, collapseOnRelease, expandOnRelease, heightStart, prevDistance;
var getPageY = function (evt) {
    var y = undefined;
    if (evt.originalEvent !== null && evt.originalEvent.touch !== null)
        y = evt.originalEvent.touches[0].pageY;
    else
        y = evt.pageY;
    return y;
};
var getHeight = function () {
    return $("#actionbar-nav").height();
};
var animateExpandedState = function (duration, targetExpandedHeight) {
    if (duration === void 0) { duration = 300; }
    if (targetExpandedHeight === void 0) { targetExpandedHeight = 0; }
    // $("#actionbar-nav").animate({height: "0"}, duration, "swing");
    animateHeight(targetExpandedHeight, duration);
    isDragging = false;
};
var setHeight = function (height) {
    $("#actionbar-nav").height(height);
    slideUpdate();
};
var slideUpdate = function () {
    updateNavOpacity();
    updateDarkenness();
};
var updateNavOpacity = function () { return $("#actionbar-nav > *").css("opacity", getActionBarSlideProgress()); };
var updateDarkenness = function () {
    if (getHeight() < 10)
        setDarkenContent({ darken: false });
    else
        setDarkenContent({ darken: true, blockPointerEvents: true, opacity: getActionBarHeightProgress() });
};
var getActionBarHeightProgress = function () { return 1.0 * getHeight() / window.innerHeight; };
var getActionBarSlideProgress = function () { return 1.0 * getHeight() / (getMaxHeight()); };
var getMaxHeight = function () { return window.innerHeight * .8; };
var animateHeight = function (height, duration) {
    $("#actionbar-nav").animate({ height: "" + height }, duration, "swing");
    $({ i: 0 }).animate({ i: 100 }, { duration: duration, step: slideUpdate });
};
var inactive = function () {
    return $("#actionbar-nav").css("display") === "none";
};
$(document).ready(function () {
    $("#actionbar").on("touchstart mousedown", function (evt) {
        if (inactive())
            return;
        // oldTransition = $("header").css("transition");
        // $("header").css("transition", "none");
        isDragging = true;
        if (getHeight() <= 10)
            heightStart = getPageY(evt);
        evt.preventDefault();
    }).on("touchmove mousemove", function (evt) {
        if (inactive())
            return;
        if (isDragging) {
            var distance = getPageY(evt) - heightStart, deltaDist = distance - prevDistance;
            if (getHeight() <= getMaxHeight() || (deltaDist < 0 && distance < getHeight())) {
                setHeight(distance);
            }
            collapseOnRelease = isDragging && deltaDist < -1;
            expandOnRelease = isDragging && deltaDist > 1;
            prevDistance = distance;
            evt.preventDefault();
        }
    }).on("touchend mouseleave", function () {
        if (inactive())
            return;
        isDragging = false;
        // $("header").css("transition", oldTransition);
        prevDistance = 0;
        // animateExpandedState(1000, getHeight() < getMaxHeight() * .4 ? 0 : getMaxHeight());
        if (getHeight() <= 200) {
            animateExpandedState();
            return;
        }
        if (collapseOnRelease)
            animateExpandedState(1000);
        else if (expandOnRelease)
            animateExpandedState(1000, getMaxHeight());
        else
            animateExpandedState(1000, getHeight() < getMaxHeight() * .4 ? 0 : getMaxHeight());
        console.log(collapseOnRelease, expandOnRelease);
    });
});
