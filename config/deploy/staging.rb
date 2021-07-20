# frozen_string_literal: true

set :domain, 'staging.aprexis.com'
set :deploy_to, "/home/webapp/staging/#{fetch(:application)}"
set :branch, `git rev-parse --abbrev-ref HEAD`.chomp
server fetch(:domain).to_s, user: 'webapp', roles: %w[web app db], primary: true

namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build:staging'
        # execute fetch(:yarn_bin), 'build:staging-basename'
      end
    end
  end

  before 'symlink:release', :yarn_deploy
end
