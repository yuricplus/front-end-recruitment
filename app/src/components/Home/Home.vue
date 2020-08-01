<template>
  <div class="hello">
    <ul class="lst-products">
      <li v-for="product in products" :key="product.id" class="product-box">
        <a href="javascript:void(0)" v-on:click="addProductCart({ 
            id: product.id,
            title: product.title,
            price: product.price,
            sku: product.sku,
            description: product.description,
            availableSizes: product.availableSizes,
            style: product.style,
            isFreeShipping: product.isFreeShipping,
            quantity: 1
          })">
          <img :src="require(`../../assets/img_${product.id}.png`)" alt="img">
        <h4 class="lst-title">{{product.title}}</h4>
        <div class="box-price">
          <div class="line-icon"> </div>
          <h5 class="lst-price"><span class="currency">R$ </span><span class="price">{{ currency(product.price).split(',')[0] }}</span><span class="decimal">,{{currency(product.price).split(',')[1]}}</span></h5>
          <h5 v-if="product.price > 50" class="lst-installments">Ou {{product.installments}} x R$ {{ currency(product.price / product.installments) }}</h5>
        </div>
        </a>
      </li>
    </ul>
    <div v-on:click="showCart = false" :class="showCart ? 'backdrop' : ''" class="container-modal"></div>
      <div :class="showCart ? 'show' : ''" class="modal-cart">
      <div class="container"> 
        <div class="hdr-cart">
           <div class="tlt-cart">
             <img src="../../assets/Rounded_Rectangle.png" alt="Cart">
             <span class="icon-number">{{ totalItemCart }}</span>
           </div>
           <h3>Sacola</h3>
        </div>
        <ul v-if="productCartList">
          <li :class="removeHover === product.id ? 'hover' : ''"  class="lst-cart_prd" v-for="product in productCartList" :key="product.id">
            <div class="container-lst">
              <div class="lst-img">
              <img :src="require(`../../assets/img_${product.id}.png`)" alt="produycts" width="50" height="50">
            </div>
            <div class="lst-info">
              <h4 :class="removeHover === product.id ? 'hover' : ''" class="lst-cart_tlt"> {{product.title}}</h4>
              <h5 :class="removeHover === product.id ? 'hover' : ''" class="lst-cart_info">{{ product.availableSizes[0] }} || {{ product.style }} </h5>
              <h5 :class="removeHover === product.id ? 'hover' : ''" class="lst-cart_quantity">Quantidade: {{ product.quantity }} </h5>
            </div>
            </div>
            <div class="box-right">
             <div v-on:click="removeFromCart(product.id)" class="box-icon"><i v-on:mouseover="removeHover = product.id" v-on:mouseleave="removeHover = null" class="icon-close"></i></div>
              <h5 :class="removeHover === product.id ? 'hover' : ''" class="cart-price">R$ {{currency(product.price)}}</h5>
            </div>
          </li>

          <div class="cart-pay">
            <div class="cart-total">
              <span>Subtotal</span>
              <div class="price-total">
                  <h5>R$ {{ currency(getTotalPriceFromCart(productCartList)) }}</h5>
                  <h6 v-if="productCartList">Ou em até 10 X R$ {{ currency(getTotalPriceFromCart(productCartList) / 10) }}</h6>
              </div>
            </div>

            <button>Comprar</button>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import script from './Home'

export default script;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../Styles/style.css';
@import '../../Styles/reponsive.css';
</style>
