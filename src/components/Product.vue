<template>
  <mdb-container class="mt-5">
   <section>
          <mdb-row>
            <mdb-col size="12" class="text-center mb-5">
              <mdb-btn @click.native="showModal = true" color="info">New Product</mdb-btn>
              <mdb-btn @click.native="deleteForm()" v-if="multiselected.length > 0 ? true : false" color="danger">Delete Product</mdb-btn>
              <mdb-btn @click.native="saveUpdateProduct()" v-if="multiselected.length > 0 ? true : false" color="warning">Save Products</mdb-btn>
              <mdb-btn @click.native="showModalHistory = true" v-if="multiselected.length === 1 ? true : false" color="success">History Product</mdb-btn>

              <mdb-modal :show="showModal" @close="showModalInfo(false)" cascade class="text-left">
                <mdb-modal-header class="primary-color white-text">
                  <h4 class="title" >New Product</h4>
                </mdb-modal-header>
                <mdb-modal-body class="grey-text">
                  <mdb-input size="sm" label="Name"  v-model="model.name" group type="text" validate error="wrong" success="right"/>
                  <mdb-input size="sm" label="Description"  v-model="model.description" group type="text" validate error="wrong" success="right"/>
                  <mdb-input size="sm" label="Quantity" v-model="model.quantity"  group type="text" validate error="wrong" success="right"/>
                  <mdb-input size="sm" label="Price" v-model="model.price"  group type="text" format="number" validate error="wrong" success="right"/>
                </mdb-modal-body>
                <mdb-modal-footer>
                  <mdb-btn color="secondary" @click.native="showModalInfo(false)">Close</mdb-btn>
                  <mdb-btn color="primary" @click.native="saveProduct()">Save Product</mdb-btn>
                </mdb-modal-footer>
              </mdb-modal>
            </mdb-col>
            <mdb-modal :show="showModalHistory" @close="showModalHistory = false" cascade class="text-left">
                <mdb-modal-header class="primary-color white-text">
                  <h4 class="title" >History Product</h4>
                </mdb-modal-header>
                <mdb-modal-body class="grey-text">

                </mdb-modal-body>
                <mdb-modal-footer>
                  <mdb-datatable-2 v-model="dataLog"  />
                </mdb-modal-footer>
              </mdb-modal>
            </mdb-col>
          </mdb-row>
    </section>
    <section class="demo-section">
      <h4>Products List</h4>
      <section>
        <mdb-datatable-2 v-model="data" @selected="multiSelectRow($event)"  multiselectable editable />
      </section>
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
      showModalHistory: false,
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
      },
      dataLog: {
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
        this.productLog()
        this.model = {}
      } else {
        this.model = {}
        this.title = 'Bulk Edit Product'
        this.btnTitle = 'Edit Selected Products'
      }
    },
    showModalInfo (value) {
      this.showModal = value
    },
    async productLog () {
      this.dataLog = {
        rows: [],
        columns: []
      }
      this.products = await api.getProductLog(this.multiselected[0].id)
      let keys = ['quantity', 'price', 'created_at']
      let entries = this.filterData(this.products, keys)
      const columns = keys.map(key => {
        return {
          label: key.toUpperCase(),
          field: key,
          sort: true
        }
      })
      this.dataLog = {
        columns,
        rows: entries
      }
    },
    async refreshProduct () {
      this.loading = true
      this.products = await api.getProducts()
      let keys = ['id', 'name', 'description', 'quantity', 'price']
      let entries = this.filterData(this.products, keys)
      console.log(entries)
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
    async saveUpdateProduct () {
      let mult = this.multiselected
      for (let i = 0; i < this.multiselected.length; i++) {
        this.model.id = this.multiselected[i].id
        this.model = this.multiselected[i]
        await api.updateProduct(this.model.id, this.model)
      }
      await this.refreshProduct()
      this.multiselected = mult
      this.model = {}
    },
    async saveProduct () {
      await api.createProduct(this.model)
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
    async deleteProduct () {
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
      this.refreshProduct()
    }
  }
}
</script>
