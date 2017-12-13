(function ($) {
    var user = {
        Nickname: '',
        EducationEstablishment: '',
        Faculty: '',
        ImageURL: '',
        Grade: '',
        Speciality: ''
    };

    function initialize() {
        $("#save-profile-changes").click(saveChanges);
    };

    function saveChanges(e) {
        e.preventDefault();
        user.Nickname = $('#nickname').val();
        user.EducationsEstablishment = $('#university').val();
        user.Faculty = $('#faculty').val();
        user.ImageURL = $('#input-hider').val();
        user.Grade = $('#grade').val();
        user.Speciality = $('#speciality').val();

        sendUser();
    };

    function sendUser() {
        var url = `/Profile/SaveChanges`;
        $.post(url, user, function (response) {
            if (response) {
                alert("user saved");
                window.location = '/Manage';
                return;
            }
            alert("fail");
        });
    };

    initialize();

})(jQuery);