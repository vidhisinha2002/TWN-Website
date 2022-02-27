$("#add_user").submit(function(event) {
    alert("Data Inserted Successfully!");
})
$("#frm_login").submit(function(event) {
    alert("loged in Successfully!");
})
$("#frm_register").submit(function(event) {
    alert("Account created Successfully!");
})


$("#update_user").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})


$("#update_serviceprovider").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/serviceprovider/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})





$("#update_service").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})



if (window.location.pathname == "/admin_dashboard") {

    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
    $ondelete = $(".table tbody td a.delete1");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/serviceprovider/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}