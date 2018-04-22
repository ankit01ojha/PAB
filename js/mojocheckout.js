
// your secret keys (please obfuscate)
$(function(){
    $.fn.mojoCheckout.defaults.api_key    = 'a5edb3992df9df5480725ad0a889079f';
    $.fn.mojoCheckout.defaults.auth_token = 'e60bd4017609091756d7cb231e3dbdb6';
});


$(function(){

    // assign 'click' event at form button
    $('.unique-classname').on( 'click' , function( event ){

        // prevents default button behavior
        event.preventDefault();

        // get the purpose text in a variable
        var purpose_text = $('.mojo-purpose').text(); // '.mojo-purpose' = the assigned unique classname

        // get the amount text in a variable
        // format & get integers & decimal
        var amount = $('.mojo-amount').text(); // '.mojo-amount' = the assigned unique classname
        var amount_num = amount.replace(/[^\d.,]/g,"")  // remove spaces & unwanted chars

        // init instamojo checkout
        $.fn.mojoCheckout({

            // required setup
            sandbox      : true,
            amount       : 1000,     // add amount_num var here
            purpose      : purpose_text,   // add purpose_text var here
            redirect_url : 'http://localhost:8080/Snacks.html#/',
            send_data: {
                buyer_name : $('[name=buyer_name]').val(),
                email      : $('[name=email]').val(),
                phone      : $('[name=phone]').val()
            }

        });
    });

});
