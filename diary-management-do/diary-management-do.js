import React from 'react';
import {
    Card,
    Button,
    Table,
    Input,
    DatePicker, message, Modal,
} from 'antd';
import './diary-management-do.css'
import LinkButton from '../../modal/link-button/link-button'
import {reqActionlog} from "../api";
import axios from "axios";

class DiaryManagementDo extends React.Component{
    state={
        acts:[],
        selectedAct:{},
        loading:false,
      searchDateStart:'',
      searchDateEnd:''
    }

    initColumns=()=>{
        this.columns = [
            {
                title: '序号',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '所在机构',
                dataIndex: 'departmentName',
                key: 'departmentName',
            },
            {
                title: '操作对象',
                dataIndex: 'optObject',
                key: 'optObject',
            },
            {
                title: '操作描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: '操作时间',
                dataIndex: 'optTime',
                key: 'optTime',
            },
            {
                title: '操作',
                render:(selectedAct)=>(<LinkButton onClick={() => this.deleteAct(selectedAct)}>删除</LinkButton> )
            },
        ];
    }
    //删除指定用户
    deleteAct = (selectedAct) => {
        Modal.confirm({
            title: `确认删除${selectedAct.name}吗?`,

            onOk: () => {
                // const result=reqDeleteUser(user.code,4)
                axios({
                    url: 'http://115.157.200.94:8899/smartland/basicinfoActionLog/delete',
                    method: "delete",
                    params: {
                        operatorCode: 4,
                        code: selectedAct.code
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
                            this.getActs()
                        } else {
                            message.error('删除登陆日志失败！')
                        }
                    }).catch(error => console.log(error))

            }
        })
    }

  enquiryDate = () => {
    const {searchDateStart,searchDateEnd}=this.state
    axios({
      url: 'http://115.157.200.100:8899/smartland/basicinfoActionLog/search',
      method: "get",
      params: {
        startTime: searchDateStart,
        endTime:searchDateEnd
      }
    })
      .then((result) => {
        // console.log(selectedLog.code)
        console.log('RESULT:')
        console.log(result)
        this.setState({loading: false})
        if (result.data.code === 0) {
          //3.重新显示列表
          const acts = result.data.data
          //  console.log('roles',roles)
          this.setState({acts})
        } else {
          message.error('查询操作日志失败！')
        }
      }).catch(error => console.log(error))

    // this.setState({
    //   username:'',
    //   content:''
    // })
  }


  onRow=(selectedLog)=>{
        return{
            onClick:event=>{
                console.log(selectedLog)
                this.setState({selectedLog})
            }
        }
    }
    getActs = async () => {
        this.setState({loading: true})//加载界面开启
        const result = await reqActionlog()
        this.setState({loading: false})//加载界面关闭
        if (result.data.code === 0) {
            const acts = result.data.data
            //  console.log('roles',roles)
            this.setState({acts})
        } else {
            message.error('获取操作日志列表失败')
        }
    }
    componentWillMount() {
        this.initColumns()
    }
    //发异步请求
    componentDidMount() {
        this.getActs()
    }

    render() {
        const {acts,loading,searchDateStart,searchDateEnd}=this.state
        //card的右侧标题
        const title=(
            <div className="enquiry">
                选择查询时间
                <div className="enquiry-date">
                    <input
                      placeholder="请输入类似2018-01-01格式日期"
                      style={{width:200}}
                      value={searchDateStart}
                      onChange={event => this.setState({searchDateStart:event.target.value})}
                    />
                    -
                    <input
                      placeholder="请输入类似2018-01-01格式日期"
                      style={{width:200}}
                      value={searchDateEnd}
                      onChange={event => this.setState({searchDateEnd:event.target.value})}
                    />
                </div>
                <Button
                  type="primary"
                  onClick={this.enquiryDate}
                >
                  查询
                </Button>
            </div>
        )

        return (
            <Card
                title={title} // extra={<a href="#">More</a>}
                style={{margin:20}}
            >
                <Table
                     bordered
                    dataSource={acts}
                    columns={this.columns}
                     rowKey='code'
                     loading={loading}
                     pagination={{defaultPageSize: 6,showQuickJumper: true}}
                     onRow={this.onRow}
                />
            </Card>
        );
    }

}
export default DiaryManagementDo