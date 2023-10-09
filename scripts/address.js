var employees = [];
$(document).ready(function () {
  var addressBook = new employeeService();

  $("#userListItems").on("click", ".user-list-item", function () {
    $("#formSection").hide();
    var id = $(this).attr("id");
     
    var data = addressBook.getEmployee(parseInt(id));
   
    showUserDetails(data);
  });

  function populateUserList() {
    var userListItems = $("#userListItems");
    $("#userListItems").html(" ");
    employees = addressBook.getAllEmployees();
    employees.forEach(function (data) {
      var listItem = `<div class="user-list-item" id='${data.id}'> 
    <span  class="user-list-name"> ${data.name}</span> <br>
    <span class="user-list-email"> ${data.email}</span> <br>
    <span class="user-list-mobile">${data.mobile}</span> <br>
</div>`;
      userListItems.append(listItem);
    });
  }

  populateUserList();

  $("#show").click(function () {
    // e.preventDefault();

    $("#formSection").show();
    clearForm();
  });

  $("#show").click(function () {
    $("#userDetailsContent").hide();
    $("#update").hide();
    $("#addSubmit").show();
    $("#func").hide();
  });

  $("#home").click(function () {
    $("#formSection").hide();
  });
  $(".user-list-item").click(function () {
    $("#func").show();
    $("#userDetailsContent").show();
  });

  $("#addSubmit").click(function () {
    var obj = {
      name: $("#name").val(),
      email: $("#email").val(),
      mobile: $("#mobile").val(),
      landline: $("#landline").val(),
      website: $("#website").val(),
      address: $("#address").val(),
    };

    if (Validationform()) {
      employees = addressBook.addEmployee(obj);

      var listItem = `<div class="user-list-item" id='${employees.id}'>
            <span class="user-list-name">${employees.name}</span> <br>
            <span class="user-list-email">${employees.email}</span> <br>
            <span class="user-list-mobile">${employees.mobile}</span> <br>
          </div>`;

      $("#userListItems").append(listItem);
      $("#divUserDetail").show();

      clearForm();
      $("#formSection").hide();

    }
  });

  $(".deleteData").click(function () {
    var delId = $("#hdnUserID").val();
    console.log("Deleting user ID: " + delId);

    var deleted = addressBook.deleteEmployee(delId);

    if (deleted) {
      $("#userListItems #" + delId).remove();
      $("#id").text("");
      $("#nameLbl").text("");
      $("#emailLbl").text("");
      $("#mobileLbl").text("");
      $("#landlineLbl").text("");
      $("#websiteLbl").text("");
      $("#addressLbl").text(" ");

      $("#divUserDetail").hide();
      $("#formSection").hide();

      console.log("Data is deleted");
      $("#func").hide();
      clearForm();
    } else {
      console.log("Failed to delete data.");
    }
  });

  $(".editData").click(function () {
    var editid = $("#hdnUserID").val();
    var editget = addressBook.getEmployee(parseInt(editid));
    console.log(editget);
    $("#name").val(editget.name);
    $("#email").val(editget.email);
    $("#mobile").val(editget.mobile);
    $("#landline").val(editget.landline);
    $("#website").val(editget.website);
    $("#address").val(editget.address);


// $("#divUserDetail").hide();
    $("#addSubmit").hide();
    $("#update").show();
    $("#formSection").show();
  });


  $("#update").click(function () {
    var updateId = $("#hdnUserID").val();
    var obj = {
      id: parseInt(updateId),
      name: $("#name").val(),
      email: $("#email").val(),
      mobile: $("#mobile").val(),
      landline: $("#landline").val(),
      website: $("#website").val(),
      address: $("#address").val(),
    };

    if (Validationform()) {
      var id = $("#hdnUserID").val();
      addressBook.updateEmployee(obj);
      populateUserList();
      clearForm();

      var data = addressBook.getEmployee(parseInt(id));

      showUserDetails(data);

      // $("#divUserDetail").show();

      $("#formSection").hide();
    }
  });
});

function showUserDetails(data) {
  console.log("data id :" + data.id);
  $("#hdnUserID").val(data.id);
  $("#id").text(data.id);
  $("#nameLbl").text(data.name);
  $("#emailLbl").text("Email: " + data.email);
  $("#mobileLbl").text("Mobile: " + data.mobile);
  $("#landlineLbl").text("Landline: " + data.landline);
  $("#websiteLbl").text("Website: " + data.website);
  $("#addressLbl").text("Address: " + data.address);


  $("#userDetailsContent").show();
  $("#func").show();
  $("#divUserDetail").show();
}

function clearForm() {
  $("#name").val("");
  $("#email").val("");
  $("#mobile").val("");
  $("#landline").val("");
  $("#website").val("");
  $("#address").val("");
}


function Validationform() {
  var name = $("#name").val();

  var email = $("#email").val();

  var mobile = $("#mobile").val();

  var landline = $("#landline").val();

  var address = $("#address").val();

  $(".name-error").text("");
  $(".email-error").text("");
  $(".mobile-error").text("");
  $(".landline-error").text("");
  $(".address-error").text("");

  isValid = true;

  if (name == "") {
    $(".name-error").text("* Name is required.").css({ color: "red" });

    isValid = false;
  } else if (!isValidName(name)) {
    $(".name-error").text("* Numbers are not allowed.").css({ color: "red" });

    isValid = false;
  }

  if (email == "") {
    $(".email-error").text("* Email is required.").css({ color: "red" });

    isValid = false;
  } else if (!isValidEmail(email)) {
    $(".email-error").text("* Invalid email format.").css({ color: "red" });

    isValid = false;
  }
  if (mobile == "") {
    $(".mobile-error")
      .text("* Mobile number is required.")
      .css({ color: "red" });

    isValid = false;
  } else if (!isValidMobile(mobile)) {
    $(".mobile-error").text("* Invalid mobile number.").css({ color: "red" });

    isValid = false;
  }
  if (landline == "") {
    $(".landline-error").text("*   number is required.").css({ color: "red" });

    isValid = false;
  } else if (!isValidlandline(landline)) {
    $(".landline-error").text("* Invalid landline number.").css({ color: "red" });

    isValid = false;
  }
  if (address == "") {
    $(".address-error")
      .text("* Please enter your Address.")
      .css({ color: "red" });

    isValid = false;
  } else if (!isValidaddress(address)) {
    $(".address-error")
      .text("* Please enter your permanent Address.")
      .css({ color: "red" });

    isValid = false;
  }
  return isValid;
}
function isValidName(name) {
  var nameRegex = /^[a-zA-Z-" "]+$/;

  return nameRegex.test(name);
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function isValidMobile(mobile) {
  var mobileRegex = /^\d{10}$/;

  return mobileRegex.test(mobile);
}
function isValidlandline(landline) {
  var mobileRegex = /^\d{10}$/;

  return mobileRegex.test(landline);
}
function isValidaddress(address) {
  var addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

  return addressRegex.test(address);
}
