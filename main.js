let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//بعد م نسوي تحديث نبغى كلمه تحديث ترجع الى انشاء ف اضفنا مود
let mood = 'Create';
let tmp;


//نجيب المجموع
function getTotal(){
//+price.value نخلي العلامه قبل الكلام عشان تحول القيمه من سترنق الى عدد
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
         
    }else{
        //اذا كان المجموع فاضي يكون لونه احمر عكسه اخضر
        total.innerHTML = '';
        total.style.background = '#a10707'; 
    }
   
    }

    //ننشىء المنتجات 
    let dataPro;
    if(localStorage.product != null){
        dataPro = JSON.parse(localStorage.product)
    }else{
        dataPro = [];
    }
//قبل نجمعها ف مصفوفه ننشئ داله وداخلها الاوبجكت اللي يحتوي ع المنتجات
    submit.onclick = function(){
        let newPro = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toLowerCase(),
        }

        //اذا العنوان مو فاضي ابدا انشئ المنتجات واذا فاضي م ينشئ شئ
        if(title.value != ''
            && price.value != ''
            && newPro.count <101){
        if(mood ==='Create'){
         if(newPro.count > 1){
            for(let i = 0; i< newPro.count;i++)  {
                dataPro.push(newPro);
            }     
        }else{
           dataPro.push(newPro); 
        }

        }else{
            //tmp عملتها عشان iيكون ظاهر لكل العمليات وهنا لما نسوي تحديث جديد للبياانات 
            dataPro[tmp] = newPro;
            //بعد م تعدل البيانات رجع الزرار للكرييت
            let mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData() //استدعيتها عند البيانات اللي ابغاها تتفضى
    }
        //اضفت الاوبجكت اللي هي البيانات الجديده ف المصفوفه 
        // dataPro.push(newPro);
        //لان اللوكل تقبل استرنق فقط ف حطيت امر JSON
        localStorage.setItem('product', JSON.stringify(dataPro))  
        
        shoeData()
     }

     //افضي البيانات بعد م اعبيها
     function clearData(){
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        //لان المجموع رقم ف طريقه تفضيتها غير عنهم
        total.innerHTML = '';
        count.value = '';
        category.value = '';
     }
     // قرأت البيانات
     function shoeData(){
        getTotal()
        let table = '';
        for(let i = 0; i < dataPro.length; i++){
            // اضافه += عشان م يحذف الصف اللي قبل وانما يضيف عليه
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
            </tr>
            `;
        }
        document.getElementById('tbody').innerHTML = table;
        let btnDalete = document.getElementById('deleteAll');
        //اذا تساوي صفر يعني م في بيانات واذا اكبر من صفر فيه بيانات 
        if(dataPro.length > 0){
            //يكتب رقم البيانات عنده ${dataPro.length}
          btnDalete.innerHTML = `
          <button onclick="deleteAll()">delete All(${dataPro.length})</button>
            `  
        }else{
            //اذا م في بيانات م يطلع الزرار
            btnDalete.innerHTML = '';
        }
     }
     //عشان تكون المنتجات موجوده ع طول
     shoeData()

     //حذف منتج واحد 
     function deleteData(i){
        dataPro.splice(i,1);
        localStorage.product = JSON.stringify(dataPro);
        // اعرض البيانات بعد م احذفها بدال م احدث الصفحه
        shoeData()
     }

     function deleteAll(){
        //يحذف كل البيانات المخزنه 
        localStorage.clear()
        //يحذف من اندكس صفر لين النهايه
        dataPro.splice(0)
        // اعرض البيانات بعد م احذفها بدال م احدث الصفحه
        shoeData()
     }
     //تحديث البيانات
     function updateData(i){
        title.value = dataPro[i].title;
        price.value = dataPro[i].price;
        taxes.value = dataPro[i].taxes;
        ads.value = dataPro[i].ads;
        discount.value = dataPro[i].discount;
        getTotal()
        count.style.display = 'none';
        category.value = dataPro[i].category;
        submit.innerHTML = 'update';
        mood = 'updata';
        tmp = i;
        scroll({
            top:0,
            behavior:'smooth',
        })
     }

     //البحث عن المنتجات 
     let searchMood = 'title';

     function getSearchMood(id)
     {
        let search = document.getElementById('search');
        if(id == 'searchTitle'){
            searchMood = 'title';

        }else{
            searchMood = 'category';
        }
        search.placeholder = 'Search By '+ searchMood;
        search.focus()
        search.value = '';
        shoeData()
     }

     function searchData(value)
     {
        let table ='';
        for(let i =0; i < dataPro.length; i++){
        if(searchMood == 'title'){
            
                //ابحث ف البيانات اذا العنوان يتضمن القيمه او الكلمه اللي بحثت عنها
                if(dataPro[i].title.includes(value.toLowerCase())){
                    //بعد البحث ابغاه بس يعرض لي اللي بحثته
             table += `
                 <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
               <td><button onclick="updateData( ${i} )" id="update">update</button></td>
               <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
               </tr>
                 `;
                }
            
        }
        else{
                //ابحث ف البيانات اذا العنوان يتضمن القيمه او الكلمه اللي بحثت عنها
                if(dataPro[i].category.includes(value.toLowerCase())){
                    //بعد البحث ابغاه بس يعرض لي اللي بحثته
             table += `
                 <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
               <td>${dataPro[i].price}</td>
               <td>${dataPro[i].taxes}</td>
               <td>${dataPro[i].ads}</td>
               <td>${dataPro[i].discount}</td>
               <td>${dataPro[i].total}</td>
               <td>${dataPro[i].category}</td>
               <td><button onclick="updateData( ${i} )" id="update">update</button></td>
               <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
               </tr>
                 `;
                }
        } 
       }
    

        document.getElementById('tbody').innerHTML = table;
     }