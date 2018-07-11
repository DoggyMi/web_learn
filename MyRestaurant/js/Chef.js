class Chef extends Staff {
    constructor(options) {
        super(options.id, options.name, options.salary);
        this.dishes = [];
        this.cooking = false;
        this.time_watcher = options.time_watcher;
        this.status_watcher = options.status_watcher;
        this.dish_watcher = options.dish_watcher;
        this.dish_list_watcher = options.dish_list_watcher;
    }

    getOrder(dishes) {
        this.dishes = this.dishes.concat(...dishes);
        this.dish_list_watcher(this.dishes);
        if (!this.cooking) {
            this.updateStatus(true);
            this.cookDishes();
        }
    }

    cookDishes() {
        let dish = this.dishes.shift();
        this.dish_list_watcher(this.dishes);
        if (dish) {
            new Promise(((resolve, reject) => {
                this.dish_watcher(dish);
                Restaurant.getInstance().cash -=dish.cost;
                timer(dish.cost_time, (time) => {
                    this.time_watcher(time)
                }, resolve);
            })).then(() => {
                log(`${this.name}做完了${dish.name}`);
                this.cookDishes();
                waiter.serve(dish);
            });
        } else {
            log(`空闲了`);
            this.dish_watcher();
            this.updateStatus(false);
        }
    }

    updateStatus(is_cooking){
        this.cooking = is_cooking;
        this.status_watcher(is_cooking);
    }
}