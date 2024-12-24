function readURL(input, imgControlName) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $(imgControlName).attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
}
  
  $("#uploadPrifile").change(function() {
    var imgControlName = "#imgPreview";
    readURL(this, imgControlName);
    $('.preview1').addClass('it');
  });
  
  $("#uploadVideo").change(function() {
    $('.videoPoster').hide()
    var imgControlName = "#videoPreview";
    readURL(this, imgControlName);
  });
  
  
      