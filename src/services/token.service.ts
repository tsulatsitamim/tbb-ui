const TOKEN_KEY = 'token'
const CREDENTIALS_KEY = 'credentials'
const DEPARTMENT_KEY = 'department'

const getToken = () => window.localStorage.getItem(TOKEN_KEY)
const saveToken = (token: string) => window.localStorage.setItem(TOKEN_KEY, token)
const destroyToken = () => window.localStorage.removeItem(TOKEN_KEY)

const saveCredentials = (credentials: string[]) =>
  window.localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials))
const getCredentials = (): string[] =>
  JSON.parse(window.localStorage.getItem(CREDENTIALS_KEY) || '[]')
const destroyCredentials = () => window.localStorage.removeItem(CREDENTIALS_KEY)

const saveDepartment = (department: string) => window.localStorage.setItem(DEPARTMENT_KEY, department)
const getDepartment = () => window.localStorage.getItem(DEPARTMENT_KEY)

export default {
  getToken,
  saveToken,
  destroyToken,
  saveCredentials,
  getCredentials,
  saveDepartment,
  getDepartment,
  destroyCredentials,
}
