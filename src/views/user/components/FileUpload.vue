<template>
  <el-upload action multiple :on-preview="preview" :file-list="fileList" :on-remove="remove" list-type="picture-card"
    :http-request="fileUpload" :limit="10" :on-exceed="exceed">
    <i class="el-icon-plus"></i>
    <!-- <div slot="file" slot-scope="{file}">
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
          <i class="el-icon-zoom-in"></i>
        </span>
        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
          <i class="el-icon-download"></i>
        </span>
        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div> -->
  </el-upload>
</template>

<script>
  import uploadOSS from 'gsf-oss'
  import {
    postAccessory
  } from '@/api/openacc.js'
  export default {
    props: {
      re: {},
      applyId: {},
      url: {
        default () {
          return []
        }
      },
      uri: {
        default () {
          return []
        }
      },
    },
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      init() {
        let arr = []
        for (var i = 0; i < this.url.length; i++) {
          arr.push({
            key: this.uri[i],
            url: this.url[i]
          })
        }
        this.fileList = arr
      },
      exceed() {
        this.$message({
          message: '上传数量超过限制！',
          type: 'error'
        })
      },
      async fileUpload(e) {
        const resourceKey = `openacc/${this.applyId}/accessory/${e.file.name}`
        const url = await (new uploadOSS).upload(e.file, 1, resourceKey)
        this.fileList.push({
          name: e.file.name,
          key: resourceKey,
          url,
        })
        await postAccessory({
          "applyId": this.applyId, // 开户id
          "attachFileUri": this.fileList.map(e => e.key), // 附件列表（全部的附件）
        })
      },
      preview(e) {
        window.open(e.url)
      },
      async remove(e, fileList) {
        this.fileList = fileList
        await postAccessory({
          "applyId": this.applyId, // 开户id
          "attachFileUri": this.fileList.map(e => e.key), // 附件列表（全部的附件）
        })
      }
    }
  }
</script>

<style>
</style>
