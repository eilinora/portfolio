http_path = "/"
project_path = File.dirname(__FILE__) + '/'
css_dir = "www/wordpress-default/wp-content/themes/portfolio/assets/styles"
sass_dir = "app/assets/styles"
images_dir = "www/wordpress-default/wp-content/themes/portfolio/assets/images"
fonts_dir = "www/wordpress-default/wp-content/themes/portfolio/assets/fonts"
http_stylesheets_dir = "../styles"
http_images_dir = "../images"
http_fonts_dir = "../fonts"
output_style = :expanded
line_comments = true
sass_options = { :debug_info => true }


# Enable Debugging (Line Comments, FireSass)
# Invoke from command line: compass watch -e development --force
if environment == :production
  line_comments = false
  output_style = :compressed
  sass_options = { :debug_info => false }
end