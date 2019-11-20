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
      /*var url = "/api/products/" + product._id + "/upvote";
      console.log("upvote URL " + url);
      axios.put(url)
        .then(response => {
          console.log(response.data.votes);
          candidate.votes = response.data.votes;
        })
        .catch(e => {
          console.log(e);
        });*/
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