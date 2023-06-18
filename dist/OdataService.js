"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const sql = require('mssql');
const { odata, Edm } = require('odata-v4-server');
class DataModel {
    constructor() {
        this.Id = undefined;
        this.Name = undefined;
    }
}
__decorate([
    Edm.Key,
    Edm.Computed,
    Edm.Int32
], DataModel.prototype, "Id", void 0);
__decorate([
    Edm.String
], DataModel.prototype, "Name", void 0);
class DataController extends odata.Controller {
    get(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new sql.Request();
            const result = yield request.query(`SELECT * FROM TableName`);
            return result.recordset;
        });
    }
}
__decorate([
    odata.GET,
    __param(0, odata.query)
], DataController.prototype, "get", null);
odata.controller(DataController, true);
const app = express();
app.use('/odata', odata('odata', {
    "username": "<azure-db-username>",
    "password": "<azure-db-password>",
    "server": "<azure-db-server-name>",
    "database": "<azure-db-name>",
}));
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
