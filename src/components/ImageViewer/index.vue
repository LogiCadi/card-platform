<template>
  <transition name="viewer-fade">
    <div tabindex="-1" ref="el-image-viewer__wrapper" class="el-image-viewer__wrapper" :style="{ 'z-index': zIndex }">
      <div class="el-image-viewer__mask" @click="hide"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-circle-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span class="el-image-viewer__btn el-image-viewer__prev" :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev">
          <i class="el-icon-arrow-left" />
        </span>
        <span class="el-image-viewer__btn el-image-viewer__next" :class="{ 'is-disabled': !infinite && isLast }" @click="next">
          <i class="el-icon-arrow-right" />
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions">
        <div class="el-image-viewer__actions__inner">
          <i v-if="!isEdit" class="el-icon-edit-outline" @click="handleActions('edit')"></i>
          <i v-if="isEdit" class="el-icon-picture-outline" @click="handleActions('preview')"></i>

          <i v-if="isEdit" class="el-icon-document-checked" @click="handleActions('save')"></i>
          <i v-if="!isEdit" class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i v-if="!isEdit" class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
          <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="el-image-viewer__canvas" v-if="!isEdit">
        <img v-for="(url, i) in urlList" v-if="i === index" ref="img" class="el-image-viewer__img" :key="url" :src="currentImg"
          :style="imgStyle" @load="handleImgLoad" @error="handleImgError" @mousedown="handleMouseDown">
      </div>
      <cropper v-else ref="cropper" :img="base64img" centerBox autoCrop></cropper>
    </div>

  </transition>
</template>

