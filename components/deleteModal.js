export default {
  props: ['tempProduct', 'deleteProduct'],
  template: `
    <div class="modal" ref="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除產品</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>是否刪除{{ tempProduct.title }}？</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-outline-danger" @click="deleteProduct">刪除</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data () {
    return {
      delMsg: ''
    }
  },
  methods: {
    openModal () {
      this.delMsg.show();
    },
    closeModal () {
      this.delMsg.hide();
    }
  },
  mounted () {
    this.delMsg = new bootstrap.Modal(this.$refs.deleteModal);
  }
}