<template>
	<el-container>
		<el-header>
			<!-- 			<el-page-header content="请填写培训资料信息">
			</el-page-header> -->
			<h2>请填写培训资料信息</h2>
		</el-header>

		<el-main>
			<!-- 			<el-row  class="row-bg">
			  <el-col :span="20"><div class="grid-content bg-purple" style="background-color: #0077AA;">111</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple-light" style="background-color: #4aaa60;">222</div></el-col>
			  <el-col :span="6"><div class="grid-content bg-purple" style="background-color: #6b6baa;">333</div></el-col>
			</el-row>
			<el-col type="flex" class="row-bg">
			  <el-row :span="6"><div class="grid-content bg-purple" style="background-color: #aa6f52;">1111</div></el-row>
			  <el-row :span="6"><div class="grid-content bg-purple-light" style="background-color: #aa5d7c;">2222</div></el-row>
			  <el-row :span="6"><div class="grid-content bg-purple" style="background-color: #a3aaa8;">3333</div></el-row>
			</el-col> -->
			<el-form label-width="120px" :model="formLabelAlign">

				<el-form-item label="资料名称" required>
					<el-col :span="11">
						<el-input v-model="formLabelAlign.name" placeholder="请输入文章名称" style="width: 100%;"></el-input>
					</el-col>
				</el-form-item>

				<el-form-item label="资料附件" required>
					<el-col :span="11">
						<el-upload class="upload-demo" 
						ref="upload" 
						:limit="limitNum" 
						:on-remove="handleRemove" 
						:on-change="handleEditChange"
						:http-request="ImgUploadSectionFile" 
						:with-credentials="true" 
						:auto-upload="false" 
						accept=".jpg, .pdf, .mp3, .mp4" 
						action=""
						list-type="picture-card" 
						:file-list="fileList">
							<i slot="trigger" class="el-icon-plus"></i>
							<!-- <el-button slot="trigger" type="primary">选取图片</el-button> -->
						</el-upload>
						<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
						<!-- 						<el-upload list-type="picture-card" class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
						 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
							<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
							<div slot="tip" class="el-upload__tip">支持上传jpg/pdf/mp3/mp4，且不超过200M</div>
						<!-- </el-upload> -->
					</el-col>
				</el-form-item>

				<el-form-item label="有效阅读时间" required>
					<el-col :span="9">
						<el-input v-model="formLabelAlign.type" placeholder="请输入有效阅读时间" style="width: 100%;"></el-input>
					</el-col>
					<el-col :span="2">
						<label>(min)</label>
					</el-col>
				</el-form-item>

				<el-form-item label="可见人员" required>
					<el-col :span="2">
						<el-button type="primary" icon="el-icon-edit" @click="dialog_visible = true" circle></el-button>
					</el-col>
					<el-col :span="9">
						<label>添加可见人员</label>
					</el-col>
				</el-form-item>
			</el-form>
			<el-dialog title="请选择人员" :visible.sync="dialog_visible" width="60%" :append-to-body="true">
				<v-groupList @func="getPerson"></v-groupList>
			</el-dialog>
			<el-button type="primary" @click="publishClick">发布</el-button>
			<el-button>取消</el-button>
		</el-main>
		<!-- 		<el-upload
		  class="upload-demo"
		  ref="upload"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :on-preview="handlePreview"
		  :on-remove="handleRemove"
		  :file-list="fileList"
		  :auto-upload="false">
		  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
		  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload> -->
	</el-container>
