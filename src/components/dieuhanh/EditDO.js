/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Input, Button, message, Select, AutoComplete, InputNumber, Switch} from 'antd'
import moment from 'moment';
import agent from '../../agent';
import { connect } from 'react-redux';
import {Link} from 'react-router'
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';

import CompleteInput  from '../_components/CompleteInput'
import CompleteInputValue  from '../_components/CompleteInputValue'
import CompleteInputPlace  from '../_components/CompleteInputPlace'
import CustomSelect  from '../_components/CustomSelect'
// import CompleteInput  from './component/Complete'
import SelectLaiXe  from '../_components/SelectLaiXe'

import {slugify} from '../_function'

const Option = Select.Option;
const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  xe: state.common.currentUser.xe
});

const mapDispatchToProps = dispatch => ({
  // onLoad: (tab, pager, payload) =>
  //   dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});


class DOPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      edit: true,
      init: false,
      data: {},
      khachhang: [],
      diemxuatphat: [],
      diemtrahang: [],
      nguoiyeucau: [],
    }
  }

  componentWillMount() {
    let that = this;
    agent.DieuHanh.DObyId(this.props.params.id)
      .then(res => {
        let DO = res
        that.setState(prev => { return {
          ...prev,
          // edit: (moment(DO.time).diff(moment(Date.now() - 24*60*60*1000)) > 0) && !DO.trangthai.daduyet,
          edit: !DO.trangthai.daduyet,
          data: DO
        }})
  
        agent.DieuHanh.autofill()
          .then(res => {
            that.setState(prev => {return {
              ...prev,
              init: true,
              khachhang: valueByField('khachhang', res),
              diemxuatphat: valueByField('diadiem', res),
              diemtrahang: valueByField('diadiem', res),
              nguoiyeucau: valueByField('nguoiyeucau', res),
              doixe: true,
              phatsinh: true,
            }})
          })
        
      })
      .catch(err => {
      
      })
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    let gThis = this
    if(!this.state.init){
      return (
        <div className="do-page">
          <div className="laixe-doWr">
          </div>
        </div>)
    } else {
      if(!this.state.edit) {
        return (
          <div className="do-page">
            <div className="laixe-doWr">
              <h2 className="mt10 mt20 textCenter">Lệnh điều động xe</h2>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Mã DO: </span><b style={{color: 'red'}}>{'DO' + (this.state.data._id + 10000)}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}>Ngày: </span><b>{moment(this.state.data.time).format('DD/MM/YYYY')}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Khách hàng : </span><b>{this.state.data.khachhang}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Điểm xuất phát : </span><b>{this.state.data.diemxuatphat}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Điểm trả hàng : </span><b>{this.state.data.diemtrahang}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Người yêu cầu : </span><b>{this.state.data.nguoiyeucau}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Trọng tải : </span><b>{this.state.data.trongtai} tấn</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Số điểm trả hàng : </span><b>{this.state.data.sodiem}</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Quãng đường : </span><b>{this.state.data.sokm} KM</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Số tiền thu : </span><b>{this.state.data.tienthu.toLocaleString() } đ</b>
              </div>
              <div>
                <span style={{width: 280, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Trạng thái : </span>
                <b>
                  {!this.state.data.trangthai.daduyet ? ("Đang xử lý") : (this.state.data.trangthai.duyet ? ("Đồng ý") : ("Hủy"))}
                </b>
              </div>
            </div>
          </div>
        )
      }
      return (
        <div className="do-page">
          <div className="laixe-doWr">
            <h2 style={{textAlign: 'center'}}>Lệnh điều động xe ô tô</h2>

            <div>
              <span style={{width: 150, display: 'inline-block', fontWeight: 'bold', color: '#999'}}> Mã DO: </span><b>{'DO' + (this.state.data._id + 10000)}</b>
            </div>

            <Row>
              <Col span={12}>
                <b style={{fontSize: '0.6rem'}}>Khách hàng:</b>
                <CompleteInput
                  defaultValue={this.state.data.khachhang}
                  option={this.state.khachhang}
                  onChange={(value) => {
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          khachhang: value
                        }
                      }
                    })
                  }}
                />

              </Col>
              <Col span={12}>
                <b style={{fontSize: '0.6rem'}}>Người yêu cầu: </b>
                <CompleteInput
                  defaultValue={this.state.data.nguoiyeucau}
                  option={this.state.nguoiyeucau}
                  onChange={(value) => {
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          nguoiyeucau: value
                        }
                      }
                    })
                  }}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <b style={{fontSize: '0.6rem'}}>Điểm xuất phát: </b>
              <br/>
              <CompleteInputPlace
                isSmall={true}
                value={this.state.data.diemxuatphat}
                option={this.state.diemxuatphat}
                onChange={(value) => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        diemxuatphat: value
                      }
                    }
                  })
                }}
                selectOption={(value) => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        tinhxuatphat: codeByValue(value, this.state.diemxuatphat)
                      }
                    }
                  })
                }}
              />
              <CustomSelect
                value={this.state.data.tinhxuatphat}
                handleChange={value => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        tinhxuatphat: value
                      }
                    }
                  })
                }}
                selectOption={(value) => {
                  let tmp = codeByValue(this.state.data.diemxuatphat, this.state.diemxuatphat)
                  if(tmp !== undefined && tmp !== value){
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          diemxuatphat: ''
                        }
                      }
                    })
                  }
                }}
              />
            </Row>
            <Row style={{marginTop: 10}}>
              <b style={{fontSize: '0.6rem'}}>Điểm trả hàng: </b>
              <br/>
              <CompleteInputPlace
                isSmall={true}
                value={this.state.data.diemtrahang}
                option={this.state.diemtrahang}
                onChange={(value) => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        diemtrahang: value
                      }
                    }
                  })
                }}
                selectOption={(value) => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        tinhtrahang: codeByValue(value, this.state.diemtrahang)
                      }
                    }
                  })
        
                }
                }
              />
              <CustomSelect
                value={this.state.data.tinhtrahang}
                handleChange={value => {
                  this.setState(prev => {
                    return {
                      ...prev,
                      data: {
                        ...prev.data,
                        tinhtrahang: value
                      }
                    }
                  })
                }}
                selectOption={(value) => {
                  let tmp = codeByValue(this.state.data.diemtrahang, this.state.diemtrahang)
                  if(tmp !== undefined && tmp !== value){
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          diemtrahang: ''
                        }
                      }
                    })
                  }
                }}
              />
            </Row>
            <Row style={{marginTop: 10}}>
    
              <Col span={12}>
                <b style={{fontSize: '0.6rem'}}>Trọng tải (tấn): </b>
                <InputNumber style={{width: '100%'}} size="large"
                             value={this.state.data.trongtai}
                             min={1} max={100}
                             onChange={(value) => {
                               if(!isNaN(parseFloat(value)) || value === '') {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       trongtai: value
                                     }
                                   }
                                 })
                               } else {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       trongtai: 1
                                     }
                                   }
                                 })
                               }
                             }}
                />
              </Col>
    
              <Col span={12}>
                <b style={{fontSize: '0.6rem'}}> Số điểm trả hàng: </b>
                <InputNumber style={{width: '100%'}} size="large"
                             value={this.state.data.sodiem}
                             min={1} max={100}
                             onChange={(value) => {
                               if(!isNaN(parseInt(value)) || value === '') {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       sodiem: value
                                     }
                                   }
                                 })
                               } else {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       sodiem: 1
                                     }
                                   }
                                 })
                               }
                             }}
                />
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col span={12}>
                <b style={{fontSize: '0.6rem'}}>Quãng đường(km):</b>
                <InputNumber style={{width: '100%'}} size="large" min={1} max={1000}
                             value={this.state.data.sokm}
                             onChange={(value) => {
                               if(!isNaN(parseFloat(value))) {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       sokm: value
                                     }
                                   }
                                 })
                               } else {
                                 this.setState(prev => {
                                   return {
                                     ...prev,
                                     data: {
                                       ...prev.data,
                                       sokm: 1
                                     }
                                   }
                                 })
                               }
                             }}
                />
              </Col>
              <Col span={12}>
                <b style={{fontSize: '0.6rem'}}> Tiền thu hộ: </b>
                <InputNumber
                  defaultValue={this.state.data.tienthu}
                  min={0}
                  formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  parser={value => value.replace(/(,*)/g, '')}
                  style={{width: '100%'}}
                  onChange={(value) => {
                    if(parseInt(value).isNaN){
                      value = 0;
                    }
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          tienthu: value
                        }
                      }
                    })
                  }}
                />
              </Col>
            </Row>
  
            {/*<Row style={{marginTop: 10}}>*/}
              {/*<div style={{display: this.state.doixe ? 'block': 'none'}}>*/}
                {/*<Row>*/}
                  {/*<Col span={12}>*/}
                    {/*Biển kiếm soát:*/}
                    {/*<Input*/}
                      {/*defaultValue={this.state.data.xe.bks}*/}
                      {/*onChange={(e) => {*/}
                        {/*let value = e.target.value*/}
                        {/*this.setState(prev => {*/}
                          {/*return {*/}
                            {/*...prev,*/}
                            {/*data: {*/}
                              {/*...prev.data,*/}
                              {/*xe: {*/}
                                {/*...prev.data.xe,*/}
                                {/*bks: value*/}
                              {/*}*/}
                            {/*}*/}
                          {/*}*/}
                        {/*})*/}
                      {/*}}*/}
                    {/*/>*/}
                  {/*</Col>*/}
            
                  {/*<Col span={12}>*/}
                    {/*Trọng tải:*/}
                    {/*<InputNumber style={{width: '100%'}} size="large"*/}
                                 {/*defaultValue={this.state.data.xe.trongtai}*/}
                                 {/*min={1} max={100}*/}
                                 {/*onChange={(value) => {*/}
                                   {/*if(!isNaN(parseFloat(value)) || value === '') {*/}
                                     {/*this.setState(prev => {*/}
                                       {/*return {*/}
                                         {/*...prev,*/}
                                         {/*data: {*/}
                                           {/*...prev.data,*/}
                                           {/*xe: {*/}
                                             {/*...prev.data.xe,*/}
                                             {/*trongtai: value*/}
                                           {/*}*/}
                                         {/*}*/}
                                       {/*}*/}
                                     {/*})*/}
                                   {/*} else {*/}
                                     {/*this.setState(prev => {*/}
                                       {/*return {*/}
                                         {/*...prev,*/}
                                         {/*data: {*/}
                                           {/*...prev.data,*/}
                                           {/*xe: {*/}
                                             {/*...prev.data.xe,*/}
                                             {/*trongtai: 1*/}
                                           {/*}*/}
                                         {/*}*/}
                                       {/*}*/}
                                     {/*})*/}
                                   {/*}*/}
                                 {/*}}*/}
                    {/*/>*/}
                  {/*</Col>*/}
                {/*</Row>*/}
              {/*</div>*/}
            {/*</Row>*/}
  
            <Row style={{marginTop: 10}}>
              <b style={{fontSize: '0.6rem'}}> Tiền phát sinh: </b>
              <Switch  defaultChecked={this.state.phatsinh} onChange={(value) => {
              this.setState(prev => { return {
                ...prev,
                phatsinh: value
              }})}
            } />
              <div style={{display: this.state.phatsinh ? 'block': 'none'}}>
                <InputNumber
                  defaultValue={this.state.data.tienphatsinh}
                  min={0}
                  formatter={value => `${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                  parser={value => value.replace(/(,*)/g, '')}
                  style={{width: '100%'}}
                  onChange={(value) => {
                    if(parseInt(value).isNaN){
                      value = 0;
                    }
                    this.setState(prev => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          tienphatsinh: value
                        }
                      }
                    })
                  }}
                />
                <Col style={{marginTop: 10}}>
                  <b style={{fontSize: '0.6rem'}}>Lý do: </b>
                  <Input type="textarea" rows={2}
                         defaultValue={this.state.data.lydo}
                         style={{width: '100%', minHeight: 120}}
                         onChange={(e) => {
                           let value = e.target.value
                           this.setState(prev => {
                             return {
                               ...prev,
                               data: {
                                 ...prev.data,
                                 lydo: value
                               }
                             }
                           })
                         }}
                  />
                </Col>
              </div>
            </Row>
            
            <Row style={{marginTop: 10, marginBottom: 40}}>
              <Button type="primary"
                      style={{width: 250, height: 60, fontSize: 40}}
                      onClick={() => {
                        if(check(gThis.state.data)){
                          agent.DieuHanh.capnhapDO(gThis.state.data)
                            .then(res => {
                              message.success("Cập nhập thành công")
                            })
                            .catch(err => {
                              message.error("Cập nhập thất bại")
                            })
                        }
                       
                      }}
              >Cập nhập</Button>
              <div className="updateButton">
                <Link to="/dieuhanh/danhsachdo">
                  <Button type="primary"
                          style={{width: 200, height: 60, fontSize: 30}}
                  >Quay lại</Button>
                </Link>
              </div>
            </Row>
          </div>
        </div>
      )
    }
  }

}

DOPage.contextTypes = {
  router: PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(DOPage);

function valueByField(fieldName, list){
  for(let i= 0; i < list.length; i++){
    if(list[i]._id === fieldName){
      return list[i].list
    }
  }
  return []
}

function codeByValue(value, list){
  for(let i=0; i<list.length; i++){
    if(list[i].value === value){
      return list[i].code
    }
  }
  return ''
}

function check(data){
  if(data.khachhang === undefined || data.khachhang.trim().length < 1){
    message.error("Khách hàng không được để trống")
    return false
  }
  if(data.nguoiyeucau === undefined || data.nguoiyeucau.trim().length < 1){
    message.error("Người yêu cầu không được để trống")
    return false
  }
  // if(data.xe.bks === undefined || data.xe.bks.trim().length < 1){
  //   message.error("Chưa chọn xe")
  //   return false
  // }
  if(data.diemxuatphat=== undefined || data.diemxuatphat.trim().length < 1){
    message.error("Điểm xuất phát không được để trống")
    return false
  }
  if(data.tinhxuatphat === undefined || data.tinhxuatphat.trim().length < 1){
    message.error("Tỉnh xuất phát không được để trống")
    return false
  }
  if(data.diemtrahang === undefined ||  data.diemtrahang.trim().length < 1){
    message.error("Điểm trả hàng không được để trống")
    return false
  }
  if(data.tinhtrahang === undefined || data.tinhtrahang.trim().length < 1){
    message.error("Tỉnh trả hàng không được để trống")
    return false
  }
  if(data.trongtai === undefined || data.trongtai < 1){
    message.error("Trọng tải không được để trống")
    return false
  }
  if(data.sodiem === undefined || data.sodiem < 1){
    message.error("Số điểm trả hàng không được để trống")
    return false
  }
  if(data.sokm === undefined || data.sokm < 1){
    message.error("Số KM đi được không được để trống")
    return false
  }
  return true
}