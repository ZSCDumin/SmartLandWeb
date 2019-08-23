import React from 'react';
import {
  Button,
  Card,
  Modal,
  Table,
  message
} from 'antd';
import LinkButton from "../../modal/link-button/link-button";
import {reqRoles,reqAuth} from "../api";
import axios from "axios";
import AddForm from "./add-form";
import EditForm from "./edit-form";
import Alloc from './alloc-management'

export default class RoleManagement extends React.Component {

  state = {
    roles: [],
    selectedRole: {},//选中的角色
    isShow: 0,//是否显示确认框，0:都不显示，1：新增 2：编辑 3:权限列表
    loading: false,//加载界面
       operations:[],
  }

  initColumns = () => {
    this.columns = [
      {
        title: '角色名',
        dataIndex: 'name',
        key:'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key:'description',
      },
      {
        title: '操作',
        render:(role)=>(
          <span>
               <LinkButton onClick={() => this.showEdit(role)}>编辑</LinkButton>
               <LinkButton onClick={() => this.deleteRole(role)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

    getAuth = async () => {
        this.setState({loading: true})//加载界面开启
        const {selectedRole}=this.state
        console.log('getAuth-role',selectedRole)
        const result = await reqAuth(selectedRole.code)
        this.setState({loading: false})//加载界面关闭
        if (result.data.code === 0) {
            console.log('得到权限信息操作成功！')
            const operations = result.data.data
            console.log('operations',operations)
            this.setState({operations})
        } else {
            message.error('获取权限列表失败')
        }
    }


  getRoles = async () => {
    this.setState({loading: true})//加载界面开启
    const result = await reqRoles('0')
    this.setState({loading: false})//加载界面关闭
    if (result.data.code === 0) {
      const roles = result.data.data
    //  console.log('roles',roles)
      this.setState({roles})
    } else {
      message.error('获取角色列表失败')
    }
  }

  //显示添加框
  showAdd = () => {

    this.setState({
      isShow: 1
    })
  }

  //显示编辑框
  showEdit = (role) => {
    //保存指定用户
    this.role = role
    //更新状态
    this.setState({
      isShow: 2
    })
  }

  showAuth=(selectedRole,operations)=>{
    this.role=selectedRole
      this.dataSource=operations
    console.log('showAuth-selectedRole',selectedRole)
    this.setState(
        {
          isShow:3
        }
    )
      this.getAuth()
  }

  //点击取消，隐藏确认框
  handleCancel = () => {
    //清除输入框的内容
    this.form.resetFields()
    this.setState({isShow: 0}
    )
  }

  //添加角色
  addRole = () => {
    console.log('addRole()')
    const role = this.form.getFieldsValue()
    this.form.resetFields()
    // 1.隐藏确定框
    this.setState({
      isShow: 0
    })
    //2.发请求添加用户
    axios({
      url: 'http://115.157.200.94:8899/smartland/permissionRole/add',
      method: "put",
      params: {
        operatorCode: 4,
        name: role.name,
        description: role.description
      },
    })
      .then((result) => {
        console.log('RESULT:')
        console.log(result)

        this.setState({loading: false})
        if (result.data.code === 0) {
          const roles = result.data.data
          // console.log(users)
          // console.log()
          this.setState(roles);
          //3.重新显示列表
          this.getRoles()
        } else {
          message.error('添加角色失败！')
        }
      }).catch(error => console.log(error))
  }

  editAuth=()=>{
    const selectedRole = this.form.getFieldsValue()
    this.form.resetFields()
    // 1.隐藏确定框
    this.setState({
      isShow: 0
    })
    //2.发请求更新分类
    axios({
      url: 'http://115.157.200.94:8899/smartland/authoritymanagement',
      method: "PUT",
      params: {
        operatorCode: 4,
      },
      data: selectedRole,
    })
        .then((result) => {
           console.log('RESULT:')
           console.log(result)

          this.setState({loading: false})
          console.log('result.data.code',result.data.code)
          if (result.data.code === 0){
            const roles = result.data.data
            console.log('editAuth-roles',roles)
            // console.log(users)
            // console.log()
            this.setState(roles);
            this.getAuth(roles)
          } else {
            message.error('设置权限失败！')
          }
        }).catch(error => console.log(error))
  }

  //编辑用户
  editRole = () => {
    const role = this.form.getFieldsValue()
    this.form.resetFields()
    // 1.隐藏确定框
    this.setState({
      isShow: 0
    })
    //2.发请求更新分类
    axios({
      url: 'http://115.157.200.94:8899/smartland/permissionRole/update',
      method: "post",
      params: {
        operatorCode: 4,
      },
      data: role,
    })
      .then((result) => {
        //   console.log('RESULT:')
        //   console.log(result)

        this.setState({loading: false})
        if (result.data.code === 0) {
          const roles = result.data.data
          // console.log(users)
          // console.log()
          this.setState(roles);
          this.getRoles()
        } else {
          message.error('编辑角色失败！')
        }
      }).catch(error => console.log(error))
    //3.重新显示列表

  }
  //删除指定用户
  deleteRole = (role) => {
    Modal.confirm({
      title: `确认删除${role.name}吗?`,

      onOk: () => {
        // const result=reqDeleteUser(user.code,4)
        axios({
          url: 'http://115.157.200.94:8899/smartland/permissionRole/delete',
          method: "delete",
          params: {
            operatorCode: 4,
            code: role.code
          }
        })
          .then((result) => {
            console.log('RESULT:')
            console.log(result)

            this.setState({loading: false})
            if (result.data.code === 0) {
              // const users=result.data.data
              // // console.log(users)
              // // console.log()
              // this.setState(users);
              //3.重新显示列表
              this.getRoles()
            } else {
              message.error('删除角色失败！')
            }
          }).catch(error => console.log(error))

      }
    })
  }

  onRow=(selectedRole)=>{
    return{
      onClick:event=>{
        console.log(selectedRole)
        this.setState({selectedRole})
      }
    }
  }

  componentWillMount() {
    this.initColumns()
  }

  //发异步请求
  componentDidMount() {
    this.getRoles()
  }

  render() {

    const {roles,selectedRole,operations,isShow,loading} = this.state
    const role=this.role || {}
    console.log('selectedRole.name',selectedRole.name);
    const title = (
      <span>
        <Button
          type='primary'
          onClick={this.showAdd}
        >新增</Button>&nbsp;&nbsp;

        <Button
          type='primary'
          disabled={!selectedRole.name}
          onClick={() => this.showAuth(selectedRole,operations)}
        >权限设置</Button>
      </span>

    )

    return (
      <Card title={title} style={{margin: 20}}>
        <Table
          bordered
          rowKey='code'
          dataSource={roles}
          columns={this.columns}
          loading={loading}
          pagination={{defaultPageSize: 6,showQuickJumper: true}}
          rowSelection={{type: 'radio',selectedRowKeys: [selectedRole.code]}}//单选框/*role.name待修改，name应该为索引值*/
          onRow={this.onRow}
        />
        <Modal
          title="新增角色"
          visible={isShow === 1}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <AddForm
            setForm={(form)=>{this.form=form}}
          />
        </Modal>
        <Modal
          title="编辑角色（请不要修改编号）"
          visible={isShow === 2}
          onOk={this.editRole}
          onCancel={this.handleCancel}
        >
          <EditForm
            role={role}
            setForm={(form) => {this.form = form}}
          />
        </Modal>
        <Modal
            title="设置角色权限"
            visible={isShow === 3}
            onOk={this.editAuth}
            onCancel={this.handleCancel}
        >
          <Alloc
              role={selectedRole}
              operations={operations}
              setForm={(form)=>{this.form=form}}
          />
        </Modal>

      </Card>
    )
  }

}