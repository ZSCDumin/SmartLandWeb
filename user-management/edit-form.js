import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  Form,
  Input
} from 'antd'
//新增按钮的form组件

const Item=Form.Item
// const Option=Select.Option

class EditForm extends Component {

  static propTypes={
    // user:PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    setForm:PropTypes.func.isRequired

  }

  componentWillMount() {
    //将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form)
  }


  render() {
    const {user}=this.props

    const { getFieldDecorator } = this.props.form

    return (
        <Form>
          <Item>编号&nbsp;&nbsp;
            {
              getFieldDecorator('code',{
                initialValue:user.code,
              })( <Input
                placeholder='请输入内容'
                style={{width:217}}/>)
            }
          </Item>
          <Item>用户名&nbsp;&nbsp;
            {
              getFieldDecorator('name',{
                initialValue:user.name,
                rules:[
                  {required:true,message:'用户名必须输入'}
                ]
              })(
                <Input
              placeholder='请输入内容'
              style={{width:217}}/>
              )
            }
          </Item>
          <Item>密码&nbsp;&nbsp;
            {
              getFieldDecorator('password',{
                initialValue:user.password,
                rules:[
                  {required:true,message:'密码必须输入'}
                ]
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>邮箱&nbsp;&nbsp;
            {
              getFieldDecorator('email',{
                initialValue:user.email,
                // rules:[
                //   {required:true,message:'邮箱必须输入'}
                // ]
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>电话&nbsp;&nbsp;
            {
              getFieldDecorator('contact',{
                initialValue:user.contact,
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>角色&nbsp;&nbsp;
            {
              getFieldDecorator('roleName',{
                initialValue:user.roleName,
                rules:[
                  {required:true,message:'角色名必须输入'}
                ]
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>所在机构&nbsp;&nbsp;
            {
              getFieldDecorator('department',{
                initialValue:user.department,
                rules:[
                  {required:true,message:'所在机构必须输入'}
                ]
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:200}}/>
              )
            }
            </Item>
        </Form>
    )
  }
}
export default Form.create()(EditForm)
