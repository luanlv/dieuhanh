import agent from '../agent';
// import Header from './Header';
import { Login } from './_components'
import {Link} from 'react-router'
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT,
  LOGOUT} from '../constants/actionTypes';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { Layout, Button, Spin, Icon } from 'antd';
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';


const data = [
  {
    value: '1',
    label: 'Food',
    children: [
      {
        label: 'All Foods',
        value: '1',
        disabled: false,
      },
      {
        label: 'Chinese Food',
        value: '2',
      }, {
        label: 'Hot Pot',
        value: '3',
      }, {
        label: 'Buffet',
        value: '4',
      }, {
        label: 'Fast Food',
        value: '5',
      }, {
        label: 'Snack',
        value: '6',
      }, {
        label: 'Bread',
        value: '7',
      }, {
        label: 'Fruit',
        value: '8',
      }, {
        label: 'Noodle',
        value: '9',
      }, {
        label: 'Leisure Food',
        value: '10',
      }],
  }, {
    value: '2',
    label: 'Supermarket',
    children: [
      {
        label: 'All Supermarkets',
        value: '1',
      }, {
        label: 'Supermarket',
        value: '2',
        disabled: true,
      }, {
        label: 'C-Store',
        value: '3',
      }, {
        label: 'Personal Care',
        value: '4',
      }],
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true,
    children: [
      {
        label: 'you can not see',
        value: '1',
      },
    ],
  },
];

const { Header, Content, Footer } = Layout;

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});


class MenuExample extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      show: false,
    };
  }
  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
  }
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
    // mock for async data loading
    if (!this.state.initData) {
      setTimeout(() => {
        this.setState({
          initData: data,
        });
      }, 500);
    }
  }
  
  render() {
    const { initData, show } = this.state;
    const menuEl = (
      <Menu
        className="foo-menu"
        data={initData}
        value={['1', '3']}
        onChange={this.onChange}
        height={document.documentElement.clientHeight * 0.6}
      />
    );
    const loadingEl = (
      <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    );
    return (
      <div className={show ? 'menu-active' : ''}>
        <div>
          <NavBar
            leftContent={<Link style={{color: 'white'}} to="/"><span style={{cursor: 'pointer'}}><Icon style={{fontSize: '2rem'}} type="bars" /></span></Link>}
            mode="dark"
            // onLeftClick={this.handleClick}
            className="top-nav-bar"
            rightContent={(
              <div style={{color: 'white', cursor: 'pointer'}}
                   onClick={this.props.onClickLogout}>
                <Icon style={{fontSize: '2rem'}} type="logout" />
              </div>
            )}
            style={{position: 'fixed', top: 0, left: 0, width: '100%'}}
          >
            
            <div
              style={{fontSize: '1em'}}
              dangerouslySetInnerHTML={{__html: `<div> <svg version="1.1" id="truck" class="truck-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 370 225" enable-background="new 0 0 370 225" xml:space="preserve"><path id="wheel--front" d="M300,170c13.8,0,25,11.2,25,25s-11.2,25-25,25s-25-11.2-25-25S286.2,170,300,170z M285,195 c0,8.3,6.7,15,15,15s15-6.7,15-15s-6.7-15-15-15S285,186.7,285,195z"/> <path id="wheel--back" d="M170,170c13.8,0,25,11.2,25,25s-11.2,25-25,25c-13.8,0-25-11.2-25-25S156.2,170,170,170z M155,195 c0,8.3,6.7,15,15,15s15-6.7,15-15s-6.7-15-15-15S155,186.7,155,195z"/> <path id="body" d="M345,50h-45V40H100v155h40c0-16.6,13.4-30,30-30s30,13.4,30,30h70c0-16.6,13.4-30,30-30s30,13.4,30,30h35v-75 L345,50z M346.2,115h-45V65h35l10,40V115z"/> <path id="gas--last" d="M39.7,168.2c-0.6,2.5-3.1,4-5.6,3.4c-0.5-0.1-1-0.4-1.5-0.6c-2.5,2.4-6.1,3.6-9.7,2.7 c-3.4-0.8-5.9-3.2-7.2-6.1c-0.8,1-2.2,1.5-3.5,1.2c-1.5-0.4-2.5-1.6-2.6-3.1c-2.5-1.1-4-3.9-3.3-6.6c0.7-3.1,3.9-5,7-4.3 c0,0,0.1,0,0.1,0c-0.4-1.5-0.5-3.1-0.1-4.8c1.2-5,6.2-8,11.1-6.8c3.8,0.9,6.4,4,7,7.6c1.3-0.4,2.8-0.5,4.3-0.2c4.3,1,7,5.4,6,9.7 c-0.4,1.7-1.3,3.1-2.6,4.2C39.7,165.6,40,166.9,39.7,168.2z"/> <path id="gas--first" d="M90.6,175.2c1.4-2,2.1-4.7,1.4-7.3c-1.1-4.8-6-7.8-10.8-6.7c-1,0.2-2,0.7-2.8,1.2c0-0.2-0.1-0.3-0.1-0.5 c-1.1-4.8-6-7.8-10.8-6.7c-3.3,0.8-5.7,3.3-6.6,6.3c-1.8-0.6-3.8-0.8-5.9-0.3c-5.6,1.3-9.1,7-7.8,12.6c1,4.1,4.2,7,8.1,7.8 c1.5,5.4,7,8.6,12.5,7.3c2.2-0.5,4-1.7,5.4-3.2c1.9,0.8,4.1,1,6.3,0.5c1.7-0.4,3.2-1.2,4.4-2.2c1.3,2.2,3.9,3.3,6.5,2.7 c3.2-0.8,5.2-4,4.5-7.2C94.3,177.4,92.7,175.8,90.6,175.2z"/>  <text id="textSVG" x="135" y="95" font-family="sans-serif" font-size="25px">COLOMBUS</text> <text id="textSVG2" x="150" y="120" font-family="sans-serif" font-size="25px">Transport</text>  </svg> </div>`}} >
            </div>
          </NavBar>
        </div>
        {show ? initData ? menuEl : loadingEl : null}
      </div>
    );
  }
}


class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context.router.replace(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {

    if (this.props.appLoaded) {
      if (!this.props.currentUser) {
        return (<div id="login">
          <Login />
        </div>)
      } else {
        return (
          <LocaleProvider locale={enUS}>
            <Layout>
              <MenuExample onClickLogout={this.props.onClickLogout} />
              <Content>
                <div style={{paddingTop: 95}}>
                  {this.props.children}
                </div>
              </Content>
            </Layout>
          </LocaleProvider>
        )
      }
    }
    return (
      <div style={{textAlign: 'center', paddingTop: 50}}>
        <Spin  size="large" tip="Đang tải..." />
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
