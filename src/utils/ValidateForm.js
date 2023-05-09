export function validateFromBook(releaseDate,author,title,url,callback){
    var currentDate = new Date();
    var selectedDate = new Date(releaseDate);
    if (![url, title, author, releaseDate].includes('')) {
        if (currentDate < selectedDate) {
            alert('Thời gian đã vượt qua thời điểm hiện tại');
        } else {
            callback();
        }
    } else {
        alert('Yêu cầu điền đầy đủ');
    }
}

