# frozen_string_literal: true

set :domain, '10.138.2.3'
set :deploy_to, "/home/webapp/production/#{fetch(:application)}"
set :branch, `git rev-parse --abbrev-ref HEAD`.chomp
set :nvm_node, 'v23.2.0'
server fetch(:domain).to_s, user: 'webapp', roles: %w[web app db], primary: true

namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build:production'
      end
    end
  end

  before 'symlink:release', :yarn_deploy
end
