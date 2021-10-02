class Goods{
    constructor(id, goods_id, name, amount, price){
      this.id = id
      this.goods_id = goods_id
      this.name = name
      this.amount = amount
      this.price = price
    }
  }
  let goods = new Goods
   goods = [
    {
      id: 1,
      goods_id: "2213",
      name: "MSI GX-75",
      amount: 23,
      price: 227
    },
    {
      id: 2,
      goods_id: "3333",
      name: "ASUS ROG XM-45",
      amount: 75,
      price: 132
    }
  ];
  
  $.each(goods, function(i, prod) {
    appendToProdTable(prod);
  });
  
  $("form").submit(function(e) {
    e.preventDefault();
  });
  
  $("form#addProd").submit(function() {
    let prod = {};
    let goodsIdInput = $('input[name="goods_id"]').val().trim();
    let nameInput = $('input[name="name"]').val().trim();
    let amountInput = $('input[name="amount"]').val().trim();
    let priceInput = $('input[name="price"]').val().trim();
    if (nameInput && priceInput && goodsIdInput && amountInput) {
      $(this).serializeArray().map(function(data) {
        prod[data.name] = data.value;
      });
      let lastProd = goods[Object.keys(goods).sort().pop()];
      prod.id = lastProd.id + 1;
  
      addProd(prod);
    } else {
      alert("All fields must have a valid value.");
    }
  });
  
  function addProd(prod) {
    goods.push(prod);
    appendToProdTable(prod);
  }
  
  function editProd(id) {
    goods.forEach(function(prod, i) {
      if (prod.id == id) {
        $(".modal-body").empty().append(`
                  <form id="updateProd" action="">
                      <label for="goods_id">Номер</label>
                      <input class="form-control" type="text" name="goods_id" value="${prod.goods_id}"/>
                      <label for="name">Название</label>
                      <input class="form-control" type="text" name="name" value="${prod.name}"/>
                      <label for="price">Количество</label>
                      <input class="form-control" type="number" name="amount" value="${prod.amount}"/>
                      <label for="price">Цена</label>
                      <input class="form-control" type="number" name="price" value="${prod.price}"/>
              `);
        $(".modal-footer").empty().append(`
                      <button type="button" type="submit" class="btn btn-primary" onClick="updateProd(${id})">Сохранить</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                  </form>
              `);
      }
    });
  }
  
  function deleteProd(id) {
    let action = confirm("Are you sure you want to delete this product?");
    let msg = "Product deleted successfully!";
    goods.forEach(function(prod, i) {
      if (prod.id == id && action != false) {
        goods.splice(i, 1);
        $("#prodTable #prod-" + prod.id).remove();
        flashMessage(msg);
      }
    });
  }
  
  function updateProd(id) {
    let msg = "Prod updated successfully!";
    let prod = {};
    prod.id = id;
    goods.forEach(function(prod, i) {
      if (prod.id == id) {
        $("#updateProd").children("input").each(function() {
          let value = $(this).val();
          let attr = $(this).attr("goods_id");
          if (attr == "goods_id") {
            prod.goods_id = value;
          } else if (attr == "name") {
            prod.name = value;
          } else if (attr == "amount") {
            prod.amount = value;
          } else if (attr == "price") {
            prod.price = value;
          }
        });
        goods.splice(i, 1);
        goods.splice(prod.id - 1, 0, prod);
        $("#prodTable #prod-" + prod.id).children(".prodData").each(function() {
          let attr = $(this).attr("goods_id");
          if (attr == "goods_id") {
            $(this).text(prod.goods_id);
          } else if (attr == "name") {
            $(this).text(prod.name);
          } else if (attr == "amount") {
            $(this).text(prod.amount);
          } else if (attr == "price"){
            $(this).text(prod.price);
          }
        });
        $(".modal").modal("toggle");
        flashMessage(msg);
      }
    });
  }
  
  function flashMessage(msg) {
    $(".flashMsg").remove();
    $(".row").prepend(`
          <div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
      `);
  }
  
  function appendToProdTable(prod) {
    $("#prodTable > tbody:last-child").append(`
          <tr id="prod-${prod.id}">
              <td class="prodData" name="goods_id">${prod.goods_id}</td>
              '<td class="prodData" name="name">${prod.name}</td>
              '<td id="prodAmount" class="prodData" name="amount">${prod.amount}</td>
              '<td id="prodPrice" class="prodData" name="price">${prod.price}</td>
              '<td align="center">
                  <button class="btn btn-success form-control" onClick="editProd(${prod.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn btn-danger form-control" onClick="deleteProd(${prod.id})">DELETE</button>
              </td>
          </tr>
      `);
  }