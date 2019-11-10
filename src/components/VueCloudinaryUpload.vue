<template>
  <dropzone
    id="image-uploader"
    ref="el"
    :options="options"
    :destroyDropzone="true">
    </dropzone>
</template>
<script>
import Dropzone from 'nuxt-dropzone'

export default {
  name: 'VueCloudinaryUpload',
  components: {
    Dropzone
  },
  data () {
    return {
      images: [],
      options: {
        url: 'https://api.cloudinary.com/v1_1/ticketinn/image/upload?upload_preset=rentme-preset',
        addRemoveLinks: true,
        maxFiles: 20,
        success: (file, res) => {
          this.images.unshift({
            'url': res.url,
            'public_id': res.public_id
          })

          this.$emit('images-uploaded', {
            images: this.images
          })
        },
        acceptedFiles: 'image/*'
      }
    }
  }
}
</script>
<style scoped>
.dropzone {
    background: white;
    border-radius: 5px;
    border: 2px dashed rgb(0, 135, 247);
    border-image: none;
}
</style>
