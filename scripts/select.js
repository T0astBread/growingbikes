/**
 * Created by T0astBread on 19.03.2017.
 */

$(document).ready(() =>
    $("select").change((e) =>
    {
        let tar = $(e.currentTarget), elm = tar.find(":selected"), prev = tar.html();
        tar.html($("<span>" + elm.text()) + "</span>");
        console.log();
        $(tar).html(prev);
    }));