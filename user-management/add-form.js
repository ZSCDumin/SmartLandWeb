import React, {PureComponent} from 'react';
import {
  Form,
  Input
} from 'antd'
import PropTypes from "prop-types";
//新增按钮的form组件

const Item=Form.Item
// const Option=Select.Option

class AddForm extends PureComponent {

  static propTypes={
    setForm:PropTypes.func.isRequired
  }

  componentWillMount() {
    //将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
        <Form >
          {/*//{...formItemLayout}*/}
          <Item>用户名&nbsp;&nbsp;
            {
              getFieldDecorator('name',{
                initialValue:'',
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
                initialValue:'',
                rules:[
                  {required:true,message:'密码必须输入'}
                ]
              })(
                <Input
                  placeholder='请输入内容'
                  type="password"
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>邮箱&nbsp;&nbsp;
            {
              getFieldDecorator('email',{
                initialValue:'',
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
                initialValue:'',
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
                initialValue:'',
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
                initialValue:'',
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
export default Form.create()(AddForm)
