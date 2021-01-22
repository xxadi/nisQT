import request from '@/utils/request'

export function add(data) {
  console.log(data)
  return request({
    url: 'api/fileUploadzw/insertFile',
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
export function stop(id) {
  return request({
    url: 'api/fileUploadzw/stop/' + id,
    method: 'get'
  })
}
export function start(id) {
  return request({
    url: 'api/fileUploadzw/start/' + id,
    method: 'get'
  })
}
export function read(id) {
  return request({
    url: 'api/fileUploadzw/read/' + id,
    method: 'get'
  })
}
export function queryFileListById(data) {
  return request({
    url: 'api/fileUploadzw/findFileListById',
    method: 'get',
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
export function queryFile(params) {
  return request({
    url: 'api/fileUploadzw/findAllFile',
    method: 'get',
    params
  })
}
export default { add, del, stop, start, queryFilePersonListById ,read}

