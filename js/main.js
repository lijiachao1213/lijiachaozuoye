// 全局数据存储
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let products = [
    { id: 1, name: 'iPhone 17 Pro', price: 8999.00, category: 'phone', image: '素材图片/67c6eeedf240c2964.jpg_e1080.webp', rating: 4.8 },
    { id: 2, name: 'MacBook Pro M3', price: 12999.00, category: 'laptop', image: '素材图片/780.jpg', rating: 4.9 },
    { id: 3, name: 'AirPods Max', price: 1499.00, category: 'headphone', image: '素材图片/680BF518-ECC2-4686-8B74-4AE8399F4D2B-e1607463024774.jpeg', rating: 4.7 },
    { id: 4, name: '小米 17 pro', price: 3999.00, category: 'phone', image: '素材图片/34856599.jpg', rating: 4.6 },
    { id: 5, name: '华为 Mate 70', price: 5999.00, category: 'phone', image: '素材图片/ChMkLGdP6CaIX8enAACnFvz1rtoAAmXPgM0bZIAAKcu416.jpg', rating: 4.5 },
    { id: 6, name: '索尼 INZONE 英纵 H9 II', price: 2299.00, category: 'headphone', image: '素材图片/h9_1215.jpg.thumb.537.537.png', rating: 4.5 },
    { id: 7, name: '索尼 WH-1000XM5', price: 17999.00, category: 'camera', image: '素材图片/ilce_7m5_w1.jpg.thumb.537.537.png', rating: 4.8 },
    { id: 8, name:'永劫无间', price:399, category:'gaming', image: '素材图片/OIP-C (1).jpg', rating: 4.8},
    { id: 9, name:'iPhone Air 专用 MagSafe 电池', price:799, category:'accessory', image: '素材图片/MGPG4.jpg', rating: 4.8}
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initUserState();
    loadProducts();
    initCarousel();
    initProfile();
});

// 初始化用户状态
function initUserState() {
    const authLink = document.getElementById('authLink');
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    
    if (currentUser) {
        if (authLink) {
            authLink.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name;
            authLink.href = 'profile.html';
        }
        if (userNameElement) {
            userNameElement.textContent = currentUser.name;
        }
        if (userEmailElement) {
            userEmailElement.textContent = currentUser.email;
        }
    }
}

// 加载商品
function loadProducts(filter = 'all') {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    let filteredProducts = products;
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
                <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> 加入购物车
                </button>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// 轮播图逻辑
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function initCarousel() {
    if (slides.length === 0) return;
    
    updateCarousel();
    
    // 自动轮播
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// 切换菜单（移动端）
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 搜索功能
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    
    alert('搜索: ' + query);
    // 实际应用中这里应该发送搜索请求
}

// 分类筛选
function filterByCategory(category) {
    loadProducts(category);
}

// 查看商品
function viewProduct(type) {
    window.location.href = 'product.html?type=' + type;
}

// 添加购物车
function addToCart(productId) {
    if (!currentUser) {
        alert('请先登录！');
        window.location.href = 'login.html';
        return;
    }
    
    alert('已加入购物车');
}

// 登录注册逻辑
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    loginForm.classList.toggle('active', tab === 'login');
    registerForm.classList.toggle('active', tab === 'register');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    
    // 重置错误信息
    emailError.textContent = '';
    passwordError.textContent = '';
    
    // 简单验证
    if (!email) {
        emailError.textContent = '请输入邮箱';
        return false;
    }
    
    if (!password) {
        passwordError.textContent = '请输入密码';
        return false;
    }
    
    // 模拟登录成功
    currentUser = {
        name: '张三',
        email: email,
        phone: '13800138000',
        registerDate: '2023-01-15'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('登录成功！');
    window.location.href = 'index.html';
    
    return false;
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;
    
    const errors = {
        name: document.getElementById('registerNameError'),
        email: document.getElementById('registerEmailError'),
        phone: document.getElementById('registerPhoneError'),
        password: document.getElementById('registerPasswordError'),
        confirm: document.getElementById('registerConfirmError')
    };
    
    // 重置错误信息
    Object.values(errors).forEach(error => error.textContent = '');
    
    // 验证逻辑
    let isValid = true;
    
    if (!name) {
        errors.name.textContent = '请输入用户名';
        isValid = false;
    }
    
    if (!email) {
        errors.email.textContent = '请输入邮箱';
        isValid = false;
    } else if (!isValidEmail(email)) {
        errors.email.textContent = '邮箱格式不正确';
        isValid = false;
    }
    
    if (!phone) {
        errors.phone.textContent = '请输入手机号';
        isValid = false;
    } else if (!isValidPhone(phone)) {
        errors.phone.textContent = '手机号格式不正确';
        isValid = false;
    }
    
    if (!password) {
        errors.password.textContent = '请输入密码';
        isValid = false;
    } else if (password.length < 6) {
        errors.password.textContent = '密码至少6位';
        isValid = false;
    }
    
    if (!confirm) {
        errors.confirm.textContent = '请确认密码';
        isValid = false;
    } else if (password !== confirm) {
        errors.confirm.textContent = '两次输入密码不一致';
        isValid = false;
    }
    
    if (!isValid) return false;
    
    // 模拟注册成功
    currentUser = {
        name: name,
        email: email,
        phone: phone,
        registerDate: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('注册成功！');
    window.location.href = 'index.html';
    
    return false;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

// 退出登录
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// 商品详情页功能
function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
        
        // 更新缩略图激活状态
        document.querySelectorAll('.thumbnails img').forEach(img => {
            img.classList.remove('active');
        });
        event.target.classList.add('active');
    }
}

function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return;
    
    let quantity = parseInt(quantityInput.value) + change;
    if (quantity < 1) quantity = 1;
    if (quantity > 10) quantity = 10;
    
    quantityInput.value = quantity;
}

function buyNow() {
    if (!currentUser) {
        alert('请先登录！');
        window.location.href = 'login.html';
        return;
    }
    
    const quantity = document.getElementById('quantity')?.value || 1;
    alert(`立即购买 ${quantity} 件商品`);
}

function addToWishlist() {
    if (!currentUser) {
        alert('请先登录！');
        window.location.href = 'login.html';
        return;
    }
    
    alert('已加入收藏');
}

// 个人中心功能
function initProfile() {
    if (currentUser) {
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileRegDate = document.getElementById('profileRegDate');
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEmail) profileEmail.textContent = currentUser.email;
        if (profileRegDate) profileRegDate.textContent = currentUser.registerDate;
    }
}

function showSection(sectionId) {
    // 更新菜单项状态
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 显示对应内容区域
    document.querySelectorAll('.profile-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function filterOrders(status) {
    const tabs = document.querySelectorAll('.order-tabs .tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    alert('筛选订单状态: ' + status);
}

function addNewAddress() {
    alert('添加新地址功能');
}

function editAddress(button) {
    alert('编辑地址功能');
}

function deleteAddress(button) {
    if (confirm('确定要删除这个地址吗？')) {
        button.closest('.address-card').remove();
    }
}

function saveSettings() {
    const name = document.getElementById('settingName')?.value;
    const email = document.getElementById('settingEmail')?.value;
    const phone = document.getElementById('settingPhone')?.value;
    
    if (name && email && phone) {
        // 更新当前用户信息
        currentUser = { ...currentUser, name, email, phone };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        alert('设置已保存');
    } else {
        alert('请填写完整信息');
    }
}

function changePassword() {
    alert('修改密码功能');
}

// 响应式调整
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});