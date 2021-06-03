export const config = {
  headers: {
    Authorization: null as string | null
  }
}

const setToken = (token: string) => {
  config.headers.Authorization = `bearer ${token}`
}

export default { setToken, config }
