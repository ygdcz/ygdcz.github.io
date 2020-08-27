$(function() {
	$('.card').click(function(e) {
		let card = $(e.currentTarget)
		//img 的位置
		let card_offset_scrolltop = $(card).offset().top - $(window).scrollTop()
		// console.log($(card).offset().top)
		$(card).css('--data-offset-top', card_offset_scrolltop * -1 + 'px')
		$(card).toggleClass('active')
		let ratio = 480 / 420
		let height = $(window).height()
		height -= $(card).find('img').outerHeight() * ratio
		height -= $(card).find('h4').outerHeight() * ratio
		height /= ratio
		$(card).find('.content').css('height', height)
		// 暂停body的滚动
		if ($(card).hasClass('active')) {
			$('body').addClass('noscroll')
		} else {
			$('body').removeClass('noscroll')
		}
	})
})
