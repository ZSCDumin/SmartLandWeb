import React from 'react';
import {Button, Card, Modal, Table, message,} from 'antd';
import LinkButton from "../../modal/link-button/link-button";
import axios from 'axios'
import AddForm from './add-form'
import EditForm from './edit-form'
import {reqUsers} from "../api";



class UserManagement extends React.Component {

  state = {
    users: [],
    // roles:[],
    isShow: 0,//是否显示确认框，0:都不显示，1：新增 2：编辑
    loading: false,//加载界面
  }
  //初始化Table的所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'contact',
        key: 'contact',
      },
      {
        title: '角色',
        dataIndex: 'roleName',
        key: 'roleName',
        // render:(role_id)=>this.roleNames[role_id]
      },
      {
        title: '所在机构',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '操作',
        render:(user)=>(
          <span>
            <LinkButton onClick={()=>this.showEdit(user)}>编辑</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      },
    ]

  }
  /*
    根据role的数组, 生成包含所有角色名的对象(属性名用角色id值)
     */
  // initRoleNames=(roles)=>{
  //   const rolesNames=roles.reduce((pre, role) => {
  //     pre[role._id] = role.name
  //     return pre
  //   }, {})
  //   // 保存
  //   this.roleNames = roleNames
  // }
  /*
  * 添加或者更新用户
  * */

  getUsers = async () => {
    this.setState({loading: true})
    const result = await reqUsers('0')
    // console.log(result)
    this.setState({loading: false})
    if (result.data.code === 0) {
      const users = result.data.data
      this.setState({users})
    } else {
      message.error('获取用户列表失败')
    }
  }

//显示添加的确认框
  showAdd = () => {

    this.setState({
      isShow: 1})
  }
//显示编辑框
  showEdit= (user) => {
    //保存指定用户
    this.user=user
    //更新状态
    this.setState({
      isShow: 2})
  }


//点击取消，隐藏确认框
  handleCancel=()=>{
    //清除输入框的内容
    this.form.resetFields()
    this.setState({isShow:0}
    )
  }
//添加用户
  addUser=()=>{
    console.log('addUser()')
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    // 1.隐藏确定框
    this.setState({
      isShow: 0})
    //2.发请求添加用户
    axios({
      url: 'http://115.157.200.94:8899/smartland/permissionuserdto',
      method: "put",
      params:{
        operatorCode:4,
      },
      data:user,
    })
      .then((result)=>{
          console.log('RESULT:')
          console.log(result)

        this.setState({loading:false})
        if(result.data.code===0){
          const users=result.data.data
          // console.log(users)
          // console.log()
          this.setState(users);
          //3.重新显示列表
          this.getUsers()
        }
        else{
          message.error('添加用户失败！')
        }
      }).catch(error => console.log(error))
  }
//编辑用户
  editUser=()=>{
    const user = this.form.getFieldsValue()
    this.form.resetFields()
   // 1.隐藏确定框
    this.setState({
      isShow: 0})
   //2.发请求更新分类
   //  const result=await reqEditUser({user})
    axios({
      url: 'http://115.157.200.94:8899/smartland/permissionuserdto',
      method: "post",
     params:{
       operatorCode:4,
    },
     data:user,
    })
     .then((result)=>{
    //   console.log('RESULT:')
    //   console.log(result)

      this.setState({loading:false})
      if(result.data.code===0){
        const users=result.data.data
        // console.log(users)
        // console.log()
        this.setState(users);
        this.getUsers()
      }
      else{
        message.error('编辑用户失败！')
      }
    }).catch(error => console.log(error))
    //3.重新显示列表

}
  //删除指定用户
  deleteUser=(user)=>{
    Modal.confirm({
      title: `确认删除${user.name}吗?`,

    onOk: ()=>{
        // const result=reqDeleteUser(user.code,4)
      axios({
        url: 'http://115.157.200.94:8899/smartland/permissionuserdto',
        method: "delete",
        params:{
          operatorCode:4,
          code:user.code
        }
      })
        .then((result)=>{
          console.log('RESULT:')
          console.log(result)

          this.setState({loading:false})
          if(result.data.code===0){
            // const users=result.data.data
            // // console.log(users)
            // // console.log()
            // this.setState(users);
            //3.重新显示列表
            this.getUsers()
          }
          else{
            message.error('删除用户失败！')
          }
        }).catch(error => console.log(error))

      }
    })
  }

  //为第一次render准备数据
  componentWillMount() {
    this.initColumns()
  }

  //发异步请求
  componentDidMount() {
    this.getUsers()
  }

  render() {
    const {users, isShow, loading} = this.state
    const user=this.user || {}

    const title = (<Button
      type='primary'
      onClick={this.showAdd}
    >
      新增
    </Button>
    )

    return (

      <Card title={title} style={{margin: 20}}>
        <Table
          bordered
          rowKey='name'
          dataSource={users}
          columns={this.columns}//列的数据
          loading={loading}
          pagination={{defaultPageSize: 6, showQuickJumper: true}}
        />
        <Modal
          title="新增用户"
          visible={isShow === 1}
          onOk={this.addUser}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={(form)=>{this.form=form}}
            // user={user}
          />
        </Modal>
        <Modal
          title="编辑用户（请不要修改编号）"
          visible={isShow === 2}
          onOk={this.editUser}
          onCancel={this.handleCancel}
        >
          <EditForm
            user={user}
            setForm={(form) => {this.form = form}}
            // user={user}
          />
        </Modal>
      </Card>
    )
  }

}

export default UserManagement