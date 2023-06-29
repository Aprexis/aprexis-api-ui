# frozen_string_literal: true

source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

group :development do
  gem 'capistrano', '~> 3.17'
  gem 'capistrano-bundler', '~> 2.0', '>= 2.0.1'
  gem 'capistrano-nvm', '~> 0.0.7', require: false
  gem 'capistrano-yarn', '~> 2.0', '>= 2.0.2'
end
