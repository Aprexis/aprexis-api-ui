# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.16'

set :application, 'aprexis-api-ui'
set :repo_url, 'git@github.com:Aprexis/aprexis-api-ui.git'
set :repository, 'git@github.com:Aprexis/aprexis-api-ui.git'
set :stages, %w[staging]
set :default_stage, 'staging'
set :user, 'webapp'
set :log_level, :debug
set :keep_releases, 10
set :deploy_via, :remote_cache
set :ssh_option, { forward_agent: true }
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'node_modules')

set :default_shell, 'bash -l'
set :pty, true
set :use_sudo, false
set :nvm_type, :user
set :nvm_node, 'v16.3.0'
set :nvm_map_bins, %w[node npm yarn]

set :yarn_flags, %w[--silent --no-progress]
