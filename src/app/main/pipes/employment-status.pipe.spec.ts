import { EmploymentStatusPipe } from './employment-status.pipe';

describe('EmploymentStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new EmploymentStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
