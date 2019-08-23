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
    role: PropTypes.object.isRequired,
    setForm:PropTypes.func.isRequired
  }

  componentWillMount() {
    //将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form)
  }


  render() {
    const {role}=this.props

    const { getFieldDecorator } = this.props.form
    console.log('edit role',role.name)
    return (
        <Form>
          <Item>编号&nbsp;&nbsp;
            {
              getFieldDecorator('code',{
                initialValue:role.code,
              })( <Input
                placeholder='请输入内容'
                style={{width:217}}/>)
            }
          </Item>
          <Item>角色名&nbsp;&nbsp;
            {
              getFieldDecorator('name',{
                initialValue:role.name,
                rules:[
                  {required:true,message:'角色名必须输入'}
                ]
              })(
                <Input
              placeholder='请输入内容'
              style={{width:217}}/>
              )
            }
          </Item>
          <Item>描述&nbsp;&nbsp;
            {
              getFieldDecorator('description',{
                initialValue:role.description,
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
        </Form>
    )
  }
}
export default Form.create()(EditForm)
