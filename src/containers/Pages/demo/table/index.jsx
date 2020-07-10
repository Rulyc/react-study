import React, { Component } from "react";
import axios from 'axios'; // 引入axios
import { Table,Button,Dialog,MessageBox, Message, Pagination, Form, Input, Layout} from 'element-react';
import './table.scss' // 引入样式文件
import AddInfo from './addInfo'
export default class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 表头
      columns: [
        {
          label: "日期",
          prop: "date",
          width: 180
        },
        {
          label: "姓名",
          prop: "name",
          width: 180
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],

      columns_student_info: [
        { label: "姓名", prop: "name",align:'center' },
        { label: "年龄", prop: "age",align:'center' },
        { label: "地址", prop: "address",align:'center' },
        { label: "操作", width:100, render: (row, column, index)=>{
            return <span>
                      {/*<Button type="text" size="small" onClick={ this. }>查看</Button>*/}
                      <Button type="text" size="small" onClick={ this.updateClick.bind(this,row,index) }>编辑</Button>
                      <Button type="text" size="small" onClick={ this.deleteClick.bind(this,row,index) }>删除</Button>
                    </span>
          }
        }
      ],
      students_list:[],
      dialogVisible: false ,// 弹窗是否打开
      title: '新增弹窗', // 新增弹窗,
      formObj: {},
      page: {
        pageSize: 5,
        pageCurrent: 1,
        total: 0,
      },
      form:{
        name: ''
      }
    }
  }
  /** 查询接口 */
  getData = () => {
    // axios.get('http://localhost:3000/demo')
    //   .then((response) => {
    //     this.setState({
    //       list: response.data
    //     })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    axios({
      url:  'http://localhost:3000/demo',
      method: 'post',
      data:{
        pageSize: this.state.page.pageSize,
        pageCurrent: this.state.page. pageCurrent,
        name: this.state.form.name
      }
    })
      .then((response) => {
        console.log(response,'gggggggggggg')
        const page = Object.assign( this.state.page, { total: response.data.total })
        this.setState({
          list: response.data.list,
          page: page
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /** 会在组件已经渲染到Dom中后运行 */
  componentDidMount(){
    this.getData()
  }
  /** 组件卸载方法 */
  componentWillUnmount(){

  }

  /** 新增按钮事件 */
  clicked = ()=> {
    this.setState({ dialogVisible: true,title: '新增信息' })
  }
  /** 编辑按钮事件 */
  updateClick=(row)=>{
    console.log(row)
    if(row.id){
      this.setState({
        title: '修改信息',
        dialogVisible: true
      })
    }
    this.setState({
      formObj: Object.assign({},row)
    })
  }
  /** 弹窗确定按钮事件 */
  submitClick=(val)=>{
    console.log(val,'ggg')
    // axios.post('http://localhost:3000/demo_add')
      axios({
        url: val.id? 'http://localhost:3000/demo_update': 'http://localhost:3000/demo_add',
        method: 'post',
        data:{
          val
        }
      })
      .then((response) => {
        console.log(response)
        Message({
          type: 'success',
          message: response.data
        });
        this.setState({ dialogVisible: false })
        this.getData()
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  /** 弹窗取消按钮事件 */
  resetClick=()=>{
    this.setState({ dialogVisible: false })
  }
  /** 删除按钮方法 */
  deleteClick=(row,index)=>{
    MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      type: 'warning'
    }).then(() => {
      axios({
        url:'http://localhost:3000/demo_del',
        method: 'delete',
        data:{
          id: row.id
        }
      })
        .then((response) => {
          Message({
            type: 'success',
            message: '删除成功!'
          });
          this.getData()
        })
        .catch(function (error) {
          console.log(error);
        });

    }).catch(() => {
      Message({
        type: 'info',
        message: '已取消删除'
      });
    });

  }
  /** 改变页大小方法 */
  onSizeChange=(size)=>{
    const page = Object.assign(this.state.page, { pageSize: size })
    this.setState({
      page: page
    })
    this.getData()
  }
  /** 改变当前是第几页 */
  onCurrentChange=(current)=>{
    const page = Object.assign( this.state.page, { pageCurrent: current })
    this.setState({
      page: page
    })
    this.getData()
  }
  onChange(key, value) {
    this.setState({
      form: Object.assign(this.state.form, { [key]: value })
    });
  }
  render() {
    return (
      <div className="table-demo">
        <h2>假数据模拟使用elementUItable</h2>
        <Table
          style={{width: '100%'}}
          border
          columns={this.state.columns}
          maxHeight={150}
          data={this.state.data}
        />
        <h2 >调用node编写接口数据</h2>
        <div className="flex">
          <div className="flex" style={{ width: "80%" }}>
            <Form >
              <Layout.Row gutter="20">
                <Layout.Col span="16">
                  <Form.Item label="学生姓名" labelWidth="80">
                    <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span="8">
                  <Button style={{ height:"35px" }} type="primary"  onClick={this.getData}>查询</Button>
                </Layout.Col>
              </Layout.Row>
            </Form>

          </div>
          <Button style={{ height:"35px" }} type="primary"  onClick={this.clicked}>新增</Button>
        </div>

        <Table
          style={{ width:'100%' }}
          height={200}
          border
          columns={ this.state.columns_student_info }
          data={ this.state.list }
        />
        <Pagination layout="total, sizes, prev, pager, next, jumper"
                    total={this.state.page.total}
                    pageSizes={[5,10,20]}
                    pageSize={ this.state.page.pageSize}
                    currentPage={this.state.page.pageCurrent}
                    onSizeChange={this.onSizeChange}
                    onCurrentChange={this.onCurrentChange}
        />
        <AddInfo
          title={ this.state.title }
          formObj={ this.state.formObj }
          dialogVisible={this.state.dialogVisible}
          toSubmit={ this.submitClick }
          toReset={ this.resetClick }/>
      </div>
    )
  }
}
