import { Request, Response, NextFunction } from 'express';

class TeamsValidation {
  static async validateAllFieldsAreFilled(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    console.log('here my id', id);

    if (!id) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default TeamsValidation;
