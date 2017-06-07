"use strict";
/**
 * Created by Michael on 07.06.2017.
 */
var _this = this;
Number.prototype.clamp = function (min, max) { return Math.min(Math.max(_this, max), min); };
