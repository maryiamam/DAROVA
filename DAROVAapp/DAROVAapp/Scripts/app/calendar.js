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
            showSchedule(startDate, endDate);

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

    var showSchedule = function(start, end) {
        self.sd = start, self.ed = end;
        $(".week").css("display", "block");
        let url = `/Schedule/GetWeek`;
        let getUrl = url + '?start=' + self.sd.toISOString() + '&end=' + self.ed.toISOString();
        $.get(getUrl, function(response) {
            let week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            $(".week").html("").css("display", "block");
            $(".chosen-day").css("display", "none");
            for (let i = 0; i < 7; i++) {
                let plansExist = false;
                let div = $("<div/>", { class: "col-md-4"}).appendTo($(".week"));
                let day = $("<div/>", { class: "card " + week[i] }).appendTo(div);
                $("<a/>", { class: "center card-header" }).html(week[i]).appendTo(day);
                if (response) {
                    $("<div/>", { class: "card-content" }).html("<table><thead><tr><th>Time</th><th>" +
                        "Subject</th><th>Place</th></tr></thead><tbody><tr class='subjects " + week[i] +
                        "'></tr></tbody></table>").appendTo(day);
                    for (let j = 0; j < response.length; j++) {
                        let startDate = parseDate(response[j].StartDate);
                        let dateDay = startDate.getDay();
                        if (dateDay === i) {
                            plansExist = true;
                            $("<td/>").html(toHumanTime(response[j].StartTime) + "-<br/>" + toHumanTime(response[j].FinishTime))
                                .appendTo($(".subjects." + week[i]));
                            $("<td/>").html(response[j].SubjectName + "<br>(" + response[j].Type + ")")
                                .appendTo($(".subjects." + week[i]));
                            $("<td/>").html(response[j].Place).appendTo($(".subjects." + week[i]));
                        } else {
                            console.log("");
                        }
                    }
                    if (!plansExist) {
                        $("<div/>", { class: "card-content" }).html("no plans").appendTo(day);
                    }
                }
                else {
                    $("<div/>", { class: "card-content" }).html("no plans").appendTo(day);
                }
            }
        }); 
    }
    
})(jQuery);