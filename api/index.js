/*
* 包含应用中所有接口请求函数的模块
* 每个函数的返回值都是promise
* */
import ajax from './ajax'
// import jsonp from 'jsonp'
// const BASE='http://115.157.200.94:8899'

const BASE='http://115.157.200.94:8899/smartland'

export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')
//获取机构信息
export const reqInstitutions=()=>ajax(BASE+'/basicinfodepartment/findAll')

//获取用户列表
export const reqUsers=()=>ajax(BASE+'/permissionuserdto/findAll')

//获取角色列表
export const reqRoles=()=>ajax(BASE+'/permissionRole/all')

//获取操作日志管理列表
export const reqActionlog=()=>ajax(BASE+'/basicinfoActionLog/open')

//获取相应角色权限列表
export const reqAuth=(roleCode)=>ajax(BASE+'/authoritymanagement/all',{roleCode},'GET')

// export const reqDiary=()=>ajax(BASE+'/basicinfologinlogdto/open')

/*
* json请求的接口请求函数
* */
// export const reqWeather=()=>{
//   const url='http://115.157.200.94:8899/permissionuserdto'
//   jsonp(url,{},(err,data)=>{
//     console.log()
//   })
// }