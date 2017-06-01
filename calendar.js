"use strict";
(function(calr){
        calr = {
            __proto__ : {
                calendarHolder : '<div class="calendarHolder"></div>'
            },
            attach : function (selector) {
                for(let node of document.querySelectorAll(selector))
                {
                    calr.attachFocusListener(node);
                    calr.addCalenderHolder(node);
                }
            },
            addCalenderHolder : function(node){
                node.insertAdjacentHTML('afterend', calr.calendarHolder);
            },
            attachFocusListener : function(node){
                node.addEventListener('focus',function(){
                    // calr.displayCalendar(this.nextSibling);
                    calr.addCalendar(this.nextSibling);
                }, true);
                // node.addEventListener('blur',function(){
                //     this.nextSibling.style.display = "none";
                // }, true);
            },
            addListeners : function(selector)
            {
                selector.addEventListener('click',function(){
                    if(selector.classList.contains('prevMonthNav'))
                    {
                        calr.showPreviousMonth();
                    }else if(selector.classList.contains('nextMonthNav'))
                    {
                        alert('l');
                    }
                },true);
            },
            showPreviousMonth : function()
            {

            },
            showCalendar : function()
            {

            },
            addCalendar : function(node)
            {

                var htmlDates = "";
                var htmlCalendar = "";
                var counter = 1;
                var data = calr.getCurrentMonth();

                var weekEnd = data.day;
                var weekStart = data.day;
                var currentDay = data.day;
                while(weekStart > 0)
                {
                    htmlDates += "<td class='empty'>&nbsp;</td>";
                    weekStart--;
                }
                while(counter <= data.totalDays)
                {
                    if(weekEnd > 6)
                    {
                        weekEnd = 0;
                        htmlDates += "</tr><tr>";
                    }
                    if(counter == currentDay)
                    {
                        htmlDates += "<td class='active'>"+counter+"</td>";
                    }else
                    {
                        htmlDates += "<td>"+counter+"</td>";
                    }
                    weekEnd++;
                    counter++;
                }
                htmlCalendar += "<div class='monthName'>"+data.monthName+"</div>";
                htmlCalendar += "<table class='table'>";
                htmlCalendar += "<thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead>";
                htmlCalendar += "<tbody>";
                htmlCalendar += "<tr>";
                htmlCalendar += htmlDates;
                htmlCalendar += "</tr></tbody></table>";
                node.innerHTML = htmlCalendar;
            },
            getCurrentMonth : function()
            {
                var date = new Date();
                var month = date.getMonth();
                var fullMonthName = calr.getFullMonthName(month);
                var day = date.getDay();
                var dayName = calr.getDayName(day);
                var currentYear = date.getFullYear();
                var numOfDays = calr.daysInMonth(month+1 /* +1 for current month as index starts from 0 */,currentYear);
                // document.getElementById('call').innerHTML = month;
                var calendarData = {
                    month : month,
                    monthName : fullMonthName,
                    day :day,
                    dayName : dayName,
                    year : currentYear,
                    totalDays : numOfDays,
                };
                // console.log(calendarData);
                return calendarData;
            },
            getFullMonthName : function(month)
            {
                var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
                return monthNames[month];
            },
            getDayName : function(day)
            {
                var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
                return dayNames[day];
            },
            daysInMonth : function(month,year)
            {
                return new Date(year, month, 0).getDate();
            },
            displayCalendar : function(node){
             var htmlContent ="";
             var FebNumberOfDays ="";
             var counter = 1;


             var dateNow = new Date();
             var now = new Date();
             var current = new Date(now.getFullYear(), now.getMonth()+1, 1);
             var month = dateNow.getMonth();

             var nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
             var prevMonth = month -1;
             var day = dateNow.getDate();
             var year = dateNow.getFullYear();


             //Determing if February (28,or 29)
             if (month == 1){
                if ( (year%100!=0) && (year%4==0) || (year%400==0)){
                  FebNumberOfDays = 29;
                }else{
                  FebNumberOfDays = 28;
                }
             }


             // names of months and week days.
             var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
             var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
             var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"]


             // days in previous month and next one , and day of week.
             var nextDate = new Date(nextMonth +' 1 ,'+year);
             var weekdays= nextDate.getDay();
             var weekdays2 = weekdays
             var numOfDays = dayPerMonth[month];

             // this leave a white space for days of pervious month.
             while (weekdays>0){
                htmlContent += "<td class='monthPre'></td>";

             // used in next loop.
                 weekdays--;
             }

             // loop to build the calander body.
             while (counter <= numOfDays){

                 // When to start new line.
                if (weekdays2 > 6){
                    weekdays2 = 0;
                    htmlContent += "</tr><tr>";
                }



                // if counter is current day.
                // highlight current day using the CSS defined in header.
                if (counter == day){
                    htmlContent +="<td class='dayNow'  onMouseOver='this.style.background=\"#FF0000\"; this.style.color=\"#FFFFFF\"' "+
                    "onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>"+counter+"</td>";
                }else{
                    htmlContent +="<td class='monthNow' onMouseOver='this.style.background=\"#FF0000\"'"+
                    " onMouseOut='this.style.background=\"#FFFFFF\"'>"+counter+"</td>";

                }

                weekdays2++;
                counter++;
             }



             // building the calendar html body.
             var calendarBody = "<table class='calendar'> <tr class='monthNow'><th colspan='7'><span class='prevMonthNav calNav' onclick='calendar.addListeners(this);'> << </span> "
             +monthNames[month]+" "+ year +" <span class='nextMonthNav calNav' onclick='calendar.addListeners(this);'> >> </span></th></tr>";
             calendarBody +="<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>"+
             "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
             calendarBody += "<tr>";
             calendarBody += htmlContent;
             calendarBody += "</tr></table>";
             node.innerHTML = calendarBody;
             node.style.display = "block";
            }
        }
        window.calendar = calr;
})();
