import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add(data) {
  console.log(data);
  return request({
    url: 'api/fileUploadzw/insert',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: 'api/fileUploadzw/delete',
    method: 'get',
    params
  })
}
export function stop(params) {
  return request({
    url: 'api/fileUploadzw/stop',
    method: 'get',
    params
  })
}
export function start(params) {
  return request({
    url: 'api/fileUploadzw/start',
    method: 'get',
    params
  })
}



export function queryAllQuestion(data) {
  return request({
    url: 'api/fileUploadzw/findAllQuestion',
    method: 'post',
    data
  })
}
export function queryFilePersonListById(params) {
  return request({
    url: 'api/fileUploadzw/findAllFilePersonById',
    method: 'get',
    params
  })
}

export default { add,del, stop,start,queryFilePersonListById}

