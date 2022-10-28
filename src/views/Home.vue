<template>
    <el-row>
        <el-col :span="8" style="padding-right:10px">
            <el-card class="box-card">
                <div class="user">
                    <img src="../assets/images/IMG_3817.jpg">
                    <div class="userinfo">
                        <p class="name">Ching Long</p>
                        <p class="access">超級管理員</p>
                    </div>
                </div>
                <div class="login_info">
                    <p>上次登入時間: <span>2022-10-18</span></p>
                    <p>上次登入地點: <span>台北市</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px; height:460px;">
                <el-table
                :data="tableData"
                style="width: 100%">
                    <!-- <el-table-column
                        prop="name"
                        label="課程">
                    </el-table-column>
                    <el-table-column
                        prop="todayBuy"
                        label="今日購買">
                    </el-table-column>
                    <el-table-column
                        prop="monthBuy"
                        label="當月購買">
                    </el-table-column>
                    <el-table-column
                        prop="totalBuy"
                        label="總購買">
                    </el-table-column> -->
                    <el-table-column v-for="(val,key) in tableLabel" :prop="key" :label="val" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="padding-left:10px">
            <div class="num">
                <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="price">￥{{item.value}}</p>
                        <p class="desc">{{item.name}}</p>
                    </div>
                </el-card>
            </div>
            <el-card style="height:280px">
                <!-- 折線圖 -->
                <div ref="echarts1" style="height:280px"> 
                    <!-- 這個方式可以在下方透過this.$ref來獲取當前的Dom節點，這是vue提供的一個方式 -->
                </div>
            </el-card>
            <div class="graph">
                <el-card style="height:260px">
                    <div ref="echarts2" style="height:260px"></div>
                </el-card>
                <el-card style="height:260px">
                    <div ref="echarts3" style="height:240px"></div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import {getData} from '../api'
import * as echarts from 'echarts'
export default {
    data(){
        return {
            tableData:[
                // {
                //     name:'oppo',
                //     todayBuy:500,
                //     monthBuy:3500,
                //     totalBuy:22000
                // },
                // {
                //     name:'vivo',
                //     todayBuy:300,
                //     monthBuy:2200,
                //     totalBuy:24000
                // },
                // {
                //     name:'apple',
                //     todayBuy:800,
                //     monthBuy:4500,
                //     totalBuy:65000
                // },
                // {
                //     name:'xiaomi',
                //     todayBuy:1200,
                //     monthBuy:6500,
                //     totalBuy:45000
                // },
                // {
                //     name:'samsung',
                //     todayBuy:300,
                //     monthBuy:2000,
                //     totalBuy:34000
                // },
                // {
                //     name:'meizu',
                //     todayBuy:350,
                //     monthBuy:3000,
                //     totalBuy:22000
                // }
            ],
            tableLabel:{
                name:'課程',
                todayBuy:'今日購買',
                monthBuy:'當月購買',
                totalBuy:'總購買'
            },
            countData:[
                {
                    name:'今日支付訂單',
                    value:1234,
                    icon:'success',
                    color:'#2ec7c9'
                },
                {
                    name:'今日收藏訂單',
                    value:210,
                    icon:'star-on',
                    color:'#ffb980'
                },
                {
                    name:'今日未支付訂單',
                    value:1234,
                    icon:'s-goods',
                    color:'#5ab1ef'
                },
                {
                    name:'今月支付訂單',
                    value:2345,
                    icon:'success',
                    color:'#2ec7c9'
                },
                {
                    name:'今月收藏訂單',
                    value:320,
                    icon:'star-on',
                    color:'#ffb980'
                },
                {
                    name:'今月未支付訂單',
                    value:2345,
                    icon:'s-goods',
                    color:'#5ab1ef'
                },
            ]
        }
    },
    mounted(){
        getData().then(({data})=>{
            const {tableData} = data.data
            console.log(data.data)
            this.tableData = tableData

            //基於準備好的Dom，初始化echarts實例
            const echarts1 =  echarts.init(this.$refs.echarts1)  
            //調用echarts.init的方法，裡面傳入當前的Dom節點this.this.$refs.echarts1，然後得到一個echarts1的實例(給它放到一個常數裡面 echarts1 )

            //指定圖表的配置項與數據
            var echarts1Option = {}

            //處理xAxis數據
            const {orderData,userData,videoData} = data.data
            const xAxis = Object.keys(orderData.data[0])
             //Object.keys這個方法，裡面傳入一個對象orderData.data[0]它會返回xAxis這個對象的列舉
             // console.log(xAxis)
             const xAxisData = {
                data: xAxis
             }
            echarts1Option.xAxis = xAxisData
            echarts1Option.yAxis = {}
            echarts1Option.legend = xAxisData
            echarts1Option.series = []
            xAxis.forEach(key=>{
                echarts1Option.series.push({
                    name:key,
                    data:orderData.data.map(item =>item[key]),
                    type:'line'
                })
            })
            console.log(echarts1Option);
            //使用剛指定的配置項和數據顯示圖表
            echarts1.setOption(echarts1Option)

            //柱狀圖-
             const echarts2 = echarts.init(this.$refs.echarts2)  
             const echarts2Option = {
                legend:{
                    //圖例文字顏色
                    textStyle:{
                        color:'#333'
                    }
                },
                grid:{
                    left:'20%'
                },
                //圖示框
                tooltip:{
                    trigger:'axis',
                },
                xAxis:{
                    type:'category', 
                    data:userData.map(item =>item.data),
                    axisLine:{
                        lineStyle:{
                            color:'#17b3a3',
                        }
                    },
                    axisLine:{
                        interval:0,
                        color:'#333'
                    }
                },
                yAxis:[
                    {
                        type:'value', 
                        axisLine:{
                            lineStyle:{
                                color:'#17b3a3',
                            }
                        }
                    }
                ],
                color:['#2ec7c9','#b6a2de'],
                series:[
                    {
                        name:'新增用戶',
                        data:userData.map(item =>item.new),
                        type:'bar'
                    },
                    {
                        name:'活躍用戶',
                        data:userData.map(item =>item.active),
                        type:'bar'
                    }
                ]
             }
             echarts2.setOption(echarts2Option)

             //餅狀圖
             const echarts3 =  echarts.init(this.$refs.echarts3) 
             const echarts3Option = {
                tooltip:{
                    trigger:'item',
                },
                color:[
                    '#0f78f4',
                    '#dd536b',
                    '#9462e5',
                    '#a6a6a6',
                    '#e1bb22',
                    '#39c362',
                    '#3ed1cf'
                ],
                series:[
                    {
                        data:videoData,
                        type:'pie'
                    }
                ]
             }
             echarts3.setOption(echarts3Option)
        })
    }
}
</script>

<style lang="less" scoped>
.user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img{
        margin-right: 40px;
        width: 130px;
        height: 130px;
        border-radius: 50%;
    }
    .userinfo{
        .name{
            font-size: 24px;
            margin-bottom: 10px;
        }
        .access{
            color: #999999;
        }
    }
}
.login_info{
    p{
        line-height: 28px;
        font-size: 14px;
        color: #999999;
        span{
            color: #666666;
            margin-left: 30px;
        }
    }
}
.num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .icon{
        width: 90px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: #fff;
    }
    .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            height: 30px;
        }
        .desc{
            font-size: 14px;
            color: #999;
            text-align: center;
        }
    }
    .el-card{
        width: 32%;
        margin-bottom: 20px;
    }
}
.graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
        width: 48%;
    }
}
</style>