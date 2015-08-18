/*!
 * WWOT Popup
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */

(function () {
  'use strict';
  var popup = function(nid, delay, expire){
    var self = {};
    var popups,
        popupsArray=[],
        idArray =[],
        dateArray =[];
    //triggers
    var popupCpopuplose =$(".popup-close"),
        popupSubmit =$('.popup-submit');

    //options
    var delay = delay || 1000,
        expire = expire || 6;

    //private methods
    var open = function(){
      //check if nid exists
      if($.inArray(nid, idArray) === -1){
        $("body").addClass("popup-open");
        popupCpopuplose.click(close);
      }else{
        var currentDate = new Date().getTime();
        var time = dateArray[$.inArray(nid, idArray)];
        var compare =  Math.abs(currentDate - time);
        var hr = Math.ceil((compare/(1000*60*60)));
        if(hr < expire){
          console.log("exist, do nothing");
        } else{
          $("body").addClass("popup-open");
           popupsArray.splice($.inArray(nid, idArray), 1);
           popupCpopuplose.click(close);
        }
      }
    };

    var close = function(e){
      e.preventDefault();
      var date = new Date().getTime();
      var obj ={
        id: nid,
        t: date
      }
      if(popupsArray.length){
       popupsArray.push(obj);
      } else{
        popupsArray =[obj];
      }
      $("body").removeClass("popup-open");
      localStorage.setItem("popups", JSON.stringify(popupsArray));
    };

    var init = function(){
      if(typeof Storage !== "undefined"){
        popups = localStorage.getItem("popups");
        //check if exists
        if(popups){
           popupsArray=JSON.parse(popups);
           console.log(popupsArray);
           //Get ID Array
           for (var i = 0; i < popupsArray.length; i ++){
            //create two array for manipulation
              idArray.push(popupsArray[i].id);
              dateArray.push(popupsArray[i].t);
            }
        }
        window.setTimeout(open, 2000);
      }else{
        console.log("No Storage");
      }
    };
    init();
    return self;
  };
  window.popup = popup;

})();
