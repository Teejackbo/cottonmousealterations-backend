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

    constructor({ id, customer_name, customer_email, status, description }) {
        this.id = id;
        this.customerName = customer_name;
        this.customerEmail = customer_email;
        this.status = status;
        this.description = description;
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
}

module.exports = Alteration;
