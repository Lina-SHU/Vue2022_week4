export default {
  props: ['tempProduct', 'editProduct'],
  template: `
    <div class="modal" ref="editModal">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5">{{ tempProduct.id ? '編輯' : '新增' }}產品</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model.trim="tempProduct.imageUrl">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model.trim="tempProduct.title">
                </div>
            
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model.trim="tempProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model.trim="tempProduct.unit">
                  </div>
                </div>
            
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>
            
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model.trim="tempProduct.description"></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="content" type="text" class="form-control" placeholder="請輸入說明內容" v-model.trim="tempProduct.content"></textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="Array.isArray(tempProduct.imagesUrl)">
              <h3 class="fs-6 mb-3">輸入多張圖片網址</h3>
              <div class="row">
                <div v-for="(image, index) in tempProduct.imagesUrl" :key="image" class="col-md-4">
                  <input type="text" v-model="tempProduct.imagesUrl[index]" class="form-control">
                  <img :src="tempProduct.imagesUrl[index]" alt="多張圖片網址" class="img-fluid" v-if="image">
                </div>
              </div>
              <div v-if="!tempProduct?.imagesUrl?.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" class="mt-3">
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('');">
                  新增圖片
                </button>
              </div>
              <div v-else class="mt-3">
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop();">
                  刪除圖片
                </button>
              </div>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="editProduct">{{ tempProduct.id ? '編輯' : '新增' }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data () {
    return {
      editMsg: ''
    }
  },
  methods: {
    openModal () {
      this.editMsg.show();
    },
    closeModal () {
      this.editMsg.hide();
    }
  },
  mounted () {
    // 新增/編輯產品視窗
    this.editMsg = new bootstrap.Modal(this.$refs.editModal);
  }
}