(function($) {
    var scheduleItem = {
        SubjectName: '',
        Professor: '',
        StartTime: '',
        FinishTime: '',
        StartDate: '',
        Duration: '',
        Type: '',
        Place: ''
    };

    function initialize() {
        $("#save-schedule-item").click(saveChanges);
        $(".delete-schedule-item-btn").click(deleteItem);
    };

    function saveChanges(e) {
        e.preventDefault();
        scheduleItem.SubjectName = $('#subject').val();
        scheduleItem.Professor = $('#professor').val();
        scheduleItem.StartTime = $('#start-time').val();
        scheduleItem.Type = $('#type').val();
        scheduleItem.FinishTime = $('#finish-time').val();
        scheduleItem.Place = $('#place').val();
        scheduleItem.Duration = $('#duration').val();
        scheduleItem.StartDate = $('#start-date').val();

        sendUser();
    };

    function sendUser() {
        var url = `/Schedule/EditSchedule`;
        $.post(url,
            scheduleItem,
            function(response) {
                if (response) {
                    alert("item saved");
                    window.location = '/Schedule';
                    return;
                }
                alert("fail");
            });
    };

    function deleteItem() {
        var itemId = this.id.toString();
        var url = `/Schedule/DeleteItem`;
        $.get(url, { itemId: itemId },
            function (response) {
                window.location = "/Schedule";
                return;
            });
    }

    initialize();

})(jQuery);