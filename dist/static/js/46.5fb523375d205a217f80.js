webpackJsonp([46],{1026:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(852),n=a.n(i),o=a(158),r=a.n(o),s=a(105),l=a(843),c=a.n(l),u=a(831),d=a(284),p=a(880),A=[{key:"CN",display_name:"中国"},{key:"US",display_name:"美国"},{key:"JP",display_name:"日本"},{key:"EU",display_name:"欧元区"}],h=A.reduce(function(t,e){return t[e.key]=e.display_name,t},{});e.default={components:{Upload:c.a},name:"table_demo",data:function(){return{isColor:!0,userLIstOptions:[],actorOptions:[],disable:!0,sort:"0",list:[],privateOptions:[{value:"0",label:"默认"},{value:"1",label:"1"},{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"}],total:null,listLoading:!0,listQuery:{page:1,limit:10,importance:void 0,actorid:void 0,gender:void 0,status:void 0,priceType:void 0},Query:{page:1,limit:1e3,name:void 0,type:void 0,status:void 0},temp:{id:void 0,importance:0,remark:"",timestamp:0,title:"",type:"",status:"published"},importanceOptions:[1,2,3],sortOptions:[{label:"按ID升序列",key:"+id"},{label:"按ID降序",key:"-id"}],nameOptions:[],sexOptions:[{value:"1",label:"男"},{value:"2",label:"女"}],statusOptions:[{value:"0",label:"上架"},{value:"1",label:"下架"},{value:"",label:"全部"}],priceTypeOptions:[{value:"0",label:"付费"},{value:"1",label:"免费"},{value:"",label:"全部"}],dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑",create:"创建"},dialogPvVisible:!1,dialogDel:!1,flag:!1,pvData:[],showAuditor:!1,tableKey:0}},created:function(){this.getActor();this.getList()},filters:{statusFilter:function(t){return{published:"success",draft:"gray",deleted:"danger"}[t]},typeFilter:function(t){return h[t]}},methods:{getActor:function(){var t=this;a.i(u.a)(this.Query).then(function(e){for(var a=0;a<e.data.content.length;a++){var i={};i.value=e.data.content[a].id,i.label=e.data.content[a].name,t.actorOptions.push(i)}t.getList()})},getRemoteUserList:function(t){var e=this;a.i(d.a)(t).then(function(t){t.data.content&&(e.userLIstOptions=t.data.content.map(function(t){return{key:t.name,value:t.id}}))})},deleteRow:function(t,e){var i=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n={id:e.id};a.i(d.b)(n).then(function(e){200==e.data.code&&(i.list.splice(t,1),i.getList())}),i.$message({message:"操作成功",type:"success"})}).catch(function(){})},editRow:function(t,e){var i=this,n=new Date,o=n.getFullYear(),r=n.getMonth()+1,s=n.getDate(),l=n.getHours(),c=n.getMinutes(),u=o+"-"+(r>=10?+r:"0"+r)+"-"+(s>=10?s:"0"+s)+" "+(l>=10?+l:"0"+l)+":"+(c>=10?+c:"0"+c),p="";if("上架"==t.status&&(p="1"),"下架"==t.status&&(p="0"),"上架"==t.status)this.$confirm("确定下架会将和该内容相关的内容均下架？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e={id:t.id,status:p,configtime:u};a.i(d.c)(e).then(function(e){200==e.data.code&&(t.status="下架",t.configtime="未设置",i.$message({message:"操作成功",type:"success"}))})}).catch(function(){});else{var A={id:t.id,status:p,configtime:u};a.i(d.c)(A).then(function(e){"girl is xiaxian!"==e.data.msg&&i.$message({message:"该主角已下架，请先上架主角后再操作",type:"error"}),200==e.data.code&&(t.status="上架",t.configtime=u,i.$message({message:"操作成功",type:"success"}))})}this.disable=!0},handleSort:function(){this.disable=!1},changeSort:function(t){var e=this,i={id:t.id,sort:t.sort};a.i(d.d)(i).then(function(t){200==t.data.code&&(e.disable=!0,e.$message({message:"操作成功",type:"success"}))})},getList:function(){var t=this;this.listLoading=!0,console.log(decodeURI("8J+YgfCfmIHwn5iB")),a.i(p.c)(this.listQuery).then(function(e){console.log(e),t.list=e.data.content;for(var a=0;a<e.data.content.length;a++)t.list[a].ids=a+1,t.list[a].content=decodeURI(e.data.content[a].content);t.total=e.data.total,t.listLoading=!1}),this.listLoading=!1},handleFilter:function(){this.getList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},timeFilter:function(t){if(!t[0])return this.listQuery.start=void 0,void(this.listQuery.end=void 0);this.listQuery.start=parseInt(+t[0]/1e3),this.listQuery.end=parseInt((+t[1]+864e5)/1e3)},handleModifyStatusPublish:function(t,e){var i={id:t.id,status:e};a.i(u.b)(i).then(function(a){console.log(a),"published"==e&&(t.status="发布")})},handleModifyStatusDraft:function(t,e){var i={id:t.id,status:e};a.i(u.b)(i).then(function(a){console.log(a),"draft"==e&&(t.status="草稿")})},delSure:function(){this.dialogDel=!1,this.flag=!0},handleModifyStatus:function(t,e){var i={id:t.id,status:e};a.i(u.b)(i).then(function(t){console.log(t)}),t.status=e},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0},handleUpdate:function(t){this.temp=r()({},t),this.dialogStatus="update",this.dialogFormVisible=!0},handleDelete:function(t){this.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var e=this.list.indexOf(t);this.list.splice(e,1)},create:function(){this.temp.id=parseInt(100*Math.random())+1024,this.temp.timestamp=+new Date,this.temp.author="原创作者",this.list.unshift(this.temp),this.dialogFormVisible=!1,this.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})},update:function(){var t=this;this.temp.timestamp=+this.temp.timestamp;var e=!0,i=!1,o=void 0;try{for(var r,s=n()(this.list);!(e=(r=s.next()).done);e=!0){var l=r.value;if(l.id===this.temp.id){var c=this.list.indexOf(l);this.list.splice(c,1,this.temp);break}}}catch(t){i=!0,o=t}finally{try{!e&&s.return&&s.return()}finally{if(i)throw o}}this.dialogFormVisible=!1;var d;d=this.temp,a.i(u.c)(d).then(function(e){e.data.items&&(console.log(e),t.userLIstOptions=e.data.items.map(function(t){return{key:t.name}}))}),this.$notify({title:"成功",message:"更新成功",type:"success",duration:2e3})},resetTemp:function(){this.temp={id:void 0,importance:0,remark:"",timestamp:0,title:"",status:"published",type:""}},handleFetchPv:function(t){var e=this;fetchPv(t).then(function(t){e.pvData=t.data.pvData,e.dialogPvVisible=!0})},handleDownload:function(){var t=this;a.e(101).then(function(){var e=a(869),i=e.export_json_to_excel,n=["时间","地区","类型","标题","重要性"],o=["timestamp","province","type","title","importance"];i(n,t.formatJson(o,t.list),"table数据")}.bind(null,a)).catch(a.oe)},formatJson:function(t,e){return e.map(function(e){return t.map(function(t){return"timestamp"===t?a.i(s.a)(e[t]):e[t]})})}}}},1124:function(t,e,a){e=t.exports=a(729)(!0),e.push([t.i,".activeColor{background:#13ce66}.pagination-container{position:fixed;top:90%}","",{version:3,sources:["C:/Users/admin/feeling_admin2/src/views/help/feedback.vue"],names:[],mappings:"AACA,aACI,kBAAoB,CACvB,AACD,sBACI,eAAgB,AAChB,OAAS,CACZ",file:"feedback.vue",sourcesContent:["\n.activeColor {\n    background: #13ce66;\n}\n.pagination-container {\n    position: fixed;\n    top: 90%;\n}\n"],sourceRoot:""}])},1220:function(t,e,a){var i=a(1124);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(730)("52102ad8",i,!0)},1359:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"}),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"","highlight-current-row":"","max-height":"500"}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"150","column-key":"id",prop:"ids"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.ids))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"220px",align:"center",label:"问题内容",prop:"content"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.content))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"200px",align:"center",label:"用户ID",prop:"uid"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.uid))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"200px",align:"center",label:"发布时间",prop:"time"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.time))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"联系方式",width:"200",align:"center",prop:"status",contact:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.contact))])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.listQuery.page,"page-sizes":[10,20,30,40],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.listQuery.page=e}}})],1)],1)},staticRenderFns:[]}},788:function(t,e,a){function i(t){a(1220)}var n=a(19)(a(1026),a(1359),i,null,null);t.exports=n.exports},830:function(t,e,a){"use strict";function i(){return a.i(n.a)({url:"/qiniu/upload/token",method:"get"})}e.a=i;var n=a(77)},831:function(t,e,a){"use strict";function i(t){var e=t;return a.i(p.a)({url:"?act=addactor",method:"post",data:e})}function n(t){var e=t;return a.i(p.a)({url:"?act=actorupdate",method:"post",data:e})}function o(t){var e=t;return a.i(p.a)({url:"?act=updateactor",method:"post",data:e})}function r(t){var e=t;return a.i(p.a)({url:"?act=actorstatus",method:"post",data:e})}function s(t){var e=t;return a.i(p.a)({url:"?act=delactor",method:"post",data:e})}function l(t){return a.i(p.a)({url:"?act=actorlist",method:"get",params:t})}function c(t){return a.i(p.a)({url:"?act=actorinfo",method:"get",params:t})}function u(t){var e=t;return a.i(p.a)({url:"?act=sortactor",method:"post",data:e})}function d(t){var e=t;return a.i(p.a)({url:"?act=upactor",method:"post",data:e})}e.g=i,e.c=n,e.h=o,e.b=r,e.d=s,e.a=l,e.i=c,e.f=u,e.e=d;var p=a(77)},843:function(t,e,a){function i(t){a(846)}var n=a(19)(a(844),a(847),i,"data-v-e08e24ea",null);t.exports=n.exports},844:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(78),n=a.n(i),o=a(830);e.default={name:"singleImageUpload",props:{value:String},computed:{imageUrl:function(){return this.value}},data:function(){return{tempUrl:"",dataObj:{token:"",key:""}}},methods:{rmImage:function(){this.emitInput("")},emitInput:function(t){this.$emit("input",t)},handleImageScucess:function(t,e){this.emitInput(t.content.url),this.imageUrl=URL.createObjectURL(e.raw)},beforeUpload:function(){var t=this,e=this;return new n.a(function(i,n){a.i(o.a)().then(function(a){var n=a.data.qiniu_key,o=a.data.qiniu_token;e._data.dataObj.token=o,e._data.dataObj.key=n,t.tempUrl=a.data.qiniu_url,i(!0)}).catch(function(t){console.log(t),n(!1)})})}}}},845:function(t,e,a){e=t.exports=a(729)(!0),e.push([t.i,'.upload-container[data-v-e08e24ea]{width:100%;position:relative}.upload-container[data-v-e08e24ea]:after{content:"";display:table;clear:both}.upload-container .image-uploader[data-v-e08e24ea]{width:200px;float:left}.upload-container .image-preview[data-v-e08e24ea]{width:200px;height:200px;position:relative;border:1px dashed #d9d9d9;float:left;margin-left:50px}.upload-container .image-preview .image-preview-wrapper[data-v-e08e24ea]{position:relative;width:100%;height:100%}.upload-container .image-preview .image-preview-wrapper img[data-v-e08e24ea]{width:100%;height:100%}.upload-container .image-preview .image-preview-action[data-v-e08e24ea]{position:absolute;width:100%;height:100%;left:0;top:0;cursor:default;color:#fff;opacity:0;font-size:20px;background-color:rgba(0,0,0,.5);-webkit-transition:opacity .3s;transition:opacity .3s;cursor:pointer;text-align:center;line-height:200px}.upload-container .image-preview .image-preview-action .el-icon-delete[data-v-e08e24ea]{font-size:36px}.upload-container .image-preview:hover .image-preview-action[data-v-e08e24ea]{opacity:1}.upload-container .image-app-preview[data-v-e08e24ea]{width:320px;height:180px;position:relative;border:1px dashed #d9d9d9;float:left;margin-left:50px}.upload-container .image-app-preview .app-fake-conver[data-v-e08e24ea]{height:44px;position:absolute;width:100%;text-align:center;line-height:64px;color:#fff}',"",{version:3,sources:["C:/Users/admin/feeling_admin2/src/components/Upload/singleImage3.vue"],names:[],mappings:"AACA,mCACE,WAAY,AACZ,iBAAmB,CACpB,AACD,yCACI,WAAY,AACZ,cAAe,AACf,UAAY,CACf,AACD,mDACI,YAAa,AACb,UAAY,CACf,AACD,kDACI,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,0BAA2B,AAC3B,WAAY,AACZ,gBAAkB,CACrB,AACD,yEACM,kBAAmB,AACnB,WAAY,AACZ,WAAa,CAClB,AACD,6EACQ,WAAY,AACZ,WAAa,CACpB,AACD,wEACM,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,OAAQ,AACR,MAAO,AACP,eAAgB,AAEhB,WAAY,AACZ,UAAW,AACX,eAAgB,AAChB,gCAAqC,AACrC,+BAAgC,AAChC,uBAAwB,AACxB,eAAgB,AAChB,kBAAmB,AACnB,iBAAmB,CACxB,AACD,wFACQ,cAAgB,CACvB,AACD,8EACM,SAAW,CAChB,AACD,sDACI,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,0BAA2B,AAC3B,WAAY,AACZ,gBAAkB,CACrB,AACD,uEACM,YAAa,AACb,kBAAmB,AACnB,WAAY,AACZ,kBAAmB,AACnB,iBAAkB,AAClB,UAAY,CACjB",file:"singleImage3.vue",sourcesContent:['\n.upload-container[data-v-e08e24ea] {\n  width: 100%;\n  position: relative;\n}\n.upload-container[data-v-e08e24ea]:after {\n    content: "";\n    display: table;\n    clear: both;\n}\n.upload-container .image-uploader[data-v-e08e24ea] {\n    width: 200px;\n    float: left;\n}\n.upload-container .image-preview[data-v-e08e24ea] {\n    width: 200px;\n    height: 200px;\n    position: relative;\n    border: 1px dashed #d9d9d9;\n    float: left;\n    margin-left: 50px;\n}\n.upload-container .image-preview .image-preview-wrapper[data-v-e08e24ea] {\n      position: relative;\n      width: 100%;\n      height: 100%;\n}\n.upload-container .image-preview .image-preview-wrapper img[data-v-e08e24ea] {\n        width: 100%;\n        height: 100%;\n}\n.upload-container .image-preview .image-preview-action[data-v-e08e24ea] {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      left: 0;\n      top: 0;\n      cursor: default;\n      text-align: center;\n      color: #fff;\n      opacity: 0;\n      font-size: 20px;\n      background-color: rgba(0, 0, 0, 0.5);\n      -webkit-transition: opacity .3s;\n      transition: opacity .3s;\n      cursor: pointer;\n      text-align: center;\n      line-height: 200px;\n}\n.upload-container .image-preview .image-preview-action .el-icon-delete[data-v-e08e24ea] {\n        font-size: 36px;\n}\n.upload-container .image-preview:hover .image-preview-action[data-v-e08e24ea] {\n      opacity: 1;\n}\n.upload-container .image-app-preview[data-v-e08e24ea] {\n    width: 320px;\n    height: 180px;\n    position: relative;\n    border: 1px dashed #d9d9d9;\n    float: left;\n    margin-left: 50px;\n}\n.upload-container .image-app-preview .app-fake-conver[data-v-e08e24ea] {\n      height: 44px;\n      position: absolute;\n      width: 100%;\n      text-align: center;\n      line-height: 64px;\n      color: #fff;\n}\n'],sourceRoot:""}])},846:function(t,e,a){var i=a(845);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(730)("002ece3a",i,!0)},847:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"upload-container"},[a("el-upload",{staticClass:"image-uploader",attrs:{data:t.dataObj,drag:"",multiple:!1,"show-file-list":!1,action:"http://192.168.1.43:3000/system/upload","on-success":t.handleImageScucess}},[a("i",{staticClass:"el-icon-upload"}),t._v(" "),a("div",{staticClass:"el-upload__text"},[t._v("将文件拖到此处，或"),a("em",[t._v("点击上传")])])]),t._v(" "),a("div",{staticClass:"image-preview"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.imageUrl.length>1,expression:"imageUrl.length>1"}],staticClass:"image-preview-wrapper"},[a("img",{attrs:{src:t.imageUrl}})])])],1)},staticRenderFns:[]}},852:function(t,e,a){t.exports={default:a(853),__esModule:!0}},853:function(t,e,a){a(160),a(159),t.exports=a(854)},854:function(t,e,a){var i=a(40),n=a(285);t.exports=a(26).getIterator=function(t){var e=n(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return i(e.call(t))}},880:function(t,e,a){"use strict";function i(t){var e=t;return a.i(l.a)({url:"?act=addreward",method:"post",data:e})}function n(t){return a.i(l.a)({url:"?act=rewardinfo",method:"get",params:t})}function o(t){return a.i(l.a)({url:"?act=feedbacklist",method:"get",params:t})}function r(t){var e=t;return a.i(l.a)({url:"?act=rechargeanaly",method:"post",data:e})}function s(t){var e=t;return a.i(l.a)({url:"?act=consumeanaly",method:"post",data:e})}e.a=i,e.b=n,e.c=o,e.e=r,e.d=s;var l=a(77)}});
//# sourceMappingURL=46.5fb523375d205a217f80.js.map