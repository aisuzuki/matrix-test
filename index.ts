
import axios, { AxiosRequestConfig } from 'axios'

export enum AuthTypes {
  dummy = 'm.login.dummy',
  password = 'm.login.password'
}

// curl -XPOST -d '{"username":"example", "password":"wordpass", "auth": {"type":"m.login.dummy"}}' "https://localhost:8448/_matrix/client/r0/register"
export async function register(username: string, password: string, authType: AuthTypes) {
  const config = <AxiosRequestConfig>{
    url: 'https://localhost:8448/_matrix/client/r0/register',
    method: 'post'
  }

  config.data = {
    username: username,
    password: password,
    auth: { type: authType }
  }

  const body = await axios.request(config)
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw new Error('Ger device failed: Code=' + err)
    })
  return body
}

// curl -k -XPOST -d '{"type":"m.login.password", "user":"example", "password":"wordpass"}' "https://localhost:8448/_matrix/client/r0/login"
export async function login(username: string, password: string, authType: AuthTypes) {
  const config = <AxiosRequestConfig>{
    url: 'https://localhost:8448/_matrix/client/r0/login',
    method: 'post'
  }

  config.data = {
    type: authType,
    user: username,
    password: password
  }

  const body = await axios.request(config)
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw new Error('Ger device failed: Code=' + err)
    })
  return body
}

// curl -k -H 'Content-Type: application/json' -H 'Accept: application/json'  -XPUT "https://localhost:8448/_matrix/client/r0/sendToDevice/testevent/1?access_token=MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjVjaWQgdXNlcl9pZCA9IEBleGFtcGxlOmxvY2FsaG9zdAowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IFVpOTM6QGY7ZDFHI1A2TkIKMDAyZnNpZ25hdHVyZSDEuDopsjntyWUQl_EIZa3r0r7o8O-f7rUR5HNgDbYo1wo"  -d '{ "messages": { "@example:localhost": { "UAVWTAOIYQ": { "example_content_key": "example_value" } } } }'
export async function sendMessage(
  username: string,
  eventName: string,
  txid: number,
  accessToken: string,
  values: any,
  deviceIds?: string[]) {

  const config = <AxiosRequestConfig>{
    url: 'https://localhost:8448/_matrix/client/r0/sendToDevice/' + eventName + '/ ' + txid + ' ?access_token=' + accessToken,
    method: 'put'
  }

  const deviceMessage = <any>{}
  if (!deviceIds) {
    deviceMessage['*'] = values
  } else {
    deviceIds.forEach(i => {
      deviceMessage[i] = values
    });
  }
  config.data = { messages: {} }
  config.data.messages[username] = deviceMessage

  const body = await axios.request(config)
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw new Error('Ger device failed: Code=' + err)
    })
  return body
}

// curl -k -XGET "https://localhost:8448/_matrix/client/r0/sync?access_token=MDAxN2xvY2F0aW9uIGxvY2FsaG9zdAowMDEzaWRlbnRpZmllciBrZXkKMDAxMGNpZCBnZW4gPSAxCjAwMjVjaWQgdXNlcl9pZCA9IEBleGFtcGxlOmxvY2FsaG9zdAowMDE2Y2lkIHR5cGUgPSBhY2Nlc3MKMDAyMWNpZCBub25jZSA9IFVpOTM6QGY7ZDFHI1A2TkIKMDAyZnNpZ25hdHVyZSDEuDopsjntyWUQl_EIZa3r0r7o8O-f7rUR5HNgDbYo1wo"
// TODO: filters
export async function sync(accessToken: string) {
  const config = <AxiosRequestConfig>{
    url: 'https://localhost:8448/_matrix/client/r0/sync?access_token=' + accessToken,
    method: 'get'
  }

  const body = await axios.request(config)
    .then(res => {
      return res.data
    })
    .catch(err => {
      throw new Error('Ger device failed: Code=' + err)
    })
  return body
}