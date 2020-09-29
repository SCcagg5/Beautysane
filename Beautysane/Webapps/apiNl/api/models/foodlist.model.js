'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var foodlist = function(recette){
    this.alim_grp_nom_fr = recette.alim_grp_nom_fr;
    this.alim_ssgrp_nom_fr = recette.alim_ssgrp_nom_fr;
    this.alim_ssssgrp_nom_fr = recette.alim_ssssgrp_nom_fr;
    this.alim_code=recette.alim_code;
    this.alim_nom_fr=recette.alim_nom_fr


};
foodlist.create = function (newEmp, result) {
    dbConn.query("INSERT INTO foodlist set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
foodlist.findById = function (id, result) {
    dbConn.query("Select * from foodlist where alim_code = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
foodlist.findAll = function (result) {
    dbConn.query("Select * from foodlist", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('recettes : ', res);
            result(null, res);
        }
    });
};

foodlist.delete = function(id, result){
    dbConn.query("DELETE FROM foodlist WHERE alim_code = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= foodlist;
