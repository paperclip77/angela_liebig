<?php
//session_start();


include_once('functions/Menu_Walker.php');
include_once('functions/Menu_Walker_Nav_Footer.php');

//filters
include_once('functions/filter_footer_menu.php');

add_filter('show_admin_bar', '__return_false');

if(!class_exists('myScripts')){
	class myScripts {
		function myScripts(){
			$this->__construct();
		}
		
		function __construct(){
			add_action('wp_print_scripts', array(&$this, 'add_scripts'),1000);
		}
		
		function add_scripts(){

            wp_enqueue_script('jquery');
            wp_enqueue_script('foundation', get_bloginfo('stylesheet_directory').'/js/foundation.min.js');
            wp_enqueue_script('lib', get_bloginfo('stylesheet_directory').'/js/lib.min.js');

            //in footer
            wp_enqueue_script('production', get_bloginfo('stylesheet_directory').'/js/production.min.js');

			//localize vars
			wp_localize_script('production', 'wp_var', localize_vars());

		}
	}
}

if(class_exists('myScripts')){
	if (!is_login_page() && !is_admin()){
		$myscripts = new myScripts();
	}
}

// load custom css -----------------------

//----------------------------------------

function is_login_page() {
    return in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'));
}

//localisation
function localize_vars(){
	
	return array(
		'site_url' => get_bloginfo('url'),
		'css_dir' => get_bloginfo('stylesheet_directory'),
		'ajax_url' => admin_url('admin-ajax.php')
	);
}




add_theme_support('automatic-feed-links');
add_theme_support( 'menus' );
add_theme_support( 'post-thumbnails' );

add_action( 'init', 'my_custom_menus' );
function my_custom_menus() {
   register_nav_menus(
      array(
	'primary-menu' => __( 'Primary Menu' ),
	'secondary-menu' => __( 'Secondary Menu' )
	      )
       );
}


add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);
function special_nav_class($classes, $item){
    if( in_array('current-menu-item', $classes) ){
        $classes[] = 'active ';
    }
    return $classes;
}

if ( function_exists( 'add_image_size' ) ) { 
	add_image_size( 'post_featurette_img', 500, 500, true ); //(cropped)
}

//ADD TEMPLATE SUPPORT FOR SINGLE IN VCATEGORY PAGES
add_filter('single_template', create_function(
	'$the_template',
	'foreach( (array) get_the_category() as $cat ) {
		if ( file_exists(TEMPLATEPATH . "/single-{$cat->slug}.php") )
		return TEMPLATEPATH . "/single-{$cat->slug}.php"; }
	return $the_template;' )
);

// ADD CATEGORIES TO STATIC PAGES
function add_pages_meta_boxes() {
	add_meta_box(	'tagsdiv-post_tag', __('Page Tags'), 'post_tags_meta_box', 'page', 'side', 'low');
	add_meta_box(	'categorydiv', __('Categories'), 'post_categories_meta_box', 'page', 'normal', 'core');
}
add_action('add_meta_boxes', 'add_pages_meta_boxes');

add_action('init','attach_category_to_page');
function attach_category_to_page() {
	register_taxonomy_for_object_type('category','page');
}

// THEME - OPTIONS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//add theme options

if ( is_admin() ){ // admin actions
	add_action('admin_menu', 'xourel_admin_add_page');
	add_action('admin_init', 'xourel_admin_init');
} else {
	// non-admin enqueues, actions, and filters
}

function xourel_admin_init(){
	register_setting( 'xourel_options', 'xourel_options', 'xourel_options_validate' );
	add_settings_section('xourel_main', 'Contact Details', 'xourel_section_text', 'xourel');
	add_settings_field('xourel_contact_number', 'Contact Number', 'xourel_contact_number_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_fax_number', 'Fax Number', 'xourel_fax_number_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_web_address', 'Physical Address', 'xourel_web_address_do', 'xourel', 'xourel_main');
	//contact fields
	add_settings_field('xourel_contact_email', 'Contact E-mail', 'xourel_contact_email_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_twitter_link', 'Twitter Link', 'xourel_twitter_link_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_facebook_link', 'Facebook Link', 'xourel_facebook_link_do', 'xourel', 'xourel_main');
	
	add_settings_field('xourel_gplus_link', 'Google Plus Link', 'xourel_gplus_link_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_instagram_link', 'Instagram Link', 'xourel_instagram_link_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_pinterest_link', 'Pinterest Link', 'xourel_pinterest_link_do', 'xourel', 'xourel_main');
	add_settings_field('xourel_youtube_link', 'YouTube Link', 'xourel_youtube_link_do', 'xourel', 'xourel_main');
}

