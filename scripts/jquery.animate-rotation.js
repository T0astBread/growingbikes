/**
 * Created by StackOverflow users {@link http://stackoverflow.com/users/1250044/yckart yckart} and {@link http://stackoverflow.com/users/2569968/drabname drabname}
 *
 * {@link http://stackoverflow.com/a/15191130}
 * {@link http://stackoverflow.com/a/17579246}
 */

// $.fn.animateRotate = function(angle, duration, easing, complete) {
//     var args = $.speed(duration, easing, complete);
//     var step = args.step;
//     return this.each(function(i, e) {
//         args.complete = $.proxy(args.complete, e);
//         args.step = function(now) {
//             $.style(e, 'transform', 'rotate(' + now + 'deg)');
//             if (step) return step.apply(e, arguments);
//         };
//
//         $({deg: 0}).animate({deg: angle}, args);
//     });-
// };

$.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete)
{
    return this.each(function()
    {
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function(now)
            {
                elem.css({
                    '-moz-transform': 'rotate(' + now + 'deg)',
                    '-webkit-transform': 'rotate(' + now + 'deg)',
                    '-o-transform': 'rotate(' + now + 'deg)',
                    '-ms-transform': 'rotate(' + now + 'deg)',
                    'transform': 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};