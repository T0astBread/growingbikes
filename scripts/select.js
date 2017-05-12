"use strict";
/**
 * Created by T0astBread on 19.03.2017.
 */
var updateSelectWidth = function (selectJQueryElm) {
    $("#dynamic-size-select-temp").find("*").html(selectJQueryElm.find(":selected").html());
    selectJQueryElm.width($("#dynamic-size-select-temp").width() + 10);
};
$(document).ready(function () {
    $("select.dynamic-size-select").change(function (e) {
        updateSelectWidth($(e.currentTarget));
    });
    updateSelectWidth($("select:not('#dynamic-size-select-temp')"));
});