</template>
<script>
	import groupList from '../../../components/Common/groupList'
	export default {
		components: {
			'v-groupList': groupList
		},
		data() {
			return {
				hideUploadEdit: false, // 隐藏'上传按钮'
				limitNum: 2, // 图片数量
				limitType: ["image/jpeg","application/pdf","video/mp4","audio/mpeg"],
				fileList: [],
				formLabelAlign: {
					name: '',
					region: '',
					type: ''
				},
				fileListaaa: [],
				dialog_visible: false,
				dialogImageUrl: '',
				disabled: false,
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				ruleForm: {
				  name: "",
				  textarea: "",
				  date1: "",
				  radio: "1",
				  seen: [
				  ],
				},
				personList: [],
				trainList: {
				  file_name: "",
				  file_path: "",
				  file_time: "",
				}
			}
		},
		mounted() {

		},
		methods: {

			// submitUpload() {
			// 	this.$axios({
			// 		method: 'get',
			// 		url: 'http://localhost:8080/medemr/maintain/yg/queryYG',

			// 	}).then((response) => { //这里使用了ES6的语法
			// 		console.log(response) //请求成功返回的数据
			// 	})
			// },
			publishClick(){
				
				
				
				this.saveTrain()
				//this.submitUpload()
			},
			saveTrain(){
				this.$axios({
						method: "post",
						url: 'http://localhost:8080/medemr/maintain/yg/AddTrain', //这里填写上传图片的接口,
						data: {
							
							
						}//这里可以填写上传时携带的数据,不需要可以不写
					})
					.then(result => {
						console.log("上传成功:", result);
					})
					.catch(err => {
						console.log(err);
					});
			},
			getPerson(data) {
			  this.ruleForm.seen = data;
			  this.dialog_visible = false;
			  console.log(this.ruleForm.seen);
			  this.personList = data.slice(0);			
			},
			handleEditChange(file, fileList) {
				// console.log("fileList: "+fileList)
				// console.log("res=>",file)
				// console.log("file.type=>",file.raw.type)
				let isIMG = false;
				for(let i in this.limitType){
					//console.log("this.limitType: "+this.limitType[i])
					if(file.raw.type == this.limitType[i]){
						isIMG = true
					}
					//console.log("isIMG: "+isIMG)
				}
				let isLtM = file.size / 1024 / 1024 <= 200;		
				if (!isIMG) {
				    this.$message.error('只能上传jpg、pdf、mp3、mp4文件!');
					for(let i in fileList){
						if(fileList[i].uid == file.uid){
							fileList.splice(i,1)
						}
					}
					return
				}
				if (!isLtM) {
				    this.$message.error('上传图片大小不能超过 200MB!');
					for(let i in fileList){
						if(fileList[i].uid == file.uid){
							fileList.splice(i,1)
						}
					}
					//console.log(this.fileList[0])
					return
				}
				this.hideUploadEdit = fileList.length >= this.limitNum;
				//console.log("this.fileList:", fileList);
				this.fileListaaa = fileList;
				//console.log("this.hideUploadEdit:", this.hideUploadEdit);
				// if(this.hideUploadEdit){
				// 	 this.$message({
				// 	                        type: 'success',
				// 	                        message: "res.message"
				// 	                    });

				// }
			},
			// 上传到服务器
			submitUpload() {
				//console.log(this.file);
				//console.log("this.fileList:", this.fileList);
				console.log(this.fileListaaa);
				console.log(this.fileListaaa[0]);
				if (this.fileListaaa.length < 1) {
					this.$message("请选择图片");
				} else {
					let formData = new FormData(); //formdata格式
					// formData.append("picture",this.fileList[0].raw);
					// formData.append("picture", this.file.file);
					// for(var file in fileList){
					// 	formData.append('picture', file.raw)
					// }
					//循环已选择文件列表 fileList，将文件取出放入 formData 的file数组中
					for (let i = 0; i < this.fileListaaa.length; i++) {
						formData.append("picture", this.fileListaaa[i].raw);
					}
					// this.$refs.testForm.$children[0].fileList.forEach(function(file){
					//                //三个参数依次是: @RequestParam中的字符串, 文件对象, 文件的名称(***.png)
					//                form.append("picture", file.raw);
					//            })
					console.log(formData);
					this.$axios({
							method: "post",
							url: 'http://localhost:8080/medemr/maintain/yg/queryYG1', //这里填写上传图片的接口,
							data: formData, //这里可以填写上传时携带的数据,不需要可以不写
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(result => {
							console.log("上传成功:", result);
						})
						.catch(err => {
							console.log(err);
						});
				}
			}, // http-request自定义上传
			ImgUploadSectionFile(file) {
				this.file = file;


			},
			handleRemove(file) {
				console.log(file);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				//this.dialogVisible = true;
			},
			handleDownload(file) {
				console.log(file);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
		}
	}
</script>
<style>

</style>
