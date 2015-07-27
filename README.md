# portfolio



# Bundler Notes

With the Places project we decided to use Neat + Bourbon to help build out our responsive grid system and help give us some helpful mixins. Unfortunately though, this requires a newer version of Compass then is currently not on our Jenkins server. To the rescue is Bundler, which if your unaware, is a gem manager for ruby. Whats great about this is it allows you to locally install gems to your project without effecting others on the server.

How to get Bundler setup:
- First make sure you have it installed (gem install bundler)
- Now create a Gemfile listing the required gems for your project, which in our case looked like:
source 'https://rubygems.org'

gem 'bundler'
gem 'sass', '~> 3.4.9'
gem 'compass', '~> 1.0.1'

- Next run `bundle install --path ./gems`
What this will do is create a Gemfile.lock file which will contain the specific versions of the ruby gems you are using along with its dependencies versions which is great for locking in a working version of your gems. This file should be checked in along with your project once you’ve decided on your gem versions.
- Once you have these key files in place in Jenkins you can now setup your job to run the following command `bundle install --path ./vendor --deployment`
--This will download the specific gems required for your project into a local directory called vendor since you’ve added the --deployment it use your Gemfile.lock file to reference which versions are required for your project. Handy note: If you project name contains spaces and dashed this will cause issues with your gems compiling as some ruby project don’t escape paths correctly.

###Now the most important part!
You’ve done all this great work getting your gems bundled locally you now need to run compass against bundler. Unfortunately, there isn’t any automagical way for it to know to use your local gems vs the servers gems. You now need to run compass in the following way.

  `bundle exec compass compile`

As this is now requires shell execution vs being able to use the grunt-contrib-compass task configuration you will need to add grunt-shell tasks instead to get this working. Below is a snippet of what your new grunt task will look like, with compass using a config.rb to handle environment switching.

    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      deployCompass: {
        command: 'bundle exec compass compile --environment production --force'
      }
    }

You should be all set now to use the shell:deployCompass as your task to compile your sass files.

Helpful Links for further reading:
http://bundler.io/ - ruby gem bundler
https://github.com/sindresorhus/grunt-shell - the grunt-shell package
http://compass-style.org/help/documentation/configuration-reference/ - compass configuration reference page
https://stash.akqa.net/projects/NYTECHINT/repos/faces/browse?at=refs%2Fheads%2Fplaces_dev – Places Dev where you can look at our gem and grunt files setup
