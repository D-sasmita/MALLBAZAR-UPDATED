document.addEventListener('DOMContentLoaded', function() {
    // Navigation link elements and featured section
    const homeLink = document.querySelector('.navbar-nav .nav-item a[href="index.html"]');
    const shopLink = document.querySelector('.navbar-nav .nav-item a[href="#featured"]');
    const featuredSection = document.getElementById('featured');

    // Validation function for the signup form
    function validate() {
        console.log("validate function called");
        let isValid = true;

        const email = document.getElementById("email").value.trim();
        const emailError = document.getElementById("e");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (email === "") {
            emailError.textContent = "Email is required.";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "Invalid email format.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        const password = document.getElementById("password").value.trim();
        const passwordError = document.getElementById("p");

        if (password === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            isValid = false;
        } else {
            passwordError.textContent = "";
        }

        return isValid;
    }

    // Function to set the active navigation link
    function setActiveLink(activeElement) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        activeElement.classList.add('active');
        activeElement.setAttribute('aria-current', 'page');
    }

    // Set "Home" as active on initial load
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        setActiveLink(homeLink);
    }

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add scroll event listener to update active link based on visible section
    window.addEventListener('scroll', function() {
        if (featuredSection && isInViewport(featuredSection)) {
            setActiveLink(shopLink);
        } else if (homeLink && featuredSection && (window.scrollY < featuredSection.offsetTop - 50)) { // Added check for featuredSection existence
            setActiveLink(homeLink);
        }
    });

    // Add click listener to the Shop link
    if (shopLink) {
        shopLink.addEventListener('click', function() {
            setActiveLink(shopLink);
        });
    }

    // Cart page specific JavaScript (consider moving to a separate file or conditional)
    function updateTotal(element) {
        const row = element.closest('.cart-item');
        const price = parseFloat(row.querySelector('.item-price').innerText);
        const quantity = parseInt(element.value);
        const totalCell = row.querySelector('.item-total');
        const newTotal = (price * quantity).toFixed(2);
        totalCell.innerText = newTotal;
        updateCartTotal();
    }

    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('.item-total').forEach(item => {
            total += parseFloat(item.innerText);
        });
        document.getElementById('total-cart-price').innerText = total.toFixed(2);
    }

    function addItem(button) {
        alert('Item added to the cart!');
    }

    function saveForLater(button) {
        alert('Item saved for later!');
    }

    const applyCouponButton = document.getElementById('apply-coupon');
    const couponCodeInput = document.getElementById('coupon-code');
    const couponMessage = document.getElementById('coupon-message');

    if (applyCouponButton) {
        applyCouponButton.addEventListener('click', function () {
            const couponCode = couponCodeInput ? couponCodeInput.value : '';
            const message = couponCode === 'DISCOUNT10' ? 'Coupon applied! 10% off!' : 'Invalid coupon code.';
            if (couponMessage) {
                couponMessage.innerText = message;
            }
        });
    }
});