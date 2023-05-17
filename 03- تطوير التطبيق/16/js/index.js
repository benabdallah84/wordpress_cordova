var baseURL = "http://sofar.000webhostapp.com/wordpress/wordpress/wp-json/wp/v2/";
var loginURL = "https://sofar.000webhostapp.com/wordpress/wordpress/api/auth/generate_auth_cookie/?";
var postId;

getAllPost();

function getAllPost() {
    $.get(baseURL + "posts", function(data, status) {
        for (var i = 0; i < data.length; i++) {
            var news = '<div id=\"' + data[i]["id"] + '\" class="card">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator" src=\"' + $(data[i]["content"]["rendered"]).find("img").first().attr("src") + '\">' +
                '</div>' +
                '<div class="card-content">' +
                '<span class="card-title activator grey-text text-darken-4">' + $("<p>" + data[i]["title"]["rendered"] + "</p>").text() + '</span>' +
                '<p class="truncate">' + $(data[i]["content"]["rendered"]).text() + '</p>' +
                '<p><a href="#" onclick="getPost(' + data[i]["id"] + ')" data-transition="flow">اقرأ الخبر</a></p>' +
                '</div>' +
                '</div>';
            $("#main_page").append(news)
        }

    });
}

function getPost(id) {
    location.href = "#newsPage";
    postId = id;
    $.get(baseURL + "posts/" + id, function(data, status) {
        var title = $("<p>" + data["title"]["rendered"] + "</p>").text();
        var img = $(data["content"]["rendered"]).find("img").first().attr("src");
        var text = $(data["content"]["rendered"]).text();

        $("#page2Title1").html(title);
        $("#page2Title2").html(title);
        $("#page2Image").attr("src", img);
        $("#page2Text").html(text);
    });
    getComments(id);
}

function getComments(id) {
    $.get(baseURL + "comments", function(data, status) {
        data.forEach(function(element) {
            if (element["post"] == id) {
                var comment = '<li class="collection-item">' +
                    '<h5>' + element["author_name"] + '</h5>' +
                    $(element["content"]["rendered"]).text() + '</li>';
                $("#allComments").append(comment);
            }
        });
    });
}

function addComment() {
    $.post(baseURL + "comments", {
            author_email: $("#commenterEmail").val(),
            author_name: $("#commenterName").val(),
            content: $("#commentText").val(),
            post: postId
        })
        .done(function(data) {
            alert("تمت إضافة التعليق بنجاح");
        }).fail(function() {
            alert("نأسف لفشل إضافة تعليق");
        });
}

function getCategories() {
    $.get(baseURL + "categories", function(data, status) {
        for (var i = 0; i < data.length; i++) {
            var name = data[i]["name"];
            var allCat = '<a href="#" onclick=\"getAllNewsbyCat(' +
                data[i]["id"] + ', \'' + name + '\')\" class="collection-item">' +
                data[i]["name"] +
                '<span class="goto">>></span>' +
                '<span class="badge">' + data[i]["count"] + '</span>' +
                '</a>';
            $("#allCategories").append(allCat);
        }
    });
}


function getAllNewsbyCat(id, name) {
    location.href = "#catNewsPage";
    $("#catNewsHeader").html(name);
    $.get(baseURL + "posts?categories=" + id, function(data, status) {
        for (var i = 0; i < data.length; i++) {
            var news = '<div id=\"' + data[i]["id"] + '\" class="card">' +
                '<div class="card-image waves-effect waves-block waves-light">' +
                '<img class="activator" src=\"' + $(data[i]["content"]["rendered"]).find("img").first().attr("src") + '\">' +
                '</div>' +
                '<div class="card-content">' +
                '<span class="card-title activator grey-text text-darken-4">' + $("<p>" + data[i]["title"]["rendered"] + "</p>").text() + '</span>' +
                '<p class="truncate">' + $(data[i]["content"]["rendered"]).text() + '</p>' +
                '<p><a href="#" onclick="getPost(' + data[i]["id"] + ')" data-transition="flow">اقرأ الخبر</a></p>' +
                '</div>' +
                '</div>';
            $("#catNewsContent").append(news);
        }

    })
}


function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    $.get(loginURL + "username=" + username + "&password=" + password + "&seconds=60", function(data, status) {
        if (data["status"] == "ok") {
            location.href = "#mainPage";
            $(".loginPageLink").hide(1);
            $(".logoutLink").show(1);
        } else {
            $("#errorMessage").show(1);
        }
    });
}

function logout() {
    $(".loginPageLink").show(1);
    $(".logoutLink").hide(1);
}