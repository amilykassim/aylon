import Helper from '../helpers/helper';
import ReportService from '../services/reportService';
import Validations from '../validations/reportValidation';

const helper = new Helper();
const { isAuth } = Helper;
const { addReportService } = ReportService;
const { validateReport } = Validations;

class UserController {
  constructor() {
    this.addReport = `addReport(
      description: String!
    ): ${helper.successMessageSchemaName}`;
  }

  static async addReport(args, req) {
    isAuth(req.user);

    const data = args;
    data.user_id = req.user.id;

    const { error } = validateReport(data);
    if (error) throw new Error(error.details[0].message);

    await addReportService(data);
    return { message: 'Reported successfully' };
  }
}

export default UserController;
