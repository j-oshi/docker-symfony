window.onload = function () {
    imageUpload("GalleryPic","result",10);
    imageUpload("MenuPic", "resulttwo", 4);
    pdfUpload("MenuPDF", "resultpdf", 1)
}

function imageUpload(e,f,g){
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById(e);



        filesInput.addEventListener("change", function (event) {

            var files = event.target.files; //FileList object
            var output = document.getElementById(f);

            if (files.length > g) {
                $('.validation'+ g +'type').css('display', 'block');
            } else {
                $('.validation' + g + 'type').css('display', 'none');
            }

            //for (var i = 0; i < files.length; i++) {
            for (var i = 0; i < g; i++) {
                var file = files[i];

                //Only pics
                if (!file.type.match('image'))
                    continue;

                var picReader = new FileReader();

                picReader.addEventListener("load", function (event) {

                    var picFile = event.target;

                    var div = document.createElement("div");

                    div.innerHTML = "<img class='thumbnaili' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/> <a href='#' class='btn remove_pict'>Remove</a>";

                    output.insertBefore(div, null);
                    div.children[1].addEventListener("click", function (event) {
                        div.parentNode.removeChild(div);
                    });

                });

                //Read the image
                picReader.readAsDataURL(file);
            }

        });
    }
    else {
        console.log("Your browser does not support File API");
    }
}

function pdfUpload(e, f, g) {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById(e);



        filesInput.addEventListener("change", function (event) {

            var files = event.target.files; //FileList object
            var output = document.getElementById(f);

            if (files.length > g) {
                $('.validation' + g + 'type').css('display', 'block');
            } else {
                $('.validation' + g + 'type').css('display', 'none');
            }

            //for (var i = 0; i < files.length; i++) {
            for (var i = 0; i < g; i++) {
                var file = files[i];

                //Only pics
                if (!file.type.match('application'))
                    continue;

                var pdfReader = new FileReader();

                pdfReader.addEventListener("load", function (event) {

                    var pdfFile = event.target;

                    var div = document.createElement("div");

                    //div.innerHTML = "<img class='thumbnaili' src='" + picFile.result + "'" +
                    //        "title='" + picFile.name + "'/> <a href='#' class='btn remove_pict'>Remove</a>";

                    //div.innerHTML = "<div style="width: 100%; height: 100%"><embed height="100%" width="100%" src='" + pdfFile.result + "' /></embed></div>";
                    div.innerHTML = "<div class='pdfdiv'><embed class='pdfembed' src='" + pdfFile.result + "' /></embed></div><a href='#' class='btn remove_pict'>Remove</a>";

                    output.insertBefore(div, null);
                    div.children[1].addEventListener("click", function (event) {
                        div.parentNode.removeChild(div);
                    });

                });

                //Read the image
                pdfReader.readAsDataURL(file);
            }

        });
    }
    else {
        console.log("Your browser does not support File API");
    }
}