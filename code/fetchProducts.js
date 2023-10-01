const productsSection = document.querySelector('.products')

const productsList = document.querySelector('.products__list')

const selectBtn = document.querySelector('.products__select>button')
const optionsList = document.querySelector('.products__select div')

const optionButtons = document.querySelectorAll('.products__select div>button')

const popup = document.querySelector('.popup')
const productIdLabel = document.getElementById('product-id')
const productNameLabel = document.getElementById('product-name')
const productValueLabel = document.getElementById('product-value')
const closePopUpIcon = document.querySelector('.popup__close')

const amountOptions = [10, 20, 30, 50]

let maxAmountOfData = 20

let isFetching = false

const isScrolledToProductsSection = () => {
	const windowHeight = window.innerHeight
	const scrollPosition = window.scrollY

	if (!productsList.children.length)
		return windowHeight + scrollPosition > productsSection.offsetTop

	return (
		windowHeight + scrollPosition >
		productsList.offsetTop + productsList.offsetHeight
	)
}

const fetchData = async (pageNumber, pageSize) => {
	if (!isFetching) {
		isFetching = true
		const apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`

		try {
			const response = await fetch(apiUrl)
			const data = await response.json()
			const products = data?.data

			products.forEach(({ id, name, value }) => {
				if (productsList.children.length >= maxAmountOfData) return

				const productItem = document.createElement('div')
				productItem.classList.add('products__list-item')

				const productIdLabel = document.createElement('h3')
				productIdLabel.textContent = `ID: ${id}`
				productItem.appendChild(productIdLabel)
				productItem.addEventListener('click', () =>
					onShowPopUp({ id, name, value })
				)

				productsList.appendChild(productItem)
			})

			isFetching = false
		} catch (err) {
			console.error(err)
		}
	}
}

const onShowPopUp = ({ id, name, value }) => {
	if (popup.classList.contains('disabled')) popup.classList.remove('disabled')
	productIdLabel.textContent = `ID: ${id}`
	productNameLabel.textContent = `Nazwa: ${name}`
	productValueLabel.textContent = `Wartość: ${value}`

	document.body.style.overflow = 'hidden'
}

const onScroll = () => {
	const productsAmount = productsList.children.length

	if (isScrolledToProductsSection() && productsAmount < maxAmountOfData) {
		const pageNum = Math.ceil(productsAmount / 8) + 1

		fetchData(pageNum, 8)
	}
}

const handleToggleOptionsWindow = () => {
	optionsList.classList.toggle('disabled')
}
const initializeAmountChangeLogic = () => {
	optionButtons.forEach(option => {
		option.addEventListener('click', () => onAmountChange(option))
	})
	handleToggleOptionsWindow()
}

const onAmountChange = option => {
	const selectedValue = parseInt(option.textContent)
	selectBtn.innerHTML = `${selectedValue}<img src="assets/chevron-down.svg" />`
	isFetching = false

	maxAmountOfData = selectedValue

	while (productsList.children.length > maxAmountOfData) {
		productsList.removeChild(productsList.lastElementChild)
	}

	const newOptions = amountOptions.filter(option => option !== selectedValue)

	newOptions.forEach((option, i) => {
		optionButtons[i].textContent = option
	})

	handleToggleOptionsWindow()
}

initializeAmountChangeLogic()

const onClosePopup = () => {
	if (!popup.classList.contains('disabled')) popup.classList.add('disabled')

	document.body.style.overflow = ''
}

closePopUpIcon.addEventListener('click', onClosePopup)

window.addEventListener('scroll', onScroll)

selectBtn.addEventListener('click', handleToggleOptionsWindow)
