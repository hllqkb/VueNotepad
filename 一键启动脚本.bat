@echo off
setlocal
:: by hllqk一键启动脚本
:: 定义目录路径
set FRONTEND_DIR=frontend
set BACKEND_DIR=backend
set ADMIN_DIR=admin

:: 检查 frontend 目录下的 node_modules
if not exist "%FRONTEND_DIR%\node_modules" (
    echo "frontend 目录下没有 node_modules，正在安装..."
    start cmd /k "cd %FRONTEND_DIR% && cnpm install"
) else (
    echo "frontend 目录下已存在 node_modules"
)

:: 检查 backend 目录下的 node_modules
if not exist "%BACKEND_DIR%\node_modules" (
    echo "backend 目录下没有 node_modules，正在安装..."
    start cmd /k "cd %BACKEND_DIR% && cnpm install"
) else (
    echo "backend 目录下已存在 node_modules"
)

:: 检查 admin 目录下的 node_modules
if not exist "%ADMIN_DIR%\node_modules" (
    echo "admin 目录下没有 node_modules，正在安装..."
    start cmd /k "cd %ADMIN_DIR% && cnpm install"
) else (
    echo "admin 目录下已存在 node_modules"
)

:: 如果所有目录的 node_modules 都存在，则运行根目录和 admin 目录下的 run.bat
if exist "%FRONTEND_DIR%\node_modules" (
    if exist "%BACKEND_DIR%\node_modules" (
        if exist "%ADMIN_DIR%\node_modules" (
            echo "所有目录的 node_modules 都存在，正在运行 run.bat..."
            start cmd /k "run.bat"
            start cmd /k "cd %ADMIN_DIR% && run.bat"
        )
    )
)

endlocal