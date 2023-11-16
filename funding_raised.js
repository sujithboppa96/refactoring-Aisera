const parseCsvSync = require('csv-parse/lib/sync');
const fs = require('fs');
const path = require('path');

class FundingRaised {
  static where(options = {}) {
    const funding_file = 'startup_funding.csv';
    const file_data = fs.readFileSync(path.join(__dirname, '..', funding_file)).toString();
    let csv_data = parseCsvSync(file_data);

    // facebook,Facebook,450,web,Palo Alto,CA,1-May-05,12700000,USD,a
    const funding_data = [];

    if (options.company_name) {
      csv_data = csv_data.filter(row => options.company_name == row[1]);
    }

    if (options.city) {
      csv_data = csv_data.filter(row => options.city == row[4]);
    }

    if (options.state) {
      csv_data = csv_data.filter(row => options.state == row[5]);
    }

    if (options.round) {
      csv_data = csv_data.filter(row => options.round == row[9]);
    }

    csv_data.forEach((row) => {
      const mapped = this.getTheData(row)
      funding_data.push(mapped);
    });

    return funding_data;
  }

  static getTheData(row) {
    let mapped = {}
    mapped.permalink = row[0];
    mapped.company_name = row[1];
    mapped.number_employees = row[2];
    mapped.category = row[3];
    mapped.city = row[4];
    mapped.state = row[5];
    mapped.funded_date = row[6];
    mapped.raised_amount = row[7];
    mapped.raised_currency = row[8];
    mapped.round = row[9];
    return mapped
  }

  static findBy(options = {}) {
    const funding_file = 'startup_funding.csv';
    const file_data = fs.readFileSync(path.join(__dirname, '..', funding_file)).toString();
    let csv_data = parseCsvSync(file_data);

    // if (options.company_name) {
    //   csv_data = csv_data.filter(row => options.company_name == row[1]);
    //   const row = csv_data[0];
    //   const mapped = this.getTheData(row)
    //   return mapped;
    // }

    csv_data = csv_data.filter((row) => {

      let isCompanyName = options.company_name ? options.company_name  == row[1] : true
      let isCity =  options.city ? options.city == row[4] : true
      let isState = options.state ? options.state == row[5] : true
      let isRound = options.round ? options.round == row[9] : true
      return isCompanyName && isCity && isState && isRound
    });

      const row = csv_data[0];
      const mapped = this.getTheData(row)
      return mapped;


    // if (options.city) {
    //   csv_data = csv_data.filter(row => options.city == row[4]);
    //   const row = csv_data[0];
    //   const mapped = this.getTheData(row)
    //   return mapped;
    // }

    // if (options.state) {
    //   csv_data = csv_data.filter(row => options.state == row[5]);
    //   const row = csv_data[0];
    //   const mapped = this.getTheData(row)
    //   return mapped;
    // }

    // if (options.round) {
    //   csv_data = csv_data.filter(row => options.round == row[9]);
    //   const row = csv_data[0];
    //   const mapped = this.getTheData(row)
    //   return mapped;
    // }
  }

  static asyncWhere(options = {}) {

    return new Promise((resolve, reject) => {
      let data = this.findBy(options)
      let data1 = []
      data1.push(data)
      resolve(data1)
    })
  }
}

module.exports = FundingRaised;
