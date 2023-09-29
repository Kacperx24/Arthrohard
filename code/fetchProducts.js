const productsSection = document.querySelector('.products')

const productsList = document.querySelector('.products__list')

const selectBtn = document.querySelector('.products__select>button')
const optionsList = document.querySelector('.products__select div')

const optionButtons = document.querySelectorAll('.products__select div>button')

const amountOptions = [10, 20, 30, 50]

let isFetching = false

let dataIsFetched = false

const isScrolledToProductsSection = () => {
	const windowHeight = window.innerHeight
	const scrollPosition = window.scrollY

	return windowHeight + scrollPosition > productsSection.offsetTop
}

const fetchData = async (pageNumber, pageSize) => {
	if (!isFetching && !dataIsFetched) {
		isFetching = true

		const apiUrl = `https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber}&pageSize=${pageSize}`

		try {
			const response = await fetch(apiUrl)
			const data = await response.json()
			const products = data?.data
			products.forEach(({ id, name, value }) => {
				const productItem = document.createElement('div')
				productItem.classList.add('products__list-item')

				const productIdLabel = document.createElement('h3')
				productIdLabel.textContent = `ID: ${id}`
				productItem.appendChild(productIdLabel)

				productsList.appendChild(productItem)
			})
			isFetching = false
			dataIsFetched = true
			window.removeEventListener('scroll', onScroll)
		} catch (err) {
			console.error(err)
		}
	}
}

const onScroll = () => {
	if (isScrolledToProductsSection()) {
		fetchData(1, 20)
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
	dataIsFetched = false

	fetchData(2, selectedValue)

	const newOptions = amountOptions.filter(option => option !== selectedValue)

	newOptions.forEach((option, i) => {
		optionButtons[i].textContent = option
	})

	handleToggleOptionsWindow()
}

initializeAmountChangeLogic()

window.addEventListener('scroll', onScroll)

selectBtn.addEventListener('click', handleToggleOptionsWindow)
