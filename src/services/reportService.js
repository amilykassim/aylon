import database from '../database/models';

class ReportService {
  static async addReportService(report) {
    return database.Report.create(report);
  }
}

export default ReportService;
