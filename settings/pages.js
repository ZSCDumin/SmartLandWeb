import React, { Component } from 'react';
import {Route, Switch,Redirect} from 'react-router-dom'
import './pages.css';
import LeftNav from '../../components/left-nav/left-nav'
import { Layout } from 'antd';
import InstitutionManagement from '../institution-management/institution-management'
import UserManagement from '../user-management/user-management'
import RoleManagement from '../role-management/role-management'
import RoleAuthorityAllocation from '../role-authority-allocation/role-authority-allocation'
import DiaryManagementLogin from '../diary-management-login/diary-management-login'
import DiaryManagementDo from '../diary-management-do/diary-management-do'


const { Sider, Content } = Layout;



class Pages extends Component {
    render() {
        return (
            <Layout style={{height:'100%'}}>
                    <Sider style={{color:'white'}} ><LeftNav/></Sider>
                <Content >
                        <Switch>
                            <Route path='/system-settings/institution-management' component={InstitutionManagement}/>
                            <Route path='/system-settings/user-management' component={UserManagement}/>
                            <Route path='/system-settings/role-management' component={RoleManagement}/>
                            {/*<Route path='/system-settings/role-authority-allocation' component={RoleAuthorityAllocation}/>*/}
                            <Route path='/system-settings/diary-management-login' component={DiaryManagementLogin}/>
                            <Route path='/system-settings/diary-management-do' component={DiaryManagementDo}/>
                            {/*<Redirect path='/system-settings/institution-management'/>*/}
                          <Redirect to='/system-settings/institution-management'/>

                        </Switch>
                    </Content>
            </Layout>
        );
    }
}
export default Pages;