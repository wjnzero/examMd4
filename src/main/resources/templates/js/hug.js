
    $(document).ready(function(){
    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function(){
    if(this.checked){
    checkbox.each(function(){
    this.checked = true;
});
} else{
    checkbox.each(function(){
    this.checked = false;
});
}
});
    checkbox.click(function(){
    if(!this.checked){
    $("#selectAll").prop("checked", false);
}
});
});

    function listStudent(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/student",
        success:function (data){
            console.log(data)
            let str=` <tr>`+
                `  <th>id</th>`+
                `  <th>name</th>`+
                `  <th>dateBirth</th>`+
                `  <th>phone</th>`+
                `  <th>email</th>`+
                `  <th>classroom</th>`+
                `  <th>feature</th>`+
                ` </tr>`;
            if(data==null){
                document.getElementById("student_list").innerHTML=str;
            }
            else {
                for (let i=0; i<data.content.length; i++){
                    str += getListStudent(data.content[i]);
                }
                document.getElementById("student_list").innerHTML= str;
            }
        }
    })
}

    function listClass(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/classroom",
        success:function (data){
            console.log(data)
            let str= ""
            if(data==null){
                document.getElementById("class-room").innerHTML=str;
            }
            else {
                for (let i=0; i<data.content.length; i++){

                    // str += data.content[i].name;
                    str += `<option value=${data.content[i].id}>`+`${data.content[i].name}`+`</option>`;
                }
                document.getElementById("class-room").innerHTML= str;
            }
        }
    })
}
    listStudent();
    listClass();

    function getListStudent(student){
    return `<tr>`+
    `<td>${student.id}</td>`+
    `  <td><a href="#detailEmployeeModal" data-toggle="modal" onclick="showFormDetail(${student.id})">${student.name}</a></td>`+
    `  <td>${student.dateBirth}</td>`+
    `  <td>${student.phone}</td>`+
    `  <td>${student.email}</td>`+
    `  <td>${student.classroom.name}</td>`+
    `  <td>`+
    `    <a href="#editEmployeeModal" onclick="showFormUpdate(${student.id})" class="edit" data-toggle="modal"><i class="material-icons"`+
    `                                                                         data-toggle="tooltip"`+
    `                                                                         title="Edit">&#xE254;</i></a>`+
    `    <a href="#deleteEmployeeModal" onclick="showForDelete(${student.id})" class="delete" data-toggle="modal"><i class="material-icons"`+
    `                                                                             data-toggle="tooltip"`+
    `                                                                             title="Delete">&#xE872;</i></a>`+
    `  </td>`+
    ` </tr>`
}

    function showFormUpdate(id){

    $.ajax({
        type:"GET",
        url:`http://localhost:8080/student/${id}`,
        success:function (data){
            console.log(data)
            $('.id-update').val(`${id}`)  ;
            $('.name-update').val(`${data.name}`)  ;
            $('.national-update').val(`${data.national}`) ;
            $('.area-update').val(`${data.area}`) ;
            $('.population-update').val(`${data.population}`) ;
            $('.dicription-update').val(`${data.dicription}`) ;
            $('.gdp-update').val(`${data.gdp}`) ;
        }
    })
}
    function showFormDetail(id){

    $.ajax({
        type:"GET",
        url:`http://localhost:8080/student/${id}`,
        success:function (data){
            console.log(data)
            $('.id-detail').val(`${id}`)  ;
            $('.name-detail').val(`${data.name}`)  ;
            $('.national-detail').val(`${data.national}`) ;
            $('.area-detail').val(`${data.area}`) ;
            $('.population-detail').val(`${data.population}`) ;
            $('.dicription-detail').val(`${data.dicription}`) ;
            $('.gdp-detail').val(`${data.gdp}`) ;
        }
    })
}
    function showForDelete(id){
    $('.id-delete').val(`${id}`) ;
    console.log(id)
}

    function addCity(){
    let name = $('.name').val()  ;
    let national=$('.national').val() ;
    let area=$('.area').val() ;
    let population=$('.population').val() ;
    let dicription= $('.dicription').val() ;
    let gdp= $('.gdp').val() ;
    let city= {
    name:name,
    national:national,
    area:area,
    population:population,
    dicription:dicription,
    gdp:gdp
}
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
},

    type:"POST",
    data:JSON.stringify(city),
    url:"http://localhost:8080/student",
    success:function (data){
    listStudent();
}

})
}

    function updateStudent(){
    let id = $('.id-update').val()  ;
    let name = $('.name-update').val()  ;
    let national=$('.national-update').val() ;
    let area=$('.area-update').val() ;
    let population=$('.population-update').val() ;
    let dicription= $('.dicription-update').val() ;
    let gdp= $('.gdp-update').val() ;
    let city= {
    name:name,
    national:national,
    area:area,
    population:population,
    dicription:dicription,
    gdp:gdp
}
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
},

    type:"PUT",
    data:JSON.stringify(city),
    url:`http://localhost:8080/student/${id}`,
    success:function (data){
    listStudent()
}

})
}

    function deleteStudent(){
    let id = $('.id-delete').val()  ;
    console.log(id)
    $.ajax({
    type:"DELETE",
    url:`http://localhost:8080/student/${id}`,
    success:function (){
    listStudent();
}
})
}
