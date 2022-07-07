$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var firstName = $("input#name").val(); // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      var data = {
        name: $("input#name").val(),
        email: $("input#email").val(),
        phone: $("input#phone").val(),
        message: $("textarea#message").val()
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      ////recaptcha
      //e.preventDefault();

      grecaptcha.ready(function() {
          grecaptcha.execute('6LfNTmQaAAAAAGZ45UD9YS4xOfyQxOsc5foXclDE', {action: 'submit'}).then(function(token) {
              // Add your logic to submit to your backend server here.

              $.ajax({
                url: "https://55ceoq54bg.execute-api.us-west-2.amazonaws.com/prod/",
                type: "POST",
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
                headers: {'x-api-key': 'tRiwH1Vr0D1RoOCpC5bYs2Xvh439lWvz7cb86eSZ' },
                data: JSON.stringify(data),
        //        data: {
        //          name: name,
        //          phone: phone,
        //          email: email,
        //          message: message
        //        },
                cache: false,
                success: function() {
                  // Success message
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                  $('#success > .alert-success')
                    .append('</div>');
                  //clear all fields
                  $('#contactForm').trigger("reset");
                },
        //        error: function() {
                error: function(jqxhr, status, exception) {
                     alert('Exception:', jqxhr , status , exception);


                  // Fail message
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                  $('#success > .alert-danger').append('</div>');
                  //clear all fields
                  $('#contactForm').trigger("reset");
                },
                complete: function() {
                  setTimeout(function() {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                  }, 1000);
                }
              });

          }); //recaptcha
      }); //recaptcha


    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});

