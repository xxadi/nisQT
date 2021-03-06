import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add(data) {
  console.log(data);
  return request({
    url: 'api/testPaper/insert',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: 'api/testPaper/delete',
    method: 'get',
    params
  })
}
export function stop(params) {
  return request({
    url: 'api/testPaper/stop',
    method: 'get',
    params
  })
}
export function start(params) {
  return request({
    url: 'api/testPaper/start',
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
    url: 'api/quest/findAllQuestion',
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

export function findAllTestPaperById(id) {
  return request({
    url: 'api/testPaper/findAllTestPaperById/' + id,
    method: 'get',
  })
}
export function queryQuestionListById(params) {
  return request({
    url: 'api/quest/queryQuestionListById',
    method: 'get',
    params
  })
}
export function answerSubmit(data) {
  console.log(data);
  return request({
    url: 'api/exam/answerSubmit',
    method: 'post',
    data
  })
}


export default { add,del, stop,start,queryQuestionListById,findAllPerson,findAllTestPaper,findAllTestPaperById,answerSubmit}

