'use strict';

electroPageApp
    .service('DateUtils', function ($filter) {

    this.convertLocaleDateToServer = function(date) {
        if (date) {
            return $filter('date')(date, 'yyyy-MM-dd');
        } else {
            return null;
        }
    };

    this.convertLocaleDateFromServer = function(date) {
        if (date) {
        	var dateTimeString = date.split(" ");
            var dateString = dateTimeString[0].split("-");

            return new Date(dateString[0], dateString[1] - 1, dateString[2]);
        }
        return null;
    };

    this.convertDateTimeFromServer = function(date) {
        if (date) {
        	var dateTimeString = date.split(" ");
        	var dateString = dateTimeString[0].split("/");
        	var timeString = dateTimeString[1].split(":");
        	if (timeString.length<3){
        		timeString.push("00");
        	}
            return new Date(dateString[2], dateString[1]-1, dateString[0], timeString[0], timeString[1], timeString[2]);
        } else {
            return null;
        }
    }

    // common date format for all date input fields
    this.dateformat = function() {
        return 'yyyy-MM-dd';
    }
});
