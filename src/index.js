import './style.css';
import restoLogo from './logo.png';
import hamburgerPNG from './hamburger.png';
import menuLogoURL from './menulogo.png';
import sliderPic1 from './lospollos.jpg';
import sliderPic2 from './chicken-mascot1.jpg';
import sliderPic3 from './interior1.jpg';
import sliderPic4 from './gus&logo1.jpeg';
import darkGithub from './dark-github.png';
import lightGithub from './light-github.png';


const Restaurant = (function(){
    // Cache dom and etc...
    const htmEL = document.documentElement;
    const body = document.querySelector('body');
    const main = document.querySelector('#content');
    let header;
    let content;
    let footer;
    let homeSliderCon;
    let homeSliderImg;
    let sliderRadios = [];
    const sliderPics = [sliderPic1, sliderPic2, sliderPic3, sliderPic4];
    let subMenus = [
        'New Mexico Breakfast Burritos',
        'Chicken Specialties',
        'Pollos By The Bucket',
        'Pollos Platters',
        'Side Orders',
    ];
    const menuList = [
        ['Basic','Westside','New Mexico','Albuquerque','South Valley'],
        ['Grilled Chicken Sandwich', 'New Mexico Chicken Sandwich', 'Chicken Supreme', 'The Big Squawk', 'Chicken Wrap'],
        ['6pc', '8pc', '12pc', '16pc'],
        ['Enchilada Platter','Burrito Platter','Combination Platter', 'Chimichanga Platter','Taco Platter'],
        ['French Fries', 'Taco', 'Enchilada', 'Green Chile Cheese Fries', 'Chips and Homemade Salsa'],
    ];
    

    // ** Main modules START **
    function generateHeader(){
        let header = document.createElement('header');
        header.setAttribute('id', 'header');
        
        let headerLogo = generateLogo();
        headerLogo.setAttribute('id', 'header-logo');

        let headerTitle = document.createElement('h1');
        headerTitle.textContent = 'Los Pollos Hermanos';
        headerTitle.setAttribute('id', 'header-title');


        let headerNav = generateHeaderNav();
        headerNav.setAttribute('id', 'header-nav');
       
        header.appendChild(headerLogo);
        header.appendChild(headerTitle);
        header.appendChild(headerNav);

        return header;
    }

    function generateHeaderNav(){
        let headerNav = document.createElement('div');

        let navLinks = ['Home', 'Menu', 'Contact']
        for(let i = 0; i < navLinks.length; i++){
            let a = document.createElement('a');
            a.textContent = navLinks[i];
            a.href = '';
            a.classList.add('header-nav-links');
            a.addEventListener('click', (e)=>{
                e.preventDefault();
                main.appendChild(generateContent(i));
            })
            headerNav.appendChild(a);
        };


        let menuIcon = document.createElement('img');
        menuIcon.src = hamburgerPNG;
        menuIcon.setAttribute('id', 'dd-menu-icon');
        let dropDownMenu = document.createElement('a');
        dropDownMenu.setAttribute('id', 'header-menu');
        dropDownMenu.appendChild(menuIcon);
        dropDownMenu.href = '';
        dropDownMenu.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        headerNav.appendChild(dropDownMenu);
        return headerNav;
    }

    function generateContent(requestedContent){
        if(!isNaN(requestedContent) && [0,1,2].indexOf(requestedContent) != -1){
            
            clearContent();
            let returnedContent = (requestedContent == 0) ? generateHome(): 
                          (requestedContent == 1) ? generateMenu(): 
                          (requestedContent == 2) ? generateContact(): generateError();
            content = returnedContent;
            return returnedContent;
        }
        else return generateError();
    }
    
    function generateFooter(){
        let footer = document.createElement('footer');
        footer.setAttribute('id', 'footer');

        let leftDiv = document.createElement('div');
        leftDiv.setAttribute('id', 'footer-l');
        let footerLogo1 = generateLogo();
        footerLogo1.setAttribute('id', 'footer-logo-1');
        leftDiv.appendChild(footerLogo1);
        // Creates the nav-links on left side of footer
        let navLinks =  generateNavUL();
        navLinks.setAttribute('id', 'footer-ul');
        // let navLI = [... navLinks.children];
        // for(let i = 0; i < navLI.length; i++){
        //     navLI[i].classList.add('footer-li');
        // }
        navLinks.insertBefore(document.createTextNode('Los Pollos Hermanos'),navLinks.firstElementChild);
        leftDiv.appendChild(navLinks);

        let rightDiv = document.createElement('div');
        rightDiv.setAttribute('id', 'footer-r');
        let footerLogo2 = generateLogo();
        footerLogo2.setAttribute('id', 'footer-logo-2');
        let githubLogo = generateGitHubLogo(0);
        githubLogo.setAttribute('id', 'footer-creator-link');
        let creatorTag = document.createElement('h3');
        creatorTag.setAttribute('id', 'footer-creator-tag')
        creatorTag.textContent = 'Made by Viveyd';
        rightDiv.appendChild(footerLogo2);
        rightDiv.appendChild(githubLogo);
        rightDiv.appendChild(creatorTag);


        footer.appendChild(leftDiv);
        footer.appendChild(rightDiv);

        return footer;

    }
    function toggleMenu(){
        let navMenu = document.createElement('div');
        navMenu.setAttribute('id', 'nav-menu');
        let scrolledHeight = htmEL.scrollTop;
        navMenu.style.marginTop = scrolledHeight + 'px';

        let navMenuExit = document.createElement('button');
        navMenuExit.setAttribute('id', 'nav-menu-exit-btn');
        navMenuExit.textContent = 'X';
        navMenuExit.addEventListener('click', ()=>{
            exitNavMenu();
        })

        let navMenuUL = generateNavUL();
        navMenuUL.setAttribute('id', 'nav-menu-ul');
        [... navMenuUL.children].forEach(navLink => navLink.addEventListener('click', exitNavMenu));

        let restaurantInfo = document.createElement('div');
        restaurantInfo.setAttribute('id', 'nav-menu-info')
        let restaurantLogo = generateLogo();
        restaurantLogo.setAttribute('id', 'nav-menu-logo');
        let restaurantName = document.createElement('h2');
        restaurantName.textContent = 'Los Pollos Hermanos';
        restaurantInfo.appendChild(restaurantLogo);
        restaurantInfo.appendChild(restaurantName);

        let creatorInfo = document.createElement('div');
        creatorInfo.setAttribute('id', 'nav-menu-info')
        let gitLogo = generateGitHubLogo(0);
        gitLogo.setAttribute('id', 'nav-menu-logo');
        let creatorName = document.createElement('h2');
        creatorName.textContent = 'Made by Viveyd';
        creatorInfo.appendChild(gitLogo);
        creatorInfo.appendChild(creatorName);

        navMenu.appendChild(navMenuExit);
        navMenu.appendChild(navMenuUL);
        navMenu.appendChild(restaurantInfo);
        navMenu.appendChild(creatorInfo);
        body.appendChild(navMenu);

        disableScroll();
        blurHMF();
    }
    // ** Main modules END **
    
    function generateGitHubLogo(type){
        let logoCon = document.createElement('a');
        logoCon.href = 'https://github.com/Viveyd';

        let logo = document.createElement('img');
        logo.classList.add('logo');
        logo.src = (type == 0) ? darkGithub: lightGithub;

        logoCon.appendChild(logo)
        return logoCon;
    }
    // ** generateContent sub-modules START**
    function generateHome(){
        let homePage = document.createElement('div');
        homePage.setAttribute('id', 'content-page-0')
        homePage.classList.add('content-pages');

        let homeSlider = generateSlider();

        
       
        let article1 = generateArticle('"Los Pollos Hermanos or The Chicken Brothers. A fast food restaurant that specializes in chicken dishes, grilled or fried."');
        article1.classList.add('indented');
        let article2 = generateArticle('"Over 14 branches throughout south-west USA, all serving quality fast-food."');
        article2.classList.add('indented');
        let article3 = generateArticle( `"The finest ingredients are brought together with love and care, then slow cooked to perfection. Yes, the old ways are still best at Los Pollos Hermanos. But don't take my word for it. One taste, and you'll know."`);
        article3.classList.add('indented');
        let article4 = generateArticle( '"Los Pollos  Hermanos, where something delicious is always cooking."' );
        article4.classList.add('indented');
        let article5 = generateArticle(` "It's the best ingredients. The spiciest spices. All prepared with loving care! And always delivered with a friendly smile. That's the Los Pollos Hermanos promise." `);
        article5.classList.add('indented');

        
        homePage.appendChild(homeSlider);
        homePage.appendChild(article1);
        homePage.appendChild(article2);
        homePage.appendChild(article3);
        homePage.appendChild(article4);
        homePage.appendChild(article5);
        
        return homePage;
    }
    function generateMenu(){
        let menuPage = document.createElement('div');
        menuPage.setAttribute('id', 'content-page-1')

        let menuHeaderCon = document.createElement('div');
        menuHeaderCon.setAttribute('id', 'menu-page-header-con');
        

        let menuHeader = document.createElement('h2');
        menuHeader.setAttribute('id', 'menu-page-header');
        menuHeader.textContent = 'Los Pollos Hermanos Menu';
        menuHeaderCon.appendChild(menuHeader);
        menuPage.appendChild(menuHeaderCon)

        let menuCon = document.createElement('div');
        menuCon.setAttribute('id', 'menus-con');

        let menuLogoCon = document.createElement('div');
        menuLogoCon.setAttribute('id', 'menu-logo-con');

        let menuLogo = document.createElement('img');
        menuLogo.setAttribute('id', 'menu-logo');
        menuLogo.src= menuLogoURL;
        menuLogoCon.appendChild(menuLogo);

        menuPage.classList.add('content-pages');
        for(let i = 0; i < subMenus.length; i++){
            if(i == 1) menuCon.appendChild(menuLogoCon);
            let menuCard = generateMenuCard(subMenus[i], i);
            menuCard.setAttribute('id', `menu-card-${i+1}`);
            menuCon.appendChild(menuCard);
        }
        menuPage.appendChild(menuCon);
        return menuPage;
    }

    function generateContact(){
        let contactPage = document.createElement('div');
        contactPage.setAttribute('id', 'content-page-2')
        contactPage.classList.add('content-pages');

        let pageHeaderCon = document.createElement('div');
        let pageHeader = document.createElement('h2');
        pageHeader.textContent = 'Contact Us';
        let pageHeaderSub = document.createElement('p');
        pageHeaderSub.textContent = 'For any inquiries, concerns, feedbacks, or even opportunities tell us, your family at Los Pollos Hermanos!';
        pageHeaderCon.appendChild(pageHeader);
        pageHeaderCon.appendChild(pageHeaderSub);
        contactPage.appendChild(pageHeaderCon);
        pageHeaderCon.setAttribute('id', 'contact-header-con');

        let contactArticlesCon =document.createElement('div');
        contactArticlesCon.setAttribute('id', 'contact-articles-con');

        let contactArticle1 = generateContactArticle(sliderPic1, 'Inquiries', 'You have more questions? Ask away.', 'Inquire');
        let contactArticle2 = generateContactArticle(sliderPic1, 'Employment', 'Looking for a job? Being a chicken brother pays.', 'Apply');
        let contactArticle3 = generateContactArticle(sliderPic1, 'Feedback', 'How was our service? Share your experience.', 'Share');
        let contactArticle4 = generateContactArticle(sliderPic1, 'FAQs', 'We prepared a list of answers to the most frequently asked questions, all for you. Check it out.', 'Discover');
        let contactArticle5 = generateContactArticle(sliderPic1, 'Store Locator', 'Looking for our branch nearest to you? Let us help.', 'Locate');

        contactArticlesCon.appendChild(contactArticle1);
        contactArticlesCon.appendChild(contactArticle2);
        contactArticlesCon.appendChild(contactArticle3);
        contactArticlesCon.appendChild(contactArticle4);
        contactArticlesCon.appendChild(contactArticle5);
        contactPage.appendChild(contactArticlesCon);
        return contactPage;
    }

    // ** generateContent sub-modules END**

    //generateHome sub modules START

    function generateSlider(){
        let slider = document.createElement('div');
        homeSliderCon = slider;

        let sliderImage = document.createElement('img');
        homeSliderImg = sliderImage;
        sliderImage.classList.add('slider-image');
        slider.appendChild(sliderImage);

        let sliderRadiosCon = document.createElement('div');
        sliderRadiosCon.setAttribute('id', 'slider-radios-con');

        slider.classList.add('home-slider');
        for(let i = 1; i <= 4; i++){
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'slider-radio'
            radio.classList.add('slider-radio');
            if(i == 1){
                radio.checked = true;
                sliderImage.src = getImageByIndex(0);
            }
            radio.addEventListener('change', (e) => {
                changeSlide(e);
            });
            sliderRadiosCon.appendChild(radio);
            sliderRadios.push(radio);
        }
        slider.appendChild(sliderRadiosCon);
        return slider;
    }

    function changeSlide(e){
        let selectedSlide = e.target;
        let imageIndex = (selectedSlide == sliderRadios[0]) ? 0:
                         (selectedSlide == sliderRadios[1]) ? 1:
                         (selectedSlide == sliderRadios[2]) ? 2: 3;
        let image = getImageByIndex(imageIndex);
        homeSliderImg.src = image;
    }

    function getImageByIndex(imageIndex){
        return sliderPics[imageIndex];
    }

    function generateArticle(articleText){
        let article = document.createElement('article');
        article.classList.add('home-article');

        let para = document.createElement('p');
        para.textContent = articleText;

        article.appendChild(para);
        return article;
    }



    //generateHome sub modules END


    //generateMenu sub modules START

    function generateMenuCard(menuName, divIndex){
        let menuCard = document.createElement('div');
        menuCard.classList.add('menu-cards')

        let menuTitleCon = document.createElement('div');
        menuTitleCon.classList.add('menu-title-con');
        let menuTitle = document.createElement('h3');
        menuTitle.textContent = menuName;
        menuTitleCon.appendChild(menuTitle);
        menuCard.appendChild(menuTitleCon);

        if(divIndex == 4){
            let div1 = createSubmenuDiv(divIndex);
            [... div1.children].forEach(child => {
                child.style.display = 'grid';
                let price = document.createElement('p');
                price.classList.add('menu-price');
                price.textContent = '$1';
                child.appendChild(price);
                child.style.gridTemplateColumns = 'repeat(2, 1fr)';
            })
            menuCard.appendChild(div1);


            // let div2Con = document.createElement('div');
            // div2Con.classList.add('submenu-div-header');
            // let div2h3 = document.createElement('h3')
            // div2h3.textContent = 'Beverages';
            // div2Con.appendChild( div2h3);
            // menuCard.appendChild(div2Con);

            // let div3RowCon = document.createElement('div');
            // div3RowCon.setAttribute('id', 'submenu-hrow');
            // let rightDiv = document.createElement('div');
            // let desserts = document.createElement('p');
            // let dessertsPrice = document.createElement
            // rightDiv.appendChild(desserts);
            // rightDiv.appendChild(dessertsPrice);
            // let div3Con = document.createElement('div');
            // div3Con.classList.add('submenu-div-header-1');
            // let div3h3 = document.createElement('h3')
            // div3h3.textContent = 'Desserts';
            // div3Con.appendChild( div3h3);
            // div3RowCon.appendChild(div3Con);
            // menuCard.appendChild(div3RowCon);
        }
        else if(divIndex == 2){
            let div1 = createSubmenuDiv(divIndex);
            menuCard.appendChild(div1);
            [... div1.children].forEach(child => {
                child.style.display = 'grid';
                let price1 = document.createElement('p');
                price1.classList.add('menu-price' , 'wider');
                price1.textContent = '$1';
                child.appendChild(price1);
                let price2 = document.createElement('p');
                price2.classList.add('menu-price','wider');
                price2.textContent = '$1';
                child.appendChild(price1);
                child.appendChild(price2);
                child.style.gridTemplateColumns = '50% 25% 25%';
            })
            menuCard.appendChild(div1);
        }
        else{
            let div = createSubmenuDiv(divIndex);
            [... div.children].forEach(child => {
                child.style.display = 'grid';
                let price = document.createElement('p');
                price.classList.add('menu-price');
                price.textContent = '$1';
                child.appendChild(price);
                child.style.gridTemplateColumns = 'repeat(2, 1fr)';
            })
            menuCard.appendChild(div);
         }

        return menuCard;
    }

    function createSubmenuDiv(divIndex){
        let div = document.createElement('div');
        div.classList.add('menu-content-div');
        let len = menuList[divIndex].length
        div.style.gridTemplateRows = `repeat(${len}, 1fr)`;
        for(let i = 0; i < len; i++){
            let row = document.createElement('div');
            let p = document.createElement('p');
            p.textContent = menuList[divIndex][i];
            row.appendChild(p);
            div.appendChild(row); 
        }
        if(divIndex == 2){
        }
        return div;
    }

    //generateMenu sub modules END


    //generateContact sub modules START
    function generateContactArticle(imageUrl, title, content, btnText){
        let div = generateArticle(content);
        let titleCon = document.createElement('h3');
        titleCon.textContent = title;
        div.insertBefore(titleCon, div.firstElementChild);
        let image = document.createElement('img');
        image.src = imageUrl;
        div.insertBefore(image, div.firstElementChild);
        let btn = document.createElement('button');
        btn.textContent = btnText;
        div.appendChild(btn);
        div.classList.add('contact-article');
        div.classList.remove('home-article');
        return div;
    }
    
    
    //generateContact sub modules END
   
    //toggleNav sub modules START

    function generateNavUL(){
        let navLinks = document.createElement('ul');
        let navLinksArr = ['Home', 'Menu', 'Contact'];
        for(let i = 0; i < navLinksArr.length; i++){
            let li = document.createElement('li');
            li.classList.add('footer-li');
            let a = document.createElement('a');
            a.classList.add('footer-li-a')
            a.textContent = navLinksArr[i];
            a.addEventListener('click', (e) => {
                e.preventDefault();
                main.appendChild(generateContent(i))
            });
            a.href= "";
            
            li.appendChild(a);
            navLinks.appendChild(li);
        }
        return navLinks;
    }
    
    function exitNavMenu(){
        let navMenu = document.querySelector('#nav-menu');
        navMenu.parentElement.removeChild(navMenu);
        unblurHMF();
        enableScroll();
    }

    function disableScroll(){
        htmEL.classList.add('no-scroll');
        body.classList.add('no-scroll');
    }
    function enableScroll(){
        htmEL.classList.remove('no-scroll');
        body.classList.remove('no-scroll');
    }

    function blurHMF(){
        [header,content,footer].forEach(section => section.classList.add('blurred'));
    }

    function unblurHMF(){
        [header,content,footer].forEach(section => section.classList.remove('blurred'));
    }

    //toggleNav sub modules END

    //Auxillary functions
    
    function generatePage(){
        header = generateHeader();
        content = generateContent(0);
        footer = generateFooter();
        body.insertBefore(header, body.firstElementChild);
        main.appendChild(content);
        body.appendChild(footer);
    }
    function generateLogo(){
        let logoCon = document.createElement('a');
        logoCon.href = '';

        let logo = document.createElement('img');
        logo.classList.add('logo');
        logo.src = restoLogo;

        logoCon.appendChild(logo)
        return logoCon;
    }
    
    function generateError(){
        console.error('Error generating content. Content requested does not exist!');
        let emptyDiv = document.createElement('div');
        return emptyDiv;
    }

    function clearContent(){
        if(main.firstElementChild){
            while(main.firstElementChild) main.removeChild(main.firstElementChild);
            sliderRadios = [];
        }
    }

    return{
        generatePage,
    }
})();

Restaurant.generatePage();

