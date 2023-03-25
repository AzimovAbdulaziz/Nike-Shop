const product = {
    'nike-air': {
        name: 'Nike-Air',
        price: 1800000,
        img: './img/cart-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    'air-jordan': {
        name: 'Air-Jordan',
        price: 1990000,
        img: './img/cart-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    'nike-netro': {
        name: 'Nike-Netro',
        price: 1350000,
        img: './img/cart-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    'air-spain': {
        name: 'Air-Spain',
        price: 1850000,
        img: './img/cart-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}

const productBtns = document.querySelectorAll('.product-card__btn')
const cartBtn = document.querySelector('.header-nav__cart')
const sidebar = document.querySelector('.sidebar')
const sidebarCloseBtn = document.querySelector('.sidebar-header__icon')
const cartCount = document.querySelector('.header-nav__cart-span')
const sidebarPrice = document.querySelector('.sidebar-footer__price')
const sidebarMain = document.querySelector('.sidebar-main')
const sidebarBuyBtn = document.querySelector('.sidebar-footer__title')
const printBody = document.querySelector ('.print__body')
const printFooter = document.querySelector('.print__footer')


cartBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active')
})

sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('active')
})


productBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        plusOrMines(btn)
    })
})

function plusOrMines(btn) {
    let parrent = btn.closest('.product-card')
    let parrentId = parrent.getAttribute('id')
    product[parrentId].amount++
    basket()
}

function basket() {
    const productArr = [];
    for (const key in product) {
        let prKey = product[key]
        let prCard = document.querySelector(`#${key}`)
        let prIndecarot = prCard.querySelector('.product-card__count')
        if (prKey.amount) {
            productArr.push(prKey)
            prIndecarot.classList.add('active')
            prIndecarot.innerHTML = prKey.amount
        } else {
            prIndecarot.classList.remove('active')
            prIndecarot.innerHTML = 0
        }
    }

    const allCount = totalCountProduct()
    if (allCount) {
        cartCount.classList.add('active')
    } else {
        cartCount.classList.remove('active')
    }
    cartCount.innerHTML = allCount.toLocaleString()
    sidebarPrice.innerHTML = totalPriceProduct()

    sidebarMain.innerHTML = ''
    for (let i = 0; i < productArr.length; i++) {
        sidebarMain.innerHTML += cardItemProduct(productArr[i])
    }
}


function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount > 0 ? 1 : 0
    }
    return total
}

function totalPriceProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total.toLocaleString()
}

function cardItemProduct(productArr) {
    const { name, img, totalSum, amount } = productArr

    return `
                <div class="sidebar-main__cart">
                    <div class="sidebar-main__cart-info">
                        <img src="${img}" alt="" class="sidebar-main__img">
                        <div class="sidebar-main__text">
                            <h3 class="sidebar-main__text-title">${name}</h3>
                            <p class="sidebar-main__text-sub">
                                ${totalSum.toLocaleString()} <span> сум</span>
                            </p>
                        </div>
                    </div>
                    <div class="plus-or-mines" id="${name.toLowerCase()}_card">
                        <button class="plus-or-mines__symb" data-symbol="-">
                            -
                        </button>
                        <span class="plus-or-mines__text">${amount}</span>
                        <button class="plus-or-mines__symb" data-symbol="+">
                            +
                        </button>
                    </div>
                </div>
    `
}

window.addEventListener('click', (event) => {
    const btn = event.target
    if (btn.classList.contains('plus-or-mines__symb')) {
        const attr = btn.getAttribute('data-symbol')
        const parrent = btn.closest('.plus-or-mines')
        if (parrent) {
            const idProduct = parrent.getAttribute('id').split('_')[0]
            if (attr == '+') product[idProduct].amount++ 
             else if (attr == '-') product[idProduct].amount--
             basket() 
        }
    }
})

sidebarBuyBtn.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
      const { name, totalSum, amount} = product[key]
    if (amount) {
        printBody.innerHTML += `
        <div class="print__body-item">
        <p class="print__body-item_name">
        <span>${name}</span>
        <span>${amount} pc: </span>
        </P>
        <p class="print__body-item_summ">
            ${totalSum.toLocaleString()} sum
        </p>
        </div>
    `  
    }
    }
 printFooter.innerHTML = `${totalPriceProduct().toLocaleString()} sum`
window.print()
location.reload()
})


