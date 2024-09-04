import os from 'os'
import chalk from 'chalk'
import child from 'child_process'

// 关闭指定端口
export function closePort(port) {
  if (!port) return

  let killCmd = '' // 进程强杀命令
  const platform = os.platform() // 当前操作系统

  if (platform === 'darwin') {
    killCmd = `lsof -i :${port} | grep LISTEN | awk '{print $2}' | xargs kill -9` // mac 系统
  } else if (platform === 'win32') {
    killCmd = `netstat -ano | findstr :${port} | findstr LISTENING | for /f "tokens=5" %a in ('more') do taskkill /F /PID %a` // win 系统
  }

  if (!killCmd) return

  child.execSync(killCmd)

  const beauty = `${chalk.green(`Port ${port} is already in use!`)} ${chalk.greenBright(`but has been closed automatically`)}`

  console.warn(beauty)
}

// 暴露插件函数
export default function closePortPlugin() {
  return {
    name: 'vite-plugin-close-port',
    enforce: 'pre', // 确保插件在其他插件之前执行
    configureServer(server) {
      server.httpServer.on('error', (e) => {
        if (e.code !== 'EADDRINUSE') return

        closePort(e.port)

        const beauty = `${chalk.blue(` → Restart on port`)} ${chalk.blueBright(e.port)}${chalk.blue(':')} ${chalk.whiteBright('npm run dev')}`

        console.log(beauty)

        // eslint-disable-next-line no-undef
        process.exit(1)
      })
    }
  }
}
