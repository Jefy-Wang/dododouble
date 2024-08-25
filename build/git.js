import child_process from 'child_process'

const dateFormat = (date) => {
  const pad = n => `${(+n < 10 ? '0' : '')}${n}` // 显示补丁

  const year = date.getFullYear() // 年
  const month = pad(date.getMonth() + 1) // 月
  const day = pad(date.getDate()) // 日
  const hours = pad(date.getHours()) // 时
  const minutes = pad(date.getMinutes()) // 分
  const seconds = pad(date.getSeconds()) // 秒

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}` // YYYY-MM-DD HH:mm:ss
}

const buildTime = dateFormat(new Date())
const commitTime = dateFormat(new Date(child_process.execSync(`git show -s --format=%cd`).toString()))
const branch = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')
const commit = child_process.execSync('git show -s --format=%H').toString().trim()
const commitMessage = child_process.execSync('git show -s --format=%s').toString().trim()
const commitUserName = child_process.execSync('git show -s --format=%cn').toString().trim()
const commitUserMail = child_process.execSync('git show -s --format=%ce').toString().trim()
const originFetchUrl = child_process.execSync('git config --get remote.origin.url').toString().trim()

export default {
  branch, // 代码分支
  commit, // commit
  buildTime, // 构建时间
  commitTime, // commit 时间
  commitMessage, // commit 描述信息
  commitUserName, // commit 用户名
  commitUserMail, // commit 用户邮箱
  originFetchUrl, // fetch 远程地址
}