function xourel_section_text(){
	
}

function xourel_gplus_link_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_gplus_link' name='xourel_options[gplus_link]' size='40' type='text' value='{$options['gplus_link']}' />";
}

function xourel_instagram_link_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_instagram_link' name='xourel_options[instagram_link]' size='40' type='text' value='{$options['instagram_link']}' />";
}

function xourel_pinterest_link_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_pinterest_link' name='xourel_options[pinterest_link]' size='40' type='text' value='{$options['pinterest_link']}' />";
}

function xourel_youtube_link_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_youtube_link' name='xourel_options[youtube_link]' size='40' type='text' value='{$options['youtube_link']}' />";
}

///

function xourel_facebook_link_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_facebook_link' name='xourel_options[facebook_link]' size='40' type='text' value='{$options['facebook_link']}' />";
}

function xourel_twitter_link_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_twitter_link' name='xourel_options[twitter_link]' size='40' type='text' value='{$options['twitter_link']}' />";
}

function xourel_contact_email_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_contact_email' name='xourel_options[contact_email]' size='40' type='text' value='{$options['contact_email']}' />";
}

function xourel_contact_number_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_contact_number' name='xourel_options[contact_number]' size='40' type='text' value='{$options['contact_number']}' />";
}

function xourel_fax_number_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_fax_number' name='xourel_options[fax_number]' size='40' type='text' value='{$options['fax_number']}' />";
}

function xourel_web_address_do() {
	$options = get_option('xourel_options');
	echo "<input id='xourel_web_address' name='xourel_options[web_address]' size='40' type='text' value='{$options['web_address']}' />";
}

function xourel_options_validate($input) {
	$newinput['contact_number'] = trim($input['contact_number']);
	$newinput['fax_number'] = trim($input['fax_number']);
	$newinput['web_address'] = trim($input['web_address']);
	$newinput['contact_email'] = trim($input['contact_email']);
	
	$newinput['twitter_link'] = trim($input['twitter_link']);
	$newinput['facebook_link'] = trim($input['facebook_link']);
	$newinput['gplus_link'] = trim($input['gplus_link']);
	$newinput['instagram_link'] = trim($input['instagram_link']);
	$newinput['pinterest_link'] = trim($input['pinterest_link']);
	$newinput['youtube_link'] = trim($input['youtube_link']);
	return $newinput;
}

function xourel_admin_add_page() {
	add_options_page('Theme Options', 'THEME OPTIONS', 'manage_options', 'xourel', 'xourel_options_page');
}

function xourel_options_page(){
	echo '<div>';
	echo '<h1>Theme Options</h1>';
	echo '<form action="options.php" method="post">';
	settings_fields('xourel_options');
	do_settings_sections('xourel');
	submit_button();
	echo '</form>';
	echo '</div>';
}

//OWN DEFINED FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function make_excerpt($str, $max_words){
	$str = strip_tags($str);
	$str_array = explode(" ", $str);
	$out_str = "";
	if($max_words == undefined){
		$max_words = 30;
	}
	if(count($str_array)<10){
		$max_words = count($str_array);
	}
	for($i = 0; $i < $max_words; $i++){
		if(substr($str_array[$i],0,1) != "<"){
			$out_str.=$str_array[$i]." ";
		}
	}
	
	if($out_str==""){
		
	} else {
		$out_str.='';
	}
	
	return $out_str;
}

function make_excerpt_char($str, $max_char){
	$str = strip_tags($str);
	$str_done = false;
	
	for($i = 0; $i<$max_char+100; $i++){
		$char = $str[$i];
		if($char == " " && $i > $max_char){
			$str_done = true;
		}
		
		if($str_done == false){
			$out_str.=$char;
		}
	}
	
	if($out_str==""){
		
	} else {
		$out_str.='';
	}
	
	return $out_str;
}

