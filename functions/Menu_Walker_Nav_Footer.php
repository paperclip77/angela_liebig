<?php

//WALKER TEXAS RANGER!!

class Menu_Walker_Nav_Footer extends Walker_Nav_Menu{

    public $lvl_title = '';
    public $item_count = 0;
    public $menu_length = 0;

    function __construct(){
        $theme_location = 'secondary-menu';
        $theme_locations = get_nav_menu_locations();
        $menu_obj = get_term( $theme_locations[$theme_location], 'nav_menu' );
        $this->menu_length = $menu_obj->count;
    }

    function start_lvl(&$output, $depth=0, $args=array()) {

        //print_r($args);

        $output .= '';
    }


    function end_lvl(&$output, $depth=0, $args=array()) {
        $output .= '</div>';
    }


    public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        if ( ! $element )
            return;

        $id_field = $this->db_fields['id'];

        // Display this element.
        if ( is_object( $args[0] ) )
            $args[0]->has_children = ! empty( $children_elements[ $element->$id_field ] );

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }

    function start_el(&$output, $item, $depth, $args){
        if ( ! empty ($item->title) ) {
            $classes     = empty ( $item->classes ) ? array () : (array) $item->classes;
            $class_names = join(
                ' '
                ,   apply_filters(
                    'nav_menu_css_class'
                    ,   array_filter( $classes ), $item
                )
            );
            ! empty ( $class_names )
            and $class_names = '';
            $attributes  = '';
            ! empty( $item->attr_title )
            and $attributes .= ' title="'  . esc_attr( $item->attr_title ) .'"';
            ! empty( $item->target )
            and $attributes .= ' target="' . esc_attr( $item->target     ) .'"';
            ! empty( $item->xfn )
            and $attributes .= ' rel="'    . esc_attr( $item->xfn        ) .'"';
            ! empty( $item->url )
            and $attributes .= ' href="'   . esc_attr( $item->url        ) .'"';
            $title =
                apply_filters( 'the_title', $item->title, $item->ID );
            $item_output = $args->before;
            // the following if... statement basically ignores the first menu item
            // (so we don't start the list with a pipe):

            $this->item_count++;

            if($this->item_count == floor(($this->menu_length+1)/2)){
                $item_output .= '
                <li class="footer__item">
                    <a href="'.get_bloginfo('url').'" class="footer__link--logo">
                        <img src="'.get_bloginfo('stylesheet_directory').'/img/svg/footer-logo.svg" alt="Footer Logo">
                    </a>
                </li>';
            }

            $before = '<li class="footer__item">';
            $after = '</li>';

            $item_output .= $before.'<a class="footer__link" '.$attributes.'>'
                //. $this->item_count .' - '

                . $title
                . '</a>'
                . $after;
            // Since $output is called by reference we don't need to return anything.
            $output .= apply_filters(
                'walker_nav_menu_start_el'
                ,   $item_output
                ,   $item
                ,   $depth
                ,   $args
            );



        }
    }

}