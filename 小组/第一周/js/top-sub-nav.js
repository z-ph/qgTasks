const topSubNav = document.querySelector('header .sub-nav');
console.log(topSubNav);
const siteNav = document.querySelectorAll('.site-header .container .nav-item li');
console.log(siteNav);
siteNav.forEach(navItem => {
    navItem.addEventListener('mouseover', () => {
        console.log('hover');
        topSubNav.classList.add('show');
    });
    
    navItem.addEventListener('mouseleave', () => {
        topSubNav.classList.remove('show');
    });
});

topSubNav.addEventListener('mouseover',()=>{
    console.log('topSubNav hover');
    topSubNav.classList.add('show');
})
topSubNav.addEventListener('mouseleave',()=>{
    console.log('topSubNav leave');
    topSubNav.classList.remove('show');
})

