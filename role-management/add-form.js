import React, {Component} from 'react';
import {
  Form,
  Input
} from 'antd'
import PropTypes from "prop-types";
//新增按钮的form组件

const Item=Form.Item
// const Option=Select.Option

class AddForm extends Component {

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
      <Form>
        <Item>角色名&nbsp;&nbsp;
          {
            getFieldDecorator('name',{
              initialValue:'',
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
            getFieldDecorator('password',{
              initialValue:'',
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
export default Form.create()(AddForm)
