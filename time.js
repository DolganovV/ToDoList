function formatTime(time){
    return time < 10 ? '0' + time : time;
}
//Функция обновления времени
function showTime(){
    const now = new Date();
    // Получаем вермя
    const hours = formatTime(now.getHours());
    const minutes = formatTime(now.getMinutes());
    const seconds = formatTime(now.getSeconds());

    //Формируем строку времени
    const timeString = `${hours}:${minutes}:${seconds}`;
    //Обновляем содержимое элемента
    document.getElementById('time').textContent = timeString
}

setInterval(showTime, 1000);
showTime();