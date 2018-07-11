//餐厅类
class Restaurant {
    constructor(options) {
        this.cash = options.cash;
        this.size = options.size;
        this.staffs = [];
        this.customers = [];
        this.seats = {};
        this.cash_watcher = options.cash_watcher;
        this.cash_getter = options.cash_getter;
        this.customers_watcher = options.customers_watcher;
        this.cash_watcher(this.cash);
        Object.defineProperty(this, "cash", {
            set: (value) => {
                this.cash_watcher(value);
            },
            get: () => {
                return this.cash_getter();
            }
        });
        log(this);
    }

    invitedStaff(staff) {
        this.staffs.push(staff);
        log(`招聘来了员工${staff.name}`)
    }

    firedOfficial(staff) {
        this.staffs.remove(staff);
        log(`辞退了员工${staff.name}`)
    }

    queueCustomer(customer) {
        this.customers.push(customer);
        this.customers_watcher(this.customers);
    }

    serviceCustomer() {
        if (this.checkSeat()) {
            let customer = this.customers.shift();
            this.customers_watcher(this.customers);
            if (customer) {
                cus.innerText = customer.name;
                this.seats[0] = customer;
                customer.orderDishes();
            }
        }
    }

    checkSeat() {
        return !this.seats[0]
    }

    static getInstance(options) {
        if (!this.instance) {
            this.instance = new Restaurant(options);
        }
        return this.instance;
    }
}
