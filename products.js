import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
import { apiUrl, apiPath } from './apiEnv.js';
import pagination from './components/pagination.js';
import editModal from './components/editModal.js';
import deleteModal from './components/deleteModal.js';
import toast from './components/toast.js';

const app = {
  components: {
    pagination,
    editModal,
    deleteModal,
    toast
  },
  data () {
    return {
      productList: [],
      tempProduct: {},
      pages: 1,
      msg: {}
    }
  },
  methods: {
    checkToken () {
      const url = `${apiUrl}api/user/check`;
      axios.post(url)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          window.location = './index.html';
        })
    },
    getProducts (page = 1) {
      const url = `${apiUrl}api/${apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then((res) => {
          this.productList = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    deleteProduct () {
      const url = `${apiUrl}api/${apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then((res) => {
          this.getProducts();
          this.$refs.delMsg.closeModal();
          this.msg = {
            title: '刪除產品',
            content: '已刪除'
          }
          setTimeout(() => { this.msg = {}}, 2000);
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openModal (value, prd) {
      if (value === 'edit') {
        this.tempProduct = { ...prd };
        this.$refs.editMsg.openModal();
        if (!this.tempProduct.imagesUrl) {
          this.tempProduct = {
            ...this.tempProduct,
            imagesUrl: []
          }
        }
        if (!this.tempProduct.tags) {
          this.tempProduct = {
            ...this.tempProduct,
            tags: []
          }
        }
      } else if (value === 'new') {
        this.$refs.editMsg.openModal();
        this.tempProduct = { imagesUrl: [], tags: [] };
      } else if (value === 'delete') {
        this.$refs.delMsg.openModal();
        this.tempProduct = { ...prd };
      }
    },
    editProduct () {
      // 編輯
      let url = `${apiUrl}api/${apiPath}/admin/product/${this.tempProduct.id}`;
      let method = 'put';
      if (!this.tempProduct.id) {
        // 新增
        url = `${apiUrl}api/${apiPath}/admin/product`;
        method = 'post';
      }

      axios[method](url, { data: this.tempProduct })
        .then((res) => {
          this.getProducts();
          this.$refs.editMsg.closeModal();
          if (!this.tempProduct.id) {
            this.msg = {
              title: '新增產品',
              content: '已新增'
            }
          } else {
            this.msg = {
              title: '編輯產品',
              content: '已編輯'
            }
          }
          setTimeout(() => { this.msg = {}}, 2000);
          this.tempProduct = {};
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    editEnabled (prd) {
      this.tempProduct = { ...prd };
      this.tempProduct.is_enabled = this.tempProduct.is_enabled === 1 ? 0 : 1;
      this.editProduct();
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)PToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkToken();
  }
}

createApp(app)
  .mount('#app');