function cConvert($amount, $currency_from, $currency_to) {
	$currency['GBP'] = '&pound;';
	$currency['EUR'] = '&euro;';
	$currency['USD'] = '$';
	$currency['CAD'] = '$';
	$currency['AUD'] = '$';
	$currency['SGD'] = '$';
	$currency['EGP'] = '&pound;';
	$currency['ARS'] = '$';
	$currency['BBD'] = '$';
	$currency['BRL'] = 'R$';
	$currency['CLP'] = '$';
	$currency['CNY'] = '&#20803;';
	$currency['CZK'] = 'K&#269;';
	$currency['DKK'] = 'kr';
	$currency['XCD'] = '$';
	$currency['EEK'] = 'kr';
	$currency['HKD'] = '&#20803;';
	$currency['HUF'] = 'Ft';
	$currency['ISK'] = 'kr';
	$currency['INR'] = 'Rs';
	$currency['IDR'] = 'Rp';
	$currency['ILS'] = '&#8362;';
	$currency['JMD'] = 'J$';
	$currency['JPY'] = '&#165;';
	$currency['LVL'] = 'Ls';
	$currency['LBP'] = '$pound;';
	$currency['LTL'] = 'Lt';
	$currency['MYR'] = 'RM';
	$currency['MXN'] = '$';
	$currency['NAD'] = '$';
	$currency['NPR'] = 'Rs';
	$currency['NZD'] = '$';
	$currency['NOK'] = 'kr';
	$currency['OMR'] = '&#65020;';
	$currency['PKR'] = 'Rs';
	$currency['PAB'] = 'B/.';
	$currency['PHP'] = 'Ph';
	$currency['PLN'] = 'z&#322;';
	$currency['QAR'] = '&#65020;';
	$currency['RON'] = 'le';
	$currency['RUB'] = 'py6';
	$currency['SAR'] = '&#65020;';
	$currency['ZAR'] = 'R';
	$currency['KRW'] = '&#8361;';
	$currency['LKR'] = 'Rs';
	$currency['SEK'] = 'kr';
	$currency['CHF'] = 'CHF';
	$currency['THB'] = '&#3647;';
	$currency['TRY'] = 'YTL';
	$currency['VEF'] = 'Bs';
	
	//$amount = $_POST['wpcc_currency_amount'];
	//$currency_from = $_POST['wpcc_currency_from'];
	//$currency_to = $_POST['wpcc_currency_to'];
	
	if(!strstr($amount, '.')){
		$amount = $amount . '.00';
	}
	
	$url = 'http://www.google.com/ig/calculator?hl=en&q=' . urlencode($amount) . urlencode($currency_from) . '=?' . urlencode($currency_to);
	
	if (function_exists('curl_init')) {
		// Good to go
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$response = curl_exec($ch);
		curl_close($ch);
		
		if ($response){
			$response_array[] = explode('"',$response);
			
			$output = ereg_replace("[^0-9.]", "", $response_array[0][3]);
			$output = sprintf("%.2f", $output);
			//echo '<p>Amount (' . $currency_to . '): ' . $currency[$currency_to] . $output . '</p>';
			echo '<strong>'.$currency[$currency_from].'</strong> = '.$currency[$currency_to] . $output; 
		} else {
			echo 'Unavailable';
			//echo '<p class="wpcc_error">Error: Currency conversion temporarily not available. Please try again.</p>';
		}
	} else {
		echo 'Error';
		//echo '<p class="wpcc_error">Error: Curl is required for this plugin to work, please enable on your web server.</p>';
	}
	
	
}



function makeContactForm($args){
	?>
	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				
				<?php
				echo '<hr class="featurette-divider">';
				echo '<div id="form_data">';
				foreach($args as $key => $value){
					echo '<'.$value.' class="form-control form_input" type="text" placeholder="'.$key.'" name="'.$key.'" id="'.$key.'"></'.$value.'>';
				}
				echo '</div>';
				?>
				
				<a class="btn btn-default" href="javascript:submitForm();" role="button">Submit</a>
			</div>
		</div>
	</div>
	<?php
}


function makeCarousel($cat_name){
	
	$posts_array = getPostData($cat_name, -1);
	?>
	<div id="myCarousel" class="carousel slide" data-ride="carousel">
		
		<ol class="carousel-indicators">
			<?php
				$i=0;
				foreach($posts_array as $post){
					if($i == 0){
						$active = 'active';
					} else {
						$active = '';
					}
					echo '<li data-target="#myCarousel" data-slide-to="'.$i.'" class="'.$active.'"></li>';
					$i++;
				}
			?>
		</ol>
		<div class="carousel-inner">
			
			<?php
				$i=0;
				foreach($posts_array as $post){
					if($i == 0){
						$active = 'active';
					} else {
						$active = '';
					}
					echo '<div class="item '.$active.'">';
					echo '	<div style="display: block; height:100%; width:100%;background-size: cover;background-image:url('.$post['img_src'].');" alt="'.$post['title'].'"></div>';
					echo '	<div class="container">';
					echo '	  <div class="carousel-caption">';
					echo '	    <h1>'.$post['title'].'</h1>';
					echo '	    <p>'.$post['excerpt'].'</p>';
					echo '	  </div>';
					echo '	</div>';
					echo '</div>';
					$i++;
				}
			?>
		</div>
		<a class="left carousel-control" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a>
		<a class="right carousel-control" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>
	</div><!-- /.carousel -->
	<?
}


