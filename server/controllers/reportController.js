const { Place } = require('../models');
const sequelize = require('../db');

const ApiError = require('../error/ApiError');

class ReportController {
  async report(req, res, next) {
    const { id } = req.body;

    const reportId = req.params.id;
    const { startDate, endDate } = req.query;

    let request = ``;
    if (reportId == 1) {
      request = `
        WITH months_tmp AS (
          SELECT places.id AS placeId, (SELECT EXTRACT(YEAR FROM age) * 12 + EXTRACT(MONTH FROM age) FROM age(CURRENT_DATE, cast(places."startDate" AS TIMESTAMP)) )  as monts
          FROM places
        )
        SELECT  "placeId", MAX("paymentDate") as lastPayment, places."startDate", "clientId", places.price, SUM(summ) as totalPay, months_tmp.monts, months_tmp.monts*price - SUM(summ)  as debt
        FROM payments 
        JOIN places ON places.id = payments."placeId"
        JOIN months_tmp ON months_tmp.placeId = places.id
        GROUP BY payments."placeId", payments."clientId", places."startDate", places.price, months_tmp.placeId, months_tmp.monts 
        ORDER BY debt DESC LIMIT 1
        `;
    }
    if (reportId == 2) {
      request = `
        SELECT  "autoId", autos."regNumber", count("clientId") AS totalClient, json_agg(json_build_object('id', "clientId", 'firstName', clients."firstName", 'lastName', clients."lastName", 'secondName', clients."secondName" )) as clients 
        FROM auto_clients
        JOIN clients ON clients.id = auto_clients."clientId"
        JOIN autos ON autos.id = "autoId"
        GROUP BY "autoId", autos."regNumber"
        HAVING count("clientId") > 1
        `;
    }

    if (reportId == 3) {
      if (!startDate || !endDate) {
        next(ApiError.badRequest({ error: 'Нет необходимых дат' }));
      }

      request = `
        WITH months_tmp AS (
          SELECT places.id AS placeId, (SELECT EXTRACT(YEAR FROM age) * 12 + EXTRACT(MONTH FROM age) FROM age('${endDate}'::date, places."startDate"::date) )  as monts
          FROM places
        ), debts AS (
        SELECT  "placeId", autos.id as carId, autos."regNumber", places."startDate", "clientId", places.price, SUM(summ) as totalPay, months_tmp.monts, months_tmp.monts*price - SUM(summ) as debt
        FROM payments 
            JOIN places ON places.id = payments."placeId"
            JOIN months_tmp ON months_tmp.placeId = places.id
            JOIN autos ON autos.id = places."autoId"
        WHERE payments."paymentDate"::date <= '${endDate}'::date AND places."startDate"::date >= '${startDate}'::date
        GROUP BY payments."placeId", carId, autos."regNumber", places."startDate", payments."clientId", places.price, months_tmp.monts)
        SELECT * FROM debts WHERE debts.debt > 0
        ORDER by debt
        `;
    }

    try {
      const report = await sequelize.query(request);

      return res.json(report);
    } catch (error) {
      console.log('Error', error);
      next(ApiError.badRequest(error));
    }
  }
}

module.exports = new ReportController();
