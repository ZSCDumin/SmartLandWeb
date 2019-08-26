import React from 'react';
import {
    Card,
    Button,
    Table,
    DatePicker, message, Modal,
} from 'antd';
import './diary-management-login.css'
import LinkButton from '../../modal/link-button/link-button';
import {reqDiarylog} from "../api";
import axios from "axios";


class DiaryManagementLogin extends React.Component{
   state={
       logs:[],
       selectedLog:{},
       loading:false,
       searchDateStart:'',
       searchDateEnd:'',
   }
    initColumns = () =>{
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
                dataIndex: 'department',
                key: 'department',
            },
            {
                title: '登录IP',
                dataIndex: 'ipAddress',
                key: 'ipAddress',
            },
            {
                title: '登录机器名',
                dataIndex: 'machineName',
                key: 'machineName',
            },
            {
                title: '登录时间',
                dataIndex: 'logTime',
                key: 'logTime',
            },
            {
                title: '操作',
                render:(selectedLog)=>(<LinkButton onClick={() => this.deleteLog(selectedLog)}>删除</LinkButton> )
            },
        ]
    }
    //删除指定用户
    deleteLog = (selectedLog) => {
        Modal.confirm({
            title: `确认删除${selectedLog.name}吗?`,

            onOk: () => {
                // const result=reqDeleteUser(user.code,4)
                axios({
                    url: 'http://115.157.200.94:8899/smartland/basicinfologinlogdto',
                    method: "delete",
                    params: {
                        code: selectedLog.code
                    }
                })
                    .then((result) => {
                        console.log(selectedLog.code)
                        console.log('RESULT:')
                        console.log(result)
                        this.setState({loading: false})
                        if (result.data.code === 0) {
                            // const users=result.data.data
                            // // console.log(users)
                            // // console.log()
                            // this.setState(users);
                            //3.重新显示列表
                            this.getLogs()
                        } else {
                            message.error('删除登陆日志失败！')
                        }
                    }).catch(error => console.log(error))

            }
        })
    }

    //查询指定日期
    enquiryDate = () => {
     const {searchDateStart,searchDateEnd}=this.state
   axios({
          url: 'http://115.157.200.100:8899/smartland/basicinfologinlogdto/search',
          method: "get",
          params: {
            start: searchDateStart,
            end:searchDateEnd
          }
        })
          .then((result) => {
            // console.log(selectedLog.code)
            console.log('RESULT:')
            console.log(result)
            this.setState({loading: false})
            if (result.data.code === 0) {
              //3.重新显示列表
              const logs = result.data.data
              //  console.log('roles',roles)
              this.setState({logs})
            } else {
              message.error('查询登陆日志失败！')
            }
          }).catch(error => console.log(error))

      // this.setState({
      //   username:'',
      //   content:''
      // })
      }

  handleStartDate=(event)=>{
     console.log(event.target.value)
    const searchDateStart=event.target.value
    this.setState({searchDateStart})
  }

  handleEndDate=(event)=>{
    console.log(event.target.value)
    const searchDateEnd=event.target.value
    this.setState({searchDateEnd})
  }

    onRow=(selectedLog)=>{
        return{
            onClick:event=>{
                console.log(selectedLog)
                this.setState({selectedLog})
            }
        }
    }

    getLogs = async () => {
        this.setState({loading: true})//加载界面开启
        const result = await reqDiarylog()
        this.setState({loading: false})//加载界面关闭
        if (result.data.code === 0) {
            const logs = result.data.data
            //  console.log('roles',roles)
            this.setState({logs})
        } else {
            message.error('获取登陆日志列表失败')
        }
    }

    componentWillMount() {
        this.initColumns()
    }
    //发异步请求
    componentDidMount() {
        this.getLogs()
    }

    render() {
       const {logs,loading,searchDateStart,searchDateEnd}=this.state
        const title=(
            <div className="enquiry">
                选择查询时间
                <div className="enquiry-date">
                    <input
                      placeholder="请输入类似2018-01-01格式日期"
                      style={{width:200}}
                      value={searchDateStart}
                      onChange={this.handleStartDate}
                    />
                    -
                    <input
                      placeholder="请输入类似2018-01-01格式日期"
                      style={{width:200}}
                      value={searchDateEnd}
                      onChange={this.handleEndDate}
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
                    dataSource={logs}
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
export default DiaryManagementLogin