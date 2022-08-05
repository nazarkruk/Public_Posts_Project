const BASE_URL = 'https://techcrunch.com/wp-json/wp/v2/posts'

window.addEventListener('DOMContentLoaded', ()=> {
    getPosts()
})
const mainContainer = document.getElementById('main-container')
const allPostsAria = document.getElementById('show-posts')


function getPosts (){
    //const allPostsAria = document.getElementById('show-posts')
    fetch(BASE_URL + '?per_page=4&context=embed')
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            allPostsAria.innerHTML += `
            <a href="#" data-id="${post.id}" class="article d-grid">
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
            </div>
            
        </a>
       `
        })
        addReadFullPost()
    }) 

}

const addReadFullPost = () => {
    const posts = document.querySelectorAll('a')
    posts.forEach((post) => {
        post.addEventListener('click', displayPost)
    })
}


const displayPost = (event) => {
    fetch (BASE_URL +'/' + `${event.target.parentElement.parentElement.dataset.id}`)
    .then(res => res.json())
    .then(post => {
        mainContainer.innerHTML = `
        <section class="blog-post section-header-offset">
        <div class="blog-post-container container">
            <div class="blog-post-data">
                <h3 class="title blog-post-title">${post.title.rendered}</h3>
                <div class="article-data">
                    <span>${post.date.slice(0,10)}</span>
                    <span class="article-data-spacer"></span>
                    <span>${post.parsely.meta.author[0].name}</span>
                </div>
                <img src=${post.jetpack_featured_media_url} alt="">
            </div>

            <div class="container">
                <p>
                ${post.content.rendered}
                </p>
                


                <blockquote class="quote">
                    <p><span><i class="ri-double-quotes-l"></i></span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptates, laboriosam voluptatum quos non consequuntur nesciunt necessitatibus tempora quod inventore corporis rem nihil itaque, at provident minus aliquam veritatis. Labore?  <span><i class="ri-double-quotes-r"></i></span></p>
                </blockquote>
            
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis eius possimus hic eligendi distinctio rerum incidunt, esse quasi eum molestiae ducimus ipsam quae, aliquid ullam placeat dolorum nulla vero. Quam? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quod necessitatibus, aspernatur pariatur asperiores earum quas adipisci veritatis quidem facilis! Nihil veniam quaerat nulla possimus, asperiores vero voluptatum placeat. Eveniet!
                </p>
                <div class="author d-grid" id ='author-about' >
                

                </div>
            </div>
        </div>
    </section>
        `
        fetch(`${post._links.author[0].href}`)
        .then (res => res.json())
        .then (author =>{
            //const authorImgUrl = `${author.avatar_urls['96']}`
            const authorAboutSection = document.getElementById('author-about')
            authorAboutSection.innerHTML = `
            
            <div class="author-image-box">
                <img src='${author.avatar_urls['96']}' alt="" class="article-image">
            </div>
            <div class="author-about" >
                <h3 class="author-name">${author.name}</h3>
                <p>${author.cbDescription}</p>
                <ul class="list social-media">
                    <li class="list-item">
                        <a href="#" class="list-link"><i class="ri-instagram-line"></i></a>
                    </li>
                    <li class="list-item">
                        <a href="#" class="list-link"><i class="ri-facebook-circle-line"></i></a>
                    </li>
                    <li class="list-item">
                        <a href="#" class="list-link"><i class="ri-twitter-line"></i></a>
                    </li>
                </ul>
            </div>
            
            `
            
        })
    })
}


