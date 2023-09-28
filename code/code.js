window.addEventListener('load', () => {
	const topbarHeight = document.querySelector('.topbar').offsetHeight
	console.log(topbarHeight)
	document.body.style.marginTop = `${topbarHeight}px`
})
