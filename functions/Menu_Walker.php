<?php

//WALKER TEXAS RANGER!!

class Menu_Walker extends Walker_Nav_Menu{

    public $lvl_title = '';

    function start_lvl(&$output, $depth=0, $args=array()) {

        //print_r($args);

        $output .= '<div class="mp-level"><h2>'.$this->lvl_title.'</h2><a class="mp-back" href="#">back</a><ul>';
    }


    function end_lvl(&$output, $depth=0, $args=array()) {
        $output .= '</ul></div>';
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

            $class_str = 'nav_item';

            $item_output .= '<li class="'.$class_str.'"><a class="nav_link" '.$attributes.'>'
                . $args->link_before
                . $title
                . '</a>'
                . $args->link_after
                . $args->after;
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