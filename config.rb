http_path = "/"
project_path = File.dirname(__FILE__) + '/'
css_dir = "public/assets/styles"
sass_dir = "app/scss"
images_dir = "public/assets/images"
fonts_dir = "public/assets/fonts"
http_stylesheets_dir = "public/styles"
http_images_dir = "public/assets/images"
http_fonts_dir = "public/assets/fonts"
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