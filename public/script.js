var app = new Vue({
  el: '#app',
  data: {
    products: [],
    purchased: [],
    product: '',
  },
  created() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        let response = await axios.get("/api/products");
        this.products = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async purchase(product) {
      product.ordered += 1;
      console.log(product.ordered);
      try {
        let response = await axios.put("/api/products/" + product._id, {
          ordered: product.ordered,
        });
        this.getProducts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    dovote() {
      console.log("In Dovote");
      for(var product of this.products) {
        console.log("42");
        if (product.selected) {
          console.log("h");
          this.purchase(product);
          this.purchased.push(product);
        }
      }
    },
  },
});