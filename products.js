import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js';
import { apiUrl, apiPath } from './apiEnv.js';
let editMsg = '';
let delMsg = '';

const app = {
  data () {
    return {
      productList: [],
      tempProduct: {}
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
    getProducts () {
      const url = `${apiUrl}api/${apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          this.productList = res.data.products;
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
          delMsg.hide();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openModal (value, prd) {
      if (value === 'edit') {
        this.tempProduct = { ...prd };
        editMsg.show();
        if (!this.tempProduct.imagesUrl) {
          this.tempProduct = {
            ...this.tempProduct,
            imagesUrl: []
          }
        }
      } else if (value === 'new') {
        editMsg.show();
        this.tempProduct = { imagesUrl: [] };
      } else if (value === 'delete') {
        delMsg.show();
        this.tempProduct = { ...prd };
      }
    },
    editProduct () {
      if (this.tempProduct.id) {
        // 編輯           
        const url = `${apiUrl}api/${apiPath}/admin/product/${this.tempProduct.id}`;
        axios.put(url, { data: this.tempProduct })
          .then((res) => {
            this.getProducts();
            editMsg.hide();
            this.tempProduct = {};
          })
          .catch((err) => {
            alert(err.response.data.message);
          })
      } else {
        // 新增
        const url = `${apiUrl}api/${apiPath}/admin/product`;
        axios.post(url, { data: this.tempProduct })
          .then((res) => {
            this.getProducts();
            editMsg.hide();
            this.tempProduct = {};
          })
          .catch((err) => {
            alert(err.response.data.message);
          })
      }
    },
    editEnabled (prd) {
      this.tempProduct = JSON.parse(JSON.stringify(prd));
      this.tempProduct.is_enabled = this.tempProduct.is_enabled === 1 ? 0 : 1;
      this.editProduct();
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)PToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkToken();

    // 新增/編輯產品視窗
    editMsg = new bootstrap.Modal(this.$refs.editModal);
    // 刪除產品視窗
    delMsg = new bootstrap.Modal(this.$refs.deleteModal);
  }
}

createApp(app)
  .mount('#app');