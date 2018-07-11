class Dish {
    constructor(id) {
        this.id = id;
        this.status = "还未上";
        this.last_time = 0;
        switch (id) {
            case 0:
                this.name = "面包";
                this.cost_time = 1 * time_unit;
                this.cost = 10;
                this.price = 20;
                break;
            case 1:
                this.name = "牛奶";
                this.cost_time = 1 * time_unit;
                this.cost = 15;
                this.price = 40;
                break;
            default:
                this.name = "普通套餐";
                this.cost_time = 1 * time_unit;
                this.cost = 30;
                this.price = 80;
                break;
        }
    }

    static getDish(id) {
        let type = id || random(0, 2);
        return new Dish(type);
    }
}
