(function ($) {
    var self = this;

    var parseDate = function (cSharpDate) {
        var stripedCsharpDate = cSharpDate.replace(/[^0-9 +]/g, '');
        return new Date(parseInt(stripedCsharpDate));
    }

    var toHumanTime = function (datetime) {
        let date = parseDate(datetime);
        let minutes = date.getMinutes();
        let time = date.getHours() + ":" + (minutes === 0? "00" : minutes);
        return time;
    }

    $('#datepicker').datepicker({
        firstDay: 1,
        inline: true,
        sideBySide: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (dateText, inst) {
            var date = new Date(dateText);
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 1);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
            selectCurrentWeek();
            showWeek(startDate, endDate);

        },
        beforeShowDay: function (date) {
            var cssClass = '';
            if (date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        onChangeMonthYear: function (year, month, inst) {
            selectCurrentWeek();
        }
    });
    var startDate;
    var endDate;
    var sd, ed;

    var selectCurrentWeek = function () {
        window.setTimeout(function () {
            $('#datepicker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
        }, 1);
    }

    var showDay = function (weekDay, weekSchedule) {
        $(".schedule").html("");
        let plansExist = false;
        let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let day = $("<div/>", { class: "card"}).appendTo($(".schedule"));
        $("<h4/>", { class: "center card-header" }).html(week[weekDay]).appendTo(day);
        let tableDiv = $("<div/>", { class: "card-content" }).appendTo(day);
        let table = $("<table/>", { class: "highlight" }).appendTo(tableDiv);
        $("<thead/>").html("<tr><th>Time</th><th>Subject</th><th>Place</th><th>Professor</th><th>Type</th></tr>")
            .appendTo(table);
        let body = $("<tbody/>").appendTo(table);
        for (let k = 0; k < weekSchedule.length; k++) {
            if (weekDay + 1 === parseDate(weekSchedule[k].StartDate).getDay()) {
                plansExist = true;
                let tr = $("<tr/>").appendTo(body);
                $("<td/>").html(toHumanTime(weekSchedule[k].StartTime) + "-" +
                    toHumanTime(weekSchedule[k].FinishTime)).appendTo(tr);
                $("<td/>").html(weekSchedule[k].SubjectName).appendTo(tr);
                $("<td/>").html(weekSchedule[k].Place).appendTo(tr);
                $("<td/>").html(weekSchedule[k].Professor).appendTo(tr);
                $("<td/>").html(weekSchedule[k].Type).appendTo(tr);
            }
        }
        if (!plansExist) {
            tableDiv.html("<div class='card-content'>no plans for this day</div>");
        }
    }

    var showWeek = function(start, end) {
        self.sd = start, self.ed = end;
        let url = `/Schedule/GetWeek`;
        let getUrl = url + '?start=' + self.sd.toISOString() + '&end=' + self.ed.toISOString();
        $.get(getUrl, function(response) {
            let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            $(".schedule").html("");
            for (let i = 0; i < 7; i++) {
                let plansExist = false;
                let div = $("<div/>", { class: "col-md-4"}).appendTo($(".schedule"));
                let day = $("<div/>", { class: "card " + week[i] }).appendTo(div);
                $("<h5/>", { class: "center card-header" }).html(week[i]).appendTo(day).click(function() {
                    showDay(i, response);
                });
                if (response) {
                    $("<div/>", { class: "card-content " + week[i]}).html("<table class='highlight'><thead><tr><th>Time</th><th>Subject</th>" +
                        "<th>Place</th></tr></thead><tbody class='subjects " + week[i] +
                        "'></tbody></table>").appendTo(day);
                    for (let j = 0; j < response.length; j++) {
                        let startDate = parseDate(response[j].StartDate);
                        let dateDay = startDate.getDay();
                        if (dateDay === i + 1) {
                            plansExist = true;
                            let tr = $("<tr/>").appendTo($(".subjects." + week[i]));
                            $("<td/>").html(toHumanTime(response[j].StartTime) + "-<br/>" + toHumanTime(response[j].FinishTime))
                                .appendTo(tr);
                            $("<td/>").html(response[j].SubjectName + "<br>(" + response[j].Type + ")")
                                .appendTo(tr);
                            $("<td/>").html(response[j].Place).appendTo(tr);
                        } 
                    }
                    if (!plansExist) {
                        $(".card-content." + week[i]).html("<div class='card-content'>no plans</div>");
                    }
                }
                else {
                    $(".card-content." + week[i]).html("<div class='card-content'>no plans</div>");
                }
            }
        }); 
    }
    
})(jQuery);