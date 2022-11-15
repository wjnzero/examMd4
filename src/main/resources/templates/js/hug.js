function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
                    str += `<option value=${data.content[i].id}>`+`${data.content[i].name}`+`</option>`;
                }
                document.getElementById("class-room").innerHTML= str;
            }
        }
    })
}

function studentClass(id){
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
                    if ((data.content[i].id)==id){
                        str += `<option value=${data.content[i].id} selected >`+`${data.content[i].name}`+`</option>`;
                }
                    else {
                        str += `<option value=${data.content[i].id}>`+`${data.content[i].name}`+`</option>`;
                    }
                }
                document.getElementById("class-room1").innerHTML= str;
            }
        }
    })
}
    listStudent();
    listClass();

    function getListStudent(student){
    return `<tr>`+
    `<td>${student.id}</td>`+
    `  <td><a href="#detailEmployeeModal" data-toggle="modal" onclick="showStudentDetail(${student.id})">${student.name}</a></td>`+
    `  <td>${student.dateBirth}</td>`+
    `  <td>${student.phone}</td>`+
    `  <td>${student.email}</td>`+
    `  <td>${student.classroom.name}</td>`+
    `  <td>`+
    `    <a href="#editEmployeeModal" onclick="showFormUpdate(${student.id})" class="edit" data-toggle="modal"><i class="fa fa-pencil"`+
    `                                                                         data-toggle="tooltip"`+
    `                                                                         title="Edit"></i></a>`+
    `    <a href="#deleteEmployeeModal" onclick="showForDelete(${student.id})" class="delete" data-toggle="modal"><i class="fa fa-ban"`+
    `                                                                             data-toggle="tooltip"`+
    `                                                                             title="Delete"></i></a>`+
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
            $('.datebirth-update').val(`${data.dateBirth}`) ;
            $('.phone-update').val(`${data.phone}`) ;
            $('.email-update').val(`${data.email}`) ;
            $('.classroom-update').val(`${data.classroom.name}`) ;
            sleep(200).then(() => {
                // Do something after the sleep!
                studentClass(data.classroom.id)
            });
        }
    })
}
    function showStudentDetail(id){

    $.ajax({
        type:"GET",
        url:`http://localhost:8080/student/${id}`,
        success:function (data){
            console.log(data)
            $('.id-detail').val(`${id}`)  ;
            $('.name-detail').val(`${data.name}`)  ;
            $('.datebirth-detail').val(`${data.dateBirth}`) ;
            $('.phone-detail').val(`${data.phone}`) ;
            $('.email-detail').val(`${data.email}`) ;
            $('.classroom-detail').val(`${data.classroom.name}`) ;
        }
    })
}
    function showForDelete(id){
    $('.id-delete').val(`${id}`) ;
    console.log(id)
}

    function addStudent(){
    let name = $('.name').val()  ;
    let dateBirth=$('.date_birth').val() ;
    let phone=$('.phone').val() ;
    let email=$('.email').val() ;
    let classroom= $('.classroom').val() ;
    let student= {
    name:name,
    dateBirth:dateBirth,
    phone:phone,
    email:email,
    classroom:classroom
}
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
},

    type:"POST",
    data:JSON.stringify(student),
    url:"http://localhost:8080/student",
    success:function (data){
    listStudent();
}

})
}

    function updateStudent(){
    let name = $('.name-update').val()  ;
    let id = $('.id-update').val();
    let dateBirth=$('.datebirth-update').val() ;
    let phone=$('.phone-update').val() ;
    let email=$('.email-update').val() ;
    let classroom= $('.classroom-update').val() ;
    let student= {
        id:id,
        name:name,
        dateBirth:dateBirth,
        phone:phone,
        email:email,
        classroom:classroom
    }
    $.ajax({
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
},

    type:"PUT",
    data:JSON.stringify(student),
    url:`http://localhost:8080/student/${id}`,
    success:function (data){
        sleep(1000).then(() => {
            // Do something after the sleep!
            listStudent();
        });
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
        sleep(1000).then(() => {
            // Do something after the sleep!
            listStudent();
        });
}
})
}
