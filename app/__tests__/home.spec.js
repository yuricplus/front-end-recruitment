import { mount } from '@vue/test-utils'
import Home from '../src/components/Home/Home';
import Vue from "vue";

describe('Home', () => {
    const wrapper = mount(Home);

    it('has data', () => {
        expect(typeof Home.data).toBe('function')
    });

    it('api must render an object', () => {        
        expect(typeof wrapper.vm.getProductsList()).toBe('object')
    });

    it('must return an currency string', () => {
        const currency = 39.90;

        expect(typeof wrapper.vm.currency(currency)).toBe('string')
    });

    it('is removed product to cart', () => {
        let mockId = {
            "id": 0,
          }
        
        expect(wrapper.vm.updateCart(mockId)).toBe(undefined)
    });
    
    test.skip('is add product to cart', () => {
        const mockProduct = 
            {
                "id": 1,
                "sku": 18644119330491312,
                "title": "Camisa Nike Corinthians II",
                "description": "14/15 s/nº",
                "availableSizes": ["S", "G", "GG", "GGG"],
                "style": "Preta com listras brancas",
                "price": 229.9,
                "installments": 9,
                "currencyId": "BRL",
                "currencyFormat": "R$",
                "isFreeShipping": true
            }

        expect(wrapper.vm.addProductCart(mockProduct));
    })

    it('is showing modal', () => {
        expect(wrapper.vm.showModal()).toBe(true)
    })
});

