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

        var feed = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fd2r-game.blogspot.com%2Ffeeds%2Fposts%2Fdefault%3Falt%3Drss";

        fetch(feed)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            blog_data = data
            data.items.forEach((item, index) => {
                if (index == 0) {
                    $('#main-blog-title').text(item.title)
                    $('#main-blog-content').html(item.description)
                }
                $('#sub-blog-tabs').append(
                    `
                        <div onclick="selectBlog('${item.title}')" class="row sub-blog-tab">
                            <a>${item.pubDate}</a>
                            <h5>${item.title}</h5>
                        </div>
                    `
                )
            })
        })
});

function selectBlog(title) {
    console.log(title)
}