<script>
  import Cropper from './Cropper'
  import uploadOSS from '@/utils/upload'
  import oss from 'gsf-oss'
  import {
    sourceOssUri,
    modifyOssUri,
    rotateOssUri
  } from '@/api/upload'
  import {
    on,
    off
  } from 'element-ui/src/utils/dom';
  import {
    rafThrottle,
    isFirefox
  } from 'element-ui/src/utils/util';

  const Mode = {
    CONTAIN: {
      name: 'contain',
      icon: 'el-icon-full-screen'
    },
    ORIGINAL: {
      name: 'original',
      icon: 'el-icon-c-scale-to-original'
    }
  };

  const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

  export default {
    name: 'elImageViewer',
    components: {
      Cropper
    },

    props: {
      urlList: {
        type: Array,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 2000
      },
      onSwitch: {
        type: Function,
        default: () => {}
      },
      onClose: {
        type: Function,
        default: () => {}
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        index: this.initialIndex,
        isShow: false,
        infinite: true,
        loading: false,
        mode: Mode.CONTAIN,
        transform: {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        },
        isEdit: false,
        base64img: '',
      };
    },
    computed: {
      isSingle() {
        return this.urlList.length <= 1;
      },
      isFirst() {
        return this.index === 0;
      },
      isLast() {
        return this.index === this.urlList.length - 1;
      },
      currentImg() {
        return this.urlList[this.index];
      },

      imgStyle() {
        const {
          scale,
          deg,
          offsetX,
          offsetY,
          enableTransition
        } = this.transform;
        const style = {
          transform: `scale(${scale}) rotate(${deg}deg)`,
          transition: enableTransition ? 'transform .3s' : '',
          'margin-left': `${offsetX}px`,
          'margin-top': `${offsetY}px`
        };
        if (this.mode === Mode.CONTAIN) {
          style.maxWidth = style.maxHeight = '100%';
        }
        return style;
      }
    },
    watch: {
      index: {
        handler: function(val) {
          this.reset();
          this.onSwitch(val);
        }
      },
      currentImg(val) {
        this.$nextTick(_ => {
          const $img = this.$refs.img[0];
          if (!$img.complete) {
            this.loading = true;
          }
        });
      }
    },
    methods: {
      hide() {
        this.deviceSupportUninstall();
        this.onClose();
      },
      deviceSupportInstall() {
        this._keyDownHandler = rafThrottle(e => {
          const keyCode = e.keyCode;
          switch (keyCode) {
            // ESC
            case 27:
              this.hide();
              break;
              // SPACE
            case 32:
              this.toggleMode();
              break;
              // LEFT_ARROW
            case 37:
              this.prev();
              break;
              // UP_ARROW
            case 38:
              this.handleActions('zoomIn');
              break;
              // RIGHT_ARROW
            case 39:
              this.next();
              break;
              // DOWN_ARROW
            case 40:
              this.handleActions('zoomOut');
              break;
          }
        });
        this._mouseWheelHandler = rafThrottle(e => {
          const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
          if (delta > 0) {
            this.handleActions('zoomIn', {
              zoomRate: 0.015,
              enableTransition: false
            });
          } else {
            this.handleActions('zoomOut', {
              zoomRate: 0.015,
              enableTransition: false
            });
          }
        });
        on(document, 'keydown', this._keyDownHandler);
        on(document, mousewheelEventName, this._mouseWheelHandler);
      },
      deviceSupportUninstall() {
        off(document, 'keydown', this._keyDownHandler);
        off(document, mousewheelEventName, this._mouseWheelHandler);
        this._keyDownHandler = null;
        this._mouseWheelHandler = null;
      },
      handleImgLoad(e) {
        this.loading = false;
      },
      handleImgError(e) {
        this.loading = false;
        e.target.alt = '加载失败';
      },
      handleMouseDown(e) {
        if (this.loading || e.button !== 0) return;

        const {
          offsetX,
          offsetY
        } = this.transform;
        const startX = e.pageX;
        const startY = e.pageY;
        this._dragHandler = rafThrottle(ev => {
          this.transform.offsetX = offsetX + ev.pageX - startX;
          this.transform.offsetY = offsetY + ev.pageY - startY;
        });
        on(document, 'mousemove', this._dragHandler);
        on(document, 'mouseup', ev => {
          off(document, 'mousemove', this._dragHandler);
        });

        e.preventDefault();
      },
      reset() {
        this.transform = {
          scale: 1,
          deg: 0,
          offsetX: 0,
          offsetY: 0,
          enableTransition: false
        };
      },
      toggleMode() {
        if (this.loading) return;

        const modeNames = Object.keys(Mode);
        const modeValues = Object.values(Mode);
        const index = modeValues.indexOf(this.mode);
        const nextIndex = (index + 1) % modeNames.length;
        this.mode = Mode[modeNames[nextIndex]];
        this.reset();
      },
      prev() {
        if (this.isFirst && !this.infinite) return;
        const len = this.urlList.length;
        this.index = (this.index - 1 + len) % len;
      },
      next() {
        if (this.isLast && !this.infinite) return;
        const len = this.urlList.length;
        this.index = (this.index + 1) % len;
      },
      // 获取oss key
      getResourceKey(url) {
        var arrUrl = url.split("//");

        var start = arrUrl[1].indexOf("/");
        var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符

        if (relUrl.indexOf("?") != -1) {
          relUrl = relUrl.split("?")[0];
        }
        return relUrl.slice(1)
      },
      async handleActions(action, options = {}) {
        if (this.loading) return;
        const {
          zoomRate,
          rotateDeg,
          enableTransition
        } = {
          zoomRate: 0.2,
          rotateDeg: 90,
          enableTransition: true,
          ...options
        };
        const {
          transform
        } = this;
        switch (action) {
          case 'edit':
            // 点击编辑
            const loading = this.$loading({
              background: 'rgba(0, 0, 0, 0.7)'
            });

            // 获取图片base64
            sourceOssUri({
              originalUri: this.getResourceKey(this.currentImg)
            }).then(res => {
              this.base64img = res.result.sourceCode
              this.isEdit = true
              loading.close();
            })
            break
          case 'preview':
            this.isEdit = false
            break
          case 'save':
            // 保存图片
            this.$refs.cropper.getCropData(async (data) => {
              const loading = this.$loading({
                background: 'rgba(0, 0, 0, 0.7)'
              });
              // do something
              let key = this.getResourceKey(this.currentImg)
              const getNewKey = function(relUrl) {
                // 加一个时间，得到新的key
                let relUrlArr = relUrl.split('/')
                let fileName = relUrlArr.pop()
                let fileNameArr = fileName.split('.')
                fileNameArr[0] = fileNameArr[0] + '_' + (new Date()).getTime()
                fileName = fileNameArr.join('.')
                relUrlArr.push(fileName)
                relUrl = relUrlArr.join('/')
                return relUrl
              }
              const newKey = getNewKey(key)
              // const newUrl = await uploadOSS(data, 1, newKey)
              const newUrl = await (new oss).upload(data, 1, newKey)

              await modifyOssUri({
                originalUri: key,
                replacementUri: newKey
              })
              loading.close();
              this.$message('修改成功')
              this.hide()
            })
            break
          case 'zoomOut':
            if (transform.scale > 0.2) {
              transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
            }
            break;
          case 'zoomIn':
            transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
            break;
          case 'clocelise':
            if (!this.isEdit) {
              transform.deg += rotateDeg;
              // const loading = this.$loading({
              //   background: 'rgba(0, 0, 0, 0.7)'
              // })
              // await rotateOssUri({
              //   originalUri: this.getResourceKey(this.currentImg),
              //   degree: 90
              // })
              // loading.close()
            } else {
              this.$refs.cropper.rotateRight()
            }
            break;
          case 'anticlocelise':
            if (!this.isEdit) {
              transform.deg -= rotateDeg;
              // const loading = this.$loading({
              //   background: 'rgba(0, 0, 0, 0.7)'
              // })
              // await rotateOssUri({
              //   originalUri: this.getResourceKey(this.currentImg),
              //   degree: -90
              // })
              // loading.close()
            } else {
              this.$refs.cropper.rotateLeft()
            }
            break;
        }
        transform.enableTransition = enableTransition;
      }
    },
    mounted() {
      this.deviceSupportInstall();
      // add tabindex then wrapper can be focusable via Javascript
      // focus wrapper so arrow key can't cause inner scroll behavior underneath
      this.$refs['el-image-viewer__wrapper'].focus();
    }
  };
</script>
