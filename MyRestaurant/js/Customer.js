//顾客
class Customer {

    constructor(options) {
        this.name = options.name;
        this.dishes = [];
        this.count = 0;
        this.eating = false;
        this.status_watcher = options.status_watcher;
        this.dishes_watcher = options.dishes_watcher;
    }

    orderDishes() {
        new Promise(((resolve, reject) => {
            this.status_watcher("正在想吃什么...");
            timer(1 * time_unit, (time) => {
                this.status_watcher(`正在想吃什么...   ${time}`);
            }, resolve);
        })).then(() => {
            this.status_watcher(`点餐完毕`);
            this.count = random(2, 3);
            for (let i = 0; i < this.count; i++) {
                let dish = Dish.getDish();
                this.dishes.push(dish);
            }
            this.update_dish_watcher();
            waiter.order(this.dishes);
        });
    }

    get_food(dish){
        let temp_dish = this.getDishFromList(dish);
        temp_dish.status = "已上菜";
        this.update_dish_watcher();
        if(!this.eating){
            this.eatFood(dish)
        }
    }

    eatFood(dish) {
        this.eating = true;
        this.status_watcher(`正在吃饭`);
        new Promise((resolve, reject) => {
            dish.status = "正在吃";
            this.update_dish_watcher();
            timer(3 * time_unit, (time) => {
                dish.last_time = time;
                this.update_dish_watcher();
            }, resolve);
        }).then(() => {
            dish.status = "吃完了";
            this.update_dish_watcher();
            this.count--;
            if (this.count === 0) {
                this.pay();
                this.dishes_watcher();
            }else {
              let next_dish =   this.get_eatable_food();
              if(next_dish){
                  this.eatFood(next_dish)
              }else {
                  this.eating = false;
              }}
        });
    }

    pay() {
        let sum = 0;
        this.dishes.forEach(item => {
            sum += item.price;
        });
        log(`${this.name}结账，花了${sum}元`);
        Restaurant.getInstance().cash += sum;
        log(`${this.name}离开了`);
        restaurant.seats[0] = null;
        restaurant.serviceCustomer();
    }

    update_dish_watcher(){
        this.dishes_watcher(this.dishes);
    }

    getDishFromList(dish) {
        let result = null;
        this.dishes.filter(item=>{
            return item.status === "还未上"
        }).forEach(item => {
            if (item.id === dish.id) {
                result = item;
            }
        });
        return result;
    }

    get_eatable_food(){
        let result = null;
        this.dishes.filter(item=>{
            return item.status === "已上菜"
        }).forEach(item => {
            result = item;
        });
        return result;
    }
}
