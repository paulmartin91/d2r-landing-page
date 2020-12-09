var blog_data = {}

$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 500, function(){
  
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
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
                if (index == 0) {
                    $('#main-blog-title').text(item.title)
                    $('#main-blog-content').html(item.content)
                }
                $('#sub-blog-tabs').append(
                    `
                        <div onclick="selectBlog('${item.title}')" class="row sub-blog-tab">
                            <a>${item.published}</a>
                            <h5>${item.title}</h5>
                        </div>
                    `
                )
            })
        })
});

function selectBlog(title) {
    console.log(title)
    blog_data.items.forEach(item => {
        if (item.title == title) {
            $('#main-blog-title').text(item.title)
            $('#main-blog-content').html(item.content)
        }
    })
}