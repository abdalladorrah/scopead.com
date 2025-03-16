(function($){
    $("#ContactForm").on("submit", function(e){
        var StatusEl = $(this).find(".form-msg"); 
        // var formData = $(this).serialize();
        var formData = new FormData(this);
        
        // Check if the reCAPTCHA is completed
        var recaptchaResponse = formData.get("g-recaptcha-response");
        if (!recaptchaResponse) {
          StatusEl.addClass("error");
           StatusEl.text("Please complete the reCAPTCHA.");
          StatusEl.slideDown("400");
          return false;
        }
         
        var url = $(this).attr("action");
        var this__form = $(this);
        StatusEl.slideUp('100');
        if (!e.isDefaultPrevented() && !$(this).find('.submit-btn').hasClass('disabled')) {
            this__form.find('.submit-btn').text('Sending...')
            $.ajax({
                method: "POST",
                url: url,
                data: formData,
                processData: false,
                contentType: false,
            }).done(function(response){
                StatusEl.addClass("success");
                StatusEl.removeClass("error");
                StatusEl.text(response);
                this__form.find('.submit-btn').text('Submit');
                this__form.find('input').val('');
                this__form.find('textarea').val('');
                StatusEl.slideDown('400');
                 this__form.find('input').hide();
                 this__form.find('textarea').hide();
                  this__form.find('button').hide();
                  this__form.find('.select2').hide();
                this__form.find('.g-recaptcha').hide();
                  this__form.find('.iti--allow-dropdown').hide();
                // setTimeout(function(){
                //     StatusEl.slideUp('400');
                // }, 3000);

            }).fail(function(data){
                StatusEl.removeClass("success");
                StatusEl.addClass("error");
                this__form.find('.submit-btn').text('Submit'); 
                this__form.find('input').val('');
                this__form.find('textarea').val('');
                StatusEl.slideDown('400');
                setTimeout(function(){
                    StatusEl.slideUp('400');
                }, 3000);
               
                // Set the message text.
                if (data.responseText !== '') {
                    $(StatusEl).text(data.responseText);
                } else {
                  // $(StatusEl).text('Oops! An error occured and your message could not be sent.');
                }

            });
            return false; 
        } 
    });
})(jQuery);



$(document).ready(function() {
    
    $("#submitBtn").submit(function(event) {
      event.preventDefault(); // Prevent the default form submission and page reload
      
      var formData = new FormData(this);
      var url = $(this).attr("action");
      
      $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
                        $("#successMessage").html(data).show();
                    },
                    error: function (xhr, status, error) {
                        var response = JSON.parse(xhr.responseText);
                        $("#errorMessage").html(response.error).show();
                    }
      });
    });
  });


$(document).ready(function() {
    
  document.getElementById("pageURL").value = window.location.href;
 });
