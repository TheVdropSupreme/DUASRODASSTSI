"use strict";
exports.__esModule = true;
var mysql_1 = require("./mysql");
var MySQLFactory = /** @class */ (function () {
    function MySQLFactory() {
    }
    MySQLFactory.prototype.getConnection = function () {
        return new mysql_1.MySQL('localhost', 'root', '', 'duas_rodas_bd');
    };
    return MySQLFactory;
}());
exports.MySQLFactory = MySQLFactory;
