export const getTodayDate = function(){
    const today = new Date();
    const dd = this.today.getDate() < 10 ? `0${this.today.getDate()}`:`${this.today.getDate()}`
    const mm = (this.today.getMonth()+1) < 10 ? `0${(this.today.getMonth()+1)}`:`${this.today.getMonth()+1}`
    const yyyy = this.today.getFullYear();

    const todayDate = `${this.yyyy}-${this.mm}-${this.dd}`;
    return todayDate;
};

export const getCurrentTime = function(){
    const hours = this.today.getHours() < 10 ? `0${this.today.getHours()}`:this.today.getHours();
    const minutes = this.today.getMinutes()<10 ? `0${this.today.getMinutes()}`:this.today.getMinutes();

    const timeNow = `${this.hours}:${this.minutes}`;
    return timeNow;
}