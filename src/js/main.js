$(".register-form .form-inputs").attr('disabled','disabled')
$(".register-form .form-inputs").children().attr('disabled','disabled')
$(".register-form .form-inputs .btn, .navbar-appbtns a").click(function(event) {
    event.stopPropagation()
    event.preventDefault()
    alert('Çok yakında!')
})

$('.screenshot-gallery').flickity({
    imagesLoaded: true,
    percentPosition: true,
    wrapAround: true,
    prevNextButtons: false,
    autoPlay: 3000,
    lazyLoad: 1,
    /*cellAlign: 'left',
    contain: true,
    prevNextButtons: false,*/
    /*wrapAround: true,*/
    /*autoPlay: 3000,*/
    /*fullscreen: true,
    lazyLoad: 1,*/
})

$('#button-newsletter-register').click(function() {
    var elemMailField = $('#field-newsletter-email')
    if(elemMailField.is('[disabled]')) return

    var email = elemMailField.val()
    if(!email || email.trim().length <= 0) {
        var elemResult = $('#result-newsletter-register')
        elemResult.removeClass('d-none')
        elemResult.text('Öncelikle e-mail adresini yazman gerekiyor.')
        return
    }
    email = email.trim()

    var elemButton = $(this)
    elemMailField.prop('disabled', true);
    elemButton.addClass('running')
    
    $.ajax({
        type: 'POST',
        url: 'https://backend.usejanus.com/marketing/v1/newsletter/register',
        data: {'email': email},
        dataType: 'json',
        success: function(data, status, xhr) {
            var elemResult = $('#result-newsletter-register')
            elemResult.removeClass('d-none')
            elemResult.text('E-mail adresini kaydettik, artık gelişmelerden seni de haberdar edeceğiz.')
            elemMailField.prop('disabled', false);
            elemButton.removeClass('running')
        },
        error: function(xhr, status, errorThrown) {
            var elemResult = $('#result-newsletter-register')
            var msg = 'Bilinmeyen bir hata oluştu!'

            if(xhr.status === 400) {
                msg = 'Lütfen geçerli bir e-mail adresi girin.'
            }else if(xhr.status === 409) {
                msg = 'Zaten kayıt olmuşsun, ilgin için teşekkürler.'
            }

            elemResult.removeClass('d-none')
            elemResult.text(msg)
            elemMailField.prop('disabled', false);
            elemButton.removeClass('running')
        }
    })
})