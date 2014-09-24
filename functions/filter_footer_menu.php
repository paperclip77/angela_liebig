<?php

//add_filter('wp_nav_menu_items', 'add_login_logout_link', 10, 2);

function add_login_logout_link($items, $args) {


    if($args->theme_location == 'secondary-menu'){
        $items = '<li class="footer__item"><a href="#" class="footer__link">&copy; All Rights Reserved</a></li>'.$items;

    }

    return $items;
}