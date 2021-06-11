# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.16'

set :application, 'aprexis-api-ui'
set :repo_url, 'git@github.com:Aprexis/aprexis-api.git'
set :repository, 'git@github.com:Aprexis/aprexis-api.git'
set :stages, %w[staging]
set :default_stage, 'staging'
set :user, 'webapp'
set :log_level, :info
set :keep_releases, 10
set :deploy_via, :remote_cache
set :ssh_option, { forward_agent: true }
set :slack_webhook, 'https://hooks.slack.com/services/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'
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'node_modules')

set :nvm_type, :user
set :nvm_node, 'v16.3.0'
set :nvm_map_bins, %w[node npm yarn]

set :yarn_flags, %w[--silent --no-progress]
