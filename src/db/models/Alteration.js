const QueryBuilder = require("../QueryBuilder");

class Alteration {
    static tableName = "alterations";
    static Status = {
        PendingBusinessApproval: "PendingBusinessApproval",
        Rejected: "Rejected",
        PendingCustomerApproval: "PendingCustomerApproval",
        PendingDeposit: "PendingDeposit",
        DepositPaid: "DepositPaid",
        InProgress: "InProgress",
        ReadyForCollection: "ReadyForCollection",
        Complete: "Complete"
    }

    constructor({ id, customer_name, customer_email, status, description, estimated_price }) {
        this.id = id;
        this.customerName = customer_name;
        this.customerEmail = customer_email;
        this.status = status;
        this.description = description;
        this.estimatedPrice = estimated_price;
    }

    static async create({ customerName, customerEmail, description }) {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder
            .insert()
            .into(this.tableName)
            .values({
                customer_name: customerName,
                customer_email: customerEmail,
                description,
                status: this.Status.PendingBusinessApproval
            });

        const [result] = await query.execute();
        return new Alteration({
            id: result.insertId,
            customer_name: customerName,
            customer_email: customerEmail,
            description,
            status: this.Status.PendingBusinessApproval
        });
    }

    static async findAll(conditions = {}) {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder
            .select()
            .from(this.tableName)
            .where(conditions);

        const [results] = await query.execute();
        return results.map(result => new Alteration({
            id: result.id,
            customer_name: result.customer_name,
            customer_email: result.customer_email,
            description: result.description,
            status: result.status
        }));
    }

    static async findOne(conditions = {}) {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder
            .select()
            .from(this.tableName)
            .where(conditions)
            .limit(1);

        const [results] = await query.execute();
        if (results.length === 0) {
            return null;
        }

        const result = results[0];
        return new Alteration({
            id: result.id,
            customer_name: result.customer_name,
            customer_email: result.customer_email,
            description: result.description,
            status: result.status
        });
    }

    async save() {
        const queryBuilder = new QueryBuilder();
        const query = queryBuilder
            .update()
            .table(this.constructor.tableName)
            .set({
                customer_name: this.customerName,
                customer_email: this.customerEmail,
                description: this.description,
                status: this.status,
                estimated_price: this.estimatedPrice
            })
            .where({ id: this.id });

        await query.execute();
        return this;
    }
}

module.exports = Alteration;
