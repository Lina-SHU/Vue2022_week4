export default {
  props: ['msg'],
  template: `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div class="toast" role="alert" :class="{ show: Object.keys(msg).length }">
        <div class="toast-header bg-success text-white">
          <strong class="me-auto">{{ msg.title }}</strong>
        </div>
        <div class="toast-body">
          {{ msg.content }}
        </div>
      </div>
    </div>
  `
}