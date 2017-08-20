$(document).ready(function () {

    let isopen = false;
    $('#choise0').click(function () {
        $('#choise1').css('display', 'block')
        $('#choise2').css('display', 'block')
        $('#choise3').css('display', 'block')
    })
    $('#choise1').click(function () {
        //如果是第一次点击
        if (!isopen) {
            let text1 = $('#choise1').text();
            let name = $('#name').val();
            let data = {
                text: text1,
                name: name,
            }

            sendGet(data)

            $('#choise0').css('display', 'none')
            $('#choise2').css('display', 'none')
            $('#choise3').css('display', 'none')
            isopen = true;
        }
        else {
            $('#choise2').css('display', 'block')
            $('#choise3').css('display', 'block')
        }
    })
    $('#choise2').click(function () {
        if (!isopen) {
            let text2 = $('#choise2').text();
            let text1 = $('#choise1').text();

            let name = $('#name').val();
            let data = {
                text: text2,
                name: name,
            }
            sendGet(data)

            $('#choise1').text(text2)
            $('#choise2').text(text1)

            $('#choise0').css('display', 'none')
            $('#choise2').css('display', 'none')
            $('#choise3').css('display', 'none')
            isopen = true;
        }
        else {
            let text2 = $('#choise2').text();
            let text1 = $('#choise1').text();


            let name = $('#name').val();
            let data = {
                text: text2,
                name: name,
            }
            sendGet(data)

            $('#choise1').text(text2)
            $('#choise2').text(text1)

            $('#choise2').css('display', 'none')
            $('#choise3').css('display', 'none')
        }

    })
    $('#choise3').click(function () {
        if (!isopen) {
            let text3 = $('#choise3').text();
            let text1 = $('#choise1').text();


            let name = $('#name').val();
            let data = {
                text: text3,
                name: name,
            }
            sendGet(data)

            $('#choise1').text(text3)
            $('#choise3').text(text1)

            $('#choise0').css('display', 'none')
            $('#choise2').css('display', 'none')
            $('#choise3').css('display', 'none')
            isopen = true;
        }
        else {
            let text3 = $('#choise3').text();
            let text1 = $('#choise1').text();

            let name = $('#name').val();
            let data = {
                text: text3,
                name: name,
            }
            sendGet(data)

            $('#choise1').text(text3)
            $('#choise3').text(text1)

            $('#choise2').css('display', 'none')
            $('#choise3').css('display', 'none')
        }
    })
})
function sendGet(data) {
    console.log('发送请求')
    $.get('/returnMates', data, function (result) {
        console.log('----'+result.length)
        renderResult(result)
    })
}
function renderResult(data) {
    $('#result').empty()
    data.forEach(function (e) {
        $('#result').append('<div id="item">' + e.name + '&nbsp&nbsp' + e.stuId +
            '&nbsp&nbsp' + e.gender + '&nbsp&nbsp' + e.className + '<br/>&nbsp&nbsp' +
            e.originInfo['毕业中学'] + '&nbsp&nbsp' + e.birthday + '&nbsp&nbsp' +
            '</div>')
    })
}