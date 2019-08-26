import React from 'react';
import {Button, Card, Modal, Table, message,} from 'antd';
import LinkButton from "../../modal/link-button/link-button";
import axios from 'axios'
import AddForm from './add-form'
import EditForm from './edit-form'
import {reqInstitutions} from "../api";

export default class InstitutionManagement extends React.Component {
  state = {
    institution: [],
    isShow: 0,//是否显示确认框，0:都不显示，1：新增 2：编辑
    loading: false,//加载界面
  }
  //初始化Table的所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '省',
        dataIndex: 'province',
        key: 'province',
      },
      {
        title: '市',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: '区',
        dataIndex: 'region',
        key: 'region',
      },
      {
        title: '机构名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        render:(institution)=>(
          <span>
            <LinkButton onClick={()=>this.showEdit(institution)}>编辑</LinkButton>
            <LinkButton onClick={() => this.deleteInstitution(institution)}>删除</LinkButton>
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

  getInstitutions = async () => {
    this.setState({loading: true})
    const result = await reqInstitutions('0')
    // console.log(result)
    this.setState({loading: false})
    if (result.data.code === 0) {
      const institutions = result.data.data
      this.setState({institutions})
    } else {
      message.error('获取机构列表失败')
    }
  }

//显示添加的确认框
  showAdd = () => {

    this.setState({
      isShow: 1})
  }
//显示编辑框
  showEdit= (institution) => {
    //保存指定用户
    this.institution=institution
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
  addInstitution=()=>{
    console.log('addInstitution()')
    const institution = this.form.getFieldsValue()
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
      data:institution,
    })
        .then((result)=>{
          console.log('RESULT:')
          console.log(result)

          this.setState({loading:false})
          if(result.data.code===0){
            message.success('添加机构成功！')
            const institutions=result.data.data
            // console.log(users)
            // console.log()
            this.setState(institutions);
            //3.重新显示列表
            this.getInstitutions()
          }
          else{
            message.error('添加机构失败！')
          }
        }).catch(error => console.log(error))
  }
//编辑用户
  editInstitution=()=>{
    const institution = this.form.getFieldsValue()
    this.form.resetFields()
    // 1.隐藏确定框
    this.setState({
      isShow: 0})
    //2.发请求更新分类
    //  const result=await reqEditUser({user})
    axios({
      url: 'http://115.157.200.94:8899/smartland/basicinfodepartment',
      method: "post",
      params:{
        // operatorCode:4,
      },
      data:institution,
    })
      .then((result)=>{
        //   console.log('RESULT:')
        //   console.log(result)

        this.setState({loading:false})
        if(result.data.code===0){
          const institutions=result.data.data
          // console.log(users)
          // console.log()
          this.setState(institutions);
          this.getnsItitutions()
        }
        else{
          message.error('编辑机构失败！')
        }
      }).catch(error => console.log(error))
    //3.重新显示列表

  }
  //删除指定用户
  deleteInstitution=(institution)=>{
    console.log(institution)
    Modal.confirm({
      title: `确认删除${institution.name}吗?`,

      onOk: ()=>{
        // const result=reqDeleteUser(user.code,4)
        axios({
          url: 'http://115.157.200.94:8899/smartland/basicinfodepartment',
          method: "delete",
          params:{
            // operatorCode:4,
            code:institution.institutionCode
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
              this.getInstitutions()
            }
            else{
              message.error('删除机构失败！')
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
    this.getInstitutions()
  }

  render() {
    const {institutions, isShow, loading} = this.state
    const institution=this.institution || {}

    const title = <Button
      type='primary'
      onClick={this.showAdd}
    >
      新增
    </Button>


    return (

      <Card title={title} style={{margin: 20}}>
        <Table
          bordered
          rowKey='name'
          dataSource={institutions}
          columns={this.columns}//列的数据
          loading={loading}
          pagination={{defaultPageSize: 6, showQuickJumper: true}}
        />
        <Modal
            title="新增机构"
            visible={isShow === 1}
            onOk={this.addInstitution}
            onCancel={this.handleCancel}
        >
          <AddForm
              setForm={(form)=>{this.form=form}}
              // user={user}
          />
        </Modal>
        <Modal
          title="编辑机构（请不要修改编号）"
          visible={isShow === 2}
          onOk={this.editInstitution}
          onCancel={this.handleCancel}
        >
          <EditForm
            institution={institution}
            setForm={(form) => {this.form = form}}
            // user={user}
          />
        </Modal>
      </Card>
    )
  }

}
