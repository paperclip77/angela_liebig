<?php
$comments = get_comments('post_id='.$post->ID);
foreach($comments as $comment) :
    /*
     stdClass Object ( [comment_ID] => 3 [comment_post_ID] => 18 [comment_author] => Leroux [comment_author_email] => web@paperclip.co.za [comment_author_url] => [comment_author_IP] => 127.0.0.1 [comment_date] => 2014-09-24 11:35:37 [comment_date_gmt] => 2014-09-24 11:35:37 [comment_content] => This is a test comment [comment_karma] => 0 [comment_approved] => 0 [comment_agent] => Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/537.75.14 [comment_type] => [comment_parent] => 0 [user_id] => 0 )
     */

    if($comment->comment_approved>0) {
        echo '<div class="custom_comment"><div class="comment_head">';
        echo '<span>' . $comment->comment_author . '</span>';
        echo '<span class="comment_date">' . $comment->comment_date . '</span>';
        echo '</div>';
        echo '<div class="comment_body">' . $comment->comment_content . '</div></div>';
        echo '<hr />';
    }
endforeach;

$args = array(
    'id_form'           => 'commentform',
    'id_submit'         => 'submit',
    'title_reply'       => __( '' ),
    'title_reply_to'    => __( '' ),
    'cancel_reply_link' => __( 'abbrechen Antwort' ),
    'label_submit'      => __( 'Kommentar' ),

    'comment_field' =>  '<p class="comment-form-comment"><label for="comment">' . _x( 'Kommentar', 'noun' ) .
        '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true">' .
        '</textarea></p>',

    'must_log_in' => '<p class="must-log-in">' .
        sprintf(
            __( 'Sie müssen <a href="%s">angemeldet sein</a>, um einen Kommentar zu hinterlassen.' ),
            wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
        ) . '</p>',

    'logged_in_as' => '<p class="logged-in-as">' .
        sprintf(
            __( 'Angemeldet als <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Melden Sie sich ab ?</a>' ),
            admin_url( 'profile.php' ),
            $user_identity,
            wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
        ) . '</p>',

    'comment_notes_before' => '<p class="comment-notes">' .
        __( 'Ihre E-Mail -Adresse wird nicht veröffentlicht.' ) . ( $req ? $required_text : '' ) .
        '</p>',

    'comment_notes_after' => '',

    'fields' => apply_filters( 'comment_form_default_fields', array(

            'author' =>
                '<p class="comment-form-author">' .
                '<label for="author">' . __( 'Name', 'domainreference' ) . '</label> ' .
                ( $req ? '<span class="required">*</span>' : '' ) .
                '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
                '" size="30"' . $aria_req . ' /></p>',

            'email' =>
                '<p class="comment-form-email"><label for="email">' . __( 'E-Mail-', 'domainreference' ) . '</label> ' .
                ( $req ? '<span class="required">*</span>' : '' ) .
                '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) .
                '" size="30"' . $aria_req . ' /></p>',

            'url' =>
                '<p class="comment-form-url"><label for="url">' .
                __( 'Webseite', 'domainreference' ) . '</label>' .
                '<input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) .
                '" size="30" /></p>'
        )
    ),
);

comment_form($args);