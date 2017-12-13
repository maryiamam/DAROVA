function setFilename() {
    const fileInput = $("#file")[0];
    if (fileInput.files.length != 0) {
        let fileName = fileInput.files[0].name;
        $("#input-hider")[0].value = fileName;
    }
}