<?php
get_header();
?>

    <div class="large-9 columns page_text">
        <?php
        while (have_posts()) {
            the_post();

            the_content();

        }
        ?>

    </div>

    

<?php
get_footer();
?>
