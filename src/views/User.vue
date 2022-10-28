<template>
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">

            <!-- 用戶的表單訊息 -->
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="請輸入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年齡" prop="age">
                    <el-input placeholder="請輸入年齡" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性別" prop="sex">
                    <el-select v-model="form.sex" placeholder="請選擇">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="選擇日期" value-format="yyyy-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="請輸入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">確 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">+ 新增</el-button>
            <!-- form的搜索區域 -->
            <el-form :inline="true" :model="userForm">
                <el-form-item>
                    <el-input placeholder="請輸入名稱" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查詢</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-tabel">
            <el-table stripe height="90%" :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性別">
                <template slot-scope="scope"> 
                <!-- 這裡的slot-scope="scope" 叫做作用域插槽，其作用就是可以在父組件中獲取到子組件的數據-->
                    <span style="margin-left: 10px">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年齡"></el-table-column>
            <el-table-column prop="birth" label="出生日期"></el-table-column>
            <el-table-column prop="addr" label="地址"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">編輯</el-button>
                    <!-- 當我們在點擊編輯的時候(觸發handleEdit時)，我們要把當前行的數據添加進來，所以()裡電的參數要抓到當前行的數據 scope.row -->
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">刪除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {getUser,addUser,editUser,delUser} from '../api'
export default {
    data(){
        return {
            dialogVisible: false,
            form:{
                name:'',
                age:'',
                sex:'',
                birth:'',
                addr:''
            },
            rules:{ //表單驗證
                name:[
                    { required:true,massage:'請輸入姓名'}  //這裡的required:true表示必填
                ],
                age:[
                    { required:true}
                ],
                sex:[
                    { required:true}
                ],
                birth:[
                    { required:true,massage:'請輸入出生日期'} 
                ],
                addr:[
                    { required:true,massage:'請輸入地址'} 
                ]
            //定義完rules後到template裡面的form表單上綁定rules屬性，然後每一個對應的欄位上面添加prop屬性並輸入相對應的內容即可
            },
            tableData:[],
            modelType:0, // 0表示新增的視窗，1表示編輯
            total:0,     //當前的總條數
            pageData:{   //定義分頁參數
                page:1,
                limit:10
            },
            userForm:{
                name:''
            }
        }
    },
    methods:{
        //提交用戶表單
        submit(){
            this.$refs.form.validate((valid) => { //因為表單上有添加ref="form"，所以可以透過 this.$refs.form 獲取當前表單的實例，然後透過validate方法傳入一個回調函數
                // console.log(valid,'valid')
                if(valid){ //後續表單數據的處理
                    // console.log(this.form,'form')
                    if(this.modelType === 0 ){
                        addUser(this.form).then(() => {  //調用新增的接口，然後通過form數據進行更新，然後再重新調用列表的接口
                            // 重新獲取列表的接口
                            this.getList()
                        })
                    }else{
                        editUser(this.form).then(() => {  //調用編輯的接口，然後通過form數據進行更新，然後再重新調用列表的接口
                            // 重新獲取列表的接口
                            this.getList()
                        })
                    }
                    //清空表單的數據
                    this.$refs.form.resetFields()
                    //關閉視窗
                    this.dialogVisible = false
                }
            })
        },
        //談窗關閉時觸發
        handleClose(){
            // console.log(this.$refs.form)
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        cancel(){ 
            this.handleClose()  //我們在點擊取消的時候調用handleClose這個方法
        },
        handleEdit(row){
            this.modelType = 1
            this.dialogVisible = true
            //需要對當前行數據進行深拷貝，否則會出錯
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row){
            this.$confirm('此操作將永久删除該文件, 是否繼續?', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    delUser({id:row.id}).then(() =>{
                        this.$message({
                            type: 'success',
                            message: '刪除成功!'
                        })
                        this.getList()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消刪除'
                    })       
            })
        },
        handleAdd(row){
            this.modelType = 0
            this.dialogVisible = true
        },
        getList(){ //獲取列表數據
            getUser({params:{...this.userForm,...this.pageData}}).then(({data}) => {
                console.log(data)
                this.tableData = data.list
                this.total = data.count || 0
            })
        },
        handlePage(val){ //選擇頁碼的回調函數
            // console.log(val,'val')
            this.pageData.page = val
            this.getList()
        },
        //列表的查詢
        onSubmit(){
            this.getList()
        }
    },
    mounted(){
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.manage{
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-tabel{
        position: relative;
        height: calc(100% - 62px);
        .pager{
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>