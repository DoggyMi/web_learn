class Waiter extends Staff {
    constructor(id, name, salary) {
        super(id, name, salary)
    }

    order(dishes) {
        let names = dishes.map(item => item.name);
        log(`${this.name}通知厨房做${names.join(',')}`);
        chef.getOrder(dishes);
    }

    serve(dish) {
        log(`${this.name}上菜${dish.name}`);
        restaurant.seats[0].get_food(dish);
    }

}