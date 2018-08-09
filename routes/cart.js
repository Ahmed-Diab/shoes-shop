const express = require('express');
const router = express.Router();
const Productes = require('../modules/product');

// start get cart
router.get('/', (req, res, next)=>{
    var cart = req.session.cart;
    var desplay_cart = {items: [], total: 0, totalQut:0};
    var total = 0;
    var itemsQut = [];
    for(item in cart){
        desplay_cart.items.push(cart[item]);
        let qut = cart[item].qut;
        //to return total price in jade cart.total
        total += (cart[item].qut * cart[item].price)
        itemsQut.push(qut);

    }
    var totalQut = itemsQut.reduce(function(a, b) { return a + b; }, 0);
    desplay_cart.totalQut = totalQut
    desplay_cart.total = total;
    res.json({cart: desplay_cart});
});// end get cart

// set cart
router.get('/:id/:size', (req, res, next)=>{
    var productID = req.params.id
    var productSize = req.params.size
    req.session.cart = req.session.cart || [];
    var cart = req.session.cart;
    Productes.findById(req.params.id, (err, product)=>{
            if (err) {
                console.log(err)
            }else{
        var item = cart.find((o)=>{return o.id == productID+'size_'+productSize});
        if (item) {
            if(item.size === productSize){
                if (productSize === "41") {
                    if (item.qut < product.size_41) {
                        item.qut+=1;
                      }else{
                          item.qut = product.size_41;
                      }
                }else if(productSize === "42") {
                    if (item.qut < product.size_42) {
                        item.qut+=1;
                      }else{
                          item.qut = product.size_42;
                      }
                }else if(productSize === "43") {
                    if (item.qut < product.size_43) {
                        item.qut+=1;
                      }else{
                          item.qut = product.size_43;
                      }
                }else if(productSize === "44") {
                    if (item.qut < product.size_44) {
                        item.qut+=1;
                      }else{
                          item.qut = product.size_44;
                      }
                }else if(productSize === "45") {
                    if (item.qut < product.size_45) {
                        item.qut+=1;
                      }else{
                          item.qut = product.size_45;
                      }
                }else if(productSize === "46") {
                    if (item.qut < product.size_46) {
                        item.qut+=1;
                      }else{
                          item.qut = product.size_46;
                      }
                }

            }else if(item.size !== productSize){
                let newItem = {
                    title: product.title,
                    id: product._id + 'size_'+productSize,
                    price: product.price,
                    img:product.images[0],
                    qut: 1,
                    size:productSize,
                    category:product.category,
                    };
                cart.push(newItem);
                res.json({cart:req.session.cart})

              } 
            res.json({cart:req.session.cart})
        }if (!item) {
            let newItem = {
                title: product.title,
                id: product._id + 'size_'+productSize,
                price: product.price,
                img:product.images[0],
                qut: 1,
                size:productSize,
                category:product.category,
                };
            cart.push(newItem);
            res.json({cart:req.session.cart})
        }
    } 
})
});//end set cart

// start minus cart
router.get('/minus/:id/cart', (req, res, next)=>{
    var minusID = req.params.id
    req.session.cart = req.session.cart || [];
    var cart = req.session.cart;
        var item = cart.find((o)=>{return o.id === minusID});
        if (item) {
            if (item.qut <= 1) {
                for (let i = 0; i < cart.length; i++) {
                const item = cart[i]
                if(item.id === minusID){
                    cart.splice(i, 1);
                    break;
                    }// end if
                } // end for 
            }
            item.qut--;
            var desplay_cart = {items: [], total: 0, totalQut:0};
            var total = 0;
            var itemsQut = [];
            for(item in cart){
                desplay_cart.items.push(cart[item]);
                let qut = cart[item].qut;
                //to return total price in jade cart.total
                total += (cart[item].qut * cart[item].price)
                itemsQut.push(qut);
        
            }
            var totalQut = itemsQut.reduce(function(a, b) { return a + b; }, 0);
            desplay_cart.totalQut = totalQut
            desplay_cart.total = total;
            res.json({cart: desplay_cart});
        }
})// end minus cart qut

///////start plus cart qut
router.get('/plus/:id/:size/cart', (req, res, next)=>{
    var productID = req.params.id
    var productSize = req.params.size
    req.session.cart = req.session.cart || [];
    var cart = req.session.cart;
    
    Productes.findById(productID.slice(0, 24), (err, product)=>{

        if (err) {
            console.log(err)
        }else{
    var item = cart.find((o)=>{return o.id === productID});
    if (item) {
        if(item.size === productSize){
            var msg;
            if (productSize === "41") {
                if (item.qut < product.size_41) {
                    item.qut+=1;
                  }else{
                      item.qut = product.size_41;
                  }
            }else if(productSize === "42") {
                if (item.qut < product.size_42) {
                    item.qut+=1;
                  }else{
                      item.qut = product.size_42;
                  }
            }else if(productSize === "43") {
                if (item.qut < product.size_43) {
                    item.qut+=1;
                  }else{
                      item.qut = product.size_43;
                  }
            }else if(productSize === "44") {
                if (item.qut < product.size_44) {
                    item.qut+=1;
                  }else{
                      item.qut = product.size_44;
                  }
            }else if(productSize === "45") {
                if (item.qut < product.size_45) {
                    item.qut+=1;
                  }else{
                      item.qut = product.size_45;
                  }
            }else if(productSize === "46") {
                if (item.qut < product.size_46) {
                    item.qut+=1;
                  }else{
                      item.qut = product.size_46;
                  }
            }
            var desplay_cart = {items: [], total: 0, totalQut:0};
            var total = 0;
            var itemsQut = [];
            for(item in cart){
                desplay_cart.items.push(cart[item]);
                let qut = cart[item].qut;
                //to return total price in jade cart.total
                total += (cart[item].qut * cart[item].price)
                itemsQut.push(qut);
        
            }
            var totalQut = itemsQut.reduce(function(a, b) { return a + b; }, 0);
            desplay_cart.totalQut = totalQut
            desplay_cart.total = total;
            res.json({cart: desplay_cart});
          }   
    }
} 
})
})// end plus cart qut

// remove car qut
router.get('/remove/:id/remove', (req, res, next)=>{
    var productID = req.params.id
    req.session.cart = req.session.cart || [];
    var cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i]
        if(item.id == productID){
            cart.splice(i, 1);
            break;
        } // en if
      } // end for
      var desplay_cart = {items: [], total: 0, totalQut:0};
      var total = 0;
      var itemsQut = [];
      for(item in cart){
          desplay_cart.items.push(cart[item]);
          let qut = cart[item].qut;
          total += (cart[item].qut * cart[item].price)
          itemsQut.push(qut);
      }
      var totalQut = itemsQut.reduce(function(a, b) { return a + b; }, 0);
      desplay_cart.totalQut = totalQut
      desplay_cart.total = total;
      res.json({cart: desplay_cart}); 
})//end remove car qut

module.exports = router;