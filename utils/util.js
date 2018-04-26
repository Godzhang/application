const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const util = {
    formatDate(date){
        let year = date.getFullYear();
        let month = this.addZero(date.getMonth() + 1);
        let day = this.addZero(date.getDate());

        return parseInt(year + month + day) + 1;
    },
    formatTitle(date){
        let year = date.slice(0, 4),
            month = date.slice(4, 6),
            day = date.slice(6),
            time = new Date(year, month - 1, day),
            week = time.getDay();
        
        return `${month}月${day}日 ${weekArr[week]}`;
    },
    addZero(num){
        return parseInt(num) > 10 ? num : `0${num}`;
    }
}

export default util;