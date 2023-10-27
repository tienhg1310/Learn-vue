<template>
  <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    <h2 class="display-4">Product Management</h2>
    <p><RouterLink to="/product/create">Add new</RouterLink></p>
  </div>

  <div class="container">
    <div class="card-deck mb-3">
      <table class="table table-bordered">
        <thead>
          <tr class="text-center">
            <th scope="col">#</th>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="product.id" v-for="product in products">
            <th scope="row">{{ product.id }}</th>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button class="btn btn-primary">Edit</button> &nbsp;
              <button
                class="btn btn-danger"
                @click="onDelete(product.id, product.name)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      this.$request.get("http://localhost:8000/api/products").then((res) => {
        this.products = res.data;
      });
    },
    onDelete(productId, productName) {
      console.log(productId);
      this.$swal
        .fire({
          title: `Do you want to delete?\n You cant return it `,
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "OK",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$request
              .delete(`http://localhost:8000/api/products/${productId}`)
              .then((res) => {
                this.$swal.fire(
                  "Deleted!",
                  `You are delete product with name: ${productName}`,
                  "error"
                );
                this.getAllProducts();
              });
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
    },
  },
};
</script>
