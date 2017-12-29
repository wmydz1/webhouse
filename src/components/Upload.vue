<template>
  <div>
    <el-upload action="https://up-z2.qbox.me/" list-type="picture-card" v-model="isUploadShow"
               class="avatar-uploader"
               :thumbnail-mode="true"
               :before-upload="beforeUpload"
               :on-success="handleSuccess"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               multiple
               :data="uploadData">
      <i class="el-icon-plus "></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<style>
  .avatar-uploader {

  }

</style>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        isUploadShow: false,  // 是否显示upload组件
        bucketHost: 'https://cdn.juhehuli.com/',   // 上传图片的外链域名
        uploadData: {},
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeUpload (file) {
        let suffix = file.name.split('.');
        let ext = suffix.splice(suffix.length - 1, 1)[0];
        let randomstr=Math.random().toString(36).substring(6);
        let key = `${new Date().getTime()}${randomstr}.${ext}`
        console.log(key)
        return axios.get('https://api.juhehuli.com/rest/getQNToken.do')
          .then(response => {
            let qiniuToken = response.data.result;
            this.uploadData = {
              key,
              token: qiniuToken
            }
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      handleSuccess (res) {


        let img = `${this.bucketHost}${res.key}`;
        console.log("七牛地址 " + img);
        // 前端给后台的 key
        console.log(res.key);
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
