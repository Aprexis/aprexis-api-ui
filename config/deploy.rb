# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.17'

set :application, 'aprexis-api-ui'
set :repo_url, 'git@github.com:Aprexis/aprexis-api-ui.git'
set :repository, 'git@github.com:Aprexis/aprexis-api-ui.git'
set :stages, %w[staging demo production]
set :default_stage, 'staging'
set :user, 'webapp'
set :log_level, :debug
set :keep_releases, 10
set :deploy_via, :remote_cache
set :ssh_option, { forward_agent: true }
append :linked_dirs, 'log', 'node_modules'
append :linked_files, '.env.local'

set :default_shell, 'bash -l'
set :pty, true
set :use_sudo, false
set :nvm_node, 'v16.20.1'
set :nvm_type, :user
set :nvm_map_bins, %w[node npm yarn]

set :yarn_flags, %w[]
