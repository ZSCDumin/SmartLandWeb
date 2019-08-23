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
    institution: PropTypes.object.isRequired,
    setForm:PropTypes.func.isRequired

  }

  componentWillMount() {
    //将form对象通过setForm()传递给父组件
    this.props.setForm(this.props.form)
  }


  render() {
    const {institution}=this.props

    const { getFieldDecorator } = this.props.form

    return (
        <Form>
          <Item>编号&nbsp;&nbsp;
            {
              getFieldDecorator('code',{
                initialValue:institution.code,
              })( <Input
                placeholder='请输入内容'
                style={{width:217}}/>)
            }
          </Item>
          <Item>机构编号&nbsp;&nbsp;
            {
              getFieldDecorator('departmentCode',{
                initialValue:institution.departmentCode,
              })( <Input
                placeholder='请输入内容'
                style={{width:217}}/>)
            }
          </Item>
          <Item>省&nbsp;&nbsp;
            {
              getFieldDecorator('province',{
                initialValue:institution.province,
              })(
                <Input
              placeholder='请输入内容'
              style={{width:217}}/>
              )
            }
          </Item>
          <Item>市&nbsp;&nbsp;
            {
              getFieldDecorator('country',{
                initialValue:institution.country,
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>区&nbsp;&nbsp;
            {
              getFieldDecorator('region',{
                initialValue:institution.region
              })(
                <Input
                  placeholder='请输入内容'
                  style={{width:227}}/>
              )
            }
            </Item>
          <Item>机构名称&nbsp;&nbsp;
            {
              getFieldDecorator('name',{
                initialValue:institution.name,
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
