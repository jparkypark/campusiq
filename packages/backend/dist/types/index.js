"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheStatus = exports.DataSource = exports.ApiStatus = void 0;
// News types and schemas
__exportStar(require("./news"), exports);
// Weather types and schemas  
__exportStar(require("./weather"), exports);
// Stocks types and schemas
__exportStar(require("./stocks"), exports);
// Common types and schemas
__exportStar(require("./common"), exports);
var ApiStatus;
(function (ApiStatus) {
    ApiStatus["SUCCESS"] = "success";
    ApiStatus["ERROR"] = "error";
    ApiStatus["PARTIAL"] = "partial";
})(ApiStatus || (exports.ApiStatus = ApiStatus = {}));
var DataSource;
(function (DataSource) {
    DataSource["NEWS_API"] = "newsapi";
    DataSource["OPENWEATHER"] = "openweather";
    DataSource["TIINGO"] = "tiingo";
    DataSource["DATABASE"] = "database";
})(DataSource || (exports.DataSource = DataSource = {}));
var CacheStatus;
(function (CacheStatus) {
    CacheStatus["HIT"] = "hit";
    CacheStatus["MISS"] = "miss";
    CacheStatus["EXPIRED"] = "expired";
    CacheStatus["DISABLED"] = "disabled";
})(CacheStatus || (exports.CacheStatus = CacheStatus = {}));
