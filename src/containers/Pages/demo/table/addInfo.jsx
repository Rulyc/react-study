import React, { Component } from "react";
import {Dialog, Form, Input, Button} from 'element-react';
import './table.scss' // 引入样式文件

class addInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name:'',
        age: '',
        address:'',
        id: ''
      },
      // dialogVisible: this.props.dialogVisible,
      // 校验规则
      rules: {
        name: [
          { required: true, message:"请输入学生姓名", trigger: 'blur'}
        ],
        age: [
          { required: false, message: "请输入学生年龄", trigger: 'blur' }
        ],
        address: [
          { required: true, message: "请输入所有城市", trigger: 'blur' }
        ]
      }
    }
  }
  //监听组件传递的值：
  componentWillReceiveProps(newProps)
  {
    if(newProps.formObj.id){
      this.setState({
        form: newProps.formObj
      })
    }
  }
  handleSubmit=(e)=> {
    e.preventDefault();
    this.refs.form.validate((valid) => {
      if (valid) {
        alert('submit!');
        this.props.toSubmit(this.state.form)
        setTimeout(()=>{
          this.refs.form.resetFields();
        },1000)

      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }

  handleReset=(e) =>{
    e.preventDefault();
    // this.props.toSubmit.bind(this, this.state.form)
    // this.setState({ dialogVisible: false })

    this.refs.form.resetFields();
    this.props.toReset()
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign({}, this.state.form, { [key]: value })
    });
  }

  render() {
    return (
    <Dialog
      title={ this.props.title }
      size="tiny"
      visible={ this.props.dialogVisible }
      onCancel={ this.handleReset }
      lockScroll={ false }
      style={{ padding: "20px" }}
    >
      <Form ref="form" model={ this.state.form } rules={ this.state.rules } labelWidth="80">
        <Form.Item label="学生姓名" prop="name">
          <Input value={ this.state.form.name } onChange={this.onChange.bind(this, 'name')}/>
        </Form.Item>
        <Form.Item label="学生年龄" >
          <Input value={ this.state.form.age } onChange={this.onChange.bind(this, 'age')}/>
        </Form.Item>
        <Form.Item label="所在城市" prop="address">
          <Input value={ this.state.form.address } onChange={this.onChange.bind(this, 'address')}/>
        </Form.Item>
        <div className="dialog-footer">
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
          <Button onClick={this.handleReset.bind(this)}>取消</Button>
        </div>
      </Form>

    </Dialog>
    )


  }
}

export default addInfo;
