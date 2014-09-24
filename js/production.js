/**
 * Created by leroux on 2014/09/22.
 */
var $ = jQuery;
$(document).ready(function(){
    //alert('jj');
    //$(document).foundation();
    //alert('hello');
});

function submit_contact_form(){
    var edt_name = $('#edt_name').val();
    var edt_telefon = $('#edt_telefon').val();
    var edt_email = $('#edt_email').val();
    var edt_adresse = $('#edt_adresse').val();
    var edt_message = $('#edt_message').val();
    var send_to_email = $('#send_to_email').val();
    var vars = {
        'action'    : 'submit_contact_form',
        'edt_name'  : edt_name,
        'edt_telefon'  : edt_telefon,
        'edt_email'  : edt_email,
        'edt_adresse'  : edt_adresse,
        'edt_message'  : edt_message,
        'send_to_email'  : send_to_email

    };
    $('#contact_form').fadeOut(300);
    var posting = $.post(wp_var.ajax_url,
        vars, function( data ) {
            $('#contact_form').html(data);
            $('#contact_form').fadeIn(300);
        });
}