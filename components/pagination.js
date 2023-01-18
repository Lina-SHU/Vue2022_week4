export default {
  props: ['pages', 'getProducts'],
  template: `
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
          <a class="page-link" href="#" @click.prevent="getProducts(pages.current_page - 1)">Previous</a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page + 'page'" :class="{ active: page === pages.current_page }">
          <a class="page-link" href="#" @click.prevent="getProducts(page)" :class="{ 'point-none': page === pages.current_page }">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
          <a class="page-link" href="#" @click.prevent="getProducts(pages.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  `
}