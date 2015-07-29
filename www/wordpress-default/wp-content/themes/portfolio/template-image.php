<?php
/**
 * Template Name: Image Template
 */
?>
<?php

//get the featured image for the page
$feat_image = wp_get_attachment_url( get_post_thumbnail_id($pageInstance->ID) );

?>
<img src="<?= $feat_image ?>" />