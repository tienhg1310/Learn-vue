import { RouterLink } from 'vue-router';
<template>
  <div class="product-info">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h3 class="display-5">Product Infomation</h3>
      <RouterLink to="/product">Back</RouterLink>
    </div>

    <div class="container">
      <form @submit.prevent="save()">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label"
            >Product name</label
          >
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              v-model="product.name"
              @blur="validate()"
              v-bind:class="{ 'is-invalid': error.name }"
            />
            <div class="invalid-feedback">
              {{ error.name }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label"
            >Product price</label
          >
          <div class="col-sm-9">
            <input
              type="text"
              class="form-control"
              @blur="validate()"
              v-model="product.price"
              v-bind:class="{ 'is-invalid': error.price }"
            />
            <div class="invalid-feedback">
              {{ error.price }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label"
            >Product description</label
          >
          <div class="col-sm-9">
            <textarea
              class="form-control"
              rows="3"
              @blur="validate()"
              v-model="product.description"
              v-bind:class="{ 'is-invalid': error.description }"
            ></textarea>
            <div class="invalid-feedback">
              {{ error.description }}
            </div>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label"></label>
          <div class="col-sm-9">
            <button type="submit" class="btn btn-primary">Save</button> &nbsp;
            <button type="reset" class="btn btn-danger">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductForm",
  data() {
    return {
      error: {
        name: "",
        price: "",
        description: "",
      },
      product: {
        name: "",
        price: "",
        description: "",
      },
    };
  },
  created() {
    let productId = this.$route.params.id;
    if (productId) {
      this.getInfoProduct(productId);
    }
    console.log(this.product);
  },

  methods: {
    validate() {
      let isValid = true;
      this.error = {
        name: "",
        price: "",
        description: "",
      };
      if (!this.product.name) {
        this.error.name = "Product name is required";
        isValid = false;
      }
      if (!this.product.price) {
        this.error.price = "Product price is required";
        isValid = false;
      } else if (!this.isNumber(this.product.price)) {
        this.error.price = "Product price needs to be a number";
        isValid = false;
      }
      if (!this.product.description) {
        this.error.description = "Product description is required";
        isValid = false;
      }
      return isValid;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    save() {
      if (this.validate()) {
        console.log(this.$route.params.id);
        if (this.$route.params.id) {
          this.$request
            .put(
              `http://localhost:8000/api/products/${this.$route.params.id}`,
              this.product
            )
            .then((res) => {
              console.log(res);
              this.$router.push({ name: "product.list" });
              return;
            });
          return;
        }
        this.$request
          .post("http://localhost:8000/api/products", this.product)
          .then((res) => {
            console.log(res);
            this.$router.push({ name: "product.list" });
            return;
          });
      }
    },
    getInfoProduct(productId) {
      this.$request
        .get(`http://localhost:8000/api/products/${productId}`)
        .then((res) => (this.product = res.data));
    },
  },
};
</script>
