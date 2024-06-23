@echo off

rem Get the current directory
set "current_directory=%CD%"

rem Run the admin panel
set "admin_panel_run=cd code/basic-frontend && code . && ng s --open"
start /max cmd /k "cd /d %current_directory% && %admin_panel_run%"

rem Run the backend
set "backend_run=cd code/basic-backend && code . && npm run dev"
start /max cmd /k "cd /d %current_directory% && %backend_run%"
 
