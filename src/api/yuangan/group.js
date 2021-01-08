import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'

export function add(data) {
  return request({
    url: 'api/groupManager/saveGroup',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/groupManager/deleteGroup',
    method: 'post',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/groupManager/editGroup',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: 'api/users/center',
    method: 'put',
    data
  })
}

export function updatePass(user) {
  const data = {
    oldPass: encrypt(user.oldPass),
    newPass: encrypt(user.newPass)
  }
  return request({
    url: 'api/users/updatePass/',
    method: 'post',
    data
  })
}

export function updateEmail(form) {
  const data = {
    password: encrypt(form.pass),
    email: form.email
  }
  return request({
    url: 'api/users/updateEmail/' + form.code,
    method: 'post',
    data
  })
}


export function queryGroupList(data) {
  return request({
    url: 'api/groupManager/queryGroupList',
    method: 'get',
    data
  })
}

export function queryAllPerson(data) {
  return request({
    url: 'api/user1/queryUserAll',
    method: 'get',
    data
  })
}
export function queryGroupListById(params) {
  return request({
    url: 'api/groupManager/queryGroupListById',
    method: 'get',
    params
  })
}

export default { add,edit,del, queryGroupList, queryAllPerson ,queryGroupListById}

