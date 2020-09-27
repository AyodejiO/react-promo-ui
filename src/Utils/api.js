import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true
})

const apiCall = ({ path, data, method }) =>
  new Promise((resolve, reject) => {
    apiClient.get('sanctum/csrf-cookie').then(response => {
      apiClient.post(path, data).then(response => {
        console.log('User signed in!')
        resolve(response)
      }).catch(error => {
        console.log(error)
        reject(error)
      }) // credentials didn't match
    })

    // axios({ url: path, data: data, method: method })
    //   .then(resp => {
    //     const token = resp.data.token
    //     localStorage.setItem('user-token', token) // store the token in localstorage
    //     resolve(resp)
    //   })
    //   .catch(err => {
    //     localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
    //     reject(err)
    //   })

    // setTimeout(() => {
    //   try {
    //     resolve(mocks[url][method || 'GET'])
    //     console.log(`Mocked '${url}' - ${method || 'GET'}`)
    //     console.log('response: ', mocks[url][method || 'GET'])
    //   } catch (err) {
    //     reject(new Error(err))
    //   }
    // }, 1000)
  })

export default apiCall
