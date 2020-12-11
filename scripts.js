var blog_data = {}
const appendLeadingZeroes = (n) => n <= 9 ? "0" + n : n

$(document).ready(function(){

       $('body').on('click','a[href^="#"]',function(event){
            event.preventDefault();
            var target_offset = $(this.hash).offset() ? $(this.hash).offset().top : 0;
            //change this number to create the additional off set        
            var customoffset = document.getElementById('nav-bar').offsetHeight//75//$('#nav-bar').height
            $('html, body').animate({scrollTop:target_offset - customoffset}, 500);
        });

        $(function () {
            $(document).scroll(function () {
              var $nav = $(".navbar-fixed-top");
              $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
            });
        });

        // API to Integrate Blog
        var API_KEY = "AIzaSyBWqd6wzwcFgKaxC5BkNLYReXsZZqmUkk8"
        var bloggerID = "4759296590722902555" //"2399953" // "1330659412086602715" //

        fetch(`https://www.googleapis.com/blogger/v3/blogs/${bloggerID}/posts/?key=${API_KEY}`)//, {mode: "no-cors"})
            .then(response => response.json())
            .then(data => {
            console.log(data)
            blog_data = data
            data.items.forEach((item, index) => {
                let temp_date = new Date(item.published)
                let formatted_date = appendLeadingZeroes(temp_date.getDate()) + "/" + appendLeadingZeroes(temp_date.getMonth() + 1) + "/" + temp_date.getFullYear()
                console.log(temp_date)
                // $(`#blog-container`).append(`
                //     <h5 id="main-blog-title" >${item.title} <span class="blog-date"><p>${formatted_date}</p></span></h5>
                //     <p id="main-blog-content" >${item.content}</p>
                //     <hr color="white">
                // `)
                if (index == 0) {
                    $(`#blog-container`).append(`
                        <h5 id="main-blog-title" >${item.title} <span class="blog-date"><p>${formatted_date}</p></span></h5>
                        <p id="main-blog-content" >${item.content}</p>
                    `)
                }
                $('#sub-blog-tabs').append(
                    // `
                    //     <li onclick="selectBlog('${item.title}')" class="list-group-item">
                    //         <a>${formatted_date}</a>
                    //         <h5>${item.title}</h5>
                    //     </li>
                    // `
                    // `
                    // <div onclick="selectBlog('${item.title}')" class="card bg-light mb-2" style="max-width: 18rem; color: black">
                    //     <div class="card-body">
                    //     <span class="card-subtitle">  ${formatted_date}</span>
                    //     <p class="card-title">${item.title}</p>
                    //   </div>
                    // </div>
                    // `
                    `
                    <li onclick="selectBlog('${item.title}')" data-toggle="collapse" data-target="#navbarSupportedContent" class="list-group-item list-group-item-action" style="max-width: 18rem; color: black">
                        <span class="card-subtitle">  ${formatted_date}</span>
                        <p class="card-title">${item.title}</p>
                    </li>
                    `
                )
                $('#sub-blog-tabs-expanded').append(
                    `
                    <li onclick="selectBlog('${item.title}')" class="list-group-item list-group-item-action" style="max-width: 18rem; color: black">
                        <span class="card-subtitle">  ${formatted_date}</span>
                        <p class="card-title">${item.title}</p>
                    </li>
                    `
                )
            })
        })

        

});

function selectBlog(title) {
    console.log(title)
    blog_data.items.forEach(item => {
        if (item.title == title) {
            let temp_date = new Date(item.published)
            let formatted_date = appendLeadingZeroes(temp_date.getDate()) + "/" + appendLeadingZeroes(temp_date.getMonth() + 1) + "/" + temp_date.getFullYear()
            $(`#blog-container`).html(`
                <h5 id="main-blog-title" >${item.title} <span class="blog-date"><p>${formatted_date}</p></span></h5>
                <p id="main-blog-content" >${item.content}</p>
            `)
        }
    })
}