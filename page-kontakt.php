<?php
get_header();
?>

    <div class="large-4 columns page_text">
        <?php
        while (have_posts()) {
            the_post();

            the_content();

        }
        ?>

    </div>

<div class="large-5 columns page_text" id="contact_form">
    <?php
    $options = get_option('xourel_options');
    if(strlen($options['contact_email'])>1){
        ?>
    <input type="text" name="edt_name" id="edt_name" placeholder="name" />
    <input type="text" name="edt_telefon" id="edt_telefon" placeholder="telefon" />
    <input type="email" name="edt_email" id="edt_email" placeholder="email" />
    <input type="text" name="edt_adresse" id="edt_adresse" placeholder="adresse" />
    <textarea name="edt_message" id="edt_message" placeholder="message"></textarea>

    <input type="hidden" id="send_to_email" value="<?php echo $options['contact_email']; ?>"/>
    <a href="javascript:submit_contact_form();" >> absenden</a>
    <?php
    }
    ?>

</div>
    

<?php
get_footer();
?>
