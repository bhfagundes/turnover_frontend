<template>
  <mdb-container class="mt-5">
   <section>
          <mdb-row>
            <mdb-col size="12" class="text-center mb-5">
              <mdb-btn @click.native="showModal = true" color="info">{{btnTitle}}</mdb-btn>
              <mdb-btn @click.native="deleteForm()" v-if="multiselected.length > 0 ? true : false" color="info">Delete Product</mdb-btn>
              <mdb-modal :show="showModal" @close="showModalInfo(false)" cascade class="text-left">
                <mdb-modal-header class="primary-color white-text">
                  <h4 class="title" >{{title}}</h4>
                </mdb-modal-header>
                <mdb-modal-body class="grey-text">
                  <mdb-input size="sm" label="Name"  v-model="model.name" group type="text" validate error="wrong" success="right"/>
                  <mdb-input size="sm" label="Description"  v-model="model.description" group type="text" validate error="wrong" success="right"/>
                  <mdb-input size="sm" label="Quantity" v-model="model.quantity"  group type="text" validate error="wrong" success="right"/>
                  <mdb-input size="sm" label="Price" v-model="model.price"  group type="text" format="number" validate error="wrong" success="right"/>
                </mdb-modal-body>
                <mdb-modal-footer>
                  <mdb-btn color="secondary" @click.native="showModalInfo(false)">Close</mdb-btn>
                  <mdb-btn color="primary" @click.native="actionForm()">Save Product</mdb-btn>
                </mdb-modal-footer>
              </mdb-modal>
            </mdb-col>
          </mdb-row>
    </section>
    <section class="demo-section">
      <h4>Products List</h4>
      <section>
        <mdb-datatable-2 v-model="data" @selected="multiSelectRow($event)"  multiselectable />
      </section>
    </section>
    <section class="demo-result-section">
      {{ multiselected }}
    </section>


  </mdb-container>
</template>
<script>


</script>

<script>
import api from '@/api'

import {
  mdbDatatable2,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbInput,
  mdbTextarea,
  mdbBtn,
  mdbIcon,
  mdbModal,
  mdbModalBody,
  mdbModalFooter,
  mdbModalHeader
} from 'mdbvue'

export default {
  name: 'DatatableMultiSelect',
  components: {
    mdbDatatable2,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbTextarea,
    mdbBtn,
    mdbIcon,
    mdbModal,
    mdbModalBody,
    mdbModalFooter,
    mdbModalHeader
  },
  data () {
    return {
      showModal: false,
      guests: 4,
      search: '',
      search3: '',
      btnTitle: '',
      selected: '',
      title: '',
      multiselected: '',
      model: {},
      products: [],
      data: {
        rows: [],
        columns: []
      }
    }
  },
  async created () {
    this.refreshProduct()
    this.title = 'New Product'
    this.btnTitle = 'New Product'
  },
  methods: {

    multiSelectRow (event) {
      this.multiselected = event
      if (this.multiselected.length === 0) {
        this.title = 'New Product'
        this.btnTitle = 'New Product'
        this.model = {}
      } else if (this.multiselected.length === 1) {
        this.title = 'Product Edit'
        this.btnTitle = 'Product Edit'
        this.model = event[0]
      } else {
        this.model = {}
        this.title = 'Bulk Edit Product'
        this.btnTitle = 'Edit Selected Products'
      }
    },
    showModalInfo (value) {
      this.showModal = value
    },
    async refreshProduct () {
      this.loading = true
      this.products = await api.getProducts()
      let keys = ['id', 'name', 'description', 'quantity', 'price']
      let entries = this.filterData(this.products, keys)
      const columns = keys.map(key => {
        return {
          label: key.toUpperCase(),
          field: key,
          sort: true
        }
      })
      this.data = {
        columns,
        rows: entries
      }
      this.loading = false
      this.model = {} // reset form
      this.multiselected = ''
    },
    async populateProductToEdit (product) {
      this.model = Object.assign({}, product)
    },
    async saveProduct () {
      if (this.model.id) {
        await api.updateProduct(this.model.id, this.model)
      } else {
        await api.createProduct(this.model)
      }

      await this.refreshProduct()
    },
    async getAllProducts () {
      return api.getProducts()
    },
    async deleteSelectedProduct () {
      let idsDeleted = []
      let dataDeleted = {}
      for (let i = 0; i < this.multiselected.length; i++) {
        idsDeleted[i] = this.multiselected[i].id
      }
      dataDeleted.id = idsDeleted
      await api.deleteProducts(dataDeleted)
    },
    async updatedSelectedProduct () {
      let idsUpdated = []
      let dataUpdated = {}
      let fieldsUpdated = {}
      for (let i = 0; i < this.multiselected.length; i++) {
        idsUpdated[i] = this.multiselected[i].id
      }
      if (typeof this.model.name !== 'undefined' && this.model.name !== '') {
        fieldsUpdated.name = this.model.name
      }
      if (typeof this.model.description !== 'undefined' && this.model.description !== '') {
        fieldsUpdated.description = this.model.description
      }
      if (typeof this.model.quantity !== 'undefined' && this.model.quantity !== '') {
        fieldsUpdated.quantity = this.model.quantity
      }
      if (typeof this.model.price !== 'undefined' && this.model.price !== '') {
        fieldsUpdated.price = this.model.price
      }
      dataUpdated.id = idsUpdated
      dataUpdated.fieldsUpdated = fieldsUpdated
      await api.updateProducts(dataUpdated)
      await this.refreshProduct()
    },
    async deleteProduct () {
      // if we are editing a post we deleted, remove it from the form
      let id = this.model.id
      this.model = {}
      await api.deleteProduct(id)
      await this.refreshProduct()
    },
    filterData (dataArr, keys) {
      let data = dataArr.map(entry => {
        let filteredEntry = {}
        keys.forEach(key => {
          if (key in entry) {
            filteredEntry[key] = entry[key]
          }
        })
        return filteredEntry
      })
      return data
    },
    async deleteForm () {
      if (this.multiselected.length <= 1) {
        this.model = this.multiselected[0]
        this.deleteProduct()
      } else {
        this.deleteSelectedProduct()
      }
      await this.refreshProduct()
    },
    actionForm () {
      if (this.multiselected.length <= 1) {
        this.saveProduct()
      } else {
        this.updatedSelectedProduct()
      }
      this.showModal = false
    }
  }
}
</script>



