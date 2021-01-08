import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add(data) {
  console.log(data);
  return request({
    url: 'api/quest/insert',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: 'api/quest/delete',
    method: 'get',
    params
  })
}
export function stop(params) {
  return request({
    url: 'api/quest/stop',
    method: 'get',
    params
  })
}
export function start(params) {
  return request({
    url: 'api/quest/start',
    method: 'get',
    params
  })
}



export function queryAllQuestion(data) {
  return request({
    url: 'api/quest/findAllQuestion',
    method: 'post',
    data
  })
}
export function queryQuestionListById(params) {
  return request({
    url: 'api/quest/queryQuestionListById',
    method: 'get',
    params
  })
}

export default { add,del, stop,start,queryQuestionListById}

