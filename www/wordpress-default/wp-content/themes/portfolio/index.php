<?php //get_template_part('templates/page', 'header'); ?>

<?php
  $c = true;
  $args = array(
    'sort_order' => 'asc',
    'sort_column' => 'menu_order',
    'post_type' => 'page',
    'post_status' => 'publish'
  );
  $pages = get_pages($args);
  foreach ($pages as $pageInstance): //var_dump($pageInstance);
    // $meta = get_post_meta($pageInstance->ID, 'template', true);
    // var_dump($meta);
    // if ( ! $pageInstance->post_content ) // Check for empty page
    //   continue;

    $template = get_page_template_slug($pageInstance->ID);
  ?>

<section <?= ($c = !$c)? 'class="alt-section"' : '' ?> data-sections>
  <div class="content">
    <?php
    //set page data to pass to page part
    set_query_var( 'pageInstance', $pageInstance );

    if ( $template ):
      // echo $template;
      load_template(get_template_directory() . '/' . $template);
    else :
      get_template_part('templates/content', 'page');
    endif;

    ?>
  </div>
</section>

<?php endforeach; ?>

