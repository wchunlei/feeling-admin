webpackJsonp([55],{1006:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=(a(105),a(843)),n=a.n(i),o=(a(831),a(284),a(862),a(880)),r=[{key:"CN",display_name:"中国"},{key:"US",display_name:"美国"},{key:"JP",display_name:"日本"},{key:"EU",display_name:"欧元区"}];r.reduce(function(e,t){return e[t.key]=t.display_name,e},{});t.default={components:{Upload:n.a},name:"table_demo",data:function(){return{pickerOptions2:{shortcuts:[{text:"今天",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-864e5),e.$emit("pick",[a,t])}},{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}}]},value4:"",timeData:[],rechnum:[],usernum:[],arpu:[],allMoney:0,allArpu:0,alluser:0,time:"2",beginTime:"",endTime:"",timeRange:{start:"",end:"",day:[]},timeOptions:[{value:"1",label:"按小时"},{value:"2",label:"按日"},{value:"3",label:"按周"},{value:"4",label:"按月"}],dateString:"",data:{alluser:"",yesterdayuser:"",todayuser:"",allpay:"",yesterdaypay:"",todaypay:""},isColor:!0,userLIstOptions:[],actorOptions:[],scriptData:[],disable:!0,roomsort:"0",list:[],privateOptions:[{value:"0",label:"默认"},{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7",label:"7"}],total:null,listLoading:!1,listQuery:{page:1,limit:10,importance:void 0,title:void 0,name:void 0,gender:void 0,status:void 0,priceType:void 0},Query:{limit:1e5},temp:{id:void 0,importance:0,remark:"",timestamp:0,title:"",type:"",status:"published"},importanceOptions:[1,2,3],calendarTypeOptions:r,sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],nameOptions:[{value:"1",label:"佳佳"},{value:"2",label:"娜美"}],sexOptions:[{value:"1",label:"男"},{value:"2",label:"女"}],statusOptions:[{value:"0",label:"上架"},{value:"1",label:"下架"},{value:"",label:"全部"}],priceTypeOptions:[{value:"0",label:"付费"},{value:"1",label:"免费"},{value:"",label:"全部"}],dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},dialogPvVisible:!1,dialogDel:!1,flag:!1,pvData:[],showAuditor:!1,tableKey:0}},created:function(){},mounted:function(){console.log(),this.drawLine()},watch:{value4:function(e,t){if(e[0]&&(this.timeTool(e[0]),this.timeRange.start=this.dateString),e[1]&&(this.timeTool(e[1]),this.timeRange.end=this.dateString),console.log(this.timeRange.start,this.timeRange.end),this.beginTime=this.timeRange.start,this.endTime=this.timeRange.end,"00:00:00"==this.endTime.split(" ")[1]&&(this.endTime=this.endTime.split(" ")[0]+" 23:59:59"),this.getList(),this.timeRange.start<this.timeRange.end)for(var a=parseInt((e[1].getTime()-e[0].getTime())/864e5),i=0;i<a+1;i++)this.timeRange.day[i]=this.timeTool(new Date(e[0].getTime()+864e5*i))}},methods:{timeTool:function(e){var t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate(),n=e.getHours(),o=e.getMinutes(),r=e.getSeconds();return this.dateString=t+"-"+(a>=10?+a:"0"+a)+"-"+(i>=10?i:"0"+i)+" "+(n>=10?+n:"0"+n)+":"+(o>=10?+o:"0"+o)+":"+(r>=10?+r:"0"+r)},drawLine:function(){var e=this.$echarts.init(document.getElementById("myChart")),t=this.timeRange.day;console.log(t);e.setOption({title:{text:"充值趋势",subtext:"充值趋势？",padding:[5,150]},tooltip:{trigger:"axis"},legend:{data:["总充值("+this.allMoney+"元)","充值用户数"+this.alluser,"ARPU值"+this.allArpu]},toolbox:{show:!0,feature:{dataZoom:{yAxisIndex:"none"},dataView:{readOnly:!1},magicType:{type:["line","bar"]},restore:{},saveAsImage:{}}},xAxis:{type:"category",boundaryGap:!1,data:this.timeData},yAxis:{type:"value",axisLabel:{formatter:"{value} "}},series:[{name:"充值用户数"+this.alluser,type:"line",data:this.usernum},{name:"总充值("+this.allMoney+"元)",type:"line",data:this.rechnum},{name:"ARPU值"+this.allArpu,type:"line",data:this.arpu}]})},changeTime:function(e){this.value4?this.getList():console.log("请选择日期")},getList:function(){var e=this;this.listLoading=!0;var t={begintime:this.beginTime,endtime:this.endTime,type:this.time};a.i(o.e)(t).then(function(t){console.log(t),e.list=t.data.content;for(var a=0;a<t.data.content.length;a++)e.list[a].id=a+1;e.timeData&&(e.timeData=[]),e.rechnum&&(e.rechnum=[]),e.arpu&&(e.arpu=[]),e.usernum&&(e.usernum=[]),e.allMoney&&(e.allMoney=0),e.allArpu&&(e.allArpu=0),e.alluser&&(e.alluser=0),t.data.content&&t.data.content.map(function(t){e.timeData.push(t.time.split(":")[0]),e.rechnum.push(t.rechnum),e.arpu.push(t.arpu),e.usernum.push(t.usernum),e.allMoney+=parseFloat(t.rechnum),e.allArpu+=parseFloat(t.arpu),e.alluser+=parseInt(t.usernum)}),e.allMoney=Math.round(100*e.allMoney)/100,e.allArpu=Math.round(100*e.allArpu)/100,console.log("this.allArpu",e.allArpu),console.log("this.allMoney",e.allMoney),console.log("this.alluser",e.alluser),console.log("this.timeData",e.timeData),console.log("this.rechnum",e.rechnum),console.log("this.arpu",e.arpu),console.log("this.usernum",e.usernum),e.drawLine(),e.listLoading=!1}),this.listLoading=!1}}}},1099:function(e,t,a){t=e.exports=a(729)(!0),t.push([e.i,".activeColor{background:#13ce66}.pagination-container{position:fixed;top:90%}","",{version:3,sources:["C:/Users/admin/feeling_admin2/src/views/data/pay/charge.vue"],names:[],mappings:"AACA,aACI,kBAAoB,CACvB,AACD,sBACI,eAAgB,AAChB,OAAS,CACZ",file:"charge.vue",sourcesContent:["\n.activeColor {\n    background: #13ce66;\n}\n.pagination-container {\n    position: fixed;\n    top: 90%;\n}\n"],sourceRoot:""}])},1195:function(e,t,a){var i=a(1099);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(730)("341fcb3a",i,!0)},1330:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"block",staticStyle:{"margin-bottom":"30px"}},[a("span",{staticClass:"demonstration"},[e._v("请选择时间段:")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions2,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.value4,callback:function(t){e.value4=t},expression:"value4"}}),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeTime},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}},e._l(e.timeOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("div",{style:{width:"1600px",height:"800px"},attrs:{id:"myChart"}}),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"","highlight-current-row":"","max-height":"500"}},[a("el-table-column",{attrs:{label:"充值明细"}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"150","column-key":"id",prop:"id"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"时间","min-width":"200",prop:"time"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.time))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"时段总充值",width:"300",prop:"rechnum"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.rechnum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"时段充值用户总数",width:"300",prop:"usernum"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.usernum))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"ARPU值",width:"300",prop:"arpu"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.arpu))])]}}])})],1)],1)],1)},staticRenderFns:[]}},767:function(e,t,a){function i(e){a(1195)}var n=a(19)(a(1006),a(1330),i,null,null);e.exports=n.exports},830:function(e,t,a){"use strict";function i(){return a.i(n.a)({url:"/qiniu/upload/token",method:"get"})}t.a=i;var n=a(77)},831:function(e,t,a){"use strict";function i(e){var t=e;return a.i(d.a)({url:"?act=addactor",method:"post",data:t})}function n(e){var t=e;return a.i(d.a)({url:"?act=actorupdate",method:"post",data:t})}function o(e){var t=e;return a.i(d.a)({url:"?act=updateactor",method:"post",data:t})}function r(e){var t=e;return a.i(d.a)({url:"?act=actorstatus",method:"post",data:t})}function l(e){var t=e;return a.i(d.a)({url:"?act=delactor",method:"post",data:t})}function s(e){return a.i(d.a)({url:"?act=actorlist",method:"get",params:e})}function u(e){return a.i(d.a)({url:"?act=actorinfo",method:"get",params:e})}function p(e){var t=e;return a.i(d.a)({url:"?act=sortactor",method:"post",data:t})}function c(e){var t=e;return a.i(d.a)({url:"?act=upactor",method:"post",data:t})}t.g=i,t.c=n,t.h=o,t.b=r,t.d=l,t.a=s,t.i=u,t.f=p,t.e=c;var d=a(77)},843:function(e,t,a){function i(e){a(846)}var n=a(19)(a(844),a(847),i,"data-v-e08e24ea",null);e.exports=n.exports},844:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(78),n=a.n(i),o=a(830);t.default={name:"singleImageUpload",props:{value:String},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""}}},methods:{rmImage:function(){this.emitInput("")},emitInput:function(e){this.$emit("input",e)},handleImageScucess:function(e,t){this.emitInput(e.content.url),this.imageUrl=URL.createObjectURL(t.raw)},beforeUpload:function(){var e=this,t=this;return new n.a(function(i,n){a.i(o.a)().then(function(a){var n=a.data.qiniu_key,o=a.data.qiniu_token;t._data.dataObj.token=o,t._data.dataObj.key=n,e.tempUrl=a.data.qiniu_url,i(!0)}).catch(function(e){console.log(e),n(!1)})})}}}},845:function(e,t,a){t=e.exports=a(729)(!0),t.push([e.i,'.upload-container[data-v-e08e24ea]{width:100%;position:relative}.upload-container[data-v-e08e24ea]:after{content:"";display:table;clear:both}.upload-container .image-uploader[data-v-e08e24ea]{width:200px;float:left}.upload-container .image-preview[data-v-e08e24ea]{width:200px;height:200px;position:relative;border:1px dashed #d9d9d9;float:left;margin-left:50px}.upload-container .image-preview .image-preview-wrapper[data-v-e08e24ea]{position:relative;width:100%;height:100%}.upload-container .image-preview .image-preview-wrapper img[data-v-e08e24ea]{width:100%;height:100%}.upload-container .image-preview .image-preview-action[data-v-e08e24ea]{position:absolute;width:100%;height:100%;left:0;top:0;cursor:default;color:#fff;opacity:0;font-size:20px;background-color:rgba(0,0,0,.5);-webkit-transition:opacity .3s;transition:opacity .3s;cursor:pointer;text-align:center;line-height:200px}.upload-container .image-preview .image-preview-action .el-icon-delete[data-v-e08e24ea]{font-size:36px}.upload-container .image-preview:hover .image-preview-action[data-v-e08e24ea]{opacity:1}.upload-container .image-app-preview[data-v-e08e24ea]{width:320px;height:180px;position:relative;border:1px dashed #d9d9d9;float:left;margin-left:50px}.upload-container .image-app-preview .app-fake-conver[data-v-e08e24ea]{height:44px;position:absolute;width:100%;text-align:center;line-height:64px;color:#fff}',"",{version:3,sources:["C:/Users/admin/feeling_admin2/src/components/Upload/singleImage3.vue"],names:[],mappings:"AACA,mCACE,WAAY,AACZ,iBAAmB,CACpB,AACD,yCACI,WAAY,AACZ,cAAe,AACf,UAAY,CACf,AACD,mDACI,YAAa,AACb,UAAY,CACf,AACD,kDACI,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,0BAA2B,AAC3B,WAAY,AACZ,gBAAkB,CACrB,AACD,yEACM,kBAAmB,AACnB,WAAY,AACZ,WAAa,CAClB,AACD,6EACQ,WAAY,AACZ,WAAa,CACpB,AACD,wEACM,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,OAAQ,AACR,MAAO,AACP,eAAgB,AAEhB,WAAY,AACZ,UAAW,AACX,eAAgB,AAChB,gCAAqC,AACrC,+BAAgC,AAChC,uBAAwB,AACxB,eAAgB,AAChB,kBAAmB,AACnB,iBAAmB,CACxB,AACD,wFACQ,cAAgB,CACvB,AACD,8EACM,SAAW,CAChB,AACD,sDACI,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,0BAA2B,AAC3B,WAAY,AACZ,gBAAkB,CACrB,AACD,uEACM,YAAa,AACb,kBAAmB,AACnB,WAAY,AACZ,kBAAmB,AACnB,iBAAkB,AAClB,UAAY,CACjB",file:"singleImage3.vue",sourcesContent:['\n.upload-container[data-v-e08e24ea] {\n  width: 100%;\n  position: relative;\n}\n.upload-container[data-v-e08e24ea]:after {\n    content: "";\n    display: table;\n    clear: both;\n}\n.upload-container .image-uploader[data-v-e08e24ea] {\n    width: 200px;\n    float: left;\n}\n.upload-container .image-preview[data-v-e08e24ea] {\n    width: 200px;\n    height: 200px;\n    position: relative;\n    border: 1px dashed #d9d9d9;\n    float: left;\n    margin-left: 50px;\n}\n.upload-container .image-preview .image-preview-wrapper[data-v-e08e24ea] {\n      position: relative;\n      width: 100%;\n      height: 100%;\n}\n.upload-container .image-preview .image-preview-wrapper img[data-v-e08e24ea] {\n        width: 100%;\n        height: 100%;\n}\n.upload-container .image-preview .image-preview-action[data-v-e08e24ea] {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      left: 0;\n      top: 0;\n      cursor: default;\n      text-align: center;\n      color: #fff;\n      opacity: 0;\n      font-size: 20px;\n      background-color: rgba(0, 0, 0, 0.5);\n      -webkit-transition: opacity .3s;\n      transition: opacity .3s;\n      cursor: pointer;\n      text-align: center;\n      line-height: 200px;\n}\n.upload-container .image-preview .image-preview-action .el-icon-delete[data-v-e08e24ea] {\n        font-size: 36px;\n}\n.upload-container .image-preview:hover .image-preview-action[data-v-e08e24ea] {\n      opacity: 1;\n}\n.upload-container .image-app-preview[data-v-e08e24ea] {\n    width: 320px;\n    height: 180px;\n    position: relative;\n    border: 1px dashed #d9d9d9;\n    float: left;\n    margin-left: 50px;\n}\n.upload-container .image-app-preview .app-fake-conver[data-v-e08e24ea] {\n      height: 44px;\n      position: absolute;\n      width: 100%;\n      text-align: center;\n      line-height: 64px;\n      color: #fff;\n}\n'],sourceRoot:""}])},846:function(e,t,a){var i=a(845);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(730)("002ece3a",i,!0)},847:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload-container"},[a("el-upload",{staticClass:"image-uploader",attrs:{data:e.dataObj,drag:"",multiple:!1,"show-file-list":!1,action:"http://192.168.1.43:3000/system/upload","on-success":e.handleImageScucess}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),a("em",[e._v("点击上传")])])]),e._v(" "),a("div",{staticClass:"image-preview"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.imageUrl.length>1,expression:"imageUrl.length>1"}],staticClass:"image-preview-wrapper"},[a("img",{attrs:{src:e.imageUrl}})])])],1)},staticRenderFns:[]}},862:function(e,t,a){"use strict";function i(e){var t=e;return a.i(p.a)({url:"?act=addroom",method:"post",data:t})}function n(e){var t=e;return a.i(p.a)({url:"?act=updateroom",method:"post",data:t})}function o(e){return a.i(p.a)({url:"?act=roomlist",method:"get",params:e})}function r(e){var t=e;return a.i(p.a)({url:"?act=uproom",method:"post",data:t})}function l(e){var t=e;return a.i(p.a)({url:"?act=sortroom",method:"post",data:t})}function s(e){var t=e;return a.i(p.a)({url:"?act=delroom",method:"post",data:t})}function u(e){return a.i(p.a)({url:"?act=roominfo",method:"get",params:e})}t.e=i,t.f=n,t.d=o,t.b=r,t.c=l,t.a=s,t.g=u;var p=a(77)},880:function(e,t,a){"use strict";function i(e){var t=e;return a.i(s.a)({url:"?act=addreward",method:"post",data:t})}function n(e){return a.i(s.a)({url:"?act=rewardinfo",method:"get",params:e})}function o(e){return a.i(s.a)({url:"?act=feedbacklist",method:"get",params:e})}function r(e){var t=e;return a.i(s.a)({url:"?act=rechargeanaly",method:"post",data:t})}function l(e){var t=e;return a.i(s.a)({url:"?act=consumeanaly",method:"post",data:t})}t.a=i,t.b=n,t.c=o,t.e=r,t.d=l;var s=a(77)}});
//# sourceMappingURL=55.e2f73048535b17a34b35.js.map