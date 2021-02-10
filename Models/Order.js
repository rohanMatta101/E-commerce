import  moment from 'moment';
class Order{
    constructor(id,items,amount,date)
    {
        this.id = id;
        this.items = items;
        this.amount = amount;
        this.date = date;
    }
    get readableDate() {
        /*return this.date.toLocaleDateString('en-EN',{
            year : 'numeric',
            month : 'long',
            day : 'numeric',
            hour : '2-digit',
            minute : '2-digit'
        });*/ //the commented part works well for IOS not for android
        return moment(this.date).format('MMMM Do YYYY,hh:mm'); //this works best for both
    }
    
}
export default Order;