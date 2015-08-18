/*!
 * Popups by @chloechenlei
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
    var popupClose =$(".popup-close"),
        popupSubmit =$('.popup-submit');

    //options
    var delay = delay || 500,
        expire = expire || 6;

    //private methods
    var open = function(){
      //check if nid exists
      if($.inArray(nid, idArray) === -1){
        $("body").addClass("popup-open");
        if (popupClose){popupClose.click(close)};
        if (popupSubmit){popupSubmit.click(close)};
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
           if (popupClose){popupClose.click(close)};
           if (popupSubmit){popupSubmit.click(close)};
        }
      }
    };

    var close = function(e){
      if($(this).text() === popupClose.text()){
        e.preventDefault();
      }
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
           //Get ID Array
           for (var i = 0; i < popupsArray.length; i ++){
            //create two array for manipulation
              idArray.push(popupsArray[i].id);
              dateArray.push(popupsArray[i].t);
            }
        }
        window.setTimeout(open, delay);
      }else{
        console.log("No Storage");
      }
    };
    init();
    return self;
  };
  window.popup = popup;
})();
