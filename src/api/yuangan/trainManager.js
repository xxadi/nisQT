import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add(data) {
  console.log(data)
  return request({
    url: 'api/trainManager/insertTrain',
    method: 'post',
    data
  })
}

export function del(params) {
  return request({
    url: 'api/trainManager/delete',
    method: 'get',
    params
  })
}
export function stop(id) {
  return request({
    url: 'api/trainManager/stop/' + id,
    method: 'get'
  })
}
export function start(id) {
  return request({
    url: 'api/trainManager/start/' + id,
    method: 'get'
  })
}
export function read(id) {
  return request({
    url: 'api/trainManager/read/' + id,
    method: 'get'
  })
}
export function queryFileListById(data) {
  return request({
    url: 'api/trainManager/findFileListById',
    method: 'get',
    data
  })
}
export function queryFilePersonListById(params) {
  return request({
    url: 'api/trainManager/findAllFilePersonById',
    method: 'get',
    params
  })
}
export function queryTrainDoneListById(params) {
  return request({
    url: 'api/trainManager/queryTrainDonetById',
    method: 'get',
    params
  })
}
export function queryFile(params) {
  return request({
    url: 'api/trainManager/findAllFile',
    method: 'get',
    params
  })
}

export function updateQt(data) {
  return request({
    url: 'api/trainManager/updateQt',
    method: 'post',
    data
  })
}

export function isReadList(id) {
  return request({
    url: 'api/trainManager/isReadList/' + id,
    method: 'get'
  })
}
export default { add, del, stop, start, queryFilePersonListById ,read,updateQt,queryTrainDoneListById,isReadList}

