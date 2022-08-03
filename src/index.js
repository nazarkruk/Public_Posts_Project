const BASE_URL = 'https://techcrunch.com/wp-json/wp/v2/posts?per_page=100&context=embed'

window.addEventListener('DOMContentLoaded', ()=> {
    getPosts()
})

function getPosts (){
    const allPostsAria = document.getElementById('show-posts')
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            allPostsAria.innerHTML += `
            <a href="#" class="article d-grid">
            <div class="all-posts-article-image-wrapper">
                <img src= ${post.jetpack_featured_media_url} alt="" class="article-image">
            </div>

            <div class="article-data-container">

                <div class="article-data">
                    <span>${post.date.slice(0,10)}</span>
                    <span class="article-data-spacer"></span>
                    <span>${post.parsely.meta.author[0].name}</span>
                </div>

                <h3 class="title article-title">${post.title.rendered}</h3>
                <p class="article-description">${post.excerpt.rendered}</p>

            </div>
        </a>
       `

        })
    }) 

}


