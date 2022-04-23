
$(document).ready(function(){

   traerProductos();
   
   traerUltimosProductos();



   $('#formAgregarProducto').submit(function(e){

      let formData = new FormData();
      let name = $('#nombre').val();
       let imagen = $('#imagen')[0].files;
       let stock = $('#stock').val();
      let descripcion = $('#descripcion').val();
      let precio = $('#precio').val();
  
formData.append('name', name);
formData.append('imagen', imagen[0]);
formData.append('stock', stock);
formData.append('descripcion', descripcion);
formData.append('precio', precio);

$.ajax({
   url:'../assets/crud/agregarProducto.php',
   type: 'POST',
   data:formData,
   contentType:false,
   processData:false,
   success:function(response){
      traerUltimosProductos();
     console.log("Respuesta",response);
   }
});

e.preventDefault();

   });

   $(document).on('click','.mod_prod',function(e){  
    console.log("Paso por aca");

    let formData = new FormData();
    let id_mod = $('#id-form-edit').val();
    let nombre_mod = $('#nombre-form-edit').val();
    let imagen_mod = $('#imagen-form-edit-send')[0].files;
    let stock_mod = $('#stock-form-edit').val();
    let descripcion_mod = $('#descripcion-form-edit').val();
    let precio_mod = $('#precio-form-edit').val();

formData.append('id', id_mod);
formData.append('name', nombre_mod);
formData.append('imagen', imagen_mod[0]);
formData.append('stock', stock_mod);
formData.append('descripcion', descripcion_mod);
formData.append('precio', precio_mod);
     console.log("ID A MODIFICAR", id_mod);

     $.ajax({
      url:'../assets/crud/editarProducto.php',
      type: 'POST',
      data:formData,
      contentType:false,
      processData:false,
      success:function(response){
         setTimeout(() => {
            traerProductos();
        }, 300);        
        console.log("Respuesta",response);
      }
   });

     
   });


  $(document).on('click','.editar',function(e){
var element = $(this)[0].parentElement.parentElement;
  let id = $(element).attr('id_Mod');
  console.log("Id a MODIFICAR",id);
  $.ajax({
   url:'../assets/crud/product-list.php',
   method: 'GET',
   success:function(response){
     let arrProducts = JSON.parse(response);
      for (let i = 0; i < arrProducts.length; i++) {
         if(arrProducts[i].id == id){
            console.log("EL ID ES",arrProducts[i].id);
          $('#id-form-edit').val(arrProducts[i].id);  
          $('#nombre-form-edit').val(arrProducts[i].titulo);
          $('#descripcion-form-edit').val(arrProducts[i].descripcion);
          $('#imagen-form-edit').attr("src","../assets/img/"+arrProducts[i].imagen);
          $('#stock-form-edit').val(arrProducts[i].stock);
          $('#precio-form-edit').val(arrProducts[i].precio);
          break;
         }
      }

   }

}); 
   
  
  });
   function traerProductos(){
      $.ajax({
         url:'../assets/crud/product-list.php',
         method: 'GET',
         success:function(response){
           let arrProducts = JSON.parse(response);
           console.log("Respuesta Traer Productos",arrProducts);
           let template = '';
           arrProducts.forEach(product => {
            template += ` 
     
                          <tr id_Mod="${product.id}">
                            <td>
                              <div class="d-flex px-2 py-1">
                                <div >
                                  
                                <div style="display:none;" id="id-mod-form">
                                ${product.id}
                                </div>
                                  
                                  <img src="../assets/img/${product.imagen}" class="avatar avatar-sm me-3" alt="user1">
                                </div>
                                <div class="d-flex flex-column justify-content-center">
                                  <h6 class="mb-0 text-sm">${product.titulo}</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p class="text-xs font-weight-bold mb-0">${product.precio}</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                              <span class="badge badge-sm bg-gradient-success">${product.stock}</span>
                            </td>
                            <td class="align-middle text-center">
                              <span class="text-secondary text-xs font-weight-bold">${product.descripcion}</span>
                            </td>
                            <td class="align-middle">
                             
                       
                          <button  style="background:transparent;border:none;"  id="editar"  name="editar" class="editar text-secondary font-weight-bold text-xs" data-toggle="modal" data-target="#exampleModal" data-original-title="Edit user">
                               Editar
                              </button>

                              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" style="background:transparent;border-radius:30px;border:none;" class="close" data-dismiss="modal" aria-label="Close">
        <span  aria-hidden="true">&times;</span>
      </button>
      </div>
      <div class="modal-body">
      <form role="form" id="formModificarProducto" enctype="multipart/form-data"">
      <div id="id-form-edit">
      </div>
        
      <div class="mb-3">
        <input type="text" name="nombre-form-edit" id="nombre-form-edit" class="form-control form-control-lg" placeholder="Nombre del Producto" aria-label="Nombre">
      </div>

      <div class="mb-3">
     <textarea name="descripcion-form-edit"  id="descripcion-form-edit"  class="form-control form-control-lg" placeholder="Descripcion del Producto" cols="30" rows="10"></textarea>    
      </div>
      <div class="mb-3">
      <img class="imagen-form-edit img-thumbnail" width="100" id="imagen-form-edit">

      </img>
      
          <input style="margin-left:20px;" type="file" id="imagen-form-edit-send" name="imagen-form-edit-send">
      </div>
      <div class="mb-3">
        <input type="text" id="stock-form-edit" name="stock-form-edit" class="form-control form-control-lg" placeholder="Stock del Producto" aria-label="Stock">
      </div>
      <div class="mb-3">
        <input type="text" id="precio-form-edit" name="precio-form-edit" class="form-control form-control-lg" placeholder="Precio del Producto" aria-label="Precio">
      </div>
      
    
      <div class="text-center">
      <button type="button" class="close mod_prod btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0" data-dismiss="modal" aria-label="Close">
      <span >Modificar Producto</span>
    </button>
  
     </div>
      
      
    </form>

      </div>
    </div>
  </div>
</div>

                              <a  id="eliminar" name="eliminar" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                               | Eliminar
                              </a>
                            </td>
                          </tr>




                          
              
            `
           });
 
    
           $('#table-products').html(template);
        
         }
      });     
   }

   function traerUltimosProductos(){
      $.ajax({
         url:'../assets/crud/product-list.php',
         method: 'GET',
         success:function(response){
           let arrProducts = JSON.parse(response);
           console.log("Respuesta Traer Productos",arrProducts);
           let arrUltimos3 = arrProducts.slice(-3);
           let template = '';
           arrUltimos3.forEach(product => {
            template += ` 
            <div class="card" style="margin:3%;">
          
            <div class="card-body" style="display:flex;">
            <div>
            <img class="img-thumbnail" width="100" src="../assets/img/${product.imagen}">  
            </div>
            <div style="display:block;padding-left:15px;">
              <h5 class="card-title">${product.titulo}</h5>
              <p class="card-text">$${product.precio}</p>
              </div>
          
              </div>
          </div>
            `
           });
 
    
           $('#tb-add-products-list').html(template);
   
         }
      });
   }

});    
$('#formModificarProducto').submit(function(e){
   $.ajax({
      url:'../assets/crud/editarProducto.php',
      type: 'POST',
      contentType:false,
      processData:false,
      success:function(response){
        console.log("Respuesta",response);
      }
   });
 });