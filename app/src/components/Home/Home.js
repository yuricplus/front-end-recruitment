import Vue from "vue";
import product from "../../../public/products.json";

export default {
  name: "Home",
  props: {
    msg: String
  },

  data(){
    return {
      products: [],
      showCart: false,
      productCartList: null,
      totalItemCart: 0,
      removeHover: null
    }
  },
  methods: {
    async getProductsList(){
      const apiUrl = 'https://raw.githubusercontent.com/yuricplus/api-mocks/master/products.json';

      try {
        await this.$http.get(apiUrl)
        .then((response) =>{
          this.products = response.data.products;
        })
        return this.products;
      } catch (error) {
        Vue.$toast.open({
          message: error,
          type: "error",
          position: "top"
      });
      }
    },
    currency(value){
      return  parseFloat(value).toFixed(2).replace(".", ",");
    },

    getTotalPriceFromCart(items){
    let total = 0;

    items.forEach(product => {
        total = total + product.price;
    })

      return total;
    },

    getTotalItemsFromCart(){
      const items = this.productCartList;
      let itemsTotal = 0;
      if(!items){
        return;
      }

      items.forEach(item => {
        itemsTotal = itemsTotal + item.quantity;
      })

      return this.totalItemCart = itemsTotal;
    },

    updateCart(){
     this.productCartList = JSON.parse(localStorage.getItem("cartProduct"));
     this.getTotalItemsFromCart(this.productCartList)
    },

    removeFromCart(productId){
     try {
        const cartList = JSON.parse(localStorage.getItem("cartProduct"));

        cartList.forEach((item, index) => {

        if(item.id === productId){
            cartList.splice(index, 1);

            localStorage.setItem("cartProduct", JSON.stringify(cartList));
            return this.updateCart();
        }
        })
     } catch (error) {
        Vue.$toast.open({
          message: "Não foi possivel remover o produto da sua sacola!",
          type: "error",
          position: "top"
      });
     }

    },
    addProductCart(product){  
      let cartList = JSON.parse(localStorage.getItem("cartProduct")) || [];
      let itemExist;

      cartList.forEach(item => {

        if(item.id === product.id){
          item.quantity = item.quantity + product.quantity;
          item.price = item.price + product.price;
          itemExist = true;
        }

        if(item.id !== product.id && !itemExist){
          itemExist = false;
        }
      })

      if(!itemExist || product.length === 0){
        cartList.push(product);
      }
      localStorage.setItem("cartProduct", JSON.stringify(cartList));
      this.updateCart();
      this.showModal();
      this.setNotify();
    },
    setNotify(){
      Vue.$toast.open({
        message: "Produto adicionado à sua sacola!",
        type: "success",
        position: "top"
      });
    },

    showModal(){
      this.showCart = true;
      return this.showCart;
    } 
  },
  mounted(){
    if(product){
      this.getProductsList();
    }
  }
}