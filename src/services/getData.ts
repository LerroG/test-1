import axios from "axios";

class DataService {
  async getData() {
    const { data } = await axios.get(
      "http://194.93.27.27/TestReporting/Reporting.svc/json/GetBranchReport?branchIds=2011,2012,2013,2015,2014,2016,2017,2018,2019,2020&startDate=2024-05-01&endDate=2024-05-31"
    );

    return data;
  }
}

export const dataService = new DataService();
