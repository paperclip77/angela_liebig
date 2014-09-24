<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!--[if IE]><meta http-equiv="X-UA-Compatible" content="IE=edge"><![endif]-->

    <title>
        <?php
        wp_title('|', true, 'right');
        bloginfo('name');
        ?>
    </title>
    <meta name="description" content="Made by Team OnNet">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="author" href="<?php echo get_bloginfo('stylesheet_directory'); ?>/humans.txt" />

    <link rel="shortcut icon" href="<?php echo get_bloginfo('stylesheet_directory'); ?>/favicon.ico?v=2" />
    <link rel="apple-touch-icon" href="<?php echo get_bloginfo('stylesheet_directory'); ?>/apple-touch-icon-precomposed.png" />


    <!--[if (gt IE 8) | (IEMobile)]><!-->
    <link rel="stylesheet" href="<?php echo get_bloginfo('stylesheet_directory'); ?>/css/production.min.css">

    <!-- Dev changes that havn't gone through design yet -->
    <!-- <link rel="stylesheet" href="css/development.css"> -->
    <?php wp_head(); ?>
    <!--<![endif]-->

    <!--[if (lt IE 9) & (!IEMobile)]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>

    <link rel="stylesheet" href="<?php echo get_bloginfo('stylesheet_directory'); ?>/css/production.px.min.css">

    <p class="browsehappy">You are using a very old version of Internet Explorer. <strong><a href="http://browsehappy.com/?locale=en">Update</a></strong> to enjoy a better web.</p>
    <![endif]-->

</head>

<body>
<div class="site-bg">
    <div class="site-container row">

        <div class="row">
            <div class="large-12 columns">
                <?php
                while (have_posts()) {
                    the_post();

                    // GET FEATURED IMAGE /////////////////////////
                    if (has_post_thumbnail($post->ID)) {
                        $img_src_array = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'full');
                        $img_src = $img_src_array[0];
                    } else {
                        //get other images????
                        $args = array(
                            'order' => 'ASC',
                            'orderby' => 'menu_order',
                            'post_type' => 'attachment',
                            'post_parent' => $post->ID,
                            'post_mime_type' => 'image',
                            'post_status' => null,
                            'numberposts' => -1,
                        );
                        $attachments = get_posts($args);
                        if ($attachments) {
                            foreach ($attachments as $attachment) {
                                $img_array = wp_get_attachment_image_src($attachment->ID, 'full');
                                $img_src = $img_array[0];
                            }
                        } else {
                            $img_src = '';
                        }
                    }
                    if($img_src != ''){
                        echo '<img src="'.$img_src.'" />';
                        echo '<img src="'.get_bloginfo('stylesheet_directory').'/img/logo.png" class="site_title" title="'.get_bloginfo('name').'" alt="'.get_bloginfo('name').'" />';
                    }

                }
                ?>
            </div>
        </div>

        <div class="row page_content <?php echo $post->post_name; ?>">
            <div class="large-3 columns">

                <nav class="nav_wrapper" id="navWrapper">

                    <?php

                    $menu_name = 'primary-menu';
                    if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
                        $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
                        $menu_items = wp_get_nav_menu_items($menu->term_id);
                        $menu_list = '';
                        $defaults = array(
                            'theme_location'  => $menu_name,
                            'menu'            => $menu,
                            'container'       => 'div',
                            'container_class' => 'main_menu',
                            'container_id'    => 'main_menu',
                            'menu_class'      => 'nav_list',
                            'menu_id'         => '',
                            'echo'            => true,
                            'fallback_cb'     => 'wp_page_menu',
                            'before'          => '',
                            'after'           => '',
                            'link_before'     => '',
                            'link_after'      => '',
                            'depth'           => 0,
                            //'walker'          => new Menu_Walker
                        );

                        wp_nav_menu( $defaults );
                    }

                    ?>
                </nav>

		
            </div>