function makeCircleFeatures($cat_name, $limit){
	$posts_array = getPostData($cat_name, $limit);
	$col_width = 12/$limit;
	?>
	<div class="container marketing">
		<!-- Three columns of text below the carousel -->
		<hr class="featurette-divider">
		<div class="row">
			<?php
				foreach($posts_array as $post){
					echo '<div class="col-lg-'.$col_width.'">';
					echo '<img class="img-circle" src="'.$post['img_thumb_src'].'" alt="'.$post['title'].'" />';
					echo '<h2>'.$post['title'].'</h2>';
					echo '<p>'.$post['excerpt'].'</p>';
					echo '<p><a class="btn btn-default" href="'.$post['permalink'].'" role="button">View details &raquo;</a></p>';
					echo '</div>';
				}
			?>
		</div>
	</div>
	<?php
}

function makeFeaturette($cat_name, $limit){
	$posts_array = getPostData($cat_name, $limit);
	?>
	<div class="container marketing">
			<?php
				$i = 0;
				foreach($posts_array as $post){
					echo '<hr class="featurette-divider">';
					echo '<div class="row featurette">';
					
					if($i % 2 == 0){
						echo '<div class="col-md-7">';
						echo '  <h2 class="featurette-heading">'.$post['title'].'</h2>';
						echo '  <p class="lead">'.$post['content'].'</p>';
						echo '</div>';
						
						echo '<div class="col-md-5">';
						echo '  <img class="featurette-image img-responsive" src="'.$post['post_featurette_img'].'" alt="Generic placeholder image" />';
						echo '</div>';
					} else {
						echo '<div class="col-md-5">';
						echo '  <img class="featurette-image img-responsive" src="'.$post['post_featurette_img'].'" alt="Generic placeholder image" />';
						echo '</div>';
						
						echo '<div class="col-md-7">';
						echo '  <h2 class="featurette-heading">'.$post['title'].'</h2>';
						echo '  <p class="lead">'.$post['content'].'</p>';
						echo '</div>';
					}

					echo '</div>';
					$i++;
				}
			?>
	</div>
	<?php
}

function makeProjects(){
	$posts_array = getPostData('projects','-1');
	print_r($post_array);
	$i = 0;
	foreach($posts_array as $post){
		
		echo '<div class="mason_item">';
		echo '<div class="project_item _col-md-3">';
		echo '  <h3 class="project_heading">'.$post['title'].'</h3>';
		if($post['post_featurette_img']!=''){
			echo '  <img class="img-responsive" src="'.$post['post_featurette_img'].'" alt="'.$post['title'].'" />';
		}
		echo '  <p class="lead">'.$post['the_excerpt'].'</p>';
		echo '</div>';
		echo '</div>';
		$i++;
	}
	
}

function getPostData($cat_name, $limit){
	$posts_array = array();
	
	if($cat_name != ''){
		$post = query_posts('category_name='.$cat_name.'&order=ASC&showposts='.$limit);
	}
	while (have_posts()) : the_post();
			
	    // GET FEATURED IMAGE /////////////////////////
	    if (has_post_thumbnail( get_the_ID() ) ){
		    $img_src_array = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'full' );
		    $img_src = $img_src_array[0];
		    
		    $img_thumb_src_array = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'thumbnail' );
		    $img_thumb_src = $img_thumb_src_array[0];
		    
		    $img_feat_src_array = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'post_featurette_img' );
		    $img_feat_src = $img_feat_src_array[0];
		    
	    } else {
		    //get other images????
			
		    $img_src = '';
		    $img_thumb_src = '';
		    $img_feat_src = '';
		    
		    $args = array(
		    'order'          => 'ASC',
		    'orderby'        => 'menu_order',
		    'post_type'      => 'attachment',
		    'post_parent'    => get_the_ID(),
		    'post_mime_type' => 'image',
		    'post_status'    => null,
		    'numberposts'    => -1,
		    );
		    
		    $attachments = get_posts($args);
		    if ($attachments) {
			foreach ($attachments as $attachment) {
				    $img_array = wp_get_attachment_image_src( $attachment->ID, 'full');
				    $img_src = $img_array[0];
				    
				    $img_thumb_array = wp_get_attachment_image_src( $attachment->ID, 'thumbnail');
				    $img_thumb_src = $img_thumb_array[0];
				    
				    $img_feat_src_array = wp_get_attachment_image_src( $attachment->ID, 'post_featurette_img');
				    $img_feat_src = $img_feat_src_array[0];
			    }
		    } else {
			$img_src = '';
			$img_thumb_src = '';
			$img_feat_src = '';
		    } 
	    }
	    
	    array_push($posts_array, array('title'=>get_the_title(),
					   'content'=>get_the_content(),
					   'excerpt'=>make_excerpt(get_the_content(),20),
					   'the_excerpt'=>get_the_excerpt(),
					   'img_src'=>$img_src,
					   'img_thumb_src'=>$img_thumb_src,
					   'permalink'=>get_permalink(),
					   'post_featurette_img'=>$img_feat_src
					   ));
		
	endwhile;
	wp_reset_query();
	
	return $posts_array;
}



