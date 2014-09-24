
</div>
</div> <!-- end page_content -->

</div> <!-- End of .site-container -->

    <footer class="footer_wrapper row">

        <?php

        $menu_name = 'secondary-menu';
        if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
            $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
            $menu_items = wp_get_nav_menu_items($menu->term_id);
            $menu_list = '';
            $defaults = array(
                'theme_location'  => $menu_name,
                'menu'            => $menu,
                'container'       => 'div',
                'container_class' => '',
                'container_id'    => '',
                'menu_class'      => 'footer_list',
                'menu_id'         => '',
                'echo'            => true,
                'fallback_cb'     => 'wp_page_menu',
                'before'          => '',
                'after'           => '',
                'link_before'     => '',
                'link_after'      => '',
                'depth'           => 0,
                'walker'          => new Menu_Walker
            );

            wp_nav_menu( $defaults );
        }

        ?>

    </footer>
    <div class="clear_all"></div>

</div> <!-- End of .site-bg -->

</body>
</html>