// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // DOM elements
    const featuredImage = document.getElementById('featured-image');
    const imageCaption = document.getElementById('image-caption');
    const exploreButton = document.getElementById('explore-button');
    const thumbnails = document.getElementById('thumbnail-list');
    const banner = document.querySelector('.banner');
    const thumbnailsSection = document.querySelector(".thumbnails-section");

    // Image data
    const images = [
        // Array of image objects with details
        {
            large: 'images/flowers-white-large.jpg',
            small: 'images/flowers-white-small.jpg',
            caption: ' White Flowers',
            link: 'https://commons.wikimedia.org/w/index.php?curid=48211466',
            description: 'Daffodils in Sentmaring park, Münster, North Rhine-Westfalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0',
            bannerColor: '#627254'
        },
      
        {
            large: 'images/flowers-purple-large.jpg',
            small: 'images/flowers-purple-small.jpg',
            caption: ' Purple Flowers',
            link: 'https://commons.wikimedia.org/w/index.php?curid=48576226',
            description: 'Sentmaring Park, Münster, North Rhine-Westphalia, Germany  By Dietmar Rabich - Own work, CC BY-SA 4.0',
            bannerColor: '#7469B6'
        },
        {
            large: 'images/flowers-red-large.jpg',
            small: 'images/flowers-red-small.jpg',
            caption: ' Red Flowers',
            link: 'https://commons.wikimedia.org/w/index.php?curid=40957238',
            description: 'Poppies in cornfield, Dülmen, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0',
            bannerColor: '#F24C3D'
        },
        {
            large: 'images/flowers-pink-large.jpg',
            small: 'images/flowers-pink-small.jpg',
            caption: ' Pink Flowers',
            link: 'https://commons.wikimedia.org/w/index.php?curid=62071586',
            description: 'Market in Münster, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0',
            bannerColor: '#E493B3'
        },
        {
            large: 'images/flowers-yellow-large.jpg',
            small: 'images/flowers-yellow-small.jpg',
            caption: ' Yellow Flowers',
            link: 'https://commons.wikimedia.org/w/index.php?curid=61514522',
            description: 'Sunflowers in the hamlet Dernekamp, Kirchspiel, Dülmen, North Rhine-Westphalia, Germany By Dietmar Rabich - Own work, CC BY-SA 4.0',
            bannerColor: '#FFCD4B'
        },
        
    ];

    // Function to update the featured image and related details
    function updateFeaturedImage(image) {
        featuredImage.src = image.large;
        imageCaption.textContent = image.caption;
        exploreButton.href = image.link;
        document.getElementById('image-description').textContent = image.description;

        // Set all thumbnail images to inactive
        document.querySelectorAll('#thumbnail-list img').forEach(img => img.classList.add('inactive'));
        
        // Activate the thumbnail corresponding to the selected image
        document.querySelectorAll('#thumbnail-list img').forEach(img => {
            if (img.src.endsWith(image.small)) {
                img.classList.remove('inactive');
            }
        });

        // Update the banner color
        updateBannerColor(image.bannerColor);
    }

    // Function to update the banner color
    function updateBannerColor(color) {
        banner.style.background = color;
    }

    // Loop through each image to create thumbnails
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.small;
        imgElement.alt = image.caption;
        imgElement.classList.add('inactive');

        // Add click event listener to thumbnail images
        imgElement.addEventListener('click', () => {
            updateFeaturedImage(image);
        });

        const listItem = document.createElement('li');
        listItem.appendChild(imgElement);
        thumbnails.appendChild(listItem);
    });

    // Add mouseover event listener to thumbnail images
    const thumbnailImages = document.querySelectorAll('#thumbnail-list img');
    thumbnailImages.forEach((img, index) => {
        img.addEventListener('mouseover', () => {
            // Scroll only when hovering over the third image (index 2)
            if (index === 2) {
                smoothScroll(thumbnailsSection, 500, 850); 
            }
        });
    });

    // Function for smooth scrolling
    function smoothScroll(element, to, duration) {
        let start = element.scrollTop;
        let change = to - start;
        let currentTime = 0;
        const increment = 20;

        // Easing function for smooth scroll
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        // Animate the scroll
        function animateScroll() {
            currentTime += increment;
            const val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
        }

        animateScroll();
    }

    // Initialize with the first image
    updateFeaturedImage(images[0]);
});
