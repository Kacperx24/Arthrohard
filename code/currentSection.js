const menuItemsContainer = document.querySelector('.topbar__items')
const menuItems = menuItemsContainer.querySelectorAll('p')
const sectionHighlight = document.querySelector('.topbar__highlight')

const sections = document.querySelectorAll('.section')

const highlightCurrentSection = index => {
	const activeItem = menuItems[index]
	const left = activeItem.offsetLeft
	const right = menuItemsContainer.offsetWidth - left - activeItem.offsetWidth

	sectionHighlight.style.opacity = '1'
	sectionHighlight.style.left = `${left}px`
	sectionHighlight.style.right = `${right}px`
}

const checkCurrentSection = () => {
	const windowHeight = window.innerHeight
	const scrollPosition = window.scrollY
	let index = -1

	sections.forEach((section, i) => {
		const sectionTop = section.offsetTop

		if (sectionTop < scrollPosition + 0.5 * windowHeight) {
			index = i
		}
	})
	if (index >= 0) {
		highlightCurrentSection(index)
	} else {
		sectionHighlight.style.opacity = '0'
	}
}

window.addEventListener('scroll', checkCurrentSection)
window.addEventListener('resize', checkCurrentSection)
