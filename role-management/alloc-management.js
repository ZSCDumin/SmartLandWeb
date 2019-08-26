import {Modal, Checkbox, Button, message} from 'antd';
import React from 'react';
import {Form,Table,Card} from 'antd';
import PropTypes from "prop-types";
import LinkButton from "../../modal/link-button/link-button";
import {reqAuth} from "../api";

const Item=Form.Item

function onChange(e) {
    const checked=e.target.checked
    if(checked===false)
    {
        e.checked=false
    }
    console.log('e',e)
  console.log(`checked = ${e.target.checked}`);
}

 class Alloc extends React.Component {
    state={
        loading:false,
    }

     static propTypes={
         setForm:PropTypes.func.isRequired,
         role: PropTypes.object.isRequired,
         operations:PropTypes.array.isRequired
     }

     initColumns = () => {
         this.columns = [
             {
                 title:'用户',
                 dataIndex:'roleName',
                 key:'roleName'
             },
             {
               title:'序号1',
                 dataIndex:'menu2Code',
                 key:'menu2Code'
             },
             {
                              title: '序号2',
                              dataIndex: 'operationCode',
                              key: 'operationCode'
             },
             {
                 title: '操作',
                 dataIndex: 'operationName',
                 key: 'operationName',
             },
             {
                 title: '菜单名',
                 dataIndex: 'menu2Name',
                 key: 'menu2Name',
             },
             {
                 title: '权限',
                 render:()=>(<Checkbox onChange={onChange} > </Checkbox>)
             },
         ]
     }

     componentWillMount() {
         //将form对象通过setForm()传递给父组件
         this.initColumns()
         this.props.setForm(this.props.form)
     }

  render() {
    const {loading} = this.state
      const {role,operations}=this.props
      console.log('render-role',role)
      console.log("render-operations",operations)
    return (
        <div>
          <Table
              rowKey='menu2Name'
              bordered
              rowKey={role=>role.code}
              columns={this.columns}
              dataSource={operations}
              loading={loading}
              pagination={{defaultPageSize: 6,showQuickJumper: true}}
          />
      </div>
    );
  }
}
export default Form.create()(Alloc)