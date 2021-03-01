import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add(data) {
  console.log(data);
  return request({
    url: 'api/exam/insert',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: 'api/exam/delete',
    method: 'get',
    params
  })
}
export function stop(params) {
  return request({
    url: 'api/exam/stop',
    method: 'get',
    params
  })
}
export function start(params) {
  return request({
    url: 'api/exam/start',
    method: 'get',
    params
  })
}

export function findAllPerson(data) {
  return request({
    url: 'api/testPaper/findAllPerson',
    method: 'get',
    data
  })
}

export function queryAllQuestion(data) {
  return request({
    url: 'api/exam/findAllQuestion',
    method: 'get',
    data
  })
}

export function findAllTestPaper(data) {
  return request({
    url: 'api/testPaper/findAllTestPaper',
    method: 'get',
    data
  })
}
export function queryQuestionListById(params) {
  return request({
    url: 'api/exam/queryQuestionListById',
    method: 'get',
    params
  })
}

export default { add,del, stop,start,queryQuestionListById,findAllPerson,findAllTestPaper}

