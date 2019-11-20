var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    price: "",
    ordered: 0,
    checked: false,
    url: "",
    file: null,
    addProduct: null,
    products: [],
    findTitle: "",
    findProduct: null,
  },
  created() {
    this.getProducts();
  },
  computed: {
    suggestions() {
      return this.products.filter(product => product.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    },
    sortedArray: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      return this.products.sort(compare);
    },
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        let r2 = await axios.post('/api/products', {
          title: this.title,
          price: this.price,
          url: this.url,
          ordered: this.ordered,
          checked: false,
        });
        this.addProduct = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getProducts() {
      try {
        let response = await axios.get("/api/products");
        this.products = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    /*selectProduct(product) {
      this.findTitle = "";
      this.findProduct = product;
    },*/
    async deleteProduct(product) {
      try {
        let response = axios.delete("/api/products/" + product._id);
        this.findProduct = null;
        this.getProducts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