//AJAX FUNCTIONS /////////////////////////////////////
add_action( 'wp_ajax_nopriv_submit_contact_form', 'submit_contact_form' );
add_action( 'wp_ajax_submit_contact_form', 'submit_contact_form' );
function submit_contact_form(){

    if(!empty($_POST['edt_name'])){ $edt_name = $_POST['edt_name']; } else { $edt_name = '';}
    if(!empty($_POST['edt_telefon'])){ $edt_telefon = $_POST['edt_telefon']; } else { $edt_telefon = '';}
    if(!empty($_POST['edt_email'])){ $edt_email = $_POST['edt_email']; } else { $edt_email = '';}
    if(!empty($_POST['edt_adresse'])){ $edt_adresse = $_POST['edt_adresse']; } else { $edt_adresse = '';}
    if(!empty($_POST['edt_message'])){ $edt_message = $_POST['edt_message']; } else { $edt_message = '';}
    if(!empty($_POST['send_to_email'])){ $send_to_email = $_POST['send_to_email']; } else { $send_to_email = '';}

    $headers = 'From: '.$edt_name.' <'.$edt_email.'>' . "\r\n";

    $message_str = 'name: '.$edt_name;
    $message_str.='\nTelefon: '.$edt_telefon;
    $message_str.='\nEmail: '.$edt_email;
    $message_str.='\nAdresse: '.$edt_adresse;
    $message_str.='\nMessage: '.$edt_message;

    wp_mail($send_to_email, 'subject', $message_str, $headers );

    echo 'Danke .';

    die();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Class Name: wp_bootstrap_navwalker
 * GitHub URI: https://github.com/twittem/wp-bootstrap-navwalker
 * Description: A custom WordPress nav walker class to implement the Bootstrap 3 navigation style in a custom theme using the WordPress built in menu manager.
 * Version: 2.0.4
 * Author: Edward McIntyre - @twittem
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

class wp_bootstrap_navwalker extends Walker_Nav_Menu {

	/**
	 * @see Walker::start_lvl()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param int $depth Depth of page. Used for padding.
	 */
	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		$indent = str_repeat( "\t", $depth );
		$output .= "\n$indent<ul role=\"menu\" class=\" dropdown-menu\">\n";
	}

	/**
	 * @see Walker::start_el()
	 * @since 3.0.0
	 *
	 * @param string $output Passed by reference. Used to append additional content.
	 * @param object $item Menu item data object.
	 * @param int $depth Depth of menu item. Used for padding.
	 * @param int $current_page Menu item ID.
	 * @param object $args
	 */
	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		/**
		 * Dividers, Headers or Disabled
		 * =============================
		 * Determine whether the item is a Divider, Header, Disabled or regular
		 * menu item. To prevent errors we use the strcasecmp() function to so a
		 * comparison that is not case sensitive. The strcasecmp() function returns
		 * a 0 if the strings are equal.
		 */
		if ( strcasecmp( $item->attr_title, 'divider' ) == 0 && $depth === 1 ) {
			$output .= $indent . '<li role="presentation" class="divider">';
		} else if ( strcasecmp( $item->title, 'divider') == 0 && $depth === 1 ) {
			$output .= $indent . '<li role="presentation" class="divider">';
		} else if ( strcasecmp( $item->attr_title, 'dropdown-header') == 0 && $depth === 1 ) {
			$output .= $indent . '<li role="presentation" class="dropdown-header">' . esc_attr( $item->title );
		} else if ( strcasecmp($item->attr_title, 'disabled' ) == 0 ) {
			$output .= $indent . '<li role="presentation" class="disabled"><a href="#">' . esc_attr( $item->title ) . '</a>';
		} else {

			$class_names = $value = '';

			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[] = 'menu-item-' . $item->ID;

			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

			if ( $args->has_children )
				$class_names .= ' dropdown';

			if ( in_array( 'current-menu-item', $classes ) )
				$class_names .= ' active';

			$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

			$id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
			$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

			$output .= $indent . '<li' . $id . $value . $class_names .'>';

			$atts = array();
			$atts['title']  = ! empty( $item->title )	? $item->title	: '';
			$atts['target'] = ! empty( $item->target )	? $item->target	: '';
			$atts['rel']    = ! empty( $item->xfn )		? $item->xfn	: '';

			// If item has_children add atts to a.
			if ( $args->has_children && $depth === 0 ) {
				$atts['href']   		= '#';
				$atts['data-toggle']	= 'dropdown';
				$atts['class']			= 'dropdown-toggle';
			} else {
				$atts['href'] = ! empty( $item->url ) ? $item->url : '';
			}

			$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );

			$attributes = '';
			foreach ( $atts as $attr => $value ) {
				if ( ! empty( $value ) ) {
					$value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
					$attributes .= ' ' . $attr . '="' . $value . '"';
				}
			}

			$item_output = $args->before;

			/*
			 * Glyphicons
			 * ===========
			 * Since the the menu item is NOT a Divider or Header we check the see
			 * if there is a value in the attr_title property. If the attr_title
			 * property is NOT null we apply it as the class name for the glyphicon.
			 */
			if ( ! empty( $item->attr_title ) )
				$item_output .= '<a'. $attributes .'><span class="glyphicon ' . esc_attr( $item->attr_title ) . '"></span>&nbsp;';
			else
				$item_output .= '<a'. $attributes .'>';

			$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
			$item_output .= ( $args->has_children && 0 === $depth ) ? ' <span class="caret"></span></a>' : '</a>';
			$item_output .= $args->after;

			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}

	/**
	 * Traverse elements to create list from elements.
	 *
	 * Display one element if the element doesn't have any children otherwise,
	 * display the element and its children. Will only traverse up to the max
	 * depth and no ignore elements under that depth.
	 *
	 * This method shouldn't be called directly, use the walk() method instead.
	 *
	 * @see Walker::start_el()
	 * @since 2.5.0
	 *
	 * @param object $element Data object
	 * @param array $children_elements List of elements to continue traversing.
	 * @param int $max_depth Max depth to traverse.
	 * @param int $depth Depth of current element.
	 * @param array $args
	 * @param string $output Passed by reference. Used to append additional content.
	 * @return null Null on failure with no changes to parameters.
	 */
	public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
        if ( ! $element )
            return;

        $id_field = $this->db_fields['id'];

        // Display this element.
        if ( is_object( $args[0] ) )
           $args[0]->has_children = ! empty( $children_elements[ $element->$id_field ] );

        parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
    }

	/**
	 * Menu Fallback
	 * =============
	 * If this function is assigned to the wp_nav_menu's fallback_cb variable
	 * and a manu has not been assigned to the theme location in the WordPress
	 * menu manager the function with display nothing to a non-logged in user,
	 * and will add a link to the WordPress menu manager if logged in as an admin.
	 *
	 * @param array $args passed from the wp_nav_menu function.
	 *
	 */
	public static function fallback( $args ) {
		if ( current_user_can( 'manage_options' ) ) {

			extract( $args );

			$fb_output = null;

			if ( $container ) {
				$fb_output = '<' . $container;

				if ( $container_id )
					$fb_output .= ' id="' . $container_id . '"';

				if ( $container_class )
					$fb_output .= ' class="' . $container_class . '"';

				$fb_output .= '>';
			}

			$fb_output .= '<ul';

			if ( $menu_id )
				$fb_output .= ' id="' . $menu_id . '"';

			if ( $menu_class )
				$fb_output .= ' class="' . $menu_class . '"';

			$fb_output .= '>';
			$fb_output .= '<li><a href="' . admin_url( 'nav-menus.php' ) . '">Add a menu</a></li>';
			$fb_output .= '</ul>';

			if ( $container )
				$fb_output .= '</' . $container . '>';

			echo $fb_output;
		}
	}
}